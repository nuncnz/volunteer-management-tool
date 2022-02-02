import {NextApiRequest, NextApiResponse} from "next";
import {FirebaseAdminService} from "../../../services/FirebaseAdminService";
import {UserService} from "../../../services/UserService";
import {AppUser} from "../../../models/db/AppUser";
import {UserScope} from "../../../models/db/UserScope";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token : string = JSON.parse(req.body).token

    if(token != null || undefined) {
        await new FirebaseAdminService().getAuth().verifyIdToken(token).then(async (decodedToken) => {
            await new UserService(new FirebaseAdminService()).getUserByUid(decodedToken.uid).then(async (doc) => {
                if (doc == undefined || null) {
                    const newUser = new AppUser("", "", decodedToken.email!, null, null, decodedToken.uid, [UserScope.AUTHED], decodedToken.picture!)
                    await new UserService(new FirebaseAdminService()).addUser(newUser).then((user) => {
                        console.log("We made it here")
                        if (user) {
                            res.status(200).send({user: user})
                        } else {
                            res.status(500).send({user: null})
                        }
                    })
                } else {
                    res.status(200).send({user: doc})
                }
            })
        })
    }
}