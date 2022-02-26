import {DataModel} from "../firestore/DataModel";
import {now} from "lodash";

/**
 * Props used in `SpendingRequest` constructor.
 */
interface SpendingRequestProps extends DataModel<SpendingRequest>{
    /**
     * A unique identifier for each spending request
     */
    id?: string | null

    /**
     * The email of the person making the spending request
     */
    submitter: string

    /**
     * The number of approves required to approve this spending request.
     */
    requiredApproves?: number

    /**
     * The approvals of this spending request
     */
    approvals?: SpendingRequestApproval[]

    /**
     * The budget where the spending is approved
     */
    budget: string | null

    /**
     * The amount of spending that is required
     */
    amount: string

    /**
     * The amount of spending that is required as a number
     */
    numberAmount?: number

    /**
     * The amount of GST included in the spending
     */
    gstAmount?: number

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

/**
 * Represents the approval of a spending request.
 */
interface SpendingRequestApproval {
    /**
     * The email of the approver
     */
    email: string | null

    /**
     * The timestamp at which the approval took place
     */
    timestamp: string | null
}

/**
 * Represents a request to spend money.
 */
export class SpendingRequest {

    id: string;

    submitter: string;

    amount: number;
    amountString: string;

    gstInclusive: boolean;

    budget: string;

    date: string;

    gstAmount: number;

    requiredApprovers: number;
    approvals: SpendingRequestApproval[] | [null];

    spendingReason: string;
    spendingDetails: string;

    doc: string;
    link: string;

    submitTimeStamp: number;


    constructor(spendingRequest: SpendingRequestProps) {
        this.id = spendingRequest.id || ""
        this.submitter = spendingRequest.submitter || ""
        this.budget = spendingRequest.budget || ""
        this.amountString = spendingRequest.amount || ""
        this.gstInclusive = spendingRequest.gstInclusive
        this.date = spendingRequest.date || ""
        this.spendingReason = spendingRequest.spendingReason || ""
        this.spendingDetails = spendingRequest.spendingDetails || ""
        this.doc = spendingRequest.doc || ""
        this.link = spendingRequest.link || ""
        this.submitTimeStamp = spendingRequest.submitTimeStamp || now()
        this.requiredApprovers = spendingRequest.requiredApproves || 2
        this.approvals = spendingRequest.approvals || []
        this.amount = parseFloat(spendingRequest.amount)

        if (!isNaN(this.amount)) {
            this.gstAmount = this.amount - (this.amount / 1.15)
        } else {
            this.gstAmount = 0
        }
    }
}