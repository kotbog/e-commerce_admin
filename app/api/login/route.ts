import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import {signJwtToken} from "@/lib/jwt";

export async function POST(request: Request) {
    try {
        await dbConnect(); // connecting DB
        const userData = await request.json();
        const existUser = await User.findOne({email: userData.email});
        if(!existUser) {
            return NextResponse.json({message: 'There is no user with such email'});
        }
        const verifyPassword = await bcrypt.compare(userData.password, existUser.password);
        if(verifyPassword) {
            const {password, ...userInfo} = existUser;
            const accessToken = signJwtToken(userInfo, {expiresIn: '5d'});
            return NextResponse.json({token: accessToken, ...userInfo});
        }
    } catch (e) {
        console.error(e);
    }
}