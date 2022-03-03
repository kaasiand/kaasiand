let gwidth = 12;
let gheight = 14;

let activeGlyphElem;
let currentGlyph;
let currentImageData, ctx;
let currentAdvWidth;
let currentColour = [0,0,0,255];
let rightClickColour = [0,0,0,0];
let startClickOnSameColour = false;
let currentTool = "pencil";

let unfinishedundo = false;
let pctx;

let settings = {
    compactview: false,
    separatetag: false,
    kerncurrent: false,
    autoadvance: true,
    previewtext: "Lorem ipsum dolor sit amet",
    tracking: 1,
    leading: 1,
    fontname: "",
    scale: 1
}
let prefs = {
    autosave: true,
    theme: "hiratake",
}
let metrics = {
    baseline: -1,
    xHeight:  -1,
    capHeight:-1
}

let kerningPairs = {};
let kernByChar   = {};

let selX = 0, selY = 0, selW = 0, selH = 0;
let seldX = 0, seldY = 0;

let lastX, lastY, destClr;

let mouseIsDownCanv = false, mouseIsDownAdvSlider = false, mouseIsDownGlyphlist = false;
let firstSelectedGlyphEl, lastSelectedGlyphEl;

let copystr, copybitmapdata, copyadvancedata;
let copyselcanv, copyselctx;
let copytype = "";

let tempCanvas, tctx;
let selectioncanv, stx;
let selectionImageData;

let glyphBitmaps = {};
let advanceWidth = {};

let currentGroupName;
let currentGroup;



let currentUndoIdx = -1;
let firstUndoItemIdx = 0;
let undoItemCount = 0;
let maxUndoCount = 32;

let undos = {};

function undoRemoveFirst() {
    delete undos[firstUndoItemIdx];
    firstUndoItemIdx++;
    undoItemCount--;
}
function initiateUndoState(glyphs) {
    if (currentUndoIdx >= firstUndoItemIdx) {
        // save the state of each glyph to the PREVIOUS item, BEFORE changes happen
        let obj = undos[currentUndoIdx];
        for (let i = 0; i < glyphs.length; i++) {
            obj.data[glyphs[i]] = {
                bmp: glyphBitmaps[glyphs[i]] ? copyImageData(glyphBitmaps[glyphs[i]]) : null,
                adv: advanceWidth[glyphs[i]] ?? 0,
            };
        }
    }
    currentUndoIdx++;

    undos[currentUndoIdx] = { group: currentGroupName, data: {} };
    undoItemCount = currentUndoIdx - firstUndoItemIdx + 1;
    while (undoItemCount > maxUndoCount)
        undoRemoveFirst();
    unfinishedundo = true;
}
function finaliseUndoState(glyphs) {
    if (!unfinishedundo) return;
    let obj = undos[currentUndoIdx];

    // save the state of each glyph to the CURRENT item, AFTER changes happen
    for (let i = 0; i < glyphs.length; i++) {
        obj.data[glyphs[i]] = {
            bmp: glyphBitmaps[glyphs[i]] ? copyImageData(glyphBitmaps[glyphs[i]]) : null,
            adv: advanceWidth[glyphs[i]],
        };
    }
}
function initiateKernUndoState(pairs) {
    if (currentUndoIdx >= firstUndoItemIdx) {
        // save the state of each glyph to the PREVIOUS item, BEFORE changes happen
        let obj = undos[currentUndoIdx];
        for (let i = 0; i < pairs.length; i++) {
            obj.data[pairs[i]] = {
                adv: kerningPairs[pairs[i]]?.value,
            };
        }
    }
    currentUndoIdx++;

    undos[currentUndoIdx] = { group: currentGroupName, data: {} };
    undoItemCount = currentUndoIdx - firstUndoItemIdx + 1;
    while (undoItemCount > maxUndoCount)
        undoRemoveFirst();
}

function finaliseKernUndoState(pairs) {
    let obj = undos[currentUndoIdx];

    // save the state of each glyph to the CURRENT item, AFTER changes happen
    for (let i = 0; i < pairs.length; i++) {
        obj.data[pairs[i]] = {
            adv: kerningPairs[pairs[i]]?.value,
        };
    }
}

function undo() {
    docMouseUp();
    if (currentTool != "pencil" && currentTool != "milk")
        setTool("pencil");
    
    if (currentUndoIdx - 1 >= firstUndoItemIdx) {
        currentUndoIdx--;
        loadUndoState(undos[currentUndoIdx]);
    }
}
function redo() {
    docMouseUp();
    applySelection();
    if (currentUndoIdx + 1 < firstUndoItemIdx + undoItemCount) {
        currentUndoIdx++;
        loadUndoState(undos[currentUndoIdx]);
    }
}
function loadUndoState(u) {
    for (const key in u.data) {
        if (key.length == 1) {
            // bitmap
            pasteSingleGlyph(u.data[key].bmp, key, u.data[key].adv);
            kernByChar[key]?.forEach(obj => obj.updateSpacing());
        }
        else {
            // kerning pair
            if (u.data[key].adv == null) {
                kerningPairs[key]?.deletePair();
            }
            else {
                if (kerningPairs[key])
                    kerningPairs[key].setValue(u.data[key].adv);
                else
                    makeKerningPair(key, u.data[key].adv, false);
            }
        }
    }
    if (u.group && u.group != currentGroupName)
        loadElemGroup(groups[u.group].elem, false);
    reloadCurrentGlyph();
    updatePreview();
    //loadKernPairList();
}


class KernPair {
    constructor(pair, value = 0) {
        this.pair  = pair;
        let d = document.createElement("div");
        //<button onclick="this.nextElementSibling.value--" class="toolbtn minus"></button><button onclick="this.previousElementSibling.value++" class="toolbtn plus"></button></div>
        d.classList.add("kernpair");
        d.dataset.pair = pair;

        let d2 = document.createElement("div");
        d2.classList.add("kernpreview");
        d2.dataset.fst = pair[0];
        d2.dataset.snd = pair[1];
        let dc1 = document.createElement("div");
        dc1.classList.add("kernch");
        let dc2 = document.createElement("div");
        dc2.classList.add("kernch");
        let dcb = document.createElement("button");
        dcb.onclick = () => this.deletePair(true);
        d2.append(dc1, dc2, dcb);

        d2.title = `${pair} (${toCodepointString(pair[0])} ${toCodepointString(pair[1])})`;
        dcb.title = "Delete kerning pair";

        let inp = document.createElement("input");
        inp.oninput = () => { inp.value = ~~inp.value };
        inp.value = 0;

        let bm = document.createElement("button");
        bm.classList.add("toolbtn", "minus");
        bm.onclick = () => this.decr();

        let bp = document.createElement("button");
        bp.classList.add("toolbtn", "plus");
        bp.onclick = () => this.incr();

        d.append(bm, inp, bp, d2);

        this.elem = d;
        kernpairlist.prepend(d);
        addKerningPairToObject(this);

        this.setValue(value);
        updateGlyphListBitmap(this.pair[0]);
        if (this.pair[1] != this.pair[0])
            updateGlyphListBitmap(this.pair[1]);
    }
    setElem(el) {
        this.elem = el;
    }
    deletePair(undoable = false) {
        if (undoable)
            initiateKernUndoState([this.pair]);

        this.elem.parentNode.removeChild(this.elem);

        delete kerningPairs[this.pair];
        delete kernByChar[this.pair[0]][kernByChar[this.pair[0]].indexOf(this)];

        if (this.pair[0] != this.pair[1])
            delete kernByChar[this.pair[1]][kernByChar[this.pair[1]].indexOf(this)];

        if (undoable)
            finaliseKernUndoState([this.pair]);

        delete this;
        updatePreview();
    }
    setValue(x, undoable = false) {
        if (undoable)
            initiateKernUndoState([this.pair]);

        this.value = x;
        this.elem.querySelector("input").value = x;
        this.updateSpacing();

        if (undoable)
            finaliseKernUndoState([this.pair]);
    }
    incr() { this.setValue(this.value + 1, true); updatePreview(); }
    decr() { this.setValue(this.value - 1, true); updatePreview(); }
    updateSpacing() {
        this.elem.querySelector(".kernch").style.marginRight = `calc(calc(var(--glyphwidthpx) * -1) + calc(${(advanceWidth[this.pair[0]] ?? 0) + this.value} * var(--scalepx)))`;
    }
}

function addKerningPairToObject(pairObj) {
    let pair = pairObj.pair;
    kerningPairs[pair] = pairObj;

    if (!(pair[0] in kernByChar))
        kernByChar[pair[0]] = [];

    if (!(pair[1] in kernByChar))
        kernByChar[pair[1]] = [];

    kernByChar[pair[0]].push(pairObj);

    if (pair[0] != pair[1])
        kernByChar[pair[1]].push(pairObj);

}

function makeKerningPair(str, val = 0, undoable = true) {
    if (str in kerningPairs) {
        kernpairlist.prepend(kerningPairs[str].elem);
        return;
    }
    if (str.length != 2) return;
    kern_add_input.value = "";

    if (undoable)
        initiateKernUndoState([str]);
    
    new KernPair(str, val);
    
    if (undoable) {
        finaliseKernUndoState([str]);
        tryAutosave();
    }
}

function loadKernPairList() {
    kernpairlist.replaceChildren();
    let match = kern_find_input.value;
    let toLoad = (settings.kerncurrent && !match) ? kernByChar[currentGlyph] : Object.keys(kerningPairs).map(k => kerningPairs[k]);
        
    if (!toLoad) return;

    toLoad.sort((a,b) => a.pair > b.pair);
    toLoad.forEach(k => {
        if (match.length == 1 && (k.pair[0] == match || k.pair[1] == match))
            kernpairlist.appendChild(k.elem), k.updateSpacing();
        else if (match.length == 2 && k.pair == match)
            kernpairlist.appendChild(k.elem), k.updateSpacing();
        else if (!match)
            kernpairlist.appendChild(k.elem), k.updateSpacing();
    });
}

function loadElemGroup(el, fromList = true, undoable = true) {
    [].forEach.call(blocklist.querySelectorAll(".currentGroup"), e => e.classList.remove("currentGroup"));
    el.classList.add("currentGroup");
    el.parentNode.parentNode.previousElementSibling.classList.remove("folded");
    let name = el.dataset.group;
    if (name in groups) {
        currentGroupName = name;
        currentGroup = groups[name];
        loadGroupToGlyphTable(currentGroup);
    }
    if (fromList && undoable) {
        initiateUndoState("");
        finaliseUndoState("");
    }
    tryAutosave();
}
function loadGroupToGlyphTable(group) {
    glyphlist.replaceChildren();
    
    if (settings.separatetag) {
        if (groupComponents.tagged_r.chars) loadGroupComponentToGlyphTable(groupComponents.tagged_r);
        if (groupComponents.tagged_y.chars) loadGroupComponentToGlyphTable(groupComponents.tagged_y);
        if (groupComponents.tagged_g.chars) loadGroupComponentToGlyphTable(groupComponents.tagged_g);
        if (groupComponents.tagged_b.chars) loadGroupComponentToGlyphTable(groupComponents.tagged_b);
    } else {
        let all = tagged_all();
        if (all.chars) loadGroupComponentToGlyphTable(all);
    }

    if (group.components) {
        group.components.forEach(comp => {
            loadGroupComponentToGlyphTable(groupComponents[comp]);
        }); 
    }
    else {
        loadGroupComponentToGlyphTable(all_glyphs());
    }
}

function loadGroupComponentToGlyphTable(comp) {
    //String.fromCodePoint(0x0041)
    let d = document.createElement("div");
    d.classList.add("break");
    let compname;

    switch (language) {
        case "fr":    compname = comp.name || comp.nameFR; break;
        case "jp":    compname = comp.name || comp.nameJP; break;
        default:
        case "en_US": compname = comp.name || comp.nameEN; break;
    }
    d.innerText = compname;
    glyphlist.appendChild(d);

    let glyphsToAdd;
    if ("chars" in comp)
        glyphsToAdd = [...comp.chars];
    else
        glyphsToAdd = generateCharArrayFromCodepointRange(comp.first, comp.last);

    glyphsToAdd.forEach(c => {
        let g = document.createElement("div");
        g.classList.add("glyph");
        g.dataset.ch = c;
        
        g.dataset.tag = "";
        if (groupComponents.tagged_r.chars.includes(c))
            g.dataset.tag = "r";
        else if (groupComponents.tagged_y.chars.includes(c))
            g.dataset.tag = "y";
        else if (groupComponents.tagged_g.chars.includes(c))
            g.dataset.tag = "g";
        else if (groupComponents.tagged_b.chars.includes(c))
            g.dataset.tag = "b";
        
        if (c == currentGlyph)
            makeActiveGlyph(c, g, true);

        g.title = `${c} (${toCodepointString(c)})`;
        glyphlist.appendChild(g);

        updateGlyphListBitmap(c, g, false, true);
    });
}

function toCodepointString(c) {
    return `U+${c.charCodeAt(0).toString(16).padStart(4,0).toUpperCase()}`;
}
function generateCharArrayFromCodepointRange(first, last) {
    let result = [];
    for (let i = first; i <= last; i++)
        result.push(String.fromCodePoint(i));
    return result;
}
function updateCopyGlyphKernButton() {
    copyoverlbl1.dataset.name = getLocalisedString("copyover1");
    copyovergbtn.dataset.name = getLocalisedString("copyoverg");
    copyoverkbtn.dataset.name = getLocalisedString("copyoverk");
    copyoverlbl2.dataset.name = getLocalisedString("copyover2");

    copyoverin.style.order = language == "jp" ? 0 : 5;

    if (baseLetterFromDiacritic[currentGlyph])
        copyoverin.value = baseLetterFromDiacritic[currentGlyph];
}
function copyoverGlyph(orig) {
    if (!orig) return;

    if (glyphBitmaps[orig]) {
        initiateUndoState(currentGlyph);
        pasteSingleGlyph(glyphBitmaps[orig], currentGlyph, advanceWidth[orig] ?? 0)
        finaliseUndoState(currentGlyph);
    }

    loadKernPairList();
    reloadCurrentGlyph();
    tryAutosave();
}
function copyoverKern(orig) {
    if (!orig) return;

    let a = kernByChar[orig];
    if (a && a.length > 0) {
        let undoarr = a.flatMap(obj => obj.pair[0] == obj.pair[1] ? [obj.pair[0] + currentGlyph, currentGlyph + obj.pair[0], currentGlyph + currentGlyph] : [obj.pair.replace(orig, currentGlyph)]);
        initiateKernUndoState(undoarr);
        a.forEach(obj => {
            if (obj.pair[0] == obj.pair[1]) {
                // pair "aa" becomes "äa" + "aä" + "ää"
                makeKerningPair(obj.pair[0]  + currentGlyph, obj.value, false);
                makeKerningPair(currentGlyph + obj.pair[0] , obj.value, false);
                makeKerningPair(currentGlyph + currentGlyph, obj.value, false);
            } else {
                // pair "ab" becomes "äb"
                makeKerningPair(obj.pair.replace(orig, currentGlyph), obj.value, false);
            }
        });
        finaliseKernUndoState(undoarr);
    }

    loadKernPairList();
    reloadCurrentGlyph();
    tryAutosave();
}

function updateBlockList(initial) {
    let list = [...blocklist.querySelectorAll("button[data-group]")];
    list.forEach(el => {
        let group = el.dataset.group;
        if (group in groups) {
            let groupname;

            switch (language) {
                case "fr":    groupname = groups[group].name || groups[group].nameFR; break;
                case "jp":    groupname = groups[group].name || groups[group].nameJP; break;
                default:
                case "en_US": groupname = groups[group].name || groups[group].nameEN; break;
            }

            el.dataset.name = groupname;
            if (initial && !el.classList.contains("block_category")) {
                el.onclick = () => { loadElemGroup(el) };
                groups[group].elem = el;
            }
        }
    });

    document.documentElement.style.setProperty("--emptystr", getLocalisedString("emptystr"));
    glyphlist.style.setProperty("--spacestr", getLocalisedString("spacestr"));
    updateCopyGlyphKernButton();
    
    document.documentElement.style.setProperty("--fontsyn", language == "jp" ? "none" : "initial");
}

function setGlyphDimensions(w,h) {
    document.documentElement.style.setProperty("--glyphwidth",  w);
    document.documentElement.style.setProperty("--glyphheight", h);

    gwidth  = w * 1;
    gheight = h * 1;
    glyphcanv.width  = w;
    glyphcanv.height = h;
    tempCanvas.width  = w;
    tempCanvas.height = h;
    copyselcanv.width  = w;
    copyselcanv.height = h;
    selectioncanv.height = h;
    selectioncanv.width  = w;
}
function setTracking(tr) {
    document.documentElement.style.setProperty("--tracking",  tr);
    settings.tracking = tr;
    trackinginput.value = tr;
    updatePreview();
}
function setLeading(ld) {
    settings.leading = ld;
    leadinginput.value = ld;
    updatePreview();
}

function makeActiveGlyph(g, el, clearPrevious) {
    if (activeGlyphElem && clearPrevious) {
        [].forEach.call(glyphlist.querySelectorAll(".active"), el => {
            el.classList.remove("active");
        });
    }
    el.classList.add("active");
    activeGlyphElem = el;

    currentGlyph = g;
}
function loadGlyph(g, el, clearPrevious = true, updateKernList = true) {
    applySelection();
    letterboxspan.innerText = g;
    letterboxspan.classList.toggle("iswhitespace", /\s/.test(g));
    codepointname.dataset.name = toCodepointString(g);

    makeActiveGlyph(g, el, clearPrevious);

    tryAutosave();
    
    loadGlyphToCanvas(g);
    loadAdvanceWidthToCanvas(g);
    updateCopyGlyphKernButton();
    if (updateKernList && settings.kerncurrent)
        loadKernPairList();
}
function loadGlyphToCanvas(g) {
    if (g in glyphBitmaps)
        currentImageData = glyphBitmaps[g];
    else
        currentImageData = ctx.createImageData(gwidth, gheight);
    ctx.putImageData(currentImageData,0,0);
}
function drawCanvas() {
    ctx.putImageData(currentImageData,0,0);
    ctx.drawImage(selectioncanv, selX, selY, selW, selH, selX + seldX, selY + seldY, selW, selH);
}
function drawCanvasWithOffsetSelection(x,y) {
    ctx.putImageData(currentImageData,0,0);
    ctx.drawImage(selectioncanv, x, y);
}
function loadAdvanceWidthToCanvas(g) {
    if (g in advanceWidth)
        currentAdvWidth = advanceWidth[g];
    else
        currentAdvWidth = 0;

    updateAdvanceWidthCSS();
}

function selectGlyphElemRange(firstEl, lastEl) {
    [].forEach.call(glyphlist.querySelectorAll(".tempsel"), el => {
        el.classList.remove("tempsel");
    });
    let elemlist = glyphlist.querySelectorAll(".glyph");
    let firstidx = [].indexOf.call(elemlist, firstEl);
    let lastidx  = [].indexOf.call(elemlist,  lastEl);
    let min = Math.min(firstidx, lastidx);
    let max = Math.max(firstidx, lastidx);
    for (let i = min; i <= max; i++) {
        elemlist[i].classList.add("tempsel");
    }
}
function finaliseSelection() {
    [].forEach.call(glyphlist.querySelectorAll(".tempsel"), el => {
        el.classList.remove("tempsel");
        el.classList.add("active");
    });
    updateCopyGlyphKernButton();
}

function storeGlyphBitmap() {
    currentImageData = ctx.getImageData(0, 0, gwidth, gheight);
    glyphBitmaps[currentGlyph] = currentImageData;
    if (activeGlyphElem)
        updateGlyphListBitmapCurrent(currentGlyph, activeGlyphElem);
}
function storeGlyphAdvWidth() {
    advanceWidth[currentGlyph] = currentAdvWidth;
    storeGlyphBitmap();
    kernByChar[currentGlyph]?.forEach(obj => obj.updateSpacing());
}
function updateAdvanceWidthCSS() {
    adv_width_slider.style.setProperty("--advwidth", currentAdvWidth);
}
function autoUpdateAdvanceWidth() {
    currentAdvWidth = getGlyphRightEdge(currentGlyph);
    storeGlyphAdvWidth();
    updateAdvanceWidthCSS();
}
function autoUpdateAdvanceWidthGlyph(g) {
    let x = getGlyphRightEdge(g);
    if (x)
        advanceWidth[g] = x;
    kernByChar[g]?.forEach(obj => obj.updateSpacing());
}
function getGlyphRightEdge(g) {
    if (!glyphBitmaps[g]) return 0;

    let x, shouldBreak = false;
    for (x = gwidth; x > 0; x--) {
        for (let y = 0; y < gheight; y++) {
            if (getCurrentImageDataAlpha(x - 1,y,g)) {
                shouldBreak = true;
                break;
            }
        }
        if (shouldBreak) break;
    }
    return x;
}
function getGlyphLeftEdge(g) {
    if (!glyphBitmaps[g]) return 0;

    let x, shouldBreak = false;
    for (x = 0; x < gwidth; x++) {
        for (let y = 0; y < gheight; y++) {
            if (getCurrentImageDataAlpha(x,y,g)) {
                shouldBreak = true;
                break;
            }
        }
        if (shouldBreak) break;
    }
    return x;
}
function getGlyphBtmEdge(g) {
    if (!glyphBitmaps[g]) return 0;
    let y, shouldBreak = false;
    for (y = gheight; y > 0; y--) {
        for (let x = 0; x < gwidth; x++) {
            if (getCurrentImageDataAlpha(x, y - 1,g)) {
                shouldBreak = true;
                break;
            }
        }
        if (shouldBreak) break;
    }
    return y;
}
function getGlyphTopEdge(g) {
    if (!glyphBitmaps[g]) return 0;
    let y, shouldBreak = false;
    for (y = 0; y < gheight; y++) {
        for (let x = 0; x < gwidth; x++) {
            if (getCurrentImageDataAlpha(x,y,g)) {
                shouldBreak = true;
                break;
            }
        }
        if (shouldBreak) break;
    }
    return y;
}
function setGuide(which) {
    metrics[which] = which == "baseline" ? getGlyphBtmEdge(currentGlyph) : getGlyphTopEdge(currentGlyph);
    updateGuideCSS();
}
function updateGuideCSS() {
    guide_baseline .style.setProperty("--guidey", metrics.baseline);
    guide_xheight  .style.setProperty("--guidey", metrics.xHeight);
    guide_capheight.style.setProperty("--guidey", metrics.capHeight);
}



function getCurrentImageDataAlpha(x,y,g) {
    return glyphBitmaps[g].data[(x + y * gwidth) * 4 + 3];
}

function reloadCurrentGlyph() {
    loadGlyph(currentGlyph, activeGlyphElem, true, false);
    updateAdvanceWidthCSS();
}

function colourAtPositionEqualsColour(x,y,clr) {
    let rgba = ctx.getImageData(x, y, 1, 1).data;
    return (rgba[0] == clr[0] && rgba[1] == clr[1] && rgba[2] == clr[2] && rgba[3] == clr[3]);
}

function updateSelectionCSS() {
    glyphcanvselection.style.setProperty("--selx", selX + seldX);
    glyphcanvselection.style.setProperty("--sely", selY + seldY);
    glyphcanvselection.style.setProperty("--selw", selW);
    glyphcanvselection.style.setProperty("--selh", selH);
}
function dropSelection() {
    let dat = stx.getImageData(0,0,gwidth,gheight);
    stx.clearRect(0,0,gwidth,gheight);
    stx.putImageData(dat,seldX,seldY);

    selX += seldX;
    selY += seldY;
    seldX = 0;
    seldY = 0;
}
function applySelection() {
    if (selectionExists()) {
        clearSelection();

        if (currentGlyph in glyphBitmaps) {
            storeGlyphBitmap();
            tryAutoAdvance();
        }
        
        finaliseUndoState(currentGlyph);
        updatePreview();
    }
}

function updateSelection(x1,y1,x2,y2) {
    selX = Math.min(x1,x2);
    selY = Math.min(y1,y2);
    selW = Math.abs(x1 - x2) + 1;
    selH = Math.abs(y1 - y2) + 1;
    seldX = 0; seldY = 0;
    updateSelectionCSS();
}
function clearSelection() {
    selX  = 0; selY  = 0;
    selW  = 0; selH  = 0;
    seldX = 0; seldY = 0;
    updateSelectionCSS();
}
function makeSelection() {
    initiateUndoState(currentGlyph);

    stx.clearRect(0,0,gwidth,gheight);
    stx.drawImage(glyphcanv, selX, selY, selW, selH, selX, selY, selW, selH);
    ctx.clearRect(selX, selY, selW, selH);
    currentImageData = ctx.getImageData(0,0,gwidth,gheight);
    drawCanvas();
}
function makeSelectionFromGlyphBounds() {
    let left  = getGlyphLeftEdge (currentGlyph),
        right = getGlyphRightEdge(currentGlyph),
        top = getGlyphTopEdge(currentGlyph),
        btm = getGlyphBtmEdge(currentGlyph);
    
    if (right == left || top == btm) return false;
    
    updateSelection(left,top,right - 1,btm - 1);
    makeSelection();
    return true;
}
function flipSelectionH() {
    if (!selectionExists())
        makeSelectionFromGlyphBounds();

    stx.globalCompositeOperation = "copy";
    stx.scale(-1, 1);
    
    stx.drawImage(selectioncanv,-selX - selW - selX,0);
    
    stx.globalCompositeOperation = "source-over";
    stx.scale(-1, 1);
    drawCanvas();
    setTool("move");
}
function flipSelectionV() {
    if (!selectionExists())
        makeSelectionFromGlyphBounds();

    stx.globalCompositeOperation = "copy";
    stx.scale(1, -1);
    
    stx.drawImage(selectioncanv,0,-selY - selH - selY);
    
    stx.globalCompositeOperation = "source-over";
    stx.scale(1, -1);
    drawCanvas();
    setTool("move");
}
function selectionExists() {
    return selW * selH;
}

function glyphMouseDown(e) {
    preview_input.blur();
    [].forEach.call(document.querySelectorAll("input"), el => el.blur());
    if (!e.target.classList.contains("glyph")) {
        reloadCurrentGlyph();
        return;
    }

    mouseIsDownGlyphlist = true;
    firstSelectedGlyphEl = e.target;
    lastSelectedGlyphEl = e.target;
    
    if (e.shiftKey) {
        selectGlyphElemRange(activeGlyphElem, e.target);
        finaliseSelection();
        loadGlyph(e.target.dataset.ch, e.target, false);
    }
    else if (e.ctrlKey || e.metaKey) {
        loadGlyph(e.target.dataset.ch, e.target, false);
    }
    else {
        loadGlyph(e.target.dataset.ch, e.target, true);
    }
}
function glyphMouseDrag(e) {
    e.preventDefault();
    if (!mouseIsDownGlyphlist) return;
    if (!e.target.classList.contains("glyph")) return;
    if (e.target == lastSelectedGlyphEl) return;

    lastSelectedGlyphEl = e.target;
    selectGlyphElemRange(firstSelectedGlyphEl, lastSelectedGlyphEl);

    //loadGlyph(e.target.dataset.ch, e.target, false);
}
function glyphMouseUp() {
    mouseIsDownGlyphlist = false;
    finaliseSelection();
}
function spill(oldClr, newClr, x, y) {
    if (oldClr[0] == newClr[0] && oldClr[1] == newClr[1] && oldClr[2] == newClr[2] && oldClr[3] == newClr[3]) return;
    if (!colourAtPositionEqualsColour(x,y,oldClr)) return;
    if (x >= gwidth || x < 0 || y >= gheight || y < 0) return;

    if (startClickOnSameColour || !newClr[3]) {
        ctx.clearRect(x,y,1,1);
    } else {
        ctx.fillRect(x,y,1,1);
    }
    spill(oldClr, newClr, x + 1, y);
    spill(oldClr, newClr, x - 1, y);
    spill(oldClr, newClr, x, y + 1);
    spill(oldClr, newClr, x, y - 1);
}

function canvMouseDown(e) {
    preview_input.blur();
    docMouseUp();
    let r = glyphcanv.getBoundingClientRect();
    let x = Math.floor((e.x - r.x) / r.width  * gwidth);
    let y = Math.floor((e.y - r.y) / r.height * gheight);
    mouseIsDownCanv = true;

    lastX = x;
    lastY = y;
    let clr = e.buttons & 1 ? currentColour : rightClickColour;
    

    switch (currentTool) {
        case "select":
            applySelection();
            break;
        case "move":
            if (!selectionExists()) {
                updateSelection(0,0,gwidth,gheight);
                makeSelection();
            }
            break;
        case "syringe":
            canvMouseMove(e);
            break;
        default:
        case "milk":
        case "pencil":
            initiateUndoState(currentGlyph);
            startClickOnSameColour = colourAtPositionEqualsColour(x,y,clr);
            ctx.fillStyle = `rgba(${clr[0]},${clr[1]},${clr[2]},${clr[3] / 255})`;
            canvMouseMove(e);
            break;
    }
}
function canvMouseMove(e) {
    if (!mouseIsDownCanv) return;
    let r = glyphcanv.getBoundingClientRect();
    let x = Math.floor((e.x - r.x) / r.width  * gwidth);
    let y = Math.floor((e.y - r.y) / r.height * gheight);

    let clr = e.buttons & 1 ? currentColour : rightClickColour;

    switch (currentTool) {
        case "select":
            updateSelection(lastX,lastY,x,y);
            break;
        case "move":
            seldX = x - lastX;
            seldY = y - lastY;
            updateSelectionCSS();
            drawCanvas();
            break;
        case "milk":
            drawCanvas();
            destClr = ctx.getImageData(x, y, 1, 1).data;
            spill(destClr,clr,x,y);
            break;
        case "syringe":
            setColour(...ctx.getImageData(x,y,1,1).data, false);
            break;
        default:
        case "pencil":
            let n = Math.max(Math.hypot(x - lastX, y - lastY), 1);
            let dX = (x - lastX) / n;
            let dY = (y - lastY) / n;
            for (let i = 0; i < n; i++) {
                let tx = Math.round(lastX + i * dX);
                let ty = Math.round(lastY + i * dY);
                if (startClickOnSameColour || !clr[3]) {
                    ctx.clearRect(tx,ty,1,1);
                } else {
                    ctx.fillRect(tx,ty,1,1);
                }
            }
            lastX = x;
            lastY = y;
        break;
    }
}
function canvMouseUp() {
    mouseIsDownCanv = false;

    switch (currentTool) {
        case "select":
            makeSelection();
            if (selectionExists())
                setTool('move');
            break;
        case "move":
            dropSelection();
            break;
        case "syringe":
            setTool('pencil');
            break;

        default:
        case "milk":
        case "pencil":
            storeGlyphBitmap();
            tryAutoAdvance();
            finaliseUndoState(currentGlyph);
            break;
    }

    updatePreview();
}
function sliderMouseDown(e) {
    e.preventDefault();
    preview_input.blur();
    let r = adv_width_bar.getBoundingClientRect();
    let x = Math.max(Math.min(Math.round((e.x - r.x) / r.width  * gwidth), gwidth), 0);
    mouseIsDownAdvSlider = true;

    initiateUndoState(currentGlyph);

    currentAdvWidth = x;
    updateAdvanceWidthCSS();
    return;
}
function sliderMouseMove(e) {
    let r = adv_width_bar.getBoundingClientRect();
    let x = Math.max(Math.min(Math.round((e.x - r.x) / r.width  * gwidth), gwidth), 0);

    currentAdvWidth = x;
    updateAdvanceWidthCSS();
    return;
}
function sliderMouseUp() {
    mouseIsDownAdvSlider = false;
    storeGlyphAdvWidth();

    finaliseUndoState(currentGlyph);
    updatePreview();
}
function docMouseMove(e) {
    if (mouseIsDownAdvSlider) {
        sliderMouseMove(e);
    }
}
function docMouseUp() {
    if (mouseIsDownCanv) {
        canvMouseUp();
    }
    if (mouseIsDownGlyphlist) {
        glyphMouseUp();
    }
    if (mouseIsDownAdvSlider) {
        sliderMouseUp();
    }
}

function setTool(id) {
    docMouseUp();
    [].forEach.call(toollist.querySelectorAll(".active.toolbtn"), e => e.classList.remove("active"));
    document.getElementById(id)?.classList.add("active");

    currentTool = id;
    glyphcanv.style.cursor = id == "move" ? "move" : "crosshair";
    if (id == "move" || id == "select") {
    }
    else {
        applySelection();
    }
    drawCanvas();
}

function updateGlyphListBitmapCurrent(g, el) {
    if (g in glyphBitmaps) {
        let url = "url(" + glyphcanv.toDataURL() + ")";

        if (el.dataset.tag) {
            [].forEach.call(glyphlist.querySelectorAll(el.dataset.ch == "'" ? '[data-ch="\'"]' : "[data-ch='"+el.dataset.ch+"']"), e => {
                e.style.backgroundImage = url;
                e.classList.add("hasbitmap");
            });
        } else {
            el.style.backgroundImage = url;
            el.classList.add("hasbitmap");
        }

        kernByChar[g]?.forEach(obj => {
            let els = obj.elem.querySelectorAll(".kernch");
            for (let i = 0; i < els.length; i++) {
                if (obj.pair[i] == g) {
                    els[i].style.backgroundImage = url;
                }
            }
        });
    }
    else {
        if (el.dataset.tag) {
            [].forEach.call(glyphlist.querySelectorAll(el.dataset.ch == "'" ? '[data-ch="\'"]' : "[data-ch='"+el.dataset.ch+"']"), e => {
                e.style.backgroundImage = "none";
                el.classList.remove("hasbitmap");
            });
        } else {
            el.style.backgroundImage = "none";
            el.classList.remove("hasbitmap");
        }

        kernByChar[g]?.forEach(obj => {
            let els = obj.elem.querySelectorAll(".kernch");
            for (let i = 0; i < els.length; i++) {
                if (obj.pair[i] == g) {
                    els[i].style.backgroundImage = "none";
                }
            }
        });
    }
}
function updateGlyphListBitmap(g, el = null) {
    if (g in glyphBitmaps) {
        tctx.putImageData(glyphBitmaps[g], 0, 0);
        let url = "url(" + tempCanvas.toDataURL() + ")";

        if (el) {
            if (el.dataset.tag) {
                [].forEach.call(glyphlist.querySelectorAll(el.dataset.ch == "'" ? '[data-ch="\'"]' : "[data-ch='"+el.dataset.ch+"']"), e => {
                    e.style.backgroundImage = url;
                    e.classList.add("hasbitmap");
                });
            } else {
                el.style.backgroundImage = url;
                el.classList.add("hasbitmap");
            }
        }
        kernByChar[g]?.forEach(obj => {
            let els = obj.elem.querySelectorAll(".kernch");
            for (let i = 0; i < els.length; i++) {
                if (obj.pair[i] == g) {
                    els[i].style.backgroundImage = url;
                }
            }
        });
    }
    else {
        if (el) {
            if (el.dataset.tag) {
                [].forEach.call(glyphlist.querySelectorAll(el.dataset.ch == "'" ? '[data-ch="\'"]' : "[data-ch='"+el.dataset.ch+"']"), e => {
                    e.style.backgroundImage = "none";
                    el.classList.remove("hasbitmap");
                });
            } else {
                el.style.backgroundImage = "none";
                el.classList.remove("hasbitmap");
            }
        }
        kernByChar[g]?.forEach(obj => {
            let els = obj.elem.querySelectorAll(".kernch");
            for (let i = 0; i < els.length; i++) {
                if (obj.pair[i] == g) {
                    els[i].style.backgroundImage = "none";
                }
            }
        });
    }
}

function copyImageData(imagedata) {
    return new ImageData(imagedata.data, imagedata.width, imagedata.height);
}

function removeDuplicates(str) {
    let out = "";
    for (let i = 0; i < str.length; i++) {
        if (!out.includes(str[i]))
            out += str[i];
    }
    return out;
}

function setTagSelectedGlyphs(tag) { // "", "r", "y", "g" or "b"
    let allchars = tagged_all().chars;
    let selchars = [].map.call(glyphlist.querySelectorAll(".active"), el => el.dataset.ch);

    selchars.forEach(c => {
        if (tag && !groupComponents["tagged_"+tag].chars.includes(c))
            setTagSingleGlyph(c, tag);
        else if (!tag && allchars.includes(c))
            setTagSingleGlyph(c, tag);
    });
    if (tag)
        groupComponents["tagged_"+tag].chars = [...groupComponents["tagged_"+tag].chars].sort().join("");
}
function setTagSingleGlyph(g, tag) { // "", "r", "y", "g" or "b"
    let prevtag;
    glyphlist.querySelectorAll(g == "'" ? '[data-ch="\'"]' : "[data-ch='"+g+"']").forEach(el => {
        prevtag = el.dataset.tag;
        el.dataset.tag = tag;
    });
    if (tag)
        groupComponents["tagged_"+tag].chars += g;
    if (prevtag)
        groupComponents["tagged_"+prevtag].chars = groupComponents["tagged_"+prevtag].chars.replace(g,'');
}

function flipGlyphH(g) {
    if (!glyphBitmaps[g]) return;
    
    let left = getGlyphLeftEdge (currentGlyph);
    let right= getGlyphRightEdge(currentGlyph);

    tctx.putImageData(glyphBitmaps[g],0,0);

    tctx.globalCompositeOperation = "copy";
    tctx.scale(-1, 1);
    
    tctx.drawImage(tempCanvas,-left-right,0);
    
    tctx.globalCompositeOperation = "source-over";
    tctx.scale(-1, 1);

    glyphBitmaps[g] = tctx.getImageData(0,0,gwidth,gheight);
}
function flipGlyphV(g) {
    if (!glyphBitmaps[g]) return;
    
    let top = getGlyphTopEdge(currentGlyph);
    let btm = getGlyphBtmEdge(currentGlyph);

    tctx.putImageData(glyphBitmaps[g],0,0);

    tctx.globalCompositeOperation = "copy";
    tctx.scale(1, -1);
    
    tctx.drawImage(tempCanvas,0,-top-btm);
    
    tctx.globalCompositeOperation = "source-over";
    tctx.scale(1, -1);

    glyphBitmaps[g] = tctx.getImageData(0,0,gwidth,gheight);
}
function flipGlyphs(horiz = true) {
    // order the selected glyphs by appearance in the list
    let act = glyphlist.querySelectorAll(".active");
    let str = [].map.call(act, el => el.dataset.ch).join("");

    initiateUndoState(str);

    [].forEach.call(act, el => {
        if (horiz)
            flipGlyphH(el.dataset.ch);
        else
            flipGlyphV(el.dataset.ch);
        updateGlyphListBitmap(el.dataset.ch, el);
    });

    reloadCurrentGlyph();

    finaliseUndoState(str);
}
function flip(horiz) {
    if (glyphlist.querySelectorAll(".active").length > 1) {
        flipGlyphs(horiz);
    }
    else {
        if (horiz)
            flipSelectionH();
        else
            flipSelectionV();
    }
}

function deleteGlyphs() {
    // order the selected glyphs by appearance in the list
    let act = glyphlist.querySelectorAll(".active");
    let str = [].map.call(act, el => el.dataset.ch).join("");

    initiateUndoState(str);

    [].forEach.call(act, el => {
        deleteGlyph(el.dataset.ch);
        kernByChar[el.dataset.ch]?.forEach(obj => obj.updateSpacing());
    });

    reloadCurrentGlyph();

    finaliseUndoState(str);
}
function deleteGlyphsAndPairs() {
    let act = glyphlist.querySelectorAll(".active");
    let str = [].map.call(act, el => el.dataset.ch).join("");
    let pairsToDelete = [];

    [].forEach.call(act, el => {
        kernByChar[el.dataset.ch]?.forEach(pairobj => { pairsToDelete.push(pairobj.pair); });
    });
    if (pairsToDelete.length) {
        initiateKernUndoState(pairsToDelete);
        pairsToDelete.forEach(pair => { kerningPairs[pair]?.deletePair(false); });
        finaliseKernUndoState(pairsToDelete);
    }

    initiateUndoState(str);
    [].forEach.call(act, el => {
        deleteGlyph(el.dataset.ch);
    });
    finaliseUndoState(str);

    reloadCurrentGlyph();
}
function copyGlyphs() {
    // order the selected glyphs by appearance in the list
    let str = [].map.call(glyphlist.querySelectorAll(".active"), el => el.dataset.ch).join("");

    navigator.clipboard.writeText(str);
    copystr = str;
    copytype = "glyph";

    copyGlyphsFromString(str);
}
function copyGlyphsFromString(str) {
    copybitmapdata = [];
    copyadvancedata = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] in glyphBitmaps) {
            copybitmapdata.push(copyImageData(glyphBitmaps[str[i]]));
        }
        else {
            copybitmapdata.push(null);
        }

        if (str[i] in advanceWidth) {
            copyadvancedata.push(advanceWidth[str[i]]);
        }
        else {
            copyadvancedata.push(-1);
        }
    }
}
function copySelection() {
    navigator.clipboard.writeText(currentGlyph);
    copystr = currentGlyph;
    copytype = "sel";

    copyselctx.clearRect(0,0,gwidth,gheight);
    copyselctx.drawImage(selectioncanv,0,0);
}
function pasteSelection() {
    applySelection();

    let elemlist = glyphlist.querySelectorAll(".active");
    let destlen = elemlist.length;

    let undostr = [].map.call(elemlist, el => el.dataset.ch).join();
    initiateUndoState(undostr);
    
    for (let i = 0; i < destlen; i++) {
        pasteSelectionSingleGlyph(elemlist[i].dataset.ch);
    }
    reloadCurrentGlyph();
    finaliseUndoState(undostr);
    updateAdvanceWidthCSS();
    updatePreview();
}
function pasteSelectionSingleGlyph(dest) {
    if (glyphBitmaps[dest])
        tctx.putImageData(glyphBitmaps[dest], 0, 0);
    else
        tctx.clearRect(0,0,gwidth,gheight);

    tctx.drawImage(copyselcanv, 0, 0)
    glyphBitmaps[dest] = tctx.getImageData(0,0,gwidth,gheight);

    [].forEach.call(document.querySelectorAll(dest == "'" ? '[data-ch="\'"]' : "[data-ch='"+dest+"']"), el => {
        updateGlyphListBitmap(dest, el);
    });
    tryAutoAdvanceGlyph(dest);
    kernByChar[dest]?.forEach(obj => obj.updateSpacing());
}
function deleteSelection() {
    stx.clearRect(0,0,gwidth,gheight);
    drawCanvas();
    applySelection();
}
function cut() {
    if (!isTextSelected()) {
        if (selectionExists()) {
            copySelection();
            deleteSelection();
            setTool("pencil");
        }
        else {
            copyGlyphs();
            deleteGlyphs();
        }
    }
}
function doDelete() {
    if (selectionExists()) {
        deleteSelection();
        setTool("pencil");
    }
    else {
        deleteGlyphs();
    }
}

function pasteGlyphs(str = "") {
    if (!str) str = copystr;
    if (!str) return;
    applySelection();

    let elemlist = glyphlist.querySelectorAll(".active");

    let strlen = str.length;
    let destlen = elemlist.length;

    // undo string stuff
    let undostr = [].map.call(elemlist, el => el.dataset.ch).join();
    if (destlen == 1) {
        let elem = elemlist[0];
        for (let i = 0; i < strlen; i++) {
            undostr += elem.dataset.ch;
            elem = elem.nextElementSibling;
            if (!elem || !elem.classList.contains("glyph")) break;
        }
    }
    initiateUndoState(undostr);
    // end undo strig stuff
    if (str != copystr)
        copyGlyphsFromString(str);
    
    if (destlen > 1) {
        for (let i = 0; i < destlen; i++) {
            pasteSingleGlyph(copybitmapdata[i % strlen], elemlist[i].dataset.ch, copyadvancedata[i % strlen]);
        }
    }
    else if (destlen == 1) {
        let elem = elemlist[0];
        for (let i = 0; i < strlen; i++) {
            pasteSingleGlyph(copybitmapdata[i], elem.dataset.ch, copyadvancedata[i]);
            elem = elem.nextElementSibling;
            if (!elem || !elem.classList.contains("glyph")) break;
        }
    }
    reloadCurrentGlyph();
    finaliseUndoState(undostr);
    updatePreview();
}
function pasteSingleGlyph(imagedata, dest, width) {
    if (imagedata) {
        glyphBitmaps[dest] = imagedata;
        advanceWidth[dest] = Math.max(width ?? 0, 0);

        [].forEach.call(document.querySelectorAll(dest == "'" ? '[data-ch="\'"]' : "[data-ch='"+dest+"']"), el => {
            updateGlyphListBitmap(dest, el);
        });
        kernByChar[dest]?.forEach(obj => obj.updateSpacing());
    }
    else {
        deleteGlyph(dest);

        if (width > 0)
            advanceWidth[dest] = width;
    }
}
function deleteGlyph(g, reload = false) {
    delete glyphBitmaps[g];
    delete advanceWidth[g];

    [].forEach.call(document.querySelectorAll(g == "'" ? '[data-ch="\'"]' : "[data-ch='"+g+"']"), el => {
        updateGlyphListBitmap(g, el);
    });
    
    if (reload)
        reloadCurrentGlyph();
}

function isTextSelected() {
    let s = window.getSelection();
    return s.anchorOffset != s.focusOffset;
}
function copy() {
    if (!isTextSelected()) {
        if (selectionExists())
            copySelection();
        else
            copyGlyphs();
    }
}
function paste() {
    if (copytype == "glyph")
        pasteGlyphs(copystr);
    else
        pasteSelection();
}
function docPaste(e) {
    if (e.target == preview_input || e.target.tagName == "INPUT") return;

    let str = e.clipboardData.getData("text");
    if (str != copystr || copytype == "glyph")
        pasteGlyphs(str);
    else
        pasteSelection();
}
function docCut(e) {
    if (e.target == preview_input || e.target.tagName == "INPUT") return;

    cut();
}
function docCopy(e) {
    if (e.target == preview_input || e.target.tagName == "INPUT") return;

    copy();
}

function save() {
    let a = {};
    for (const k in glyphBitmaps) {
        a[k] = {};
        a[k].w = glyphBitmaps[k].width;
        a[k].h = glyphBitmaps[k].height;
        tctx.putImageData(glyphBitmaps[k],0,0);
        a[k].d = tempCanvas.toDataURL().slice(22);
    }
    let b = {};
    for (const k in kerningPairs) {
        b[k] = kerningPairs[k].value;
    }
    localStorage.setItem("tophat_prefs", JSON.stringify(prefs));
    localStorage.setItem("tophat_font", JSON.stringify({
        bmp: a,
        blk: currentGroupName,
        adv: advanceWidth,
        tr: groupComponents.tagged_r,
        ty: groupComponents.tagged_y,
        tg: groupComponents.tagged_g,
        tb: groupComponents.tagged_b,
        w: gwidth,
        h: gheight,
        set: settings,
        cur: currentGlyph,
        met: metrics,
        ker: b,
    }));
}
function load() {
    let outglyph = "";

    if (!localStorage || !localStorage.getItem("tophat_font")) {
        console.log("No font data stored");
        openNewFontModal();
    }
    else {
        let data = JSON.parse(localStorage.getItem("tophat_font"));
        let a = data.bmp;
        let b = data.ker;
        groupComponents.tagged_r = data.tr;
        groupComponents.tagged_y = data.ty;
        groupComponents.tagged_g = data.tg;
        groupComponents.tagged_b = data.tb;
        setGlyphDimensions(data.w, data.h);
        setTracking(settings.tracking);
        settings = data.set;
        currentGroupName = data.blk;
        currentGroup = groups[currentGroupName];
        currentGlyph = data.cur;
        metrics = data.met;

        outglyph = Object.keys(data.adv).join("");
        initiateUndoState(outglyph);

        advanceWidth = data.adv;
        glyphBitmaps = {};
        let bmps = Object.keys(data.bmp);
        for (let i = 0; i < bmps.length; i++) {
            let k = bmps[i];
            if (typeof a[k].d == "object") { //old format, array data
                let arr = new Uint8ClampedArray(a[k].d);
                glyphBitmaps[k] = new ImageData(arr,a[k].w,a[k].h);
            }
            else { // new format, base64 png string data
                let im = new Image();
                im.onload = function() {
                    tctx.clearRect(0,0,gwidth,gheight)
                    tctx.drawImage(im,0,0);
                    glyphBitmaps[k] = tctx.getImageData(0,0,gwidth,gheight);
                    if (i == bmps.length - 1) {
                        loadElemGroup(currentGroup.elem, false);
                        reloadCurrentGlyph();
                        updatePreview();
                    }
                }
                im.src = "data:image/png;base64," + a[k].d;
            }
        }

        kerningPairs = {};
        for (const k in b) {
            makeKerningPair(k, b[k], false);
        }
    }
    finaliseUndoState(outglyph);
    updateGuideCSS();
}

function updateAutoAdvanceBtnCSS() {
    autoadvbtn.classList.toggle("active", settings.autoadvance);
}
function updateAutoSaveBtnCSS() {
    autosavebtn.classList.toggle("active", prefs.autosave);
}
function updateSeparateTagBtnCSS() {
    separatebtn.classList.toggle("active", settings.separatetag);
}
function updateKernCurrentCSS() {
    kerncurrentbtn.classList.toggle("active", settings.kerncurrent);
}
function updateCompactView() {
    compactbtn.classList.toggle("active", settings.compactview);
    glyphlist.classList.toggle("compact", settings.compactview);
}
function tryAutoAdvance() {
    if (settings.autoadvance)
        autoUpdateAdvanceWidth();
}
function tryAutoAdvanceGlyph(g) {
    if (settings.autoadvance)
        autoUpdateAdvanceWidthGlyph(g);
}
function toggleAutoAdjust() {
    settings.autoadvance = !settings.autoadvance;
    updateAutoAdvanceBtnCSS();
    if (settings.autoadvance) {
        initiateUndoState(currentGlyph);
        tryAutoAdvance();
        finaliseUndoState(currentGlyph);
    }
}
function toggleSeparate() {
    settings.separatetag = !settings.separatetag;
    updateSeparateTagBtnCSS();
    loadElemGroup(currentGroup.elem, false);
}
function toggleCompact() {
    settings.compactview = !settings.compactview;
    updateCompactView();
}
function toggleKernCurrent() {
    settings.kerncurrent = !settings.kerncurrent;
    updateKernCurrentCSS();
    loadKernPairList();
}
function toggleAutoSave() {
    prefs.autosave = !prefs.autosave;
    updateAutoSaveBtnCSS();
    localStorage.setItem("tophat_prefs", JSON.stringify(prefs));
}

function processTextAndSetCanvasHeight(str, maxw) {
    let x = 0;
    let outstr = "";
    let linestart = 0;
    for (let i = 0, j = 0; i < str.length && j < 500; i++, j++) {
        if (str[i] == "\n") {
            outstr += str.slice(linestart, i);
            x = 0;
            linestart = i;
            continue;
        }

        if (str[i] in advanceWidth)
            x += (advanceWidth[str[i]] ?? 0) + settings.tracking;

        if (x >= maxw) {
            let idx = str.slice(linestart, i).lastIndexOf(" ") + linestart;

            if (idx <= linestart) {
                outstr += str.slice(linestart, i) + "\n";
                x = (advanceWidth[str[i]] ?? 0) + settings.tracking;
                linestart = i;
            } else {
                idx++;
                outstr += str.slice(linestart, idx) + "\n";
                linestart = idx;
                x = 0;
                i = idx - 1;
            }
        }
    }
    outstr += str.slice(linestart);

    preview_image.height = Math.max(outstr.split('\n').length * (gheight+settings.leading), Math.floor((gheight+settings.leading) * 5.5));
    return outstr;
}

function drawText(str) {
    let x = 0, y = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == "\n") {
            x = 0;
            y += gheight + settings.leading;
            continue;
        }

        if (str[i] in glyphBitmaps) {
            if (x != 0) {
                let pair = str[i - 1] + str[i];
                x += kerningPairs[pair]?.value ?? 0;
            }

            tctx.putImageData(glyphBitmaps[str[i]], 0, 0);
            pctx.drawImage(tempCanvas, x, y);

        }
        if (str[i] in advanceWidth)
            x += (advanceWidth[str[i]] ?? 0) + settings.tracking;
    }
}

function updatePreview() {
    let maxw = 400 / settings.scale;

    preview_image.width = maxw;
    let str = processTextAndSetCanvasHeight(settings.previewtext, maxw);
    drawText(str);
}
function selectPrevGlyph(e) {
    if (e.target == preview_input || e.target.tagName == "INPUT") return;
    
    let elem;
    if (glyphlist.querySelector(".active")) {
        elem = activeGlyphElem.previousElementSibling;
        while (elem && !elem.classList.contains("glyph")) {
            elem = elem.previousElementSibling;
        }
    }
    elem ??= glyphlist.lastElementChild;

    loadGlyph(elem.dataset.ch, elem, true);
}
function selectNextGlyph(e) {
    if (e.target == preview_input || e.target.tagName == "INPUT") return;

    let elem;
    if (glyphlist.querySelector(".active")) {
        elem = activeGlyphElem.nextElementSibling;
    }
    elem ??= glyphlist.firstElementChild;
    while (elem && !elem.classList.contains("glyph")) {
        elem = elem.nextElementSibling;
    }

    while (!elem.classList.contains("glyph")) {
        elem = elem.nextElementSibling;
    }

    loadGlyph(elem.dataset.ch, elem, true);
}

function tryAutosave() {
    if (prefs.autosave)
        save();
}

function init() {
    tempCanvas    = document.createElement("canvas");
    selectioncanv = document.createElement("canvas");
    copyselcanv   = document.createElement("canvas");
    copyselctx    = copyselcanv.getContext("2d");
    tctx =    tempCanvas.getContext("2d");
     stx = selectioncanv.getContext("2d");
    pctx = preview_image.getContext("2d");
     ctx =     glyphcanv.getContext("2d");
    preview_image.width = 400;
    preview_image.height = 100;

    setGlyphDimensions(gwidth,gheight);
    updateBlockList(true);

    load();

    if (localStorage.getItem("tophat_prefs")) {
        prefs = JSON.parse(localStorage.getItem("tophat_prefs"));
    }

    switch (language) {
        case "fr": currentGroupName ??= "frlanguage"; break;
        default:   currentGroupName ??= "enlanguage"; break;
    }
    let sel = "[data-group='" + currentGroupName + "']";

    let el = blocklist.querySelector(sel);
    loadElemGroup(el, false, false);

    let temp = glyphlist.querySelector("[data-ch='"+currentGlyph+"']") ?? glyphlist.querySelector(".glyph");
    currentGlyph = temp.dataset.ch;
    loadGlyph(currentGlyph, temp);

    glyphcanv.oncontextmenu = e => e.preventDefault();
    glyphcanv.onmousedown = canvMouseDown;
    glyphcanv.onmousemove = canvMouseMove;
    glyphlist.onmousedown = glyphMouseDown;
    glyphlist.onmousemove = glyphMouseDrag;
    adv_width_slider.onmousedown = sliderMouseDown;
    adv_width_bar   .onmousedown = sliderMouseDown;

    document.body.onmousemove  = docMouseMove;
    document.body.onmouseup    = docMouseUp;
    document.body.onmouseleave = docMouseUp;
    document.oncopy  = docCopy;
    document.onpaste = docPaste;
    document.oncut   = docCut;

    fntpick.onchange = fntInput;
    ttfpick.onchange = fntInput;

    document.onkeydown = e => {
        if (e.target == preview_input || e.target.tagName == "INPUT") return;

        switch (e.code) {
            case "KeyZ":
                if (e.ctrlKey || e.metaKey) {
                    if (e.shiftKey)
                        redo();
                    else
                        undo();
                }
                break;
            case "KeyY":
                if (e.ctrlKey || e.metaKey) {
                    redo();
                }
                break;
            case "ArrowUp":
                if (selectionExists()) {
                    seldY--;
                    updateSelectionCSS();
                    drawCanvas();
                }
                break;
            case "ArrowDown":
                if (selectionExists()) {
                    seldY++;
                    updateSelectionCSS();
                    drawCanvas();
                }
                break;
            case "ArrowLeft":
                if (selectionExists()) {
                    seldX--;
                    updateSelectionCSS();
                    drawCanvas();
                } else {
                    selectPrevGlyph(e);
                }
                break;
            case "ArrowRight":
                if (selectionExists()) {
                    seldX++;
                    updateSelectionCSS();
                    drawCanvas();
                } else {
                    selectNextGlyph(e);
                }
                break;
            case "Enter":
                applySelection();
                break;
            case "Delete":
                doDelete();
                break;
            case "Digit1": setTool("pencil");  break;
            case "Digit2": setTool("milk");    break;
            case "Digit3": setTool("syringe"); break;
            case "Digit4": setTool("select");  break;
            case "Digit5": setTool("move");    break;
            default:
                //console.log(e.code);
        }
    };
    kern_add_input.onkeydown = e => {
        if (e.code == "Enter") {
            makeKerningPair(kern_add_input.value);
        }
    };

    setInterval(tryAutosave, 300000);

    kern_find_input.value = "";
    updateAutoAdvanceBtnCSS();
    updateAutoSaveBtnCSS();
    updateSeparateTagBtnCSS();
    updateKernCurrentCSS();
    updateCompactView();
    updatePreview();
    setScale(settings.scale);
    setTracking(settings.tracking);
    setLeading(settings.leading);
    preview_input.value = settings.previewtext;
    setTool('pencil');
}
function isOutlineFont(file) {
    return /^font\/(otf|ttf|woff2?)$/.test(file?.type) || /\.(otf|ttf|woff2?)$/.test(file?.name);
}
function dropHandler(e) {
    e.preventDefault();
    if (!e.dataTransfer.items) return;

    handleFiles([].map.call(e.dataTransfer.items, it => it.getAsFile()));
}
function fntInput() {
    if (!this.files || !this.files[0]) return;
    handleFiles(this.files);
}

function handleFiles(files) {
    let ttf = [].find.call(files, file => isOutlineFont(file));
    let fnt = [].find.call(files, file => /\.fnt$/.test(file?.name));
    let png = [].find.call(files, file => file?.type == "image/png");
    
    if (ttf) {
        tryReadFile(ttf);
    } else {
        let obj = {imgdata: null, w: null, h: null};
        if (png && fnt) {
            let filename = png.name;
            const reader = new FileReader();

            reader.onload = () => {
                obj.imgdata = reader.result;
                
                let regex = /-table-(\d+)-(\d+)\.png/;
                if (regex.test(filename)) {
                    let arr = filename.match(regex);
                    obj.w = arr[1] * 1;
                    obj.h = arr[2] * 1;

                    tryReadFile(fnt,obj);
                } else {
                    impnotsupp.innerText = "The uploaded .png has an invalid file name. Needs to be FONTNAME-table-GLYPHWIDTH-GLYPHHEIGHT.png";
                    impnotsupp.classList.remove("hidden");
                }
            };

            reader.readAsDataURL(png);
        }
        if (fnt) {
            tryReadFile(fnt,obj);
        }
    }
}
let globalfontidx = -1;
let uploadedFontName = "";
let charsInUploadedFont = "";
function tryReadFile(file, obj) {
    if (!file) return;

    impnotsupp.classList.add("hidden");
    if (isOutlineFont(file)) {
        file.arrayBuffer().then(res => {
            try {
                let font = opentype.parse(res);
                if (!font.supported) throw "Uploaded file is a font but is not supported";

                globalfontidx++;
                // get which characters are in font
                for (const key in font.glyphs.glyphs) {
                    let uni = font.glyphs.glyphs[key].unicode;
                    if (key > 0 && uni && uni >= 0x20 && !(uni >= 0x7F && uni < 0xA0)) {
                        let bbox = font.glyphs.glyphs[key].getPath(0,0,20).getBoundingBox();
                        if (bbox.x2 < 0) continue;
                        let char = String.fromCodePoint(uni);
                        charsInUploadedFont += char;
                        if (!importfontmodal_char.value) {
                            switch (char) {
                                case "A":
                                case "А":
                                case "Α":
                                case "あ":
                                case "字":
                                    importfontmodal_char.value = char; break;
                                default: break;
                            }
                        }
                    }
                }

                const reader = new FileReader();

                reader.onload = () => {
                    let fface = new FontFace("TopHatOutlineFnt"+globalfontidx, "url(" + reader.result + ")");
                    document.fonts.add(fface);
                    fface.load().then(() => {
                        importOutlineFont();
                        uploadedFontName = file.name.replace(/\.(otf|ttf|woff2?)$/, "");
                    }).catch(() => {
                        console.log("ERROR PINEAPPLE (error during FontFace loading)");
                    });
                };

                reader.readAsDataURL(file);
            } catch (e) {
                console.log(e);
                impnotsupp.innerText = "The uploaded font is not supported.";
                impnotsupp.classList.remove("hidden");
            }
        });
    } else {
        file.text().then(res => {
            importFnt(res, file.name.replace(/\.fnt$/, ""), obj);
        })
    }
}
function importOutlineFont() {
    openImportFontModal();

    alphathresh.value = 127;
    importfontmodal_size.value = 20;
    previewFont(20);
}
let currentUploadedFont;
let uploadedFontW;
let uploadedFontH;
let uploadedFontB;

function updateImportFontPreview() {
    if (importfontmodal_size.value * 1)
        previewFont(importfontmodal_size.value * 1);
}
function previewFont(size) {
    let maxascent  = 0;
    let maxdescent = 0;
    let maxadvance = 0;

    currentUploadedFont = size+"pt TopHatOutlineFnt"+globalfontidx;
    tctx.font = currentUploadedFont;

    for (let i = 0; i < charsInUploadedFont.length; i++) {
        let bbox = tctx.measureText(charsInUploadedFont[i]);

        if (bbox.actualBoundingBoxAscent  > maxascent)  maxascent  = bbox.actualBoundingBoxAscent;
        if (bbox.actualBoundingBoxDescent > maxdescent) maxdescent = bbox.actualBoundingBoxDescent;
        if (bbox.width > maxadvance) maxadvance = bbox.width;
    }

    uploadedFontB = maxascent;
    uploadedFontH = maxascent + maxdescent;
    uploadedFontW = Math.ceil(maxadvance);
    
    prevcanvA.width  = uploadedFontW;
    prevcanvA.height = uploadedFontH;
    prevcanvB.width  = uploadedFontW;
    prevcanvB.height = uploadedFontH;
    importfont_cont.style.setProperty("--glyphwidth",  uploadedFontW);
    importfont_cont.style.setProperty("--glyphheight", uploadedFontH);
    updateUploadedFontPreview();
}
function updateUploadedFontPreview() {
    let ax = prevcanvA.getContext("2d");
    let bx = prevcanvB.getContext("2d");
    ax.clearRect(0,0,uploadedFontW,uploadedFontH);
    bx.clearRect(0,0,uploadedFontW,uploadedFontH);
    if (!charsInUploadedFont.includes(importfontmodal_char.value)) return;
    
    ax.font = currentUploadedFont;
    ax.fillText(importfontmodal_char.value,0,uploadedFontB);

    //currentUploadedFont.draw(ax, importfontmodal_char.value, 0, uploadedFontB, importfontmodal_size.value * 1, {hinting:true});
    let id = ax.getImageData(0,0,uploadedFontW,uploadedFontH);
    bitifyImageData(id, 255 - alphathresh.value);
    bx.putImageData(id,0,0);
}
function bitifyImageData(id, thresh = 128) {
    let inv = fontimportinvert.checked;
    for (let i = 0; i < id.data.length; i += 4) {
        if (id.data[i+3] < thresh) { // make transparent
            id.data[i+0] = 0;
            id.data[i+1] = 0;
            id.data[i+2] = 0;
            id.data[i+3] = 0;
        } else {
            if (0.2126*id.data[i+0] + 0.7152*id.data[i+1] + 0.0722*id.data[i+2] < 128) { // black
                id.data[i+0] = inv ? 255 : 0;
                id.data[i+1] = inv ? 255 : 0;
                id.data[i+2] = inv ? 255 : 0;
            } else {
                id.data[i+0] = inv ? 0 : 255;
                id.data[i+1] = inv ? 0 : 255;
                id.data[i+2] = inv ? 0 : 255;
            }
            id.data[i+3] = 255;
        }
    }
}
function importUploadedFont() {
    importfontmodal.classList.add("hidden");
    newFont(uploadedFontName, uploadedFontW, uploadedFontH, 0, uploadedFontB);

    tctx.font = currentUploadedFont;
    for (let i = 0; i < charsInUploadedFont.length; i++) {
        let char = charsInUploadedFont[i];
        let bbox = tctx.measureText(char);

        let adv = Math.round(bbox.width);
        tctx.clearRect(0,0,gwidth,gheight);
        tctx.fillText(char,0,uploadedFontB);
        let id = tctx.getImageData(0,0,gwidth,gheight);
        bitifyImageData(id, 255 - alphathresh.value);
        glyphBitmaps[char] = id;
        advanceWidth[char] = adv;
    }

    loadElemGroup(currentGroup.elem);
    loadKernPairList();
    updatePreview();
    closeModal();
}

function importFnt(str,fn, obj) {
    // does not deal with importing bitmap!
    let data = str.split("\n").filter(str => str);
    
    metrics.baseline  = -1;
    metrics.xHeight   = -1;
    metrics.capHeight = -1;

    settings.fontname = fn;

    glyphBitmaps = {};
    advanceWidth = {};
    kerningPairs = {};
    kernByChar   = {};

    currentUndoIdx = -1;
    firstUndoItemIdx = 0;
    undoItemCount = 0;
    undos = {};
    
    let w = obj.w;
    let h = obj.h;
    let tr = 1;
    let charorder = [];
    let imgdata = obj.imgdata;
    let kerningPairCount = 0;

    for (let i = 0; i < data.length; i++) {
        let eqidx = data[i].indexOf("=");
        let wsidx = data[i].indexOf("\t");

        let keyEq = eqidx == -1 ? "" : data[i].slice(0, eqidx);
        let keyWs = data[i].slice(0, wsidx); // separate slice needed in case of " =" kern pair

        let afterEq = data[i].slice(eqidx+1);
        let afterWs = data[i].slice(wsidx+1);

        switch (keyEq) {
            case "--metrics":
                let obj = JSON.parse(afterEq);
                metrics.baseline  = obj.baseline  ?? -1;
                metrics.xHeight   = obj.xHeight   ?? -1;
                metrics.capHeight = obj.capHeight ?? -1;
                break;
            case "datalen":
                break;
            case "data":
                imgdata = "data:image/png;base64,"+afterEq;
                break;
            case "width":  w = afterEq * 1; break;
            case "height": h = afterEq * 1; break;
            case "tracking": tr = afterEq * 1; break;
            default:
                let real = keyWs.replace(/space/g, " ");
                if (real.length == 1) {
                    charorder.push({ ch: real, adv: afterWs * 1 || 0 });
                } else if (real.length == 2) {
                    makeKerningPair(real, afterWs * 1 || 0, false);
                    kerningPairCount++;
                }
            break;
        }
    }
    if (kerningPairCount > 32) settings.kerncurrent = true;
    loadKernPairList();
    updateKernCurrentCSS();

    let img = new Image();
    img.onload = () => {
        let can = document.createElement("canvas");
        let cx = can.getContext("2d");

        can.width  = img.width;
        can.height = img.height;
        cx.drawImage(img,0,0);

        // if previously unset
        w ||= Math.floor(img.width  / 16);
        let charsPerRow = img.width / w;
        h ||= Math.floor(img.height / Math.ceil(charorder.length / charsPerRow));

        setGlyphDimensions(w,h);
        setTracking(tr);
        
        for (let i = 0; i < charorder.length; i++) {
            glyphBitmaps[charorder[i].ch] = cx.getImageData((i % charsPerRow) * w, Math.floor(i / charsPerRow) * h, w, h);
            advanceWidth[charorder[i].ch] = charorder[i].adv;
            updateGlyphListBitmap(charorder[i].ch);
        }

        loadElemGroup(currentGroup.elem);
        closeModal();
        reloadCurrentGlyph();
        updateGuideCSS();
        updatePreview();
    };
    img.src = imgdata;
}

function getExportData() {
    let chars = all_glyphs().chars;
    let pairlist = Object.keys(kerningPairs).sort();

    let outstr = getExportMetrics();
    outstr += "\ndatalen=";
    let imgb64 = getExportCanvasData(chars);
    outstr += imgb64.length;
    outstr += "\ndata=";
    outstr += imgb64;
    outstr += "\nwidth=" +gwidth;
    outstr += "\nheight="+gheight;
    outstr += "\n\ntracking="+settings.tracking;
    outstr += "\n";

    for (let i = 0; i < chars.length; i++) {
        outstr += "\n" + chars[i].replace(" ","space") + "\t" + advanceWidth[chars[i]];
    }
    outstr += "\n";

    // TODOOOOOO: CHECK HOW PLAYDATE CAPS AND THE SDK DEAL WITH KERNING PAIRS CONTAINING A SPACE
    for (let i = 0; i < pairlist.length; i++) {
        if (/\s/.test(pairlist[i][1]) && pairlist[i][1] != " ") continue;
        // ^ for now: skip kerning pairs ending in non-space whitespace
        //            as the compiler hates this

        if (kerningPairs[pairlist[i]].value)
            outstr += "\n" + pairlist[i][0] + pairlist[i][1] + "\t" + kerningPairs[pairlist[i]].value;
    }

    return outstr;

}

const glyphsPerRow = 10;

function getExportCanvasData(chars) {
    let outputCanvas = document.createElement("canvas");
    outctx = outputCanvas.getContext("2d");

    outputCanvas.width  = gwidth  * glyphsPerRow;
    outputCanvas.height = gheight * Math.ceil(chars.length / glyphsPerRow);

    for (let i = 0; i < chars.length; i++) {
        if (chars[i] in glyphBitmaps) {
            outctx.putImageData(glyphBitmaps[chars[i]], (i % glyphsPerRow) * gwidth, Math.floor(i / glyphsPerRow) * gheight);
        }
    }
    return outputCanvas.toDataURL().slice(22);
}

function getExportMetrics() {
    let met = { "baseline":metrics.baseline, "xHeight":metrics.xHeight, "capHeight":metrics.capHeight };

    return "--metrics=" + JSON.stringify(met);
}

function download() {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(getExportData()));
    let fontname = settings.fontname || getLocalisedString("untitled");
    element.setAttribute('download', fontname.replace(/\s/g, "-")+".fnt");
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function tryOpenNewFontModal(e) {
    e.preventDefault();
    if (newfontmodal.classList.contains("hidden"))
        openNewFontModal();
}
function openNewFontModal() {
    docMouseUp();
    applySelection();

    newfontmodal_namein.value = "";
    newfontmodal_w_in.value = gwidth;
    newfontmodal_h_in.value = gheight;

    modal_cont.classList.remove("hidden");
    newfontmodal.classList.remove("hidden");
    importfontmodal.classList.add("hidden");
    resizemodal.classList.add("hidden");
}
function openImportFontModal() {
    docMouseUp();
    applySelection();

    modal_cont.classList.remove("hidden");
    importfontmodal.classList.remove("hidden");
    newfontmodal.classList.add("hidden");
    resizemodal.classList.add("hidden");
}
let fontResize = { n: 0, e: 0, s: 0, w: 0 };

function fontResizeIncr(direction) {
    fontResize[direction]++;
    updateResizePreview();
}
function fontResizeDecr(direction) {
    fontResize[direction]--;
    if (gwidth + fontResize.e + fontResize.w <= 0 || gheight + fontResize.n + fontResize.s <= 0)
        fontResize[direction]++;
    else
        updateResizePreview();
}

function openResizeModal() {
    docMouseUp();
    applySelection();

    fontResize = { n: 0, e: 0, s: 0, w: 0 };
    resizefontmodal_char.value = currentGlyph;
    updateResizePreview();

    modal_cont.classList.remove("hidden");
    importfontmodal.classList.add("hidden");
    newfontmodal.classList.add("hidden");
    resizemodal.classList.remove("hidden");
}
function updateResizePreview() {
    let cx = prevcanvR.getContext("2d");
    
    prevcanvR.width  = gwidth  + Math.max(fontResize.e,0) + Math.max(fontResize.w,0);
    prevcanvR.height = gheight + Math.max(fontResize.n,0) + Math.max(fontResize.s,0);

    cx.globalCompositeOperation = "source-over";
    cx.globalAlpha = 1;
    cx.fillStyle = "#80bd6f";
    cx.fillRect(0,0,prevcanvR.width,prevcanvR.height);

    cx.clearRect(Math.max(fontResize.w,0),Math.max(fontResize.n,0),gwidth,gheight);

    cx.fillStyle = "#bd6f6f";
    if (fontResize.n < 0) { cx.fillRect(0,0,prevcanvR.width,-fontResize.n); }
    if (fontResize.e < 0) { cx.fillRect(prevcanvR.width+fontResize.e,0,-fontResize.e,prevcanvR.height); }
    if (fontResize.s < 0) { cx.fillRect(0,prevcanvR.height+fontResize.s,prevcanvR.width,-fontResize.s); }
    if (fontResize.w < 0) { cx.fillRect(0,0,-fontResize.w,prevcanvR.height); }


    cx.globalAlpha = 0.4;
    cx.globalCompositeOperation = "copy";
    cx.drawImage(prevcanvR,0,0);
    
    cx.globalAlpha = 1;
    cx.globalCompositeOperation = "destination-over";
    
    let bmp = glyphBitmaps[resizefontmodal_char.value];
    if (bmp) {
        tctx.putImageData(bmp, 0, 0);
        cx.drawImage(tempCanvas,Math.max(fontResize.w,0), Math.max(fontResize.n,0));
    }
}
function resizeFont() {
    setGlyphDimensions(gwidth + fontResize.e + fontResize.w, gheight + fontResize.n + fontResize.s);

    if (fontResize.w) {
        for (const k in advanceWidth) {
            advanceWidth[k] = Math.min(gwidth, advanceWidth[k] + fontResize.w);
        }
    }
    for (const k in glyphBitmaps) {
        tctx.putImageData(glyphBitmaps[k], fontResize.w, fontResize.n);
        glyphBitmaps[k] = tctx.getImageData(0,0,gwidth, gheight);
        updateGlyphListBitmap(k);
    }
    if (fontResize.n) {
        for (const k in metrics) {
            if (metrics[k] != -1)
                metrics[k] = Math.max(metrics[k] + fontResize.n, -1);
        }
    }
    for (const k in kerningPairs) {
        kerningPairs[k].updateSpacing();
    }

    loadElemGroup(currentGroup.elem);

    closeModal();
    updateGuideCSS();
    updatePreview();
    reloadCurrentGlyph();
}

function closeModal() {
    modal_cont.classList.add("hidden");
    newfontmodal.classList.add("hidden");
    importfontmodal.classList.add("hidden");
    resizemodal.classList.add("hidden");
}
function newFont(name,w,h,tr = 1,bl = -1) {
    if (w * h <= 1) return;
    metrics.baseline  = bl;
    metrics.xHeight   = -1;
    metrics.capHeight = -1;
    updateGuideCSS();

    setTracking(tr);
    settings.fontname = name;

    glyphBitmaps = {};
    advanceWidth = {};
    kerningPairs = {};
    kernByChar   = {};
    setGlyphDimensions(w,h);

    currentUndoIdx = -1;
    firstUndoItemIdx = 0;
    undoItemCount = 0;
    undos = {};
    loadElemGroup(currentGroup.elem);
    loadKernPairList();
    closeModal();
}
function setScale(s) {
    document.documentElement.style.setProperty("--scalepx", s+"px");
    scale1btn.classList.toggle("active", s == 1);
    scale2btn.classList.toggle("active", s == 2);
    settings.scale = s;
    updatePreview();
}
function setColour(r,g,b,a, mouseUp = true) {
    if (mouseUp)
        docMouseUp();
    
    [].forEach.call(toollist.querySelectorAll(".active.colourbtn"), e => e.classList.remove("active"));

    if (!a)
        cbtnt.classList.add("active");
    else if (r == 255 && g == 255 && b == 255)
        cbtnw.classList.add("active");
    else if (r + g + b == 0)
        cbtnb.classList.add("active");

    currentColour[0] = r;
    currentColour[1] = g;
    currentColour[2] = b;
    currentColour[3] = a;
}