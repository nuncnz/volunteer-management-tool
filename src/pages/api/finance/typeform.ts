import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {TypeFormWebhook} from "../../../models/util/TypeFormWebhook";
import {SpendingRequest} from "../../../models/db/SpendingRequest";
import {TypeFormReference} from "../../../models/util/TypeFormReference";
import {now} from "lodash";
import {SpendingRequestService} from "../../../services/data/SpendingRequestService";
import {FirebaseAdminService} from "../../../services/firebase/FirebaseAdminService";

interface Answers {
    email: string,
}

const handler : NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const service = new SpendingRequestService(new FirebaseAdminService())

    const body = req.body as TypeFormWebhook

    const findAnswer = <T>(ref: string) : T => {
        const resp = body.form_response.answers.find((answer) => {
            return answer.field.ref == ref
        })

        if (resp!!.type != "choice") {
            // @ts-ignore
            return resp[resp.type] as T
        } else {
            // @ts-ignore
            return resp[resp.type].label as T
        }

    }

    const request = new SpendingRequest({
                                            amount: findAnswer(TypeFormReference.AMOUNT) || "",
                                            date: findAnswer(TypeFormReference.DATE) || "",
                                            doc: findAnswer(TypeFormReference.DOCS) || "",
                                            gstInclusive: findAnswer(TypeFormReference.GST) || false,
                                            link: findAnswer(TypeFormReference.LINKS) || "",
                                            requiredApprovers: 2,
                                            spendingDetails: findAnswer(TypeFormReference.SPENDING_DETAILS) || "",
                                            spendingReason: findAnswer(TypeFormReference.REASON) || "",
                                            submitTimeStamp: now(),
                                            submitter: findAnswer(TypeFormReference.EMAIL) || "",
                                            budget: findAnswer(TypeFormReference.BUDGET) || findAnswer(TypeFormReference.BUDGET_CUSTOM) || "",
                                        })

    await service.addSpendingRequest(request).then((resp) => {
        if (resp != undefined) {
            res.status(200).send(resp)
        } else {
            res.status(500).send(null)
        }
    })

}

export default handler