const redditUrl = "https://www.reddit.com/r/OnePiece/search.json?q=flair_name%3A%22Current%20Chapter%22&restrict_sr=1&t=month";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var chapters = getOnePieceChapters();
    sendResponse(chapters);
});

function getOnePieceChapters() {

    var posts = JSON.parse(httpGet(redditUrl));
    
    var bp = chrome.extension.getBackgroundPage();
    bp.console.log(posts);
    var chapters = [];
    posts.data.children.forEach(post => {
        // ignore discussion posts
        if(!post.data.title.endsWith("Official Release Discussion")) {

            // add chapter to list
            var chapter = { 
                title: post.data.title, 
                isNew: post.data.link_flair_text == "Current Chapter" 
            };
            chapters.push(chapter);
        }
    });
    return chapters;
}

function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}