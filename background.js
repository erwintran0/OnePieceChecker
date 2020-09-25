

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
}