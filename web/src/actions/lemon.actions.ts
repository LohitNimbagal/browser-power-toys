import { configureLemonSqueezy } from "@/config/lemonsqueezy"
import { assignToolAccess, getCurrentUser } from "./user.actions"
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js"

export async function getCheckoutURL(variantId: number, embed = false) {

    configureLemonSqueezy()

    const user = await getCurrentUser()

    if (!user) {
        throw new Error('User is not authenticated.')
    }

    // import { createCheckout } from '@lemonsqueezy/lemonsqueezy.js'
    const checkout = await createCheckout(
        process.env.LEMONSQUEEZY_STORE_ID!,
        variantId,
        {
            checkoutOptions: {
                embed,
                media: false,
                logo: !embed,
            },
            checkoutData: {
                email: user.email ?? undefined,
                custom: {
                    user_id: user.$id,
                },
            },
            productOptions: {
                enabledVariants: [variantId],
                redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/billing/`,
                receiptButtonText: 'Go to Dashboard',
                receiptThankYouNote: 'Thank you for signing up to Lemon Stand!',
            },
        }
    )

    console.log(checkout);

    return checkout.data?.data.attributes.url
}

export async function processWebhookEvent(webhookEvent: any) {

    configureLemonSqueezy()

    if (webhookEvent.event_name.startsWith('subscription_payment_')) {
        // Save subscription invoices; eventBody is a SubscriptionInvoice
        // Not implemented.
    } else if (webhookEvent.event_name.startsWith('subscription_')) {
        // Save subscription events; obj is a Subscription
        /* Not implemented */
    } else if (webhookEvent.event_name.startsWith('order_')) {
        if (webhookEvent.event_name === 'order_created') {
            await assignToolAccess(webhookEvent.custom_data.tool, webhookEvent.custom_data.user_id)
        }
    } else if (webhookEvent.event_name.startsWith('license_')) {
        // Save license keys; eventBody is a "License key"
        /* Not implemented */
    }
}

// export async function storeWebhookEvent(
//     event_name: string,
//     body: any,
// ) {

//     const { databases } = await createAdminClient()

//     try {
//         await databases.createDocument(
//             process.env.APPWRITE_DATABASE_ID!,
//             process.env.APPWRITE_COLLECTION_WAITINGLIST_ID!,
//             ID.unique(),
//             {
//                 userId: body.meta.userId,
//                 event_name: event_name,
//                 body: body
//             }
//         )

//         return { success: true, message: 'Successfully stored webhook event' }

//     } catch (error) {
//         console.error('Error storing webhook event:', error)
//         return { success: false, message: 'Error storing webhook event' }
//     }
// }