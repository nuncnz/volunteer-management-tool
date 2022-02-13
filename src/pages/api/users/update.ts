import {NextApiRequest, NextApiResponse} from "next";
import {UserService} from "../../../services/data/UserService";
import {FirebaseAdminService} from "../../../services/firebase/FirebaseAdminService";
import {AppUser} from "../../../models/db/AppUser";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const service = new UserService(new FirebaseAdminService())

    const user = JSON.parse(req.body) as AppUser





}

