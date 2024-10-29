'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'
import { addToWaitlist } from '@/actions/auth.actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function WaitlistForm() {

    const [state, formAction] = useFormState(addToWaitlist, null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true)
        await formAction(formData)
        setIsSubmitting(false)
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className='text-2xl'>Join Our Waitlist</CardTitle>
                <CardDescription>Be the first to know when we launch!</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                {state && (
                    <div className={`flex items-center ${state.success ? 'text-green-600' : 'text-red-600'}`}>
                        {state.success ? <CheckCircle2 className="mr-2" /> : <AlertCircle className="mr-2" />}
                        <p>{state.message}</p>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}