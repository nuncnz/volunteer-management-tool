import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {TypeFormWebhook, TypeFormWebhookProps} from "../../../models/typeform/TypeFormWebhook";
import {SpendingRequest} from "../../../models/spending-request/SpendingRequest";
import {SpendingRequestTFRef} from "../../../models/spending-request/SpendingRequestTFRef";
import {now} from "lodash";
import {SpendingRequestService} from "../../../models/spending-request/SpendingRequestService";
import {FirebaseAdminService} from "../../../models/firestore/FirebaseAdminService";
import classToDto from "../../../components/ClassToDto";
import {EmailJsService} from "../../../models/emailjs/EmaiJsService";

/**
 * Handles `/api/finance/typeform`
 *
 * Creates a spending request given the correct Typeform parameters.
 */
const handler : NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    // The service used to access the spending request data.
    const spendingRequestService = new SpendingRequestService(new FirebaseAdminService())

    const webhook = new TypeFormWebhook(req.body as TypeFormWebhookProps)

    const spendingRequest = new SpendingRequest({
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

    await spendingRequestService.addSpendingRequest(spendingRequest).then((resp) => {
        if (resp != undefined) {
            new EmailJsService().sendSpendingRequestEmail(spendingRequest.submitter, "https://app.pyf.org.nz/app/finance/spending-requests/"+resp.id)
            res.status(200).send(resp)
            return
        } else {
            res.status(500).send(resp)
            return
        }
    })

    res.status(500)
    return

}

export default handler