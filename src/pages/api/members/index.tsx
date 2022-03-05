import {NextApiRequest, NextApiResponse} from "next";
import {Member} from "../../../models/member/Member";
import {DI} from "../../../di/DI";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const member = Member.fromObj(JSON.parse(req.body))

    if (member.id == null) {
        // create a new app user
        await DI.MemberService.addMember(member).then((member) => {
            if (member != undefined) {
                res.status(200).json({member: member})
            }
        })
        return
    } else {
        // update an existing member
        await DI.MemberService.updateMember(member).then((member) => {
            if (member != undefined) {
                res.status(200).json({member: member})
            }
        })
    }

    res.status(200).json({member: null})
}

