/**
 * This class will act as a dependency injector / service manager for easy access to all services.
 */
import {GMailService} from "../models/email/GMailService";
import {SpendingRequestService} from "../models/spending-request/SpendingRequestService";
import {FirebaseAdminService} from "../models/firestore/FirebaseAdminService";

export class DI {

    static FirebaseAdminService = new FirebaseAdminService()
    static EmailService = new GMailService()
    static SpendingRequestService = new SpendingRequestService(this.FirebaseAdminService)

}