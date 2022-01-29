import {FirestoreService} from "./FirestoreService";
import {FirebaseAdminService} from "./FirebaseAdminService";
import {AppUser, AppUserConverter} from "../models/AppUser";
import {FirestoreCollection} from "../models/FirestoreCollection";

export class UserService extends FirestoreService<AppUser> {

    constructor(firebaseAdminService: FirebaseAdminService) {
        super(firebaseAdminService, FirestoreCollection.USERS, AppUserConverter);
    }

    async addUser(appUser: AppUser) {
        return await super.addDoc(appUser)
    }
}