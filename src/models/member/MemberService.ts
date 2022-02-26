import {FirestoreService} from "../firestore/FirestoreService";
import {Member} from "./Member";
import {FirebaseAdminService} from "../firestore/FirebaseAdminService";
import {FirestoreCollection} from "../firestore/FirestoreCollection";
import {User} from "../user/User";
import {dataConverter} from "../firestore/DataConverter";

export class MemberService extends FirestoreService<Member> {

    constructor(firebaseAdminService: FirebaseAdminService) {
        super(firebaseAdminService, FirestoreCollection.MEMBERS, dataConverter<Member>());
    }

    async addMember(member: Member) {
        return await super.addDoc(member)
    }

    async getAllMembers() {
        return await this.getDocs()
    }

    async updateMember(member: Member) {
        return await this.updateDoc(member)
    }

    async removeMember(memberId: string) {
        return this.deleteDoc(memberId);
    }

}