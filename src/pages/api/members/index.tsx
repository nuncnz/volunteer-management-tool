import {NextApiRequest, NextApiResponse} from "next";
import {FirebaseAdminService} from "../../../services/FirebaseAdminService";
import {Member} from "../../../models/db/Members";
import {MemberService} from "../../../services/MemberService";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const service = new MemberService(new FirebaseAdminService())
    const member = JSON.parse(req.body) as Member

    let newMember: Member | null

    if (member.id == null) {
        // create a new app user
        newMember = await service.addMember(member) || null
    } else {
        // update the existing app user
        newMember = await service.updateMember(member) || null
    }

    if (newMember) {
        res.status(200).send({user: newMember})
    } else {
        res.status(500).send({user: null})
    }
}

