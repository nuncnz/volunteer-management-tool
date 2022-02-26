import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {TypeFormWebhook, TypeFormWebhookProps} from "../../../models/typeform/TypeFormWebhook";
import {SpendingRequest} from "../../../models/spending-request/SpendingRequest";
import {SpendingRequestTFRef} from "../../../models/spending-request/SpendingRequestTFRef";
import {now} from "lodash";
import {SpendingRequestService} from "../../../models/spending-request/SpendingRequestService";
import {FirebaseAdminService} from "../../../models/firestore/FirebaseAdminService";

/**
 * Handles `/api/finance/typeform`
 *
 * Creates a spending request given the correct Typeform parameters.
 */
const handler : NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    // The service used to access the spending request data.
    const spendingRequestService = new SpendingRequestService(new FirebaseAdminService())

    const webhook = new TypeFormWebhook(req.body as TypeFormWebhookProps)

    const request = new SpendingRequest({
                                            amount: webhook.findAnswer(SpendingRequestTFRef.AMOUNT)!!,
                                            date: webhook.findAnswer(SpendingRequestTFRef.DATE)!!,
                                            doc: webhook.findAnswer(SpendingRequestTFRef.DOCS),
                                            link: webhook.findAnswer(SpendingRequestTFRef.LINKS),
                                            gstInclusive: webhook.findAnswer(SpendingRequestTFRef.GST)!!,
                                            spendingDetails: webhook.findAnswer(SpendingRequestTFRef.SPENDING_DETAILS)!!,
                                            spendingReason: webhook.findAnswer(SpendingRequestTFRef.REASON)!!,
                                            submitTimeStamp: now(),
                                            submitter: webhook.findAnswer(SpendingRequestTFRef.EMAIL)!!,
                                            budget:
                                                webhook.findAnswer(SpendingRequestTFRef.BUDGET) ||
                                                webhook.findAnswer(SpendingRequestTFRef.BUDGET_CUSTOM) ||
                                                null
                                        })

    await spendingRequestService.addSpendingRequest(request).then((resp) => {
        if (resp != undefined) {
            res.status(200).send(resp)
        } else {
            res.status(500).send(resp)
        }
    })

}

export default handler