import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {SpendingRequestService} from "../../../models/spending-request/SpendingRequestService";
import {TypeFormWebhook, TypeFormWebhookProps} from "../../../models/typeform/TypeFormWebhook";
import {FirebaseAdminService} from "../../../models/firestore/FirebaseAdminService";
import {SpendingRequest} from "../../../models/spending-request/SpendingRequest";
import {SpendingRequestTFRef} from "../../../models/spending-request/SpendingRequestTFRef";
import {now} from "lodash";
import {DI} from "../../../di/DI";
import {Email, EmailProps} from "../../../models/email/Email";

/**
 * Handles `/api/finance/typeform`
 *
 * Creates a spending request given the correct Typeform parameters.
 */
const handler : NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    // The service used to access the spending request data.

    await DI.EmailService.sendEmail(new Email({
        to: "michael.h@pyf.org.nz",
        subject: "New Spending Request",
        content: [
            'A new spending request was made by: ' + 'test' + '\n',
            'You can view this spending request <a href=\"http://localhost:3000/app/finance/spending-requests/test\">here.</a>'
        ]
    } as EmailProps)).then((resp) => {
        console.log(resp)
        res.status(resp.status)
    })

    // const webhook = new TypeFormWebhook(req.body as TypeFormWebhookProps)
    //
    // const spendingRequest = new SpendingRequest({
    //     amount: webhook.findAnswer(SpendingRequestTFRef.AMOUNT)!!,
    //     date: webhook.findAnswer(SpendingRequestTFRef.DATE)!!,
    //     doc: webhook.findAnswer(SpendingRequestTFRef.DOCS),
    //     link: webhook.findAnswer(SpendingRequestTFRef.LINKS),
    //     gstInclusive: webhook.findAnswer(SpendingRequestTFRef.GST)!!,
    //     spendingDetails: webhook.findAnswer(SpendingRequestTFRef.SPENDING_DETAILS)!!,
    //     spendingReason: webhook.findAnswer(SpendingRequestTFRef.REASON)!!,
    //     submitTimeStamp: now(),
    //     submitter: webhook.findAnswer(SpendingRequestTFRef.EMAIL)!!,
    //     budget:
    //         webhook.findAnswer(SpendingRequestTFRef.BUDGET) ||
    //         webhook.findAnswer(SpendingRequestTFRef.BUDGET_CUSTOM) ||
    //         null
    // })
    //
    // await DI.SpendingRequestService.addSpendingRequest(spendingRequest).then(async (resp) => {
    //     if (resp != undefined) {
    //         await DI.EmailService.sendEmail(new Email({
    //             to: "michael.h@pyf.org.nz",
    //             subject: "New Spending Request",
    //             content: [
    //                 'A new spending request was made by: ' + spendingRequest.submitter + '\n',
    //                 'You can view this spending request <a href=\"http://localhost:3000/app/finance/spending-requests/\"' + resp.id + '">here.</a>'
    //             ]
    //         } as EmailProps))
    //         res.status(200).send(resp)
    //         return
    //     }
    //     else {
    //         res.status(500).send(resp)
    //         return
    //     }
    // })
    //
    // res.status(500)
    // return

}

export default handler