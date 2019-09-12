document.addEventListener('DOMContentLoaded', function () {
    const fs = require('fs');
    const filePath = "CSS_FILE_PATH";
    const IS_FOCUS_MODE = "isFocus";
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
                if (event.ctrlKey && event.keyCode === 68) {
                    const focusing = JSON.parse(localStorage.getItem(IS_FOCUS_MODE));
                    focusing ? head.removeChild(styleEl) : head.append(styleEl);
                    localStorage.setItem(IS_FOCUS_MODE, !focusing);
                }

                if (event.ctrlKey && event.keyCode === 73) {
                    require('electron').remote.getCurrentWindow().toggleDevTools();
                }

                for (i = 49; i <= 57; i++) {
                    // let getSiblings = function (elem) {
                    //     // Setup siblings array and get the first sibling
                    //     var siblings = [];
                    //     var sibling = elem.parentNode.firstChild;
                    //     // Loop through each sibling and push to the array
                    //     while (sibling) {
                    //         if (sibling.nodeType === 1 && sibling !== elem) {
                    //             siblings.push(sibling);
                    //         }
                    //         sibling = sibling.nextSibling
                    //     }
                    //     return siblings;
                    // };
                    if (event.ctrlKey && event.keyCode === i) {
                        document.activeElement.blur();
                        let posts = document.querySelectorAll(".p-workspace__primary_view .c-virtual_list__item[aria-expanded='false']");
                        let postSelected = posts[posts.length - (i - 48)];
                        postSelected.focus();
                        // postSibs = getSiblings(postSelected);
                        // postSibs.forEach((sib) => {
                        //     sib.style.opacity = "0.4";
                        //     sib.style.filter = "blur(3px)";
                        //     postSelected.style.opacity = "1";
                        //     postSelected.style.filter = "none";
                        // });
                    }
                }
            });

            document.addEventListener("click", e => {
                console.dir(e);
                if ((e.target.dataset && e.target.dataset['qa'] === "start_thread") || (e.target.parentElement.dataset && e.target.parentElement.dataset['qa'] === "start_thread")) {
                    showSecondaryView();
                }

                if ((e.target.dataset && e.target.dataset['qa'] === "close_flexpane") || (e.target.parentElement.dataset && e.target.parentElement.dataset['qa'] === "close_flexpane")) {
                    hideSecondaryView();
                }

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

    function showSecondaryView() {
        document.getElementsByClassName("p-workspace__secondary_view")[0].classList.remove("dn");
        document.getElementsByClassName("p-workspace__primary_view")[0].classList.add("dn");
    }

    function hideSecondaryView() {
        document.getElementsByClassName("p-workspace__secondary_view")[0].classList.add("dn");
        document.getElementsByClassName("p-workspace__primary_view")[0].classList.remove("dn");
    }

});