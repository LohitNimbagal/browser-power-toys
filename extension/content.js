function addIconToVideos() {
    const videos = document.querySelectorAll("ytd-rich-item-renderer");
    const url = 'https://browserpowertoys.xyz';

    videos.forEach((video) => {
        if (!video.querySelector(".youtube-icon-extension")) {
            const icon = document.createElement("img");
            const imageUrl = chrome.runtime.getURL("icons/save-image.png");
            icon.src = imageUrl;
            icon.alt = "YouTube Icon";
            icon.className = "youtube-icon-extension";

            // Styling for the icon
            icon.style.position = "absolute";
            icon.style.top = "9px";
            icon.style.left = "9px";
            icon.style.zIndex = "99";
            icon.style.width = "30px";
            icon.style.height = "30px";
            icon.style.opacity = "90%";
            icon.style.background = "black";
            icon.style.borderRadius = '20%';
            icon.style.transition = "transform 0.2s ease-in-out, opacity 0.2s ease-in-out"; // Smooth transition for scaling and opacity

            // Set cursor pointer and scale on hover
            icon.onmouseover = () => {
                icon.style.cursor = "pointer";
                icon.style.transform = "scale(1.1)"; // Slightly scale up
            };

            icon.onmouseout = () => {
                icon.style.transform = "scale(1)"; // Reset scale on mouse out
            };

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

                if (videoId) {
                    chrome.runtime.sendMessage({ action: "getAccessToken" }, async (response) => {
                        if (response.accessToken) {
                            const accessToken = response.accessToken;
                            try {
                                const playlistId = "PLuQs4_nl236Ekf9fExRDOyakP9hwflKpz";

                                const apiResponse = await fetch(`${url}/api/youtube/save-video`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${accessToken}`
                                    },
                                    body: JSON.stringify({
                                        playlistId: playlistId,
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
                                    showToast(`Failed to add video: ${data.error || 'Unknown error'}`);
                                }

                            } catch (error) {
                                console.error('An error occurred while adding video:', error);
                                showToast("An error occurred while adding the video.");
                            }

                        } else {
                            console.error('Error getting access token:', response.error);
                            showToast("Error getting access token.");
                        }
                    });
                } else {
                    console.error('Video ID not found');
                    showToast("Video ID not found.");
                }
            });

            video.appendChild(icon);
        }
    });
}

const observer = new MutationObserver(addIconToVideos);
observer.observe(document.body, { childList: true, subtree: true });

window.onload = addIconToVideos;

// Function to show toast notification with "Undo" option
function showToast(message) {
    console.log("Toast function called with message:", message); // Debugging line
    const toast = document.createElement("div");
    toast.className = "toast";

    // Message span
    const messageSpan = document.createElement("span");
    messageSpan.textContent = message;
    toast.appendChild(messageSpan);

    // Append toast to document body
    document.body.appendChild(toast); // Ensure this line is included

    // Inject toast styles if not already present
    if (!document.querySelector('#toastStyles')) {
        const style = document.createElement("style");
        style.id = 'toastStyles';
        style.textContent = `
            .toast {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #ffffff;
                color: #333;
                padding: 12px 16px;
                min-width: 200px;
                max-width: 300px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                position: fixed;
                bottom: 20px;
                left: 10%;
                transform: translateX(-50%);
                font-family: Arial, sans-serif;
                font-size: 14px;
                opacity: 0;
                transition: opacity 0.3s, transform 0.3s;
                z-index: 2030;
            }
            .toast.show {
                opacity: 1;
                transform: translateX(-50%);
            }
            .toast.fade-out {
                opacity: 0;
                transform: translate(-50%, 10px);
            }
            .toast-action {
                background: none;
                border: none;
                color: #1a73e8;
                cursor: pointer;
                font-weight: bold;
                padding: 0;
                margin-left: 10px;
            }
            .toast-action:hover {
                text-decoration: underline;
            }
        `;
        document.head.appendChild(style);
    }

    // Show the toast with animation
    setTimeout(() => {
        toast.classList.add("show");
        console.log("Toast now shown:", toast); // Debugging line
    }, 100);

    // Auto-hide the toast after 3 seconds
    setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => document.body.removeChild(toast), 1000); // Increased from 500 to 1000ms
    }, 3000);
}
