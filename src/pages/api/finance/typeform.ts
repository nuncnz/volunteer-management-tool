import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {EmailService} from "../../../models/emailjs/EmailService";
import {GMailService} from "../../../models/email/GMailService";

/**
 * Handles `/api/finance/typeform`
 *
 * Creates a spending request given the correct Typeform parameters.
 */
const handler : NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    // const emailService = new EmailService()

    const emailService = new GMailService()

    // const emailResp = await emailService.sendEmail({
    //     from: "app@nunc.co.nz",
    //     to: "michael.h@pyf.org.nz",
    //     subject: "Test Email",
    //     text: "Some test text"
    // })

    res.status(200).send("")



    // if (emailResp.isSuccessful()) {
    //     console.log("Email was sent")
    // } else {
    //     console.log(emailResp.errorBody)
    // }

    // // The service used to access the spending request data.
    // const spendingRequestService = new SpendingRequestService(new FirebaseAdminService())
    //
    // const webhook = new TypeFormWebhook(req.body as TypeFormWebhookProps)
    //
    // const spendingRequest = new SpendingRequest({
    //                                                 amount: webhook.findAnswer(SpendingRequestTFRef.AMOUNT)!!,
    //                                                 date: webhook.findAnswer(SpendingRequestTFRef.DATE)!!,
    //                                                 doc: webhook.findAnswer(SpendingRequestTFRef.DOCS),
    //                                                 link: webhook.findAnswer(SpendingRequestTFRef.LINKS),
    //                                                 gstInclusive: webhook.findAnswer(SpendingRequestTFRef.GST)!!,
    //                                                 spendingDetails: webhook.findAnswer(SpendingRequestTFRef.SPENDING_DETAILS)!!,
    //                                                 spendingReason: webhook.findAnswer(SpendingRequestTFRef.REASON)!!,
    //                                                 submitTimeStamp: now(),
    //                                                 submitter: webhook.findAnswer(SpendingRequestTFRef.EMAIL)!!,
    //                                                 budget:
    //                                                     webhook.findAnswer(SpendingRequestTFRef.BUDGET) ||
    //                                                     webhook.findAnswer(SpendingRequestTFRef.BUDGET_CUSTOM) ||
    //                                                     null
    //                                             })
    //
    // await spendingRequestService.addSpendingRequest(spendingRequest).then(async (resp) => {
    //     if (resp != undefined) {
    //         await emailService.sendSpendingRequestEmail(spendingRequest.submitter,
    //                                                "https://app.pyf.org.nz/app/finance/spending-requests/" + resp.id
    //         )
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