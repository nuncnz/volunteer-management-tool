import {FirestoreService} from "./FirestoreService";
import {FirebaseAdminService} from "./FirebaseAdminService";
import {AppUser, AppUserConverter} from "../models/db/AppUser";
import {FirestoreCollection} from "../models/util/FirestoreCollection";
import {Query} from "../models/util/Query";

export class UserService extends FirestoreService<AppUser> {

    constructor(firebaseAdminService: FirebaseAdminService) {
        super(firebaseAdminService, FirestoreCollection.USERS, AppUserConverter);
    }

    async addUser(appUser: AppUser) {
        return await super.addDoc(appUser)
    }

    async getUserByUid(uid: string) : Promise<AppUser | undefined> {
        return await super.getDoc(new Query("googleUid", "==", uid))
    }

    async getUserById(id: string) : Promise<AppUser | undefined> {
        return await super.getDoc(new Query("id", "==", id))
    }

    async getUserByEmail(email: string) : Promise<AppUser | undefined> {
        return await super.getDoc(new Query("primaryEmail", "==", email))
    }

    async getUserFromToken(token: string) : Promise<AppUser | undefined> {
        const decodedToken = await this.firebaseAdmin.getAuth().verifyIdToken(token)

        return await this.getUserByUid(decodedToken.uid).then((doc) => {
            if (doc) {
                return doc
            } else {
                return undefined
            }
        })
    }

    async getAllUsers() {
        return await this.getDocs()
    }

    async updateUser(user: AppUser) {
        return await this.updateDoc(user)
    }

    async removeUser(userId: string) {
        return this.deleteDoc(userId);
    }
}