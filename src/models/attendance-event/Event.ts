import {firestore} from "firebase-admin";
import FirestoreDataConverter = firestore.FirestoreDataConverter;
import {MemberGroup} from "../member-group/MemberGroup";
import {UserService} from "../user/UserService";

export class AttendanceEvent {

    id
    name
    date
    startTime
    endTime
    memberGroup
    eventType

    constructor(attendanceEvent: {
        id?: string | null,
        name: string,
        date: string,
        startTime: string,
        endTime: string,
        memberGroup: MemberGroup,
        eventType: EventType
    }) {
        this.id = attendanceEvent.id
        this.name = attendanceEvent.name
        this.date = attendanceEvent.date
        this.startTime = attendanceEvent.startTime
        this.endTime = attendanceEvent.endTime
        this.memberGroup = attendanceEvent.memberGroup
        this.eventType = attendanceEvent.eventType
    }

}

export enum EventType {
    GENERAL_WORKSHOP = "GENERAL_WORKSHOP",
    EVENT = "EVENT"
}

const AttendanceEventConverter : FirestoreDataConverter<AttendanceEvent> = {

    toFirestore(modelObject: AttendanceEvent): FirebaseFirestore.DocumentData {
        return {
            id: modelObject.id,
            name: modelObject.name,
            date: modelObject.name,
            startTime: modelObject.startTime,
            endTime: modelObject.endTime,
            memberGroup: modelObject.memberGroup.id,
            eventType: modelObject.eventType

        }
    },

    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): AttendanceEvent {
        const data = snapshot.data()

        return {
            date: data.date,
            endTime: data.endTime,
            eventType: data.eventType,
            id: data.id,
            memberGroup: data.memberGroup,
            name: data.name,
            startTime: data.startTime

        }
    }

}

