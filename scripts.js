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
        var divElement = document.createElement('button');
        divElement.innerHTML = chapter.title;
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', chapter.url);
        linkElement.setAttribute('target', "_blank");
        linkElement.appendChild(divElement)
        chapterList.appendChild(linkElement)
    });
}