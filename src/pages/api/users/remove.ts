import {NextApiRequest, NextApiResponse} from "next";
import {UserService} from "../../../models/user/UserService";
import {FirebaseAdminService} from "../../../models/firestore/FirebaseAdminService";
import {User} from "../../../models/user/User";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const service = new UserService(new FirebaseAdminService())

    const user = JSON.parse(req.body) as {appUser: string, authedUser: string}

    const activeUser = await service.getUserByUid(user.authedUser)

    if (activeUser && activeUser.id == user.appUser) {
        res.status(500).send(null)
    } else {
        await service.removeUser(user.appUser)
        res.status(200).send(null)
    }








}

