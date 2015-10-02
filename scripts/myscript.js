var x = 0;
var y = 0;
var w = 0;
var h = 0;
var rect = 0;
var sel = "";

$(document).ready(function() {
	createIcon();
  	$(document).bind("mouseup", mouseup);
});

getSelectedText = function() {

	var selection = window.getSelection().toString();

	var range;
	var rects;
	var rect;

	if (selection != "") {
		range = window.getSelection().getRangeAt(0).cloneRange();
		if (range.getBoundingClientRect) {
			var rect = range.getBoundingClientRect();
				var scrollTop = window.pageYOffset;
				var scrollLeft = window.pageXOffset;
                w = rect.width;
                h = rect.height;
                x = scrollLeft + rect.right;
                y = scrollTop + rect.top + h;
		}
		return selection
	}
	else return null;

	// var html = "";
 //    if (typeof window.getSelection != "undefined") {
 //        var sel = window.getSelection();
 //        if (sel.rangeCount) {
 //            var container = document.createElement("div");
 //            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
 //                container.appendChild(sel.getRangeAt(i).cloneContents());
 //            }
 //            html = container.innerHTML;
 //        }
 //    } else if (typeof document.selection != "undefined") {
 //        if (document.selection.type == "Text") {
 //            html = document.selection.createRange().htmlText;
 //        }
 //    }
 //    console.log (html);
}

mouseup = function() {

	var selection = getSelectedText();

	if (selection == null) {
		$('#social-share').css("display", "none");
	}
	else {
		sel = selection;
		$('#social-share').css({
			"display": "block",
			"top": y,
			"left": x
		});
	}
}

createIcon = function() {
	ss_icon = document.createElement("div");
	target = document.getElementsByTagName('body')[0];
	ss_icon.id = "social-share";
	target.appendChild(ss_icon);
	chrome.storage.sync.get({
        selectedMedia: [],
        mediaChosen: []
    }, function(items) {
        for (var i = 0; i < items.mediaChosen.length; i++) {
        	var media = items.mediaChosen[i];
        	if (media == 'twitter') {
        		createTwitter();
        	}
        	else if (media == 'facebook') {
        		createFacebook();
        	}
        	else if (media == 'linkedin') {
        		createLinkedin();
        	}
        	else if (media == 'googleplus') {
        		createGooglePlus();
        	}
        	else if (media == 'reddit') {
        		createReddit();
        	}
        }
    });
}

createTwitter = function() {
	ss_icon = document.createElement("img");
	target = document.getElementById('social-share');
	ss_icon.src = chrome.extension.getURL("images/twitter.png");
	ss_icon.className = "social-share-icon twitter";
	target.appendChild(ss_icon);
	console.log("hello")
	$('.twitter').click(function() {
		var title = sel.replace(" ", "%20");
		var url = window.location.href;
		var link = "http://twitter.com/intent/tweet?status="+title+"+"+url;
		shareThis(link);
	});
}

createFacebook = function() {
	ss_icon = document.createElement("img");
	target = document.getElementById('social-share');
	ss_icon.src = chrome.extension.getURL("images/facebook.png");
	ss_icon.className = "social-share-icon facebook";
	target.appendChild(ss_icon);
	$('.facebook').click(function() {
		var title = sel.replace(" ", "%20");
		var url = window.location.href;
		var link = "http://www.facebook.com/sharer/sharer.php?u="+url+"&title="+title;
		shareThis(link);
	});
}

createLinkedin = function() {
	ss_icon = document.createElement("img");
	target = document.getElementById('social-share');
	ss_icon.src = chrome.extension.getURL("images/linkedin.png");
	ss_icon.className = "social-share-icon linkedin";
	target.appendChild(ss_icon);
	$('.linkedin').click(function() {
		var title = sel.replace(" ", "%20");
		var url = window.location.href;
		var link = "http://www.linkedin.com/shareArticle?mini=true&url="+url+"&title="+title+"&source="+url;
		shareThis(link);
	});
}

createGooglePlus = function() {
	ss_icon = document.createElement("img");
	target = document.getElementById('social-share');
	ss_icon.src = chrome.extension.getURL("images/googleplus.png");
	ss_icon.className = "social-share-icon googleplus";
	target.appendChild(ss_icon);
	$('.googleplus').click(function() {
		var title = sel.replace(" ", "%20");
		var url = window.location.href;
		var link = "https://plus.google.com/share?url="+url;
		shareThis(link);
	});
}

createReddit = function() {
	ss_icon = document.createElement("img");
	target = document.getElementById('social-share');
	ss_icon.src = chrome.extension.getURL("images/reddit.png");
	ss_icon.className = "social-share-icon reddit";
	target.appendChild(ss_icon);
	$('.reddit').click(function() {
		var title = sel.replace(" ", "%20");
		var url = window.location.href;
		var link = "http://www.reddit.com/submit?url="+url+"&title="+title;
		shareThis(link);
	});
}

shareThis = function(link) {
	var w = 600;
	var h = 600;
	var left = (screen.width/2)-(w/2);
  	var top = (screen.height/2)-(h/2);
	window.open(link, "Social Share", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}


restoreOptions = function() {
    chrome.storage.sync.get({
        selectedMedia: [],
        mediaChosen: []
    }, function(items) {
    	createIcon();
        for (var i = 0; i < items.mediaChosen.length; i++) {
        	var media = items.mediaChosen[i];
        	if (media == 'twitter') {
        		createTwitter();
        	}
        	else if (media == 'facebook') {
        		createFacebook();
        	}
        	else if (media == 'linkedin') {
        		createLinkedin();
        	}
        	else if (media == 'googleplus') {
        		createGooglePlus();
        	}
        	else if (media == 'reddit') {
        		createReddit();
        	}
        }
    });
}
// document.addEventListener('DOMContentLoaded', restoreOptions());

window.onresize = function() {
	var scrollTop = window.pageYOffset;
	var scrollLeft = window.pageXOffset;
	w = rect.width;
	h = rect.height;
	x = scrollLeft + rect.right;
	y = scrollTop + rect.top + h;
};


