import {NextApiRequest, NextApiResponse} from "next";
import {UserService} from "../../../services/UserService";
import {FirebaseAdminService} from "../../../services/FirebaseAdminService";
import {AppUser} from "../../../models/db/AppUser";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const service = new UserService(new FirebaseAdminService())

    const user = JSON.parse(req.body) as AppUser

    const newUser = await service.addUser(user)

    if (newUser == undefined) {
        res.status(500).send({user: null})
    } else {
        res.status(200).send({user: newUser})
    }
    
}

