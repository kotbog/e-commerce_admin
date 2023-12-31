import jwt from 'jsonwebtoken';
import {JWTPayload} from "jose";

export function signJwtToken(payload: JWTPayload, opts: {expiresIn: string}) {
    return jwt.sign(payload, process.env.AUTH_SECRET, opts);
}
export function verifyJwtToken(token: string) {
    try {
        const auth_secret = process.env.AUTH_SECRET;
        return jwt.verify(token, auth_secret);
    }catch (e) {
        console.error(e);
        return null;
    }
}