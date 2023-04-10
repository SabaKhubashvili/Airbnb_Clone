import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from '@/app/Libs/prismadb'



interface IParams{
    propertiesId:string
}

export async function DELETE(request:Request,{params}:{params:IParams}){
    const {propertiesId} = params;
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    if(!propertiesId || typeof propertiesId !== 'string'){
        throw new Error('Invalid Id')
    }

    const properties = await prisma.listing.deleteMany({
        where:{
            id:propertiesId,
            userId:currentUser.id
        },
    })
    return NextResponse.json(properties)
}