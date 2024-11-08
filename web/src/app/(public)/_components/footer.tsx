import React from 'react'

export default function Footer() {
    return (
        <footer className="py-4 bg-background">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; 2024 Browser Power Toys. All rights reserved.</p>
                <div className="mt-2">
                    <a href="/privacy-policy" className="text-[#6c2ced] hover:underline">Privacy Policy</a> |
                    <a href="/terms-and-conditions" className="text-[#6c2ced] hover:underline"> Terms and Conditions</a>
                </div>
            </div>
        </footer>
    )
}
