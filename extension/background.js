chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    const url = 'https://browserpowertoys.xyz/'

    if (request.action === "getAccessToken") {

        chrome.cookies.get({ url: url, name: "bpt-session" }, (cookie) => {

            if (cookie) {
                sendResponse({ accessToken: cookie.value });
            } else {

                const youtubePowerToolsUrl = "https://browserpowertoys.xyz/"; // Replace with the actual URL

                chrome.tabs.create({ url: youtubePowerToolsUrl }, (newTab) => {
                    console.log("Opened YouTube PowerTools site:", newTab);
                });

                sendResponse({ accessToken: null });
            }

        });

        return true;
    }
});
