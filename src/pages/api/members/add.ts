import {NextApiRequest, NextApiResponse} from "next";
import {UserService} from "../../../models/user/UserService";
import {FirebaseAdminService} from "../../../models/firestore/FirebaseAdminService";
import {User} from "../../../models/user/User";
import {MemberService} from "../../../models/member/MemberService";
import {Member} from "../../../models/member/Member";


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

