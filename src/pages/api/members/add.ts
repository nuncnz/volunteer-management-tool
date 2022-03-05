import {NextApiRequest, NextApiResponse} from "next";
import {FirebaseAdminService} from "../../../models/firestore/FirebaseAdminService";
import {MemberService} from "../../../models/member/MemberService";
import {Member} from "../../../models/member/Member";
import {DI} from "../../../di/DI";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const member = Member.fromObj(JSON.parse(req.body))
    const newMember = await DI.MemberService.addMember(member)

    if (newMember == undefined) {
        res.status(500).send({user: null})
    } else {
        res.status(200).send({user: newMember})
    }

}

