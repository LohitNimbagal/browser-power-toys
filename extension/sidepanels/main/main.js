
chrome.runtime.sendMessage({ action: 'getAccessToken' }, async (response) => {

    console.log(response);

    if (response.accessToken) {
        // If cookie exists, show "Console" button
        document.getElementById('auth-buttons').style.display = 'none';
        document.getElementById('console-btn').style.display = 'block';
    } else {
        // If cookie does not exist, show Sign In and Sign Up buttons
        document.getElementById('auth-buttons').style.display = 'block';
        document.getElementById('console-btn').style.display = 'none';
    }

});
