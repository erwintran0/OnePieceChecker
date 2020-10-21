// background script is executed whenever chrome has started
const redditUrl = "https://www.reddit.com/r/OnePiece/search.json?q=flair_name%3A%22Current%20Chapter%22&restrict_sr=1&t=month";

var chapters = [
    { title: "Test Title 1", status: "new" },
    { title: "Test Title 2", status: "spoiler" },
    { title: "Test Title 3", status: "old" }
];

loadChaptersFromReddit();

var dayOfWeek = new Date().getDay();
// only check on Thursday and Friday
if(dayOfWeek == 4 || dayOfWeek == 5) {

    var oneMinute = 60 * 1000;

    // activates every x minutes
    setInterval(loadChaptersFromReddit, 30 * oneMinute);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    
    var bp = chrome.extension.getBackgroundPage();
    bp.console.log(request);
    if(request == "getChapters") {
        var chapters = getChapters();
        sendResponse(chapters);
    }
    else {
        loadChaptersFromReddit();
    }
});

function getChapters() {

    return chapters;
}

function loadChaptersFromReddit() {
    var posts = JSON.parse(httpGet(redditUrl));

    // var bp = chrome.extension.getBackgroundPage();
    // bp.console.log(posts);

    chapters = [];
    posts.data.children.forEach(post => {
        // ignore discussion posts
        if(!post.data.title.endsWith("Official Release Discussion")) {

            // add chapter to list
            var chapter = { 
                title: post.data.title, 
                status: post.data.link_flair_text == "Current Chapter" 
            };
            chapters.push(chapter);
        }
    });
}

function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}