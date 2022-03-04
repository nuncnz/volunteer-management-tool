import {FirestoreService} from "../firestore/FirestoreService";
import {SpendingRequest} from "./SpendingRequest";
import {FirebaseAdminService} from "../firestore/FirebaseAdminService";
import {FirestoreCollection} from "../firestore/FirestoreCollection";
import {dataConverter} from "../firestore/DataConverter";
import {Query} from "../firestore/Query";

/**
 * Service used to access spending request data in the database.
 */
export class SpendingRequestService extends FirestoreService<SpendingRequest> {

    constructor(firebaseAdminService: FirebaseAdminService) {
        super(firebaseAdminService, FirestoreCollection.SPENDING_REQUESTS, dataConverter<SpendingRequest>());
    }

    public async addSpendingRequest(spendingRequest: SpendingRequest) {
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

    async getSpendingRequest(id: string) {
        return this.getDoc(new Query("id", "==", id))
    }


}