import {NextApiRequest, NextApiResponse} from "next";
import {UserService} from "../../../services/data/UserService";
import {FirebaseAdminService} from "../../../services/firebase/FirebaseAdminService";
import {AppUser} from "../../../models/db/AppUser";
import {MemberService} from "../../../services/data/MemberService";
import {Member} from "../../../models/db/Members";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const service = new MemberService(new FirebaseAdminService())

    const member = JSON.parse(req.body) as Member

    const newMember = await service.addMember(member)

    if (newMember == undefined) {
        res.status(500).send({user: null})
    } else {
        res.status(200).send({user: newMember})
    }



}

