import {UserScope} from "../models/db/UserScope";
// eslint-disable-next-line @next/next/no-server-import-in-page
import {NextRequest, NextResponse} from "next/server";

export const scopedRoute = async (requiredScope: UserScope, req: NextRequest, failRedirectPath: string = "/403", successRedirectPath?: string) => {
    if (req.cookies.token == "") {
        return NextResponse.redirect("/auth?redirect=" + req.nextUrl.pathname)
    } else {
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify({
                token: req.cookies.token,
                scope: requiredScope
            })
        }

        return await fetch(req.nextUrl.protocol + "//" + req.nextUrl.host + "/api/auth/scope", fetchOptions).then(async (res) => {
            const resJson = await res.json()
            if (resJson.validScope == false) {
                return NextResponse.redirect(failRedirectPath)
            } else {
                return successRedirectPath ? NextResponse.redirect(successRedirectPath) : NextResponse.next()
            }
        })
    }
}