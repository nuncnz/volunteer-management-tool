export interface TypeFormWebhookProps {

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
         * `answers` is an array of objects that lists the answers for the questions in your typeform.
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

export class TypeFormWebhook {
    event_id: string;
    event_type: string;
    answers: TypeFormWebhookAnswer[]

    constructor(typeformWebhook: TypeFormWebhookProps) {
        this.event_id = typeformWebhook.event_id
        this.event_type = typeformWebhook.event_type
        this.answers = typeformWebhook.form_response.answers
    }

    /**
     * Finds the answer from a Typeform webhook given a `ref` or returns `null` if one cannot be found.
     *
     * @param ref Reference string
     */
    findAnswer = <T>(ref: string) : T | null => {
        const answer = this.answers.find((answer) => {
            return answer.field.ref == ref
        })

        if (answer == undefined) return null

        // @ts-ignore
        if (answer!!.type != "choice") return answer[answer.type] as T

        // @ts-ignore
        return answer[answer.type].label as T

    }

}

