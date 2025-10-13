let mwlen;
let refuseInput = true;
let keyb = {};
let notifIdx = -1;
let sessiondate, sessionmonth, sessionseed;
let typwoordLast = "", typwoord = "";

const logomini = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAyCAYAAABmrERVAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAV0UlEQVR4nO2ceZhdRZXAf3Xve/16SSdkIwtLlmEJhsWwyuIHaICZARWFgCCMOn6AMCKbjp9+CnyKC4oCI4tRlNVBEWTQYCBiQAIjQkIINCFsIZ006XS6O72+/d6q+aNu3f11Xnei4OjhqzT9Xi2nzqmz1DmnGv4B/29BvNMIvNPQ/3kOyzRwuVRMRtIz7PDAzB/yG0B6Tb3DKI4ZdjZzxfDl3C8EB0roeqOb8xfcxRuAy7uQUIUruEkpzrMsGsKfOw6bX+nlosPv5jGgAjj8hXHvv4i9Mk38h1DMU4I9gRwK4f2nUCjlHTip6JawVUDVdVjzqV9xw287qRIcSGAnM3foMq61Lf7T/F6qsHLSDzkFKAIloMq7gMGLwL7jCu5UirMtK50G0kXe/TInX7iM54A8mskyre+OQv4yrkHwxfghqxdcl8HFqznqiidoB8p4h9HamUgK+CwKTGvMcmgWdgMmAU3ATl1vrPCTS1goJWdbWiZIa5aFdfo8fpqFacB4oIG/gBkb/DzHSMFXhKBBKRhLsyzGf2hvvgpMAVqADOxkYitJb5xOH92Hg4HJQLNZ9J2E4fOZYVsstUdgrGktGWa25iKH097Z+FgZ/ssWO35o8hUmoA/iLkAjYEWYu/IQsh3nMvnxY8fGBFfxYpxA86eyNzCBdwFzH4eMbGKpBSJ88qsu1ev+zK3r+3nFfOZK1FObWLatTCtachPMvQ/svs8xp+8CZq88hOxYcFIu+8VpVnUpF6rki1XyxbL3s8pwscpwyaHoSlzpIk3/skPpvEd4GJgIjAOygOUTu20RDXtOZ5tt03LIJLofn8z7j/817Wj97VKHraxU+VPW4iPhz3ZvYTqQQ6u1DFq1qZWHkN33aC5wHNbceAvPXB2sUY9NFveBdYYeUzccdjELhcVB8c/vX8f9Vz7N6iuf5tnFJ3LUiXP44JPtPP3JR1ju4Wt7P30Juw/sf7mM1yyYSxb2OorHWcWH0DhVqQO3/11EkxLYKrTjfJXBXW/iS2j77jCCM3fSbKadNJu5lz/Bs2hbG+nnM3fPmbxmQwsKbJg6bxo/Aj4BFLy2XWeoUOb5lphLMKWJid46GTwi9Z/PXKuRly1Bzs6gLv8chTOGOP89d/I/IcKkOi8rT6F53lzeUIKWQcXrS9fxoTOXsc0jQk2P/CqwpOB2O/btxkFeveBR/oh2+AYuWMZ9wC/RBzKDdqaG0Q6Vz7CFFzJfSeYYdmdtjn/sNM5a+ABLvP4lD6eaMKuIEDF8hqsMe/soeGsXSTJYADy6ga5HN/CS97sDDHprVwGZAeg8hxZLMSs82ob90M5Qj7eYy3ZO47eX8tR3F6HCNiSXIaen85lrWY3cYAlyCrAEApuW3SZw+7LTaTrxfh7yNlUmhcH7zmUlghkCEIJDjprDDcAl3hjjkSfgC5/nYiGYrmLEPPu3/NTRjBsAtgL93rqGuWXvu0J4/0Iw1caz2x5UJPOB59C+jKFXTYGwdkEoifA9HwHSxfH2MOThM+DhkAbCW8usV/LGlTDMzVrsEh/VX2IbsKs3qOANGJG581twU7ZiELC9nwLJzLgrZ0PD4TO4+YuHsPl7q1iNPoUlQgxeeQrNAs9GedCU4QRgBrDNawmpX3kIWaW4Ou61PN7BstXd9KEPRh/Q7f10CA6jIVrksLnaNEdguMpktMdaQtMsoSrDkCuTUYJAeBXkqwyhmVvwcOlBS29CcglMhfC+NybBAc9btscxNW7U23p4E+1WN+EZ6FpIGpjegEp4ndJHwjKIKJE+V0aQ+8oRPHjAJGaRcv04dAmFxBjdbzramUh12vY5kn+3RPQAVyXlTy9hCYFkbkMTcwit2gbRUmwOWeRgD/bRJmV0v7ZFKwHNMmyHZoVGMkJGvfateXq8tcpopua9Vgg189mwh6/BOWI+LQBZwonfnbqLDDHKe93cpvRbhQeBQyKj3mq4ZWxyS0/jnqlZpgGtEL3YuxI33B+FQHvj48E3AVFQfDiMkCtR1z7D4p4KBY8ofWhGFghst1GP5vcIDJVQKrbRXRrYxVvftBHpJxyEivUpV31tNZrwZ6ojqiW3gWnxLxzpe8lGzdUXnYltWKnkojKlX7hNyLHXl9/HCQT3S18apaInJi3WGXszG30IEhqm8xxaFCwMHwhXUrl+Ja+gJcNI6BDa9tZDTBpzSCRR/uqRYe+6LogcVuHrux0O2VoASvDBOIG35RnyFqj7KqQxjTaRskklgztarfap+Xxjtxwz0FKZM7i6Ls/F+05vppVAWiLMbWrlXEtEpb+vRE85sGth1Vt3eHFaS4oJ0v+KWBsR4tJfdX2G7nDiwvJQ2juuHt8coI8xnKA0VRsHKdmgVHRCNybhWZvG647nNLQt9UNqaYeFqNdobLteC46LM+Hrf+JutJQatWzU8eghrKUC/6IuxsbHeybDiX06ZtDSIHHiizjKX2RUzBVxyVXJTfbkucVszBwAx6ESPxQnzeZ8NHONPbWUSvaraD1gPPIIYYVkQSQaJXHufIW30A6LcVRGnRQYHEweYiF2PDxpW4k5xszgDIRUQwiEJpZhat2nKN5JieS4effwZN9no/fhLQU2TmthVi6UGckIGn73Ec7714f4PlrCylIlr1uO6zMmwtjuTzIP2CvcP19igOB6kweKPzuazMcOYImCQy1JRllUFPRLxZB0ebmvwr373MUfCR308WazobnHEiCOazB7J8avNXOhMc6BBo2p0f31n54YsjXkwY1vqipxvv0Mt151JJeYzwRwxDROu2g+y295mSGgqCQqcUeuEXjPZjnQEljhhToLbELbW3PVqHz4PfzAgpMBsHwmzbC1kj98epZP915Ax1MbOfMjS3kBqL41hDVnUnLvo4bYmHkT2fe5s7h01ybGZy0qDRZSGAFRoASOkGwcqvDQ7Dt5kBE0q/aW8QgQarYVIWHdaMdtrEo/zjKhKRTizpdZV5FBNEYBGYuGi97LhehsxzipdGQrok5qiEwVrHjfjiG2oAlS8ZpjCfZL9etCKjcj2H3+rlyFl1ZrL5BJ8S+MQ+VvayRamU2G55jWzJx9JnDMxAYOHJfl0Aabw7MWR2QtjsjaHNFgcXQ2w1mTmvnFG+fyLbTJaiRF4o3NTXh+Kkr+0Wmc8Fzpkqvi/ZRC9ToUvvo0V7rSU71e22McB184n4OBCY6kIXEQE7LsrzI93rfi+ndX/w4rZdIDT2vjbA5GR8MmPddPY/x7mXLtq4dUtT7fXh53XI6z0Wm+yI3CgAUgoBLfS1mNseog7mSMtKuoNVeAs/hl2gbLrI9/f97+fArYpeomtUwtEIIT433/vIU3iYbp5JTb+FJ/kbuGy6wfKLF5uEJfxaEUP/S2RQswFZjYVaQxrqWsIAw4KnqNtbnav5+BzpcnUpIZAFdRzcbVaUJx1olrfJ4Ub9nMr0IlLiogY/moX/JvbeewwhJB8GKPFg7eexzTK44XGQpB2U2PeQvFnHBfRyGvX0MbgeT6cehZd3E5Oow5HZhoQWPnZ1hs2TSb8VV9TWkFBktVnaAIz59yTds+DVN6SIWSCleBjMwvwBLYtsCuuJRubeM+tLnKkyK5GQBbeaouBDXuk9uFeKakFvhXJn9H4H3ibC4xUKqyvjnLPubrrEX20VP5/mCFV+Pzy9oHcWrYCuYrbKN2aLGEDmhYQDELjTbY4ZkHdTLFAjJlSSZFc0Tu2NRBw7hjuWGAdecv565ne+ilRgBp1xwNW8t+CtIUxiVoYLzlBnNCDDZZOyLidUuxK6NXnLTwozdh5BCEDpMEymt7uebQ6dwVHtOUZUpfhY74XKEit/hareFPB8p+1qhKtKpRob3nfu/zvvGQE5JI+VyhSt7fJyGVHWxq9KYshnH7EJue7aGbIGmQSFps1S6nyeHmPbwT/XTURwWENmvFXK/RxUlDv8saxyLSTyTWcBcu4Xdvf5LnmjMcZj7MQrMFLXG1nK2RZUIRsTbDFYYJmGsk13QxUlwB7MXHMxPhSacHvfpwKMC1rVAI1SA9FlOWNGPhg9ZD7Zi38PAtowMxRdKYq1ICA2NCNAVZq56znFxJAhXX5UXsgLm2wJrRzHsSp32QofgEneewvxXTDoUqBQK1nBYvN/Hc6vtncbOptTKwcYDN3jg3awXZKX/wWLxlReS6qIIDNgT0olORtZL1imghRWR9y0PKiTtjI9ixnQOxBVPUt/tGLz+O98sJchGPUaJWdNITm5WsSiYnXOk7UCOGVNuOZVzG4p8jyCjUrW08h2evG6yUu/oo/ZSmDPPiVZhlx7elRiKHCfK38WaKKIzdjYDOCknPcQi1sVZfJ5IGNbZbR4JBfWApLxQd2owKT20SNSx9leqHSx1FKd43o+O2/vmlBnNn7MEpcdx6C2xe2etXaZSbbC/REF5AJK5CIwpIVTAnvqHeEoP14FgPaFslUiNUY6ulTaiA+vqpZD8FOANFbkudN9yiq0lAdebpjd9TJ2SYEBmVAm+fwhRlc2d8jeUdPImWkBJQmpRLJjBS9jpysl7qu3K4lRzfvu7w8xtfchMVEWOtrt++uk3tR/p6cr/7+Yl0KW+HuRBNcrDgIQaEohRR6Vma2U46LjeJL1tEo2COg3Ph0zyBtoVFoDizmWoNXOqmWzVczBu09N2NAXSESqVEfWoEH7YLsUMSz9Mm+nnLWbWJUs1XebhWCE6KCBEia0nFUHhPrTbjieZ+I2t2nslspbgsTotnt/oZoSLaBhanNSbTpFKOro5aEPMLPLIQldwdU8tCJRF1Az+zbiZPHodNTBX2lX1PNoxkpOIPNaKn6ZYcltchueEZ9f8ohsIHoSnDJOKVmB68vYg97Syr4q8R8lUGzn6MB9Hq2BSkFWe3JuvOVDL8uF3GRLaiwNJ47bDUQnAVSpB2LOHHOX+kvOUsnrcUhwIMVtn6jed5kmTBV5KVtVeTG7exfMrMGt+OgKWSbMTin8zvGbDfOpMbL36aS5d0sBnvBUT3xzle2dxjw6T4fN9Zzc8GpR9QGMAUqKuQ6vZgBO2TvjEZvUcDNNvk3jeJCRfvz/ELpjJ9Yo4plmAPpfcqBF7I3nvY6ShW7n4vV5NS65bxCJRwVsfoLasD7uW4n5/EOVuK7PaDNbSvz/vlmEVCLns82JHCbh9OWM7rm8/ipQaLAxILjmA+uvJ8d/dxHA/4ZB+fZertx3JXf5nVGUFXzqZRWRxri2RJbPsw625bx2se7gNeywPVXSujOqCp0JDh1PiYj83h7EVz+UTqgPhOBWRhYfuZHDPrl5xKUF/tQJA4UInEQYB6KsobT2a3hhaOE4LpVUnb7r/iMUB1g3viozyELmifhFaBA8QjLaMjjHyrn6/sO5HfJvY7wriDHmL5W2fwWGuWheH5BdgTc1q7+MvH5tlSYP1xv+Gmsj6Yg+hgwgChQrrEFW60forLXioWCowHTuqBlgzHHDmRff7URwdBia4bPGSI2TE7BdGuRby3++N8vetMeprH05Gxuce2uK4xwyOvn8rV6BdmGTQBeoG3gU1AF5pAQdX+6HxCefRS/uA6Ue+3hoIPg/u1FXymUOH1EW12rG0psH7/B7l2UPqMNZEi8w6HQgOWigUg5Aix5Y0ns1vXIvaKbErQNRq8ajVHUl2fZzI69Rd9n2ulXIWEd89tAevhYzmo8wyewuJ54GuWYHK8f3OWC9GJ43FoBg6gmdrlESePpy7ePoU9446L3L4dqBYcfh1fd7BCn/d92jGR93TSc+WzLOotsiqloD3SqhJn5VZW7P8g16K1TD/6iUk3msm+5pnQxFw7JhTDocSCga5FvLfr46xpHk+HneH1zjN45JgJ+g1tRz/XpBVKpDXpIt1QM78Xqgz/4EVu6arQ5NG+wfBV2xmRcv4lnLYnM68/jJuaMsz2P68hJ1IigJkeIcyLMyc0yh+ZaeID8Xk6C3TG+8XA/XMH3zxuNmeE7eOvN/AwtUOKCqjc0c6GO9o58xOzOfjrC7ihMctkS2GbnI9SuINVeq9cxe33bWQD3os/dOB+K1pqI+WvjqQpE8O0r8TQRAt7/8mMv+oAFh4whcWWRaO3ht67xUnfPYpLjlrK4kOXsvLnR3Lq+3fjh7bFZKUQrsItuQz3luh+qY91bw6y9ca1tJWjqb04jUy4MpL+EwCdp/NAxuJj4d5bi7RPzrFHrJaqJtz2Kjd/eQ1/ADajVXEvNQLep4N18+nkzcYdhXv4Eq7YVGQz0AFs9AgbH5/73gIWnLsXT9kC+4VtrDjhMe5GM+JtoN0bV4qNy6LTfxOBKa0wJWPRKr3aoyrIgvSD72W0f7DNm8s8FIu8Htx0Gsc2Zngi/NlghW3NWVoFZEZ6Lf/qAA8c8wjXoDWDA7TaWutNcXXS3VypzKE1Gaxaz1RdD0eD8xBQzQBUXRw7hsrURmZB0tEw4LhUXx1i9X+/xYpnu+laM0B3jYUTcD+oSwf56O4tXF+R2Deu5d5NRT8nWaR2HbHzxdW88v02DmzJssebBZrRDtsgmsGJtJcZB366rzIEeSStaOb6D8K9fiWSj8CSz0JdGuJ50fFZgnrIGlRwFeqGNp5G28cK3jslV48oEpTLKKK5ZyOZtbJZpprTf2pqKjHqTlZtGGbtj1/jd3es500nqCA0E/cTeJQjRWvUMct4EjgJrcqnoAlsXtnVGu8CxS1VtlLFBf/hlXnMVYu5CiKVC3k0ERsICtkNMf0QI7EH1xFEJNZovdr1Q7x4/VqW3N9BL8G7Jj9ejT5MxmYayTUSGy4Lih/8cF+f+aYSIzcSc12FfGWAVT96lWX3ddDubdpImUk95QmeE5q86UhQRTOlx5sPb2w/NR5ex8a53k/hja/5YDu8FQKm5Um+LQrnRkd+HxUqcPAhRRE7CmfFFpZ96yWeWKOf6JhcrXnGYmhp3vTGK2BkrNV9pDIAjsvKrMWpaR26S7x9y2s8cMsbtBGc6vCb0HBesUxQvrI95poSEenNBYEGGOndjiK4qBe9z8yprbc0wEjDmKHq8JqbjZYUobTa7S2zua2fF9v62PSdtaxyAtUajnT1ElwPDS47hFMcBMAdC5iycA9WZW32NF8MVun7QyfLP7uK3xM8mhoiiNQYCTU2aXSvAYP1w9JjJGeUCu8dAbv9w/yiweKjloVdkRTX9vPC3W+x4p523iBqK8OJ97BgRKJ2OxvMqcsAE35/LF+Y2sjCtQOsP/sZlnmLmjc1/QQ21SBmbNLfAjN2Nghg3KVzOOiAKZxw3To2vDIU8biNlBonJxyGHck52qkIgpacZrQHNw0dNmwkUJ0DBA+UzZ/K+3tlahga0dX+JtSaQ9Ms/KcNjD2tEBTm/UUkNQ4mGGBc6X40wwpor80w1xh/8+d3/t6ZasA4dwJNpyzBdcpotnB99F+VbvEC6gyaqebP9JirgTH6f5UT9zcGNpqp5g+chIve/+oMDUNaFCVcpRB2xf8BI0OYlu8KzfZ/cw57X61Na/kAAAAASUVORK5CYII="
let img_logomini;

let gamedata = {};
let resultcanvas;

function renderImage() {
    let ctx = resultcanvas.getContext("2d");
    resultcanvas.width = 540;
    resultcanvas.height = 220;
    ctx.fillStyle = "#393434"; ctx.fillRect(0,0,resultcanvas.width,resultcanvas.height);
    ctx.drawImage(img_logomini, 54,29);
    ctx.fillStyle = "#D1D1D1"; ctx.fillRect(43,87,210,1);
    
    let tileWidth = 30, tileHeight = 26, tileGap = 3;
    let tileY = 24;
    for (let i = 0; i < gamedata.veld.length; i++) {
        let tileX = 320;
        let res = checkWoord(gamedata.veld[i] ? gamedata.veld[i] : gamedata.veld[0]);

        res.forEach(r => {
            if (!gamedata.veld[i]) ctx.fillStyle = "#006CAD72";
            else if (r == "rood")  ctx.fillStyle = "#F25A2C";
            else                   ctx.fillStyle = "#006CAD";

            ctx.fillRect(tileX,tileY,tileWidth,tileHeight);

            if (gamedata.veld[i] && r == "geel") {
                ctx.fillStyle = "#F3C233"; 
                ctx.beginPath();
                ctx.ellipse(tileX+tileWidth/2, tileY+tileHeight/2, Math.min(tileWidth/2,14), tileHeight/2, 0, 0, Math.PI*2, true);
                ctx.fill();
            }
            tileX += tileWidth + tileGap;
        });
        tileY += tileHeight + tileGap;
    }
    let nr = (sessionseed - Date.UTC(2022,0,-29)) / 86400000;
    if (nr >= 1488) nr++; // dit nummertje slaan we liever over

    ctx.fillStyle = "#CCCCCC";
    ctx.font = "bold 24px FreeSans,Helvetica,Arial,sans-serif";
    ctx.fillText(nr,184,73);
    let d = new Date(gamedata.datum);
    ctx.fillStyle = "#AAAAAA";
    ctx.font = '19px "tahomacanvas"';
    ctx.fillText(`${sessiondate} ${maanden[sessionmonth]} ${d.getFullYear()}`,54,121);
    let streaktxt = `winreeks ${gamedata.streak} `;
    ctx.fillText(streaktxt,54,148);
    ctx.fillStyle = "#AAAAAA80";
    ctx.fillText(`(record ${gamedata.maxstreak})`, 54 + ctx.measureText(streaktxt).width,148);
    ctx.fillStyle = "#E59A00";
    ctx.fillText("kaasiand.cool/lingle", 54,186);

    let s = document.getElementById("shareimg");
    s.src = resultcanvas.toDataURL();
}

function copyresults() {
    let nr = (sessionseed - Date.UTC(2022,0,-29)) / 86400000;
    if (nr >= 1488) nr++;
    let str = `Lingle ${nr} ${gamedata.voltooid ? gamedata.regel + 1 : 'X'}/6\n`;
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
        document.querySelector(".sharebtn").innerHTML = "Tekst gekopieerd!";
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
function copyresultImg() {
    resultcanvas.toBlob((blob) => {
        const data = [new ClipboardItem({ [blob.type]: blob })];
        
        navigator.clipboard.write(data).then(() => {
            console.log("afbeelding kopiëren gelukt");
            document.querySelector(".sharebtn").innerHTML = "Plaatje gekopieerd!";
        }, () => {});
    });
}

function save() {
    localStorage.setItem("data", JSON.stringify(gamedata));
}
function tryRetrieveData() {
    if (!localStorage || !localStorage.getItem("data")) {
        makeFirstGameData();
        helpscreen.showModal();
    }
    else {
        gamedata = JSON.parse(localStorage.getItem("data"));

        if (gamedata.datum != sessionseed) {
            makeGameDataNewDay();
        }
    }
    save();
}

function promptResetData() {
    if (window.confirm("Weet je zeker dat je alle opgeslagen gegevens (statistieken, voortgang en voorkeuren) wil wissen?")) {
        resetData();
        location.reload();
    }
}

function abc() {
    btnthemadark.classList.toggle("test");
}

function uncheckAll(el) {
    [...el.querySelectorAll('button[role="radio"')].forEach(e => e.setAttribute("aria-checked", "false"));
}
function initSett() {
    // update IJ dinges
    document.getElementById("vervangĳbtn"   ).setAttribute("aria-checked", gamedata.vervangĲ    ? "true" : "false");
    document.getElementById("blurbtn"       ).setAttribute("aria-checked", gamedata.blur        ? "true" : "false");
    document.getElementById("donkerblauwbtn").setAttribute("aria-checked", gamedata.donkerblauw ? "true" : "false");
    document.getElementById("reduceanimbtn" ).setAttribute("aria-checked", gamedata.reduceanim  ? "true" : "false");
    document.getElementById("transpbtn"     ).setAttribute("aria-checked", gamedata.transp      ? "true" : "false");

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
    //console.log("flip");
    renderImage();
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

    resultcanvas = document.createElement("canvas");
    img_logomini = new Image();
    img_logomini.onload = () => { renderImage(); };
    img_logomini.src = logomini;

    const tahoma = new FontFace('tahomacanvas', 'url(Tahoma.woff)');
    tahoma.load().then((font) => {
        document.fonts.add(font);
        renderImage();
    });

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
        if (e.target == helpscreen)
            helpscreen.close();
    
        else if (e.target == settscreen)
            settscreen.close();

        // the modalbg div covers the whole dialog window, so helpscreen/settscreen
        // are only targeted if you click outside the dialog
    };

    document.onkeydown = e => {
        if (refuseInput)
            return;
        if (document.querySelectorAll("#speelveld tr")[gamedata.regel].classList.contains("dotreveal"))
            return;
        if (helpscreen.open || settscreen.open)
            return;

        if (e.keyCode == 8) { // backspace
            e.preventDefault();
            doBackspace();
            return;
        }
        if (e.keyCode == 13) { // enter
            tryEnter();
            return;
        }

        let ch = e.key.toLowerCase();
        
        if (e.keyCode >= 65 && e.keyCode <= 90 || ch == "ĳ") {
            if ("ABCDEFGHIJKLMNOPQRSTUVWXYZĲabcdefghijklmnopqrstuvwxyzĳ".includes(ch))
                typLetter(ch, true);
        }
        else if (ch == ";" || ch == ":") {
            typLetter("ĳ", true);
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
