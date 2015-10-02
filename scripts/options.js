// Saves options to chrome.storage
function save_options() {

    var checkboxes = document.getElementsByName('socialmedia');
	var selected = [];
	var media = [];
	for (var i=0; i<checkboxes.length; i++) {
	    if (checkboxes[i].checked) {
	        selected.push(i);
	        media.push(checkboxes[i].value);
	    }
	}

	console.log(media);

    chrome.storage.sync.set({
        selectedMedia: selected,
        mediaChosen: media
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        selectedMedia: [],
        mediaChosen: []
    }, function(items) {
        var checkboxes = document.getElementsByName('socialmedia');
		for (var i=0; i<items.selectedMedia.length; i++) {
			checkboxes[items.selectedMedia[i]].checked = true;
		}
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);