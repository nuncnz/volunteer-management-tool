import {FirestoreService} from "./FirestoreService";
import {SpendingRequest, SpendingRequestConverter} from "../../models/db/SpendingRequest";
import {FirebaseAdminService} from "../firebase/FirebaseAdminService";
import {FirestoreCollection} from "../../models/util/FirestoreCollection";

export class SpendingRequestService extends FirestoreService<SpendingRequest> {

    constructor(firebaseAdminService: FirebaseAdminService) {
        super(firebaseAdminService, FirestoreCollection.SPENDING_REQUESTS, SpendingRequestConverter);
    }

    async addSpendingRequest(spendingRequest: SpendingRequest) {
        return await super.addDoc(spendingRequest)
    }

    async updateSpendingRequest(spendingRequest: SpendingRequest) {
        return await this.updateDoc(spendingRequest)
    }

    async removeSpendingRequest(id: string) {
        return this.deleteDoc(id);
    }

    async getAllSpendingRequests() {
        return this.getDocs()
    }


}