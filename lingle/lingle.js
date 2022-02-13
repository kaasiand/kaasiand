let mwlen;
let refuseInput = true;
let keyb = {};
let notifIdx = -1;
let sessiondate, sessionmonth, sessionseed;
let typwoordLast = "", typwoord = "";

let gamedata = {};

function copyresults() {
    let nr = (sessionseed - Date.UTC(2022,0,-29)) / 86400000;
    let str = `Lingle ${nr + (nr % 100 == 69? " (nice)" : "")} ${gamedata.voltooid ? gamedata.regel + 1 : 'X'}/6\n`;
    if (true)
        str += "https://kaasiand.cool/lingle/\n";

    let trs = document.querySelectorAll("#speelveld tr");

    for (let i = 0; i < gamedata.veld.length; i++) {
        if (!gamedata.veld[i]) {
            break;
        }
        str += "\n";
        let res = checkWoord(gamedata.veld[i]);

        res.forEach(r => {
            if (r == "rood")
                str += "🟧";
            else if (r == "geel")
                str += "🟡";
            else
                str += "🟦";
        });

        if (str.endsWith("🟧🟧🟧🟧🟧")) break;
    }

    navigator.clipboard.writeText(str).then(() => {
        console.log("navigator.clipboard.writeText success");
        document.querySelector(".sharebtn").innerHTML = "Gekopieerd!";
    }, () => {
        console.log("navigator.clipboard.writeText failure!");

        var textArea = document.createElement("textarea");
        textArea.value = str;
        textArea.style.top = "0";
        textArea.style.right = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = 0;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            console.log('document.execCommand copy success');
            document.querySelector(".sharebtn").innerHTML = "Gekopieerd!";
        } catch (e) {
            console.log('document.execCommand copy failure!');
        }
        document.body.removeChild(textArea);
    });
}

function save() {
    localStorage.setItem("data", JSON.stringify(gamedata));
}
function tryRetrieveData() {
    if (!localStorage || !localStorage.getItem("data")) {
        makeFirstGameData();
        showHelp();
    }
    else {
        gamedata = JSON.parse(localStorage.getItem("data"));

        if (gamedata.datum != sessionseed) {
            makeGameDataNewDay();
        }
    }
    save();
}

function toggleHelpScreen() {
    if (helpscreen.classList.contains('hidden'))
        showHelp();
    else
        hideHelp();
    helpbtn.blur();
}
function hideHelp() {
    helpscreen.classList.add('hidden');
}
function showHelp() {
    if (!settscreen.classList.contains('hidden'))
        hideSett();
    helpscreen.classList.remove('hidden');
}

function promptResetData() {
    if (window.confirm("Weet je zeker dat je alle opgeslagen gegevens (statistieken, voortgang en voorkeuren) wil wissen?")) {
        resetData();
        location.reload();
    }
}

function toggleSettScreen() {
    if (settscreen.classList.contains('hidden'))
        showSett();
    else
        hideSett();
    settbtn.blur();
}
function hideSett() {
    settscreen.classList.add('hidden');
}
function showSett() {
    if (!helpscreen.classList.contains('hidden'))
        hideHelp();
    settscreen.classList.remove('hidden');
}
function abc() {
    btnthemadark.classList.toggle("test");
}

function uncheckAll(el) {
    [...el.querySelectorAll('button[role="radio"')].forEach(e => e.setAttribute("aria-checked", "false"));
}
function initSett() {
    // update IJ dinges
    document.getElementById(gamedata.vervangĲ    ? "vervangĳbtn"    : "vervangĳnietbtn").setAttribute("aria-checked", "true");
    document.getElementById(gamedata.blur        ? "blurbtn"        : "blurnietbtn"    ).setAttribute("aria-checked", "true");
    document.getElementById(gamedata.donkerblauw ? "donkerblauwbtn" : "gewoonblauwbtn" ).setAttribute("aria-checked", "true");
    document.getElementById(gamedata.reduceanim  ? "reduceanimbtn"  : "noreduceanimbtn").setAttribute("aria-checked", "true");
    document.getElementById(gamedata.transp      ? "transpbtn"      : "opaquebtn"      ).setAttribute("aria-checked", "true");

    let dosave = false;
    let el = document.getElementById("btnthema" + gamedata.thema);
    if (!el) {
        el = document.getElementById("btnthemadark");
        gamedata.thema = "dark";
        dosave = true;
    }
    el.setAttribute("aria-checked", "true");

    let el2 = document.getElementById("btnstyle" + gamedata.stĳl);
    if (!el2) {
        el2 = document.getElementById("btnstyle00s");
        gamedata.stĳl = "00s";
        dosave = true;
    }
    el2.setAttribute("aria-checked", "true");

    // save if theme/style data fucked up
    if (dosave) save();

    setTheme();
    setStyleInit();
    setBlur();
    setDonkerblauw();
    setReducedAnimation();
    setOpaque();
}
function setTheme()             { document.documentElement.dataset.theme       = gamedata.thema; }
function setStyleInit()         { document.documentElement.dataset.style       = gamedata.stĳl; }
function setBlur()              { document.documentElement.dataset.blur        = gamedata.blur; }
function setReducedAnimation()  { document.documentElement.dataset.redanim     = gamedata.reduceanim; }
function setOpaque()            { document.documentElement.dataset.opaque      =!gamedata.transp; }
function setDonkerblauw()       {
    document.documentElement.dataset.donkerblauw = gamedata.donkerblauw;
    updateExamplePicture();
}
function setStyle() {
    // to avoid weird graphical stuff when switching styles
    let orig = gamedata.reduceanim;
    document.documentElement.dataset.redanim = "true";

    document.documentElement.dataset.style = gamedata.stĳl;
    updateExamplePicture();

    setTimeout(() => {
        document.documentElement.dataset.redanim = orig;
    }, 50);
}


function updateExamplePicture() {
    let filename = "example.png";
    switch (gamedata.stĳl) {
        case "90s":
            filename = gamedata.donkerblauw ? "example90sdark.png" : "example90s.png";
            break;
        case "00s": default:
            filename = gamedata.donkerblauw ? "exampledark.png" : "example.png";
            break;
    }
    examplepic.src = filename;
}

function resetData() {
    localStorage.removeItem("data");
}
function makeGameDataNewDay() {
    gamedata.datum = sessionseed;
    gamedata.voltooid = false;
    gamedata.veld = ["","","","","",""];
    gamedata.regel = 0;

    if (!("reduceanim" in gamedata)) {
        let matchmedia = window.matchMedia("(prefers-reduced-motion: reduce)");

        if (!matchmedia || matchmedia.matches) {
            gamedata.reduceanim = true;
        } else {
            gamedata.reduceanim = false;
        }
    }
    if (!("donkerblauw" in gamedata)) {
        gamedata.donkerblauw = false;
    }
    if (!("blur" in gamedata)) {
        gamedata.blur = true;
    }
    if (!("transp" in gamedata)) {
        gamedata.transp = true;
    }
}
function makeFirstGameData() {
    let redanim = false;
    let matchmedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!matchmedia || matchmedia.matches) {
        redanim = true;
    }

    gamedata = {

        // today's

        datum: sessionseed,
        voltooid: false,
        veld: ["","","","","",""],
        regel: 0,

        // stats

        verdeling: [0,0,0,0,0,0,0],
        gespeeld: 0,
        streak: 0,
        maxstreak: 0,
        wins: 0,

        // settings / preferences

        thema: "dark",
        stĳl: "00s",
        vervangĲ: true,
        reduceanim: redanim,
        donkerblauw: false,
        blur: true,
        transp: true,
    };
}

function newNotif(txt, dur = 3000) {
    notifIdx++;
    notifbox.style.opacity = 1;
    notiftext.innerHTML = txt;
    let a = notifIdx;
    setTimeout(() => {
        if (a == notifIdx)
            notifbox.style.opacity = 0;
    }, dur);
}
function closeNotif() {
    notifbox.style.opacity = 0;
    notifbox.querySelector("button").blur();
}

function doaflip() {
    [...document.querySelectorAll(".btmwrap")].forEach(e => e.classList.add("flip"));
}

function getIdx(seed) {
    return ((((214013 * seed + 2531011) % 2147483648) >> 16) % 32768) % mwlen;
}

function handleWin() {
    gamedata.voltooid = true;
    doaflip();
    console.log("win");

    gamedata.gespeeld++;
    gamedata.streak++;
    gamedata.verdeling[gamedata.regel]++;
    gamedata.wins++;
    if (gamedata.streak > gamedata.maxstreak) gamedata.maxstreak = gamedata.streak;
    save();
}

function checkWoord(poging) {
    let wrd = [...mogelĳkewoorden[getIdx(gamedata.datum)]];
    let result = Array(maxlen).fill("");

    // pass 1: rood
    for (let i = 0; i < maxlen; i++) {
        if (wrd[i] == poging[i]) {
            result[i] = "rood";
            wrd[i] = "";
        }
    }
    // pass 2: geel
    for (let i = 0; i < maxlen; i++) {
        if (result[i]) continue; //skip if rode letter
        let a = wrd.indexOf(poging[i])
        if (a != -1) {
            result[i] = "geel";
            wrd[a] = "";
        }
    }
    return result;
}

function tryEnter() {
    if (refuseInput)
        return;

    if (typwoord.length < maxlen) {
        if (typwoord.length)
            newNotif("Dit woord is te kort.", 3000);
        return;
    }

    let animFactor = gamedata.reduceanim ? 0 : 1;
    let firstletter = typwoord[0];
    if (allewoorden[firstletter].includes(typwoord)) {
        refuseInput = true;
        gamedata.veld[gamedata.regel] = typwoord;
        let res = checkWoord(typwoord);

        let c = document.querySelector("#speelveld tbody").children[gamedata.regel].children;

        for (let i = 0; i < maxlen; i++) {
            setTimeout(() => {
                c[i].dataset.bg = res[i];
                if (res[i] == "rood") {
                    keyb[typwoord[i]].dataset.bg = "rood";
                } else if (res[i] == "geel") {
                    if (keyb[typwoord[i]].dataset.bg == "")
                        keyb[typwoord[i]].dataset.bg = "geel";
                } else {
                    if (keyb[typwoord[i]].dataset.bg == "")
                        keyb[typwoord[i]].dataset.bg = "zwart";
                }
            }, (250 * i + 100) * animFactor);
        }

        if (res.every(a => a == "rood")) {
            // if win
            if (gamedata.reduceanim) {
                handleWin();
            }
            else {
                setTimeout(() => {
                    document.querySelectorAll("#speelveld tr")[gamedata.regel].classList.add("winanim");
                    setTimeout(() => {
                        handleWin();
                    }, 1200);
                }, 250 * maxlen + 100);
            }
        }
        else {
            if (gamedata.regel == 5) { /* handle loss

                |  ||

                |  |_
            */  
                gamedata.streak = 0;
                gamedata.gespeeld++;
                gamedata.verdeling[6]++;
                revealOplossing();

            } else {
                setTimeout(() => {
                    gamedata.regel++;
                    revealDots(gamedata.regel);
                }, (250 * maxlen + 100) * animFactor);
            }
        }
        save();
    }
    else {
        if (typwoord.includes("ij"))
            newNotif(`&quot;${typwoord}&quot; is geen geldig vijfletterwoord. Vergeet niet dat de IJ als één letter moet!`, 3000);
        else
            newNotif(`&quot;${typwoord}&quot; is geen geldig woord.`, 3000);
    }
}

function revealOplossing(fast = false) {
    let animFactor = gamedata.reduceanim ? 0 : 1;

    let wrd = mogelĳkewoorden[getIdx(gamedata.datum)];
    let faster = fast ? 1200 : 0;

    setTimeout(() => {
        speelveld.classList.add("revealantwoord");
    }, (250 * maxlen + 100 - faster) * animFactor);

    if (gamedata.stĳl == "90s") faster -= 1000;

    [...document.querySelectorAll("#speelveld tr")[6].children].forEach((el,m) => {
        setTimeout(() => {
            let ltr = wrd[m];
            if (wrd[m] == "ĳ") ltr = "ij";
            el.style.setProperty("--letter",`'${ltr}'`);
            el.querySelector(".letter").style.opacity = 1;
        }, (250 * maxlen + 250 * m + 800 - faster) * animFactor);
    });
    setTimeout(() => {
        doaflip();
    }, (500 * maxlen + 1000 - faster * 1.2) * animFactor);
}

function doBackspace() {
    if (refuseInput)
        return;
    typwoord = typwoord.slice(0, typwoord.length - 1);
    updateWoord();
}

function typLetter(ltr, echttoetsenbord = false) {
    if (refuseInput)
        return;
    if (typwoord[typwoord.length - 1] == "i" &&
        gamedata.vervangĲ && ltr == "j" && echttoetsenbord) {
        
        typwoord = typwoord.slice(0, typwoord.length - 1);
        typwoord += "ĳ";
        updateWoord();

    } else if (typwoord.length < maxlen) {
        typwoord += ltr;
        updateWoord();
    }
}

function updateWoord() {
    let i;
    if (typwoord.length >= typwoordLast.length) {
        i = typwoord.length - 1;
        if (!typwoord.length) return;
    }
    else if (typwoord.length < typwoordLast.length) {
        i = typwoordLast.length - 1;
    }
    else return;

    let s = typwoord;
    let n = gamedata.regel;
    let el = document.querySelectorAll("#speelveld tr")[n].children[i];
    if (gamedata.reduceanim || gamedata.stĳl == "90s") {
        el.querySelector(".letter").style.opacity = 1;
        write(n,s);
    } else {
        el.querySelector(".letter").style.opacity = 0;
        setTimeout(() => {
            write(n,s);
            el.querySelector(".letter").style.opacity = 1;
        }, 50);
    }
    
    typwoordLast = typwoord;
}

function populateKeybObject() {
    let ltrs = [...document.querySelectorAll(".keybline")].flatMap(a => [...a.children]);

    for (let i = 0; i < ltrs.length; i++) {
        if (ltrs[i].classList.contains("wide")) continue;
        keyb[ltrs[i].style.getPropertyValue("--letter")[1]] = ltrs[i];
    }
}

const maanden = ["januari","februari","maart","april","mei","juni",
    "juli","augustus","september","oktober","november","december"];

function checkDatum() {
    let d = new Date();
    let dt = Date.UTC(d.getFullYear(),d.getMonth(),d.getDate());

    if (dt != gamedata.datum) {
        newNotif(`Let op! Dit is de Lingle van ${sessiondate} ${maanden[sessionmonth]}.`, 10000);
    }
}

function init() {
    mwlen = mogelĳkewoorden.length;

    let d = new Date();
    sessiondate  = d.getDate();
    sessionmonth = d.getMonth();
    sessionseed = Date.UTC(d.getFullYear(),sessionmonth,sessiondate);

    tryRetrieveData();
    populateKeybObject();

    initSett();

    revealStart();

    document.onfocus = () => {
        checkDatum();
    };
    document.onclick = e => {
        if (e.target != helpbtn)
            hideHelp();
    };

    document.onkeydown = e => {
        if (refuseInput)
            return;
        if (document.querySelectorAll("#speelveld tr")[gamedata.regel].classList.contains("dotreveal"))
            return;

        if (e.keyCode == 8) { // backspace
            doBackspace();
            hideHelp();
            return;
        }
        if (e.keyCode == 13) { // enter
            tryEnter();
            hideHelp();
            return;
        }

        let ch = e.key.toLowerCase();
        
        if (e.keyCode >= 65 && e.keyCode <= 90 || ch == "ĳ") {
            typLetter(ch, true);
            hideHelp();
        }
        else if (ch == ";" || ch == ":") {
            typLetter("ĳ", true);
            hideHelp();
        }

    };

console.log("Hé! Wees aardig tegen anderen en spoil alsjeblieft niks. \
Het is niet al te ingewikkeld om vals te spelen, maar je verpest het \
daarmee alleen maar voor jezelf en anderen.");
}

function revealStart() {
    let orig = gamedata.reduceanim;
    document.documentElement.dataset.redanim = "true";

    let trs = document.querySelectorAll("#speelveld tr");
    let hasended = false,
        haswon = false,
        addzesdebeurt = false,
        addrevealantw = false;
    
    for (let i = 0; i < gamedata.veld.length; i++) {
        if (!gamedata.veld[i]) {
            gamedata.regel = i;
            if (haswon)
                gamedata.regel--;
            break;
        }
        trs[i].classList.remove("dotreveal");
        let res = checkWoord(gamedata.veld[i]);

        write(i, gamedata.veld[i]);

        [...trs[i].children].forEach((el,m) => {
            let ltr = gamedata.veld[i][m];
            el.dataset.bg = res[m];
            el.querySelector(".letter").style.opacity = 1;

            if (res[m] == "rood") {
                keyb[ltr].dataset.bg = "rood";
            } else if (res[m] == "geel") {
                if (keyb[ltr].dataset.bg == "")
                    keyb[ltr].dataset.bg = "geel";
            } else {
                if (keyb[ltr].dataset.bg == "")
                    keyb[ltr].dataset.bg = "zwart";
            }
        });

        if (res.every(a => a == "rood")) {
            let delay = 0;
            if (i == 5) {
                addzesdebeurt = true;
                delay = gamedata.reduceanim ? 0 : 600;
            }
            setTimeout(() => {
                doaflip();
            }, delay);

            hasended = true;
            haswon = true;
        }
        else if (i == 5 && res.some(a => a != "rood")) {
            addrevealantw = true;
            hasended = true;
            revealOplossing(true);
            refuseInput = true;
        }
    }
    gamedata.voltooid = haswon;

    if (gamedata.reduceanim) {
        if (!hasended)
            revealDots(gamedata.regel);
        if (addzesdebeurt)
            speelveld.classList.add("zesdebeurt");
        if (addrevealantw)
            speelveld.classList.add("revealantwoord");
    }
    else {
        setTimeout(() => {
            document.documentElement.dataset.redanim = orig;
            if (!hasended)
                revealDots(gamedata.regel);
            if (addzesdebeurt)
                speelveld.classList.add("zesdebeurt");
            if (addrevealantw)
                speelveld.classList.add("revealantwoord");
        }, 50);
    }
}

function delayVerschuifBord() {
    if (gamedata.reduceanim) return 0;

    switch (gamedata.stĳl) {
        case "90s":
            return 1400;
        case "00s": default:
            return 500;
    }
}

function revealDots(n) {
    let animFactor = gamedata.reduceanim ? 0 : 1;
    let delay = 0;
    if (gamedata.regel == 5) {
        delay = delayVerschuifBord();
    }

    [...document.querySelectorAll("#speelveld tr")[n].children].forEach((el,m) => {
        setTimeout(() => {
            el.querySelector(".letter").style.opacity = 1;
        }, (m * 50 + delay) * animFactor);
    });
    if (gamedata.regel == 5)
        speelveld.classList.add("zesdebeurt");
    
    let a = (maxlen-1) * 50 + delay + 100;
    if (gamedata.stĳl == "90s") a -= (maxlen-1) * 50;

    setTimeout(() => {
        document.querySelectorAll("#speelveld tr")[n].classList.remove("dotreveal");
        typwoord = "";
        typwoordLast = "";
        refuseInput = false;
    }, a * animFactor);
}

function write(line, str) {
    let c = document.querySelector("#speelveld tbody").children;
    if (line >= c.length) return;

    let a = [...str];
    for (let i = 0; i < c[line].children.length; i++) {
        let ltr = a[i] ?? ".";
        if (ltr == "ĳ") ltr = "ij";
        c[line].children[i].style.setProperty("--letter", `'${ltr}'`);
    }
}
