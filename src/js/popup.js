function setButtonText(visible) {
    if(visible === "true") {
        document.getElementById("waldorf-hide-btn").innerHTML = "Hide Waldorf";
    } else {
        document.getElementById("waldorf-hide-btn").innerHTML = "Show Waldorf";
    }
}

window.onload = function(e) {
    var visible = localStorage.getItem('waldorfVisible');
    if(visible === null) {
        localStorage.setItem('waldorfVisible', "true");
    }

    setButtonText(visible);

    document.getElementById("waldorf-hide-btn").onclick = function() {
        var visible = localStorage.getItem('waldorfVisible');

        if(visible === "true") {
            visible = "false";
        } else {
            visible = "true";
        }
        
        localStorage.setItem('waldorfVisible', visible);

        setButtonText(visible);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {isVisible: visible});
        });
    }
}