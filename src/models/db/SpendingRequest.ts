import {DataModel} from "../util/DataModel";
import {FirestoreDataConverter, DocumentData, QueryDocumentSnapshot} from "firebase-admin/firestore";
import {now} from "lodash";

interface SpendingRequestProps {
    /**
     * A unique identifier for each spending request
     */
    id?: string | null

    /**
     * The email of the person making the spending request
     */
    submitter: string

    /**
     * The number of approvers required to approve this spending request.
     */
    requiredApprovers: number

    /**
     * The approvals of this spending request
     */
    approvals?: SpendingRequestApproval[] | [null]

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

    /**
     * The reason the spending needs to take place.
     */
    spendingReason: string

    /**
     * How the spending should take place.
     */
    spendingDetails: string

    /**
     * The URL of an uploaded supporting document
     */
    doc: string

    /**
     * The URL for extra information provider by the [submitter]
     */
    link: string

    /**
     * The timestamp for when the request was made
     */
    submitTimeStamp: number
}

interface SpendingRequestApproval {
    /**
     * The email of the approver
     */
    email: string

    /**
     * THe timestamp at which the approval took place
     */
    timestamp: string
}


export class SpendingRequest implements DataModel<SpendingRequest>{

    /**
     * A unique identifier for each spending request
     */
    id: string | null

    /**
     * The email of the person making the spending request
     */
    submitter: string

    /**
     * The number of approvers required to approve this spending request.
     */
    requiredApprovers: number

    /**
     * The approvals of this spending request
     */
    approvals: SpendingRequestApproval[] | [null]

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

    /**
     * The reason the spending needs to take place.
     */
    spendingReason: string

    /**
     * How the spending should take place.
     */
    spendingDetails: string

    /**
     * The URL of an uploaded supporting document
     */
    doc: string

    /**
     * The URL for extra information provider by the [submitter]
     */
    link: string

    /**
     * The timestamp for when the request was made
     */
    submitTimeStamp: number

    constructor(spendingRequest: SpendingRequestProps) {
        this.id = spendingRequest.id || null
        this.submitter = spendingRequest.submitter
        this.budget = spendingRequest.budget
        this.amount = spendingRequest.amount
        this.gstInclusive = spendingRequest.gstInclusive
        this.date = spendingRequest.date
        this.spendingReason = spendingRequest.spendingReason
        this.spendingDetails = spendingRequest.spendingDetails
        this.doc = spendingRequest.doc
        this.link = spendingRequest.link
        this.submitTimeStamp = spendingRequest.submitTimeStamp || now()
        this.requiredApprovers = spendingRequest.requiredApprovers
        this.approvals = spendingRequest.approvals || [null]
    }
}

export const SpendingRequestConverter : FirestoreDataConverter<SpendingRequest> = {

    toFirestore(modelObject: SpendingRequest): DocumentData {
        return {
            modelObject
        }
    },

    fromFirestore(snapshot: QueryDocumentSnapshot): SpendingRequest {
        const data = snapshot.data()
        return new SpendingRequest(
            {
                id: data.id,
                submitter: data.submitter,
                budget: data.budget,
                amount: data.amount,
                gstInclusive: data.gstInclusive,
                date: data.date,
                spendingReason: data.spendingReason,
                spendingDetails: data.spendingDetails,
                doc: data.doc,
                link: data.link,
                submitTimeStamp: data.submitTimeStamp,
                requiredApprovers: data.requiredApprovers,
                approvals: data.approvals
            }
        )
    }


}