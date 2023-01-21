// background script is executed whenever chrome has started

const redditUrl = "https://www.reddit.com/r/OnePiece/search.json?q=flair_name%3A%22Current%20Chapter%22&restrict_sr=1&t=month";
const newChapterHourLimit = 24;
const checkingInterval = 60;

var chapters = [];

chrome.runtime.onStartup.addListener(() => {
    loadChaptersFromReddit();
});

var dayOfWeek = new Date().getDay();
// only check on Thursday and Friday
if(dayOfWeek == 4 || dayOfWeek == 5) {

    // activates every x minutes
    chrome.alarms.create({ delayInMinutes: checkingInterval });
    chrome.alarms.onAlarm.addListener(() => {
        loadChaptersFromReddit();
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    
    if(request == "getChapters") {
        var chapters = getChapters();
        sendResponse(chapters);
    }
    else if(request == "loadChaptersFromReddit") {
        loadChaptersFromReddit();
        sendResponse({status: true});
    }
    return true;
});

function getChapters() {

    return chapters;
}

function loadChaptersFromReddit() {
    // GET request to get reddit posts
    fetch(redditUrl)
        .then(function(response) {
            return response.json();
        })
        .then(posts => {
            chapters = [];

            console.log(posts)

            // fills chapters with current posts
            posts.data.children.forEach(post => {
        
                // add chapter to list
                var chapter = { 
                    title: post.data.title, 
                    url: post.data.url, 
                    created: post.data.created_utc, 
                    status: "old"
                };
                chapters.push(chapter);
            });
        
            evaluatePosts();
        })
        .catch((err) => {
            console.log("ERROR: Error occured while loading chapters: " + err);
        });
}

// marks posts as old or new
// adds icon badge on new chapters
function evaluatePosts() {

    var i = 0;
    var hasNew = false;
    while (i < chapters.length) {

        if(chapters[i].title.endsWith("Discussion")) {            
            chapters.splice(i, 1);
            continue;
        }

        var date = new Date(0).setUTCSeconds(chapters[i].created);
        var hoursDifference = Math.abs(Date.now() - date) / 36e5;
        if(hoursDifference < newChapterHourLimit) {
            // if chapter was created under x hours it's marked as new
            chapters[i].status = "new";
            hasNew = true;
        }
        i++;
    }
    if(hasNew) {
        addBadgeToIcon();
    }
    else {
        removeBadgeFromIcon();
    }
}

function addBadgeToIcon() {

    chrome.action.setBadgeText({text: 'New'});
    chrome.action.setBadgeBackgroundColor({color: '#f72828'}); 
}

function removeBadgeFromIcon() {
    chrome.action.setBadgeText({text: ''});
}
