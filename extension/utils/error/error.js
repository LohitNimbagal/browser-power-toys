
function handleApiError(errorData) {
    switch (errorData.code) {
        case 'VIDEO_ID_MISSING':
            showToast('VIDEO_ID_MISSING');
            break;
        case 'AUTH_HEADER_INVALID':
            showToast('AUTH_HEADER_INVALID');
            break;
        case 'SESSION_TOKEN_MISSING':
            showToast('SESSION_TOKEN_MISSING');
            window.open('https://browserpowertoys/signin', '_blank');
            break;
        case 'USER_NOT_FOUND':
            showToast('USER_NOT_FOUND');
            window.open('https://browserpowertoys/signup', '_blank');
            break;
        case 'BETA_ACCESS_REQUIRED':
            showToast('BETA_ACCESS_REQUIRED');
            window.open('https://browserpowertoys/waitinglist', '_blank');
            break;
        case 'YPT_ACCESS_REQUIRED':
            showToast('YPT_ACCESS_REQUIRED');
            window.open('https://browserpowertoys/tools/youtube', '_blank');
            break;
        case 'YOUTUBE_TOKENS_NOT_FOUND':
            showToast('YOUTUBE_TOKENS_NOT_FOUND');
            window.open('https://browserpowertoys/console', '_blank');
            break;
        case 'TOKEN_REFRESH_FAILED':
            showToast('TOKEN_REFRESH_FAILED');
            window.open('https://browserpowertoys/console', '_blank');
            break;
        case 'DB_QUERY_FAILED':
            showToast('DB_QUERY_FAILED');
            break;
        case 'UNKNOWN_ERROR':
        default:
            showToast(`UNKNOWN_ERROR: ${errorData.error || 'Unknown error'}`);
            break;
    }
}