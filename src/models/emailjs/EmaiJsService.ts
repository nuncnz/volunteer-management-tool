import {init, send} from "@emailjs/browser";


export class EmailJsService {

    constructor() {
        init(process.env.EMAIL_JS_API_KEY as string)
    }

    sendSpendingRequestEmail = (submitter: string, spendingRequestUrl: string) => {
        send("service_pagwju4", "template_aln50w3", {submitter: submitter, request_link: spendingRequestUrl})
    }

}

