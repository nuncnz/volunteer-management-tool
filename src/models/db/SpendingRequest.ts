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
    submitter: string | null

    /**
     * The number of approvers required to approve this spending request.
     */
    requiredApprovers: number | null

    /**
     * The approvals of this spending request
     */
    approvals?: SpendingRequestApproval[] | [null] | null

    /**
     * The budget where the spending is approved
     */
    budget: string | null

    /**
     * The amount of spending that is required
     */
    amount: string | null

    /**
     * Does the spending include GST
     */
    gstInclusive: boolean | null


    /**
     * The date the money has to be spent by
     */
    date: string | null

    /**
     * The reason the spending needs to take place.
     */
    spendingReason: string | null

    /**
     * How the spending should take place.
     */
    spendingDetails: string | null

    /**
     * The URL of an uploaded supporting document
     */
    doc: string | null

    /**
     * The URL for extra information provider by the [submitter]
     */
    link: string | null

    /**
     * The timestamp for when the request was made
     */
    submitTimeStamp: number | null
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
    submitter: string | null

    /**
     * The number of approvers required to approve this spending request.
     */
    requiredApprovers: number | null

    /**
     * The approvals of this spending request
     */
    approvals: SpendingRequestApproval[] | [null] | null

    /**
     * The budget where the spending is approved
     */
    budget: string | null

    /**
     * The amount of spending that is required
     */
    amount: string | null

    /**
     * Does the spending include GST
     */
    gstInclusive: boolean | null


    /**
     * The date the money has to be spent by
     */
    date: string | null

    /**
     * The reason the spending needs to take place.
     */
    spendingReason: string | null

    /**
     * How the spending should take place.
     */
    spendingDetails: string | null

    /**
     * The URL of an uploaded supporting document
     */
    doc: string | null

    /**
     * The URL for extra information provider by the [submitter]
     */
    link: string | null

    /**
     * The timestamp for when the request was made
     */
    submitTimeStamp: number | null

    constructor(spendingRequest: SpendingRequestProps) {
        this.id = spendingRequest.id || null
        this.submitter = spendingRequest.submitter || null
        this.budget = spendingRequest.budget || null
        this.amount = spendingRequest.amount || null
        this.gstInclusive = spendingRequest.gstInclusive || null
        this.date = spendingRequest.date || null
        this.spendingReason = spendingRequest.spendingReason || null
        this.spendingDetails = spendingRequest.spendingDetails || null
        this.doc = spendingRequest.doc || null
        this.link = spendingRequest.link || null
        this.submitTimeStamp = spendingRequest.submitTimeStamp || now()
        this.requiredApprovers = spendingRequest.requiredApprovers || null
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