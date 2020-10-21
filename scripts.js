var chapters = [
    { title: "One Piece Chapter 981", isNew: true },
    { title: "One Piece Chapter 750", isNew: false },
    { title: "One Piece Chapter 234", isNew: false }
];

populateChapterList();


var dayOfWeek = new Date().getDay();
// only check on Thursday and Friday
if(dayOfWeek == 4 || dayOfWeek == 5) {
    // activates every x minutes
    setInterval(reloadChapters, 30 * 60 * 1000);
}

// on click handler for refresh button
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click', onclick, false);

    function onclick() {
        reloadChapters();
    }
}, false);

function reloadChapters() {
    chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            chrome.runtime.sendMessage("getOnePieceChapters", handleChapters);
        });
}

function handleChapters(loadedChapters) {
    chapters = loadedChapters;
    populateChapterList();
}

function populateChapterList() {

    var chapterList = document.getElementById("chapterList");
    // clear chapters
    chapterList.innerHTML = '';

    // populate with new chapters
    chapters.forEach(chapter => {
        var element = document.createElement('div');
        element.innerHTML = chapter.title;
        chapterList.appendChild(element)
    });
}