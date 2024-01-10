import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        await dbConnect(); // connecting DB
        const userData = await request.json();
        const existUser = await User.findOne({email: userData.email});
        if(!existUser) {
            return NextResponse.json({status:400, message: 'There is no user with such email'});
        }
        const verifyPassword = await bcrypt.compare(userData.password, existUser.password);
        if(verifyPassword) {
            const {password, ...userInfo} = existUser;
            return NextResponse.json({ status: 200, message: "User signed in successfully", user: {...userInfo._doc} });
        }
    } catch (e) {
        console.error(e);
    }
}