import {init, send} from "@emailjs/browser";


export class EmailJsService {

    constructor() {
        init(process.env.EMAIL_JS_API_KEY as string)
    }

    sendSpendingRequestEmail = async (submitter: string, spendingRequestUrl: string) => {
        await send("service_pagwju4", "template_aln50w3", { submitter: submitter, request_link: spendingRequestUrl })
            .then(r => {
                if (r.status == 200) {
                    console.log("Success")
                }
            })
    }

}

