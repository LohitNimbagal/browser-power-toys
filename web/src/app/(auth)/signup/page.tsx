import React from 'react'
import SignUpForm from './signup-form'
import { getCurrentUser } from '@/actions/user.actions'
import { redirect } from 'next/navigation'

export default async function page() {

        const user = await getCurrentUser()

        if (user) redirect('/')

        return <SignUpForm />
}
