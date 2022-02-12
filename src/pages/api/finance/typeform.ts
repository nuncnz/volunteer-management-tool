import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {TypeFormWebhook, TypeFormWebhookResp} from "../../../models/util/TypeFormWebhook";


const handler : NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const webhook = new TypeFormWebhook(req.body as TypeFormWebhookResp)

    console.log(webhook)

    res.status(200).send(null)

}

export default handler