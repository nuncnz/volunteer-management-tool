export interface TypeFormWebhookResp {

    /**
     * Unique ID for the webhook. Automatically assigned by Typeform.
     */
    event_id: string

    /**
     * Reason the webhook is being sent.
     */
    event_type: string

    /**
     * Object that contains information about the typeform and account associated with the webhook.
     */
    form_response: {
        /**
         * [answers] is an array of objects that lists the answers for the questions in your typeform.
         */
        answers: {

            /**
             * Type of question associated with the field. Values are described in the Field types section below.
             */
            type: string

            /**
             * Object that contains identifying information to help you match the answer with the question.
             */
            field: {

                /**
                 * A name you can use to reference the field.
                 */
                ref: string
            }
        }[]
    }

}

export class TypeFormWebhook {

    event_id: string

    event_type: string

    answers : {
        answer: any
        ref: string
    }[]

    constructor(test: TypeFormWebhookResp) {
        this.event_id = test.event_id
        this.event_type = test.event_type

        this.answers = []
        test.form_response.answers.forEach((answer) => {
            // @ts-ignore
            this.answers.push({answer: answer[answer.type], ref: answer.field.ref})
        })
    }
}
