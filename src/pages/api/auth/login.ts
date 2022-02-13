import {NextApiRequest, NextApiResponse} from "next";
import {FirebaseAdminService} from "../../../services/firebase/FirebaseAdminService";
import {UserService} from "../../../services/data/UserService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token : string = JSON.parse(req.body).token

    if(token != null || undefined) {
        await new FirebaseAdminService().getAuth().verifyIdToken(token).then(async (decodedToken) => {
            if (decodedToken.email != null) {
                await new UserService(new FirebaseAdminService()).getUserByEmail(decodedToken.email!!).then(async (doc) => {
                    if (doc == undefined || null) {
                        res.status(200).send({user: null})
                    } else {
                        if (doc.googleUid == null || undefined) {
                            doc.googleUid = decodedToken.uid
                            await new UserService(new FirebaseAdminService()).updateUser(doc).then(async (user) => {
                                if (user != undefined) {
                                    res.status(200).send({user: user})
                                } else {
                                    res.status(500).send({user: null})
                                }
                            })
                        } else {
                            res.status(200).send({user: doc})
                        }
                    }
                })
            }
        })
    }
}