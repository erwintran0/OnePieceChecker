
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click', onclick, false);

    function onclick() {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                chrome.runtime.sendMessage("checkChapter", displayStatus);
            });
    }

    function displayStatus(res) {
        alert("Is it out yet? " + res.isOut);
    }
}, false);