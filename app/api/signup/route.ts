import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import {NextResponse} from "next/server";


export async function POST(request: Request) {
    try {
        await dbConnect(); // connecting DB
        const userData = await request.json();
        const existUser = await User.findOne({email: userData.email});
        if(existUser) {
            return NextResponse.json({error: true, message: 'User already exists.'});
        }
        const {password, ...user} = await User.create(userData);
        return NextResponse.json({error: false, message: 'User successfully signed up.', ...user});
    } catch (e) {
        console.error(e)
    }
}

//
// export async function POST() {
//     try {
//
//     }catch (e) {}
// }
