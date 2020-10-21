const redditUrl = "https://www.reddit.com/r/OnePiece/search.json?q=flair_name%3A%22Current%20Chapter%22&restrict_sr=1&t=week";

var dayOfWeek = new Date().getDay();
// only check on Thursday and Friday
if(dayOfWeek == 4 || dayOfWeek == 5) {
    // activates every x minutes
    setInterval(checkOnePieceReddit, 30 * 60 * 1000);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    checkOnePieceReddit();
    sendResponse({isOut: false});
});

function checkOnePieceReddit() {

    chrome.extension.getBackgroundPage().console.log(httpGet(redditUrl));
}

function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}