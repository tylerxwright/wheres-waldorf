require.context('../images', true, /^\.\//);
require('../css/style.css');
require('../../node_modules/toastr/build/toastr.css');

var toastr = require('toastr');

var addWaldorf = function() {
    var body = document.body;
    var html = document.documentElement;
    
    var windowHeight = Math.max(body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight);
    var windowWidth = Math.max(body.scrollWidth, body.offsetWidth,
                        html.clientWidth, html.scrollWidth, html.offsetWidth);

    var waldorfLeft = Math.floor(Math.random() * (windowWidth-20));
    var waldorfTop = Math.floor(Math.random() * (windowHeight-28));
    
    var waldorf = document.createElement("div");
    waldorf.id = "waldorf";
    waldorf.style.left = waldorfLeft+"px";
    waldorf.style.top = waldorfTop+"px";

    document.body.appendChild(waldorf);

    var startTime = new Date();

    waldorf.onclick = function() {
        var endTime = new Date();
        var timeDiff = endTime - startTime;
        timeDiff /= 1000;
        var secondsElapsed = Math.round(timeDiff);

        toastr.success('You found Waldorf in '+secondsElapsed+' seconds!');
        document.body.removeChild(waldorf);
        addWaldorf();
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.isVisible === true) {
            addWaldorf();
            toastr.success('Waldorf\'s back!')
        } else {
            var waldorf = document.getElementById("waldorf");
            if(waldorf !== null) {
                document.body.removeChild(waldorf);
                toastr.error('Waldorf left.')
            }
        }
    });

chrome.storage.sync.get('waldorfVisible', function(response) {
    if(response.waldorfVisible === true) {
        addWaldorf();
    } else {
    }
});