'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { requestAccess } from "@/actions/user.actions"

export function RequestAccessDialog({ email }: { email: string }) {

    const onSubmit = async () => {

        const response = await requestAccess()

        if (response.success) {
            toast({
                title: "Access Requested",
                description: response.message
            })
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: response.message
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">Request Access</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] space-y-4">
                <p className="text-base text-red-500">
                    We&apos;re currently in beta! Some features may be limited, and your feedback is greatly appreciated as we continue to enhance the experience.
                </p>
                <p className="text-base">
                    We will update you at your email (<span className="font-semibold">{email}</span>) with any new updates.
                </p>
                <form action={onSubmit}>
                    <Button className="w-full">Request Access</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
