import {DataModel} from "../util/DataModel";
import {FirestoreDataConverter, DocumentData, QueryDocumentSnapshot} from "firebase-admin/firestore";
import {now} from "lodash";

interface SpendingRequestProps extends DataModel<SpendingRequest>{
    /**
     * A unique identifier for each spending request
     */
    id?: string

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
     * The amount of spending that is required as a number
     */
    numberAmount?: number | null

    /**
     * The amount of GST included in the spending
     */
    gstAmount?: number | null

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
    doc: string | null

    /**
     * The URL for extra information provider by the [submitter]
     */
    link: string | null

    /**
     * The timestamp for when the request was made
     */
    submitTimeStamp: number
}

interface SpendingRequestApproval {
    /**
     * The email of the approver
     */
    email: string | null

    /**
     * THe timestamp at which the approval took place
     */
    timestamp: string | null
}


export class SpendingRequest implements SpendingRequestProps {

    amount: string;
    approvals: SpendingRequestApproval[] | [null];
    budget: string;
    date: string;
    doc: string | null;
    gstInclusive: boolean;
    id: string;
    link: string | null;
    requiredApprovers: number;
    spendingDetails: string;
    spendingReason: string;
    submitTimeStamp: number;
    submitter: string;
    numberAmount: number | null;
    gstAmount: number | null;

    constructor(spendingRequest: SpendingRequestProps) {
        this.id = spendingRequest.id || ""
        this.submitter = spendingRequest.submitter || ""
        this.budget = spendingRequest.budget || ""
        this.amount = spendingRequest.amount || ""
        this.gstInclusive = spendingRequest.gstInclusive
        this.date = spendingRequest.date || ""
        this.spendingReason = spendingRequest.spendingReason || ""
        this.spendingDetails = spendingRequest.spendingDetails || ""
        this.doc = spendingRequest.doc || ""
        this.link = spendingRequest.link || ""
        this.submitTimeStamp = spendingRequest.submitTimeStamp || now()
        this.requiredApprovers = spendingRequest.requiredApprovers || 2
        this.approvals = spendingRequest.approvals || []
        this.numberAmount = parseFloat(spendingRequest.amount)
        this.gstAmount = this.numberAmount - (this.numberAmount / 1.15)
    }
}


export const SpendingRequestConverter : FirestoreDataConverter<SpendingRequest> = {

    toFirestore(modelObject: SpendingRequest): DocumentData {
        return {
            id: modelObject.id,
            submitter: modelObject.submitter,
            budget: modelObject.budget,
            amount: modelObject.amount,
            gstInclusive: modelObject.gstInclusive,
            date: modelObject.date,
            spendingReason: modelObject.spendingReason,
            spendingDetails: modelObject.spendingDetails,
            doc: modelObject.doc,
            link: modelObject.link,
            submitTimeStamp: modelObject.submitTimeStamp,
            requiredApprovers: modelObject.requiredApprovers,
            approvals: modelObject.approvals,
            numberAmount: modelObject.numberAmount,
            gstAmount: modelObject.gstAmount
        }
    },

    fromFirestore(snapshot: QueryDocumentSnapshot): SpendingRequest {
        const data = snapshot.data()
        return new SpendingRequest(
            {
                gstAmount: data.gstAmount,
                numberAmount: data.numberAmount,
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