// show toast
function showToast(message) {
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
        document.head.appendChild(style);
    }

    // Show the toast with animation
    setTimeout(() => {
        toast.classList.add("show");
        // console.log("Toast now shown:", toast); // Debugging line
    }, 100);

    // Auto-hide the toast after 3 seconds
    setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => document.body.removeChild(toast), 1000); // Increased from 500 to 1000ms
    }, 3000);
}