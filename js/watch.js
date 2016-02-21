/* Library functions */

// Source: http://stackoverflow.com/a/16861050/2234742
function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

/* Show the correct playlist in sidebar */

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

var playlist = getURLParameter("playlist");
if (!playlist) playlist = "uploads";

var next_videos_panels = document.getElementsByClassName("next-videos");
for (var i = 0; i < next_videos_panels.length; i++) {
    var panel = next_videos_panels[i];
    var num_vids = parseInt(panel.getElementsByClassName("meta-posts-count")[0].textContent, 10);
    if (num_vids !== 0 && panel.dataset.categoryName === playlist) {
        panel.style.display = "block";
        if (playlist !== "uploads") {
            var vidLink = panel.getElementsByClassName("vid-link")[0];
            vidLink.setAttribute("href", vidLink.getAttribute("href") + "?playlist=" + playlist);
        }
    }
}

/* Initialize sharing buttons */

var title = document.title;
var encoded_title = encodeURIComponent(title);

var url = window.location.href;
var encoded_url = encodeURIComponent(url);

var fb = document.getElementsByClassName("ico-facebook");

for (var i = 0; i < fb.length; i++) {
    fb[i].href = "https://www.facebook.com/sharer.php?u=" + encoded_url;
}

var tw = document.getElementsByClassName("ico-twitter");

for (var i = 0; i < tw.length; i++) {
    tw[i].href = "https://twitter.com/share?text=" + encoded_title + "&url=" + encoded_url;
}

var gp = document.getElementsByClassName("ico-google");

for (var i = 0; i < gp.length; i++) {
    gp[i].href = "https://plus.google.com/share?url=" + encoded_url;
}
