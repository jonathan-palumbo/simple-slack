document.addEventListener('DOMContentLoaded', function () {
    const fs = require('fs');
    const filePath = "SLACK_DARK_THEME_PATH";
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
        }
    });

    function observeWorkspacePrimaryView(handlers) {
        const allTheThings = document.getElementsByTagName("body")[0];
        const defaultHandler = {
            handle: () => {
            }
        };

        const observer = new MutationObserver((mutations) => {
            // mutations.map(console.dir);
            mutations.map(m => (handlers.find(h => h.canHandle(Array.from(m.addedNodes))) || defaultHandler).handle(Array.from(m.addedNodes)));
        });

        observer.observe(allTheThings, {attributes: false, childList: true, subtree: true});
    }

    function mutationHandler(selector, event, handler){
        const findTarget = (nodes) => nodes.find(n => n.querySelector(selector));
        const canHandle = (nodes) => {
           return findTarget(nodes);
        };

        const handle = (nodes) => findTarget(nodes).addEventListener(event, handler);

        return {
            canHandle,
            handle
        }
    }

    function messageActionsHandler() {
        return mutationHandler("[data-qa='start_thread']", "click", showSecondaryView);
    }


    function flexPaneMutationHandler() {
        return mutationHandler("[data-qa='close_flexpane']", "click", hideSecondaryView);
    }


    function showSecondaryView() {
        document.getElementsByClassName("p-workspace__secondary_view")[0].classList.remove("dn");
        document.getElementsByClassName("p-workspace__primary_view")[0].classList.add("dn");
    }


    function hideSecondaryView() {
        document.getElementsByClassName("p-workspace__secondary_view")[0].classList.add("dn");
        document.getElementsByClassName("p-workspace__primary_view")[0].classList.remove("dn");
    }


    observeWorkspacePrimaryView([messageActionsHandler(), flexPaneMutationHandler()]);
});