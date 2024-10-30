import React, { ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import { useFormStatus } from 'react-dom'
import { LoaderCircle } from 'lucide-react'

export default function FormButton({ children }: { children: ReactNode }) {

    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending} className="w-full">
            {children}
            {pending ? <LoaderCircle className='size-5 animate-spin' /> : null}
        </Button>
    )
}
