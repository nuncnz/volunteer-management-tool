import {NextApiRequest, NextApiResponse} from "next";
import {FirebaseAdminService} from "../../../services/FirebaseAdminService";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    new FirebaseAdminService().getAuth().verifyIdToken(req.body.token)
}