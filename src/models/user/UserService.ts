import {FirestoreService} from "../firestore/FirestoreService";
import {FirebaseAdminService} from "../firestore/FirebaseAdminService";
import {User} from "./User";
import {FirestoreCollection} from "../firestore/FirestoreCollection";
import {Query} from "../firestore/Query";
import {dataConverter} from "../firestore/DataConverter";

export class UserService extends FirestoreService<User> {

    constructor(firebaseAdminService: FirebaseAdminService) {
        super(firebaseAdminService, FirestoreCollection.USERS, dataConverter<User>());
    }

    async addUser(appUser: User) {
        return await super.addDoc(appUser)
    }

    async getUserByUid(uid: string) : Promise<User | undefined> {
        return await super.getDoc(new Query("googleUid", "==", uid))
    }

    async getUserById(id: string) : Promise<User | undefined> {
        return await super.getDoc(new Query("id", "==", id))
    }

    async getUserByEmail(email: string) : Promise<User | undefined> {
        return await super.getDoc(new Query("primaryEmail", "==", email))
    }

    async getUserFromToken(token: string) : Promise<User | undefined> {
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

    async updateUser(user: User) {
        return await this.updateDoc(user)
    }

    async removeUser(userId: string) {
        return this.deleteDoc(userId);
    }
}