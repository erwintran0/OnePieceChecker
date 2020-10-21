// script is executed whenever extension pop up is open
const hoursStillNew = 24;

loadChapters();

datedate = "1602774176";
var d = new Date(0);
d.setUTCSeconds(datedate);
console.log(d); 

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
        createChapterItem(chapter)
    });
}

function createChapterItem(chapter) {

    var divElement = document.createElement('button');
    divElement.innerHTML = chapter.title;

    // if chapter was created under x hours it's marked as new
    var date = new Date(0);
    date.setUTCSeconds(chapter.created);
    var hoursDifference = Math.abs(Date.now() - date) / 36e5;
    if(hoursDifference < hoursStillNew) {
        divElement.classList.add("new");
    } else {
        divElement.classList.add("old");
    }

    var linkElement = document.createElement('a');
    linkElement.setAttribute('href', chapter.url);
    linkElement.setAttribute('target', "_blank");
    linkElement.appendChild(divElement)

    chapterList.appendChild(linkElement)
}