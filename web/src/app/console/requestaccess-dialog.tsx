'use client'

import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { requestAccess } from "@/actions/auth.actions"
import { toast } from "@/hooks/use-toast"

export function RequestAccessDialog() {

    const onSubmit = async () => {

        const response = await requestAccess()

        if (response.success) {
            toast({
                title: "Uh oh! Something went wrong.",
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
                    We will update you at your email (<span className="font-semibold">email@example.com</span>) with any new updates.
                </p>
                <form action={onSubmit}>
                    <Button className="w-full">Request Access</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
