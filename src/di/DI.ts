/**
 * This class will act as a dependency injector / service manager for easy access to all services.
 */
import {GMailService} from "../models/email/GMailService";
import {SpendingRequestService} from "../models/spending-request/SpendingRequestService";
import {FirebaseAdminService} from "../models/firestore/FirebaseAdminService";
import {UserService} from "../models/user/UserService";
import {MemberService} from "../models/member/MemberService";

export class DI {

    static FirebaseAdminService = new FirebaseAdminService()
    static SpendingRequestService = new SpendingRequestService(DI.FirebaseAdminService)
    static UserService = new UserService(DI.FirebaseAdminService)
    static MemberService = new MemberService(DI.FirebaseAdminService)


    static EmailService = new GMailService()

}