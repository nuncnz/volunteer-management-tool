import {NextApiRequest, NextApiResponse} from "next";
import {FirebaseAdminService} from "../../../services/FirebaseAdminService";
import {UserService} from "../../../services/UserService";
import {AppUser, AppUserConverter} from "../../../models/db/AppUser";
import {UserScope} from "../../../models/db/sub-types/UserScope";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token : string = JSON.parse(req.body).token

    if(token != null || undefined) {
        await new FirebaseAdminService().getAuth().verifyIdToken(token).then(async (decodedToken) => {
            console.log("1")
            if (decodedToken.email != null) {
                console.log("2")
                await new UserService(new FirebaseAdminService()).getUserByEmail(decodedToken.email!!).then(async (doc) => {
                    console.log("3")
                    if (doc == undefined || null) {
                        console.log("4")
                        res.status(200).send({user: null})
                    } else {
                        console.log("5")
                        if (doc.googleUid == null || undefined) {
                            console.log("6")
                            doc.googleUid = decodedToken.uid
                            await new UserService(new FirebaseAdminService()).updateUser(doc).then(async (user) => {
                                console.log("7")
                                if (user != undefined) {
                                    console.log("8")
                                    res.status(200).send({user: user})
                                } else {
                                    console.log("9")
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