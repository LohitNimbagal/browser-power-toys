import React from 'react'

export default function Footer() {
    return (
        <footer className="py-4">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; 2023 YouTube Power Tools. All rights reserved.</p>
                <div className="mt-2">
                    <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a> |
                    <a href="/terms-and-conditions" className="text-blue-500 hover:underline"> Terms and Conditions</a>
                </div>
            </div>
        </footer>
    )
}
