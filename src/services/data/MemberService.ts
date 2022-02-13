import {FirestoreService} from "./FirestoreService";
import {Member, MemberConverter} from "../../models/db/Members";
import {FirebaseAdminService} from "../firebase/FirebaseAdminService";
import {FirestoreCollection} from "../../models/util/FirestoreCollection";
import {AppUser} from "../../models/db/AppUser";

export class MemberService extends FirestoreService<Member> {

    constructor(firebaseAdminService: FirebaseAdminService) {
        super(firebaseAdminService, FirestoreCollection.MEMBERS, MemberConverter);
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