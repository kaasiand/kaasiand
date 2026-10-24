function fillFooter() {
    if (document.querySelector('footer'))
    document.querySelector('footer').innerHTML = `
    <div>
    <a href="./?lang=nl" lang="nl"><b>Home</b></a><a href="./?lang=en" lang="en"><b>Home</b></a>
    </div>

    <div>
    <a href="webapps?lang=nl" lang="nl"><b>Webapps</b></a><a href="webapps?lang=en" lang="en"><b>Web apps</b></a>
    <a href="tophat/">Tophat</a>
    <a href="oven/">Oven</a>
    <a href="counter/">Counter</a>
    <a href="bandgen/">Bandgen</a>
    </div>

    <div>
    <a href="games?lang=nl" lang="nl"><b>Spelletjes</b></a><a href="games?lang=en" lang="en"><b>Games</b></a>
    <a href="lingle/">Lingle</a>
    <a href="https://kaasiand.itch.io/yakuhigh" target="_blank">YakuHigh</a>
    <a href="https://kaasiand.itch.io/bag-boy-memory" target="_blank">Bag Boy Memory</a>
    </div>
`;
}

function addLangPicker() {
    let urlparam = new URLSearchParams(window.location.search);

    let div = document.createElement("div");
    div.id = "langpicker";
    div.innerHTML = `
<input onclick="loctitle('nl')" type="radio" id="rad_nl" name="taal" checked><label for="rad_nl">Nederlands</label>
<input onclick="loctitle('en')" type="radio" id="rad_en" name="taal"><label for="rad_en">Engels</label>
`;
    document.getElementById("cont").appendChild(div);

    switch (urlparam.get("lang")) {
        case "en": document.getElementById("rad_en").checked = true; break;
        case "nl": default: document.getElementById("rad_nl").checked = true; break;
    }
}

function init() {
    addLangPicker();
    fillFooter();
}

function loctitle(force) {
    let urlparam = new URLSearchParams(window.location.search);
    let lang = urlparam.get("lang") ?? "nl";
    if (force) lang = force;
    document.title = document.querySelector(`header nav[lang="${lang}"] a:not([href])`).innerText + " – Kaasiand.cool";
}
