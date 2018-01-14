chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.isVisible === true) {
            chrome.browserAction.setIcon({path: '../images/icon_16.png'});
        } else {
            chrome.browserAction.setIcon({path: '../images/icon_16_bw.png'});
        }
    });

chrome.storage.sync.get('waldorfVisible', function(response) {
    if(response.waldorfVisible === true) {
        chrome.browserAction.setIcon({path: '../images/icon_16.png'});
    } else {
        chrome.browserAction.setIcon({path: '../images/icon_16_bw.png'});
    }
});