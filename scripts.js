// script is executed whenever extension pop up is open

loadChapters();

// on click handler for refresh button
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click', onclick, false);

    function onclick() {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                chrome.runtime.sendMessage("loadChaptersFromReddit", loadChapters);
            });
    }
}, false);

function loadChapters() {

    chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            chrome.runtime.sendMessage("getChapters", populateChapterList);
        });
}

function populateChapterList(chapters) {

    var chapterList = document.getElementById("chapterList");
    // clear chapters
    chapterList.innerHTML = '';

    // populate with new chapters
    chapters.forEach(chapter => {
        console.log(chapter);
        var element = document.createElement('div');
        element.setAttribute('href', chapter.url);
        element.innerHTML = chapter.title;
        chapterList.appendChild(element)
    });
}