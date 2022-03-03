import {JWT} from "google-auth-library";
const path = require("path")

export class GMailService {

    constructor() {
        this.initGmailApi().then()
    }

    initGmailApi = async () => {
        const gmail = require('@googleapis/gmail')

        // Setting up JWT as per: https://github.com/googleapis/google-api-nodejs-client/issues/2322
        const authClient = new JWT({
            keyFile: path.resolve(__dirname, "../../../../../key-2.json"),
            scopes: ['https://mail.google.com/'],
            subject: "app@nunc.co.nz",
        })

        await authClient.authorize()

        const gmailClient = await gmail.gmail({
            version: 'v1',
            auth: authClient
        });

        // You can use UTF-8 encoding for the subject using the method below.
        // You can also just use a plain string if you don't need anything fancy.
        const subject = '🤘 Hello 🤘';
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        const messageParts = [
            'From: Big M <app@nunc.co.nz>',
            'To: Big FloppyThing <halym.s@pyf.org.nz>',
            'Content-Type: text/html; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${utf8Subject}`,
            '',
            'This is a message just to say hello.',
            'So... <b>Hello!</b>  🤘❤️😎',
        ];
        const message = messageParts.join('\n');

        // The body needs to be base64url encoded.
        const encodedMessage = Buffer.from(message)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');


        const sendEmailResp = await gmailClient.users.messages.send({
            userId: "me",
            requestBody: {
                raw: encodedMessage
            }
        })

        console.log(sendEmailResp.data)
    }

}

