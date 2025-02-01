chrome.runtime.onInstalled.addListener(() => {
    // chrome.action.setBadgeText({
    //   text: "ON",
    // });
});

chrome.action.onClicked.addListener((tab) => {
  openExtensionIconClick();
});

function openExtensionIconClick() {
  chrome.tabs.create({ url: "https://web.whatsapp.com?mode=ak-popup" });
}