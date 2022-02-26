import {Member} from "../member/Member";

export class MemberGroup {

    id
    name
    members

    constructor(memberGroup: {
        id?: string | null,
        name: string,
        members: Array<Member>
    }) {
        this.id = memberGroup.id
        this.name = memberGroup.name
        this.members = memberGroup.members
    }

}