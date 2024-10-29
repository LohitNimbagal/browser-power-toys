import React from 'react'
import SignUpForm from './signup-form'
import { getCurrentUser } from '@/actions/user.actions'
import { redirect } from 'next/navigation'

export default async function page() {

        const betaTesting = process.env.BETA_TESTING

        if (betaTesting) {
                redirect('/waitinglist')
        }

        const user = await getCurrentUser()

        if (user) redirect('/console')

        return <SignUpForm />
}
