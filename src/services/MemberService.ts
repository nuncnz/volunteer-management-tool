import {FirestoreService} from "./FirestoreService";
import {Member, MemberConverter} from "../models/db/Members";
import {FirebaseAdminService} from "./FirebaseAdminService";
import {FirestoreCollection} from "../models/db/FirestoreCollection";

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

}