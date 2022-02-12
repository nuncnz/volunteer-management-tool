
export class SpendingRequest {

    /**
     * A unique identifier for each spending request
     */
    id: string | null

    /**
     * The person making the spending request
     */
    submitter: string

    /**
     * The budget where the spending is approved
     */
    budget: string

    /**
     * The amount of spending that is required
     */
    amount: string

    /**
     * Does the spending include GST
     */
    gstInclusive: boolean


    /**
     * The date the money has to be spent by
     */
    date: string


    spendingReason: string

    spendingDetails: string

    doc: string

    link: string

    submitTimeStamp: string

    requiredApprovers: number

    approvers: string[]

    constructor(spendingRequest: {
        id: string,
        submitter: string,
        budget: string,
        amount: string,
        gstInclusive: boolean,
        date: string,
        spendingReason: string,
        spendingDetails: string,
        doc: string,
        link: string,
        submitTimeStamp: string,
        requiredApprovers: number,
        approvers: string[]
    }) {
        this.id = spendingRequest.id
        this.submitter = spendingRequest.submitter
        this.budget = spendingRequest.budget
        this.amount = spendingRequest.amount
        this.gstInclusive = spendingRequest.gstInclusive
        this.date = spendingRequest.date
        this.spendingReason = spendingRequest.spendingReason
        this.spendingDetails = spendingRequest.spendingDetails
        this.doc = spendingRequest.doc
        this.link = spendingRequest.link
        this.submitTimeStamp = spendingRequest.submitTimeStamp
        this.requiredApprovers = spendingRequest.requiredApprovers
        this.approvers = spendingRequest.approvers
    }

}