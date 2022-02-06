import {Member} from "./Members";

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