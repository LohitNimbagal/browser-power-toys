chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    const url = 'http://localhost:3000/'

    if (request.action === "getAccessToken") {

        chrome.cookies.get({ url: url, name: "bpt-session" }, (cookie) => {

            if (cookie) {
                sendResponse({ accessToken: cookie.value });
            } else {

                const youtubePowerToolsUrl = "http://localhost:3000"; // Replace with the actual URL

                chrome.tabs.create({ url: youtubePowerToolsUrl }, (newTab) => {
                    console.log("Opened YouTube PowerTools site:", newTab);
                });

                sendResponse({ accessToken: null });
            }

        });

        return true;
    }
});
