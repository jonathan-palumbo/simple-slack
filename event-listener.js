document.addEventListener('DOMContentLoaded', function () {
    const fs = require('fs');
    const filePath = "CSS_FILE_PATH";
    const drinksPath = "FOO";
    const IS_FOCUS_MODE = "isFocus";
    let beveragesConsumed = 0;
    const nyanStyle = document.createElement("style");
    nyanStyle.innerText = ".p-workspace__primary_view.nyan img {";
    nyanStyle.innerText += 'content: url(\"https://emoji.slack-edge.com/T024FBURD/nyancat/a61d90fc4b3f7969.gif\");';
    nyanStyle.innerText += ' }';
    nyanStyle.innerText = " .p-workspace__primary_view.nyan img{";
    nyanStyle.innerText += 'content: url("https://emoji.slack-edge.com/T024FBURD/nyancat/a61d90fc4b3f7969.gif");';
    nyanStyle.innerText += ' }';
    const nyanJam = new Audio("http://www.nyan.cat/music/original.mp3");
    nyanJam.loop = true;
    const head = document.querySelector("head");

    fs.readFile(drinksPath, {
        encoding: 'utf-8'
    }, function (err, css) {
        const styleEl = document.createElement("style");
        styleEl.innerHTML = css;
        head.appendChild(styleEl);
    });

    fs.readFile(filePath, {
        encoding: 'utf-8'
    }, function (err, css) {
        if (!err) {
            const styleEl = document.createElement("style");

            styleEl.innerHTML = css;

            if (localStorage.getItem(IS_FOCUS_MODE) === null) {
                localStorage.setItem(IS_FOCUS_MODE, true);
                window.location.reload(true);
            }

            if (JSON.parse(localStorage.getItem(IS_FOCUS_MODE))) {
                head.append(styleEl);
            }

            document.addEventListener("keydown", event => {
                // Enter Focus "Dwyer" Mode
                if (event.ctrlKey && event.keyCode === 68) {
                    const focusing = JSON.parse(localStorage.getItem(IS_FOCUS_MODE));
                    focusing ? head.removeChild(styleEl) : head.append(styleEl);
                    localStorage.setItem(IS_FOCUS_MODE, !focusing);
                }

                // Toggle Dev Tools
                if (event.ctrlKey && event.keyCode === 73) {
                    require('electron').remote.getCurrentWindow().toggleDevTools();
                }

                // Move focus to a message
                for (i = 49; i <= 57; i++) {
                    if (event.ctrlKey && event.keyCode === i) {
                        document.activeElement.blur();
                        let posts = document.querySelectorAll(".p-workspace__primary_view .c-virtual_list__item[aria-expanded='false']");
                        let postSelected = posts[posts.length - (i - 48)];
                        postSelected.focus();
                    }
                }

                // Reacji Hotkeys (opens on whichever post you are hovering on)
                if (event.ctrlKey && event.keyCode === 69) {
                    let react = document.querySelector("button[data-qa='add_reaction_action']");
                    react.click();
                }

                if (event.ctrlKey && event.keyCode === 84) {
                    let thread = document.querySelector("button[data-qa='start_thread']");
                    thread.click();
                }
            });

            document.addEventListener("click", e => {

                if (e.target.alt === "nyancat" && e.altKey) {
                    if (nyanJam.paused) {
                        const decision = confirm("Its take true strength to wield the power of Nyan Cat mode, Are you sure you want to enter Nyan Cat mode?");

                        if (decision) {
                            enableNyanCatMode();
                        }
                    } else {
                        disableNyanCatMode();
                    }
                }

                if (e.target.parentElement.tagName === "BUTTON" && e.target.parentElement.classList.contains("p-emoji_picker__list_item")) {
                    const beverages = ["beer", "beers", "champagne", "cocktail", "whiskey", "bud", "bud2", "tequila", "wine_glass", "whine-glass" ];
                    const inebriationLevels  = ["buzzed", "tipsy", "hammered", "stupor", "drunk"];
                    const emoji = e.target.dataset['stringifyEmoji'].replace(new RegExp(":", 'g'), "");

                    console.log(emoji);

                    if(beverages.includes(emoji)){
                        beveragesConsumed++;
                    }

                    if(beveragesConsumed >= 2){
                        setInibriationLevel(inebriationLevels[0]);
                    }

                    if(beveragesConsumed >= 3){
                        setInibriationLevel(inebriationLevels[1]);
                    }

                    if(beveragesConsumed >= 4){
                        setInibriationLevel(inebriationLevels[2]);
                    }

                    if(beveragesConsumed >= 5){
                        setInibriationLevel(inebriationLevels[3]);
                    }

                    if(beveragesConsumed >= 6){
                        setInibriationLevel(inebriationLevels[4]);
                    }

                    function setInibriationLevel(level){
                        const body = document.querySelector("body");
                        body.classList.add(level);
                        body.classList.remove(inebriationLevels.filter(il => il !== level));
                    }
                }
            })
        }
    });

    function enableNyanCatMode() {
        head.append(nyanStyle);
        nyanJam.play();
        document.getElementsByClassName("p-workspace__secondary_view")[0].classList.add("nyan");
        document.getElementsByClassName("p-workspace__primary_view")[0].classList.add("nyan");
    }

    function disableNyanCatMode() {
        head.removeChild(nyanStyle);
        nyanJam.pause();
        document.getElementsByClassName("p-workspace__secondary_view")[0].classList.remove("nyan");
        document.getElementsByClassName("p-workspace__primary_view")[0].classList.remove("nyan");
    }
});
