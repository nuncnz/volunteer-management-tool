import {UserScope} from "../models/user/UserScope";
// eslint-disable-next-line @next/next/no-server-import-in-page
import {NextRequest, NextResponse} from "next/server";
import "./isSuccessful"

/**
 * Takes a required scope, plus a request with a body that contains a firebase token. The method determines if the user
 * has the provided scope or not.
 *
 * @param requiredScope
 * @param req
 * @param failRedirectPath
 * @param successRedirectPath
 */
export const scopedRoute = async (requiredScope: UserScope, req: NextRequest, failRedirectPath: string = "/403", successRedirectPath?: string) => {
    // If there is no cookie then take the user to the auth screen.
    if (req.cookies.token == null || req.cookies.token == "") {
        console.log("Token was blank")
        return NextResponse.redirect("/auth?redirect=" + req.nextUrl.pathname)
    }

    const fetchOptions = {
        method: "POST",
        body: JSON.stringify({
            token: req.cookies.token,
            scope: requiredScope
        })
    }

    const scopeResp = await fetch(req.nextUrl.protocol + "//" + req.nextUrl.host + "/api/auth/scope", fetchOptions)

    // If the scope request was successful check if they have the correct scope.
    if(scopeResp.status.isSuccessful()) {
        const respData = await scopeResp.json()
        const isValid: boolean = respData.validScope

        // If the scope is valid the redirect the user to the redirect screen.
        if(isValid) {
            return successRedirectPath ? NextResponse.redirect(successRedirectPath) : NextResponse.next()
        }
    }

    // If the scope request was unsuccessful or the user has the wrong scope, redirect them tto the failure screen.
    return NextResponse.redirect(failRedirectPath)

}