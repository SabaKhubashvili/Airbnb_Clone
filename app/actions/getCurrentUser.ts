import { getServerSession } from "next-auth";
import {authOptions} from '@/pages/api/auth/[...nextauth]'
import prisma from '@/app/Libs/prismadb'

export async function GetSession(){
    return getServerSession(authOptions)
}

export default async function getCurrentUser(){
    const session = await GetSession()

    if(!session?.user?.email){
        return null;
    }
    const user =  await prisma.user.findUnique({
        where:{
            email:session.user.email
        }
    })

    if(!user){
        return null;
    }
    return {
        ...user,
        createdAt:user.createdAt.toISOString(),
        updatedAt:user.updatedAt.toISOString(),
        emailVerified:user.emailVerified?.toISOString(),
    };
}