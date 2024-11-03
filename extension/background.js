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
