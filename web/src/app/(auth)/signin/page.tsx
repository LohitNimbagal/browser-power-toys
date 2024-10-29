import React from 'react'
import SignInForm from './signin-form'
import { getCurrentUser } from '@/actions/user.actions'
import { redirect } from 'next/navigation'

export default async function page() {

    const betaTesting = process.env.BETA_TESTING

    if (betaTesting === 'testing') {
        redirect('/waitinglist')
    }

    const user = await getCurrentUser()

    if (user) redirect('/console')

    return <SignInForm />
}
