console.log("from content script!");

//--------------------------------------------------------//
//receive message from the buttons in POPUP.HTML & POPUP.JS
//--------------------------------------------------------//
chrome.runtime.onMessage.addListener(gotMessage);
GetAssetsNames();

//---------------//
// ALL FUNCTIONS //
//---------------//

//this function will detect the message from popup.js and execute functions below accordingly
function gotMessage(message, sender, sendResponse) {
    if (message == "deleteAssets") {
        DeleteAllAssets();
    }
    else if (message == "renameAssets") {
        RenameAllAssets();
    }
    else {
        console.log("nope");
    }
}

//this function will delete all assets from a bynder job
function DeleteAllAssets() {

    //get all items
    let items = document.getElementsByClassName("remove-button new-stage-asset-remove")

    //check if there are any items, if so, then delete them
    if (items.length > 0) {
        for (let x = 0; x < items.length; x++) {
            items[x].click()
            document.getElementsByClassName("dialogbutton dialog-confirm action-btn blue right")[0].click();
        }
    }
    else {
        alert("Nothing to delete");
    }
}

//this function will add a suffix to all items
function RenameAllAssets() {

    //get all names
    let items = document.getElementsByClassName("edit-name-button")
    let itemsInputs = document.getElementsByClassName("asset-name full parsley-validated")
    let saveButtons = document.getElementsByClassName("asset-edit-save")

    let suffixToAdd = prompt("Add suffix for all assets")

    //rename all of them
    if (suffixToAdd) {
        for (let x = 0; x < items.length; x++) {
            items[x].click()
            itemsInputs[x].value = itemsInputs[x].value + suffixToAdd
            saveButtons[x].click()
        }
    }
}

//this function will send all the assets to the background script which then will send them to the popup.js
function GetAssetsNames() {
    let itemsInputs = document.getElementsByClassName("asset-name full parsley-validated")
    let itemsList = "";

    for (let x = 0; x < itemsInputs.length; x++) {
        itemsList += itemsInputs[x].value + "\n";
    }

    chrome.runtime.sendMessage({
        mess: "assetsData",
        data: itemsList
    });
}
