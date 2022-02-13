import {FirestoreService} from "./FirestoreService";
import {SpendingRequest} from "../../models/db/SpendingRequest";
import {FirebaseAdminService} from "../firebase/FirebaseAdminService";
import {FirestoreCollection} from "../../models/util/FirestoreCollection";

class SpendingRequestService extends FirestoreService<SpendingRequest> {

    constructor(firebaseAdminService: FirebaseAdminService) {
        super(firebaseAdminService, FirestoreCollection.SPENDING_REQUESTS, Spen);
    }

}