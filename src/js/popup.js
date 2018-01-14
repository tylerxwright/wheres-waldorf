function setButtonText(visible) {
    if(visible === true) {
        document.getElementById("waldorf-hide-btn").innerHTML = "Hide Waldorf";
    } else {
        document.getElementById("waldorf-hide-btn").innerHTML = "Show Waldorf";
    }
}

window.onload = function(e) {
    chrome.storage.sync.get('waldorfVisible', function(response) {
        if(response.waldorfVisible === null) {
            chrome.storage.sync.set({'waldorfVisible': true});
        }

        setButtonText(response.waldorfVisible);

        document.getElementById("waldorf-hide-btn").onclick = function() {
            chrome.storage.sync.get('waldorfVisible', function(response) {
                var visible = !response.waldorfVisible;

                chrome.storage.sync.set({'waldorfVisible': visible});

                setButtonText(visible);

                chrome.runtime.sendMessage({isVisible: visible});

                chrome.tabs.query({}, function(tabs) {
                    for(var i=0; i<tabs.length; i++) {
                        chrome.tabs.sendMessage(tabs[i].id, {isVisible: visible});
                    }
                    window.close();
                });
            });
        }
    });
}