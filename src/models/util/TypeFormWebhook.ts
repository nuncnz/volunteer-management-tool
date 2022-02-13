export interface TypeFormWebhook {

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
        answers: TypeFormWebhookAnswer[]
    }

}

interface TypeFormWebhookAnswer {

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
}

