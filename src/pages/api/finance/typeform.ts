import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {TypeFormWebhook} from "../../../models/util/TypeFormWebhook";
import {SpendingRequest} from "../../../models/db/SpendingRequest";


const handler : NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const body = req.body as TypeFormWebhook

}

export default handler