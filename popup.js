//get active tab
let currentTabParameters = {
	active: true,
	currentWindow: true
}

//---------------//
// ALL FUNCTIONS //
//---------------//

//send a message to delete the assets
function deleteStuff() {

	chrome.tabs.query(currentTabParameters, (tabs) => {
		const msg = "deleteAssets"
		chrome.tabs.sendMessage(tabs[0].id, msg);
	});
}

//send a message to rename the assets
function renameStuff() {
	chrome.tabs.query(currentTabParameters, (tabs) => {
		const msg = "renameAssets"
		chrome.tabs.sendMessage(tabs[0].id, msg);
	});
}

//-------------------//
//  EVENT LISTENERS  //
//-------------------//
document.getElementById('deleteButton').addEventListener('click', deleteStuff);
document.getElementById("renameButton").addEventListener('click', renameStuff);