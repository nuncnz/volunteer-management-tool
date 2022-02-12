import {NextApiRequest, NextApiResponse} from "next";
import {UserService} from "../../../services/UserService";
import {FirebaseAdminService} from "../../../services/FirebaseAdminService";
import {AppUser} from "../../../models/db/AppUser";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const service = new UserService(new FirebaseAdminService())
    const user = JSON.parse(req.body) as AppUser

    let newUser: AppUser | null

    if (user.id == null) {
        // create a new app user
        newUser = await service.addUser(user) || null
    } else {
        // update the existing app user
        newUser = await service.updateUser(user) || null
    }

    if (newUser) {
        res.status(200).send({user: newUser})
    } else {
        res.status(500).send({user: null})
    }
}

