import {NextApiRequest, NextApiResponse} from "next";
import {UserService} from "../../../services/UserService";
import {FirebaseAdminService} from "../../../services/FirebaseAdminService";
import {AppUser} from "../../../models/AppUser";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const service = new UserService(new FirebaseAdminService())

    const result = await service.addUser(new AppUser("michael", "howell", "jon"))

    res.status(200).send({ user: result})

}