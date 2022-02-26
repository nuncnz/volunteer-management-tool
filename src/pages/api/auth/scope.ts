import {NextApiRequest, NextApiResponse} from "next";
import {FirebaseAdminService} from "../../../models/firestore/FirebaseAdminService";
import {UserService} from "../../../models/user/UserService";
import {UserScope} from "../../../models/user/UserScope";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body)

    if(body.token != null || undefined) {
        await new FirebaseAdminService().getAuth().verifyIdToken(body.token).then(async (decodedToken) => {
            await new UserService(new FirebaseAdminService()).getUserByUid(decodedToken.uid).then((doc) => {
                if (doc == undefined || null) {
                    res.status(500).send({validScope: false})
                } else {
                    if (doc.scope?.includes(body.scope) || doc.scope?.includes(UserScope.ADMIN)) {
                        res.status(200).send({validScope: true})
                    } else {
                        res.status(500).send({validScope: false})
                    }
                }
            })
        })
    } else {
        res.status(500).send({validScope: false})
    }
}