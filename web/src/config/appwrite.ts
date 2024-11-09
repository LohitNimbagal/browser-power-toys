import 'server-only'

import { Client, Account, Databases, Query, Users } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export async function createAdminClient() {

    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT_ID!)
        .setProject(process.env.APPWRITE_PROJECT_ID!)
        .setKey(process.env.APPWRITE_KEY!);

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
        get users() {
            return new Users(client);
        },
    };
}

// export async function createSessionClient() {

//     const client = new Client()
//         .setEndpoint(process.env.APPWRITE_ENDPOINT_ID!)
//         .setProject(process.env.APPWRITE_PROJECT_ID!);

//     const session = await cookies().get("bpt-session")

//     if (!session) redirect('/signin')

//     client.setSession(session.value);

//     return {
//         get account() {
//             return new Account(client);
//         },
//         get databases() {
//             return new Databases(client);
//         },
//     };
// }

// export async function createSessionClientWithSession(session: string) {

//     if (!session) {
//         console.log("Session required to create Session Client")
//         return {
//             get account() {
//                 return null
//             },
//             get databases() {
//                 return null
//             },
//         };
//     }

//     const client = new Client()
//         .setEndpoint(process.env.APPWRITE_ENDPOINT_ID!)
//         .setProject(process.env.APPWRITE_PROJECT_ID!)
//         .setSession(session);

//     return {
//         get account() {
//             return new Account(client);
//         },
//         get databases() {
//             return new Databases(client);
//         },
//     };
// }

export async function createSessionClient(session?: string) {

    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT_ID!)
        .setProject(process.env.APPWRITE_PROJECT_ID!);

    if (!session) {
        const cookieSession = await cookies().get("bpt-session");
        if (!cookieSession) {
            redirect('/signin');
            // return createPlaceholderClient(); // Return placeholder instead of null
        }
        session = cookieSession.value;
    }

    client.setSession(session);

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
    };
}

// function createPlaceholderClient() {
//     return {
//         get account() {
//             return {
//                 create: () => console.warn("No session available"),
//                 update: () => console.warn("No session available"),
//                 delete: () => console.warn("No session available"),
//                 // Add other methods as needed with warning messages
//             };
//         },
//         get databases() {
//             return {
//                 listDocuments: () => console.warn("No session available"),
//                 createDocument: () => console.warn("No session available"),
//                 // Add other methods as needed with warning messages
//             };
//         },
//     };
// }