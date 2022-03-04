import {NextApiRequest, NextApiResponse} from "next";
import {DI} from "../../../di/DI";
import {UserScope} from "../../../models/user/UserScope";

/**
 * This handles the 'api/auth/scope' endpoint.
 *
 * Will take a token and scope passed through the body, and check whether the user associated with the token has
 * an equal or higher scope.
 *
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // Get the body and then token and scope.
    const body = JSON.parse(req.body) as {token: string, scope: string}
    const token = body.token
    const scope = body.scope

    // If the token is null, something went wrong, send back a 500 error.
    if (token == null) {
        console.log("No token")
        res.status(500).json({ message: "The Token was invalid." })
        return
    }

    // Get the decoded token.
    const decodedToken = await DI.FirebaseAdminService.getAuth().verifyIdToken(token!!)
    // Get the user from the token
    const user = await DI.UserService.getUserByUid(decodedToken.uid)

    // If the user is undefined that means it wasn't found, therefore something went wrong so send back a 500 error.
    if (user == undefined) {
        res.status(500).json({ message: "There was an issue fetching the users data." })
        return
    }

    // If the users scope matches the given scope then return a success.
    if (user!!.scope?.includes(UserScope[scope as keyof typeof UserScope])) {
        res.status(200).json({ validScope: true })
        return
    }

    res.status(200).json({ validScope: false })
    return
}