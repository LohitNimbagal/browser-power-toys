function addIconToVideos() {

    const videos = document.querySelectorAll("ytd-rich-grid-media,  ytd-compact-video-renderer");
    const url = 'https://browserpowertoys.xyz';

    videos.forEach((video) => {

        if (!video.querySelector(".youtube-icon-extension")) {

            const icon = document.createElement("img");
            const imageUrl = chrome.runtime.getURL("icons/bookmark.svg");
            icon.src = imageUrl;
            icon.alt = "YouTube Icon";
            icon.className = "youtube-icon-extension"; // Add the class for styling

            // Click event for saving video
            icon.addEventListener("click", async (event) => {
                event.stopPropagation();

                let videoId = "";
                const anchor = video.querySelector("a#thumbnail");

                if (anchor && anchor.href) {
                    const href = anchor.href;
                    const videoIdMatch = href.match(/[?&]v=([^&]+)/);
                    if (videoIdMatch) {
                        videoId = videoIdMatch[1];
                    }
                }

                if (!videoId) {
                    showToast("Video ID not found.");
                    console.error('Video ID not found');
                    return;
                }

                chrome.runtime.sendMessage({ action: "getAccessToken" }, async (response) => {

                    if (!response || !response.accessToken) {
                        console.error('Error getting access token:', response ? response.error : "No response");
                        showToast("Error getting access token. Redirecting to login...");

                        // Open a new link to the login page
                        window.open('https://browserpowertoys.xyz/signin', '_blank');  // Replace with your actual login URL
                        return;
                    }

                    const accessToken = response.accessToken;

                    try {
                        // Make API request to save the video
                        const apiResponse = await fetch(`${url}/api/youtube/monthly-playlist/add`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${accessToken}`
                            },
                            body: JSON.stringify({
                                videoId: videoId
                            }),
                            credentials: 'include'
                        });

                        const data = await apiResponse.json();

                        if (apiResponse.ok) {
                            console.log('Video added successfully to Playlist:', data.savedVideoInfo.addedToPlaylist);
                            showToast(`Saved to ${data.savedVideoInfo.addedToPlaylist}`);
                        } else {
                            console.error('Failed to add video:', data.error || 'Unknown error');
                            handleApiError(data);  // Use the error handling function for specific error codes
                        }

                    } catch (error) {
                        console.error('An error occurred while adding video:', error);
                        showToast("An error occurred while adding the video.");
                    }
                });

            });

            video.appendChild(icon);
        }
    });
}


const observer = new MutationObserver(addIconToVideos);
observer.observe(document.body, { childList: true, subtree: true });

window.onload = addIconToVideos;


