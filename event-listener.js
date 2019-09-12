document.addEventListener('DOMContentLoaded', function () {
    const fs = require('fs');
    const filePath = "CSS_FILE_PATH";
    const IS_FOCUS_MODE = "isFocus";

    fs.readFile(filePath, {
        encoding: 'utf-8'
    }, function (err, css) {
        if (!err) {
            const styleEl = document.createElement("style");
            const head = document.querySelector("head");
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
            });

            document.addEventListener("click", e => {
                console.dir(e);
                if ((e.target.dataset && e.target.dataset['qa'] === "start_thread") || (e.target.parentElement.dataset && e.target.parentElement.dataset['qa'] === "start_thread")) {
                    showSecondaryView();
                }

                if ((e.target.dataset && e.target.dataset['qa'] === "close_flexpane") || (e.target.parentElement.dataset && e.target.parentElement.dataset['qa'] === "close_flexpane")) {
                    hideSecondaryView();
                }

            })
        }
    });

    function showSecondaryView() {
        document.getElementsByClassName("p-workspace__secondary_view")[0].classList.remove("dn");
        document.getElementsByClassName("p-workspace__primary_view")[0].classList.add("dn");
    }


    function hideSecondaryView() {
        document.getElementsByClassName("p-workspace__secondary_view")[0].classList.add("dn");
        document.getElementsByClassName("p-workspace__primary_view")[0].classList.remove("dn");
    }

});