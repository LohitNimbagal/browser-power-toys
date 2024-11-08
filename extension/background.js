chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

const welcomePage = 'sidepanels/welcome/welcome.html';
const mainPage = 'sidepanels/main/main.html';

chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
    chrome.sidePanel.setOptions({ path: welcomePage });
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {

    // Get the current tab's URL
    const tab = await chrome.tabs.get(tabId);
    const url = tab.url;

    if (url.includes('browserpowertoys.xyz')) {
        chrome.sidePanel.setOptions({
            path: mainPage,
            enabled: false
        });
    } else {
        chrome.sidePanel.setOptions({
            path: mainPage,
            enabled: true
        });
    }

});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    const url = 'https://browserpowertoys.xyz'

    if (request.action === "getAccessToken") {

        chrome.cookies.get({ url: url, name: "bpt-session" }, (cookie) => {

            if (cookie) {
                sendResponse({ accessToken: cookie.value });
            } else {
                sendResponse({ accessToken: null });
            }

        });

        return true;
    }
});
