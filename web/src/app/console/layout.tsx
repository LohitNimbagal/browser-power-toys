import React, { ReactNode } from 'react'
import ConsoleHeader from './_components/console-header'
import { ThemeProvider } from '@/components/theme-provider'


export default function ConsoleLayout({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
        >
            <div className={"flex flex-col min-h-screen"}>
                <ConsoleHeader />
                <main className="flex-grow flex items-start justify-center p-4">
                    {children}
                </main>
                {/* <ConsoleFooter /> */}
            </div>
        </ThemeProvider>
    )
}
