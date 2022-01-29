import type { NextFetchEvent, NextRequest } from 'next/server'
import {NextResponse} from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {


    // Get token and send to api to check if the user should be allowed on this page

    console.log("Middleware Activated")
    console.log(req.cookies.token)

    if (!req.cookies.token) {
        return NextResponse.redirect("/auth")
    }

}