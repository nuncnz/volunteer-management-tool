import {NextApiRequest, NextApiResponse} from "next";
import {UserService} from "../../../models/user/UserService";
import {FirebaseAdminService} from "../../../models/firestore/FirebaseAdminService";
import {User} from "../../../models/user/User";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const service = new UserService(new FirebaseAdminService())

    const user = JSON.parse(req.body) as User

    const newUser = await service.addUser(user)

    if (newUser == undefined) {
        res.status(500).send({user: null})
    } else {
        res.status(200).send({user: newUser})
    }
    
}

