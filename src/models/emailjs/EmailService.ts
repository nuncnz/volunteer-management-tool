import {Response} from "../network/Response";

import nodemailer, {SendMailOptions, SentMessageInfo, Transport, Transporter} from "nodemailer"

export class EmailService {

    transporter: Transporter<SentMessageInfo>

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAUTH2",
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASS,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
        })
    }

    /**
     * Sends an email with the given `mailOptions` parameter.
     *
     * @param mailOptions
     */
    sendEmail = (mailOptions: SendMailOptions): Response => {
        const resp = this.transporter.sendMail(mailOptions)

        return new Response(200, resp)
    }


}

