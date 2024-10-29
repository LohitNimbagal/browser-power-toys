'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import YoutubeToast from './youtube-save-toast';

interface ToastContextType {
    showToast: (message: string, actionText?: string, actionCallback?: () => void) => void;
    hideToast: () => void;
}

interface ToastState {
    message: string;
    actionText: string;
    isVisible: boolean;
    actionCallback: (() => void) | null;
}

interface ToastProviderProps {
    children: ReactNode;
}

// Initialize the context with an empty default object to satisfy TypeScript
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function YouTubeToastProvider({ children }: ToastProviderProps) {
    const [toast, setToast] = useState<ToastState>({
        message: '',
        actionText: '',
        isVisible: false,
        actionCallback: null,
    });

    const showToast = (message: string, actionText = "Undo", actionCallback: (() => void) | null = null) => {
        setToast({ message, actionText, isVisible: true, actionCallback });

        // Automatically hide toast after 3 seconds
        setTimeout(() => setToast(prevToast => ({ ...prevToast, isVisible: false })), 3000);
    };

    const hideToast = () => {
        setToast(prevToast => ({ ...prevToast, isVisible: false }));
    };

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            {toast.isVisible && (
                <YoutubeToast
                    message={toast.message}
                    actionText={toast.actionText}
                    actionCallback={() => {
                        if (toast.actionCallback) toast.actionCallback();
                        hideToast();
                    }}
                />
            )}
        </ToastContext.Provider>
    );
}

// Custom hook to use the ToastContext
export const useYouTubeToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useYoutubeToast must be used within a ToastProvider");
    }
    return context;
};
