import AppPage from "../../../../components/pages/AppPage";
import {useState} from "react";
import {EventType} from "../../../../models/db/Event";
import {MemberGroup} from "../../../../models/db/MemberGroup";
import BaseForm from "../../../../components/forms/BaseForm";

interface AttendanceEventAddProps {
    memberGroups: Array<MemberGroup>
}

const AttendanceEventAdd = ({memberGroups} : AttendanceEventAddProps) => {

    const [eventName, setEventName] = useState("")
    const [eventData, setEventDate] = useState("")
    const [eventStartTime, setEventStartTime] = useState("")
    const [eventEndTime, setEventEndTime] = useState("")
    const [eventType, setEventType] = useState<EventType>(EventType.GENERAL_WORKSHOP)
    const [memberGroupId, setMemberGroupId] = useState("")

    const createEvent = () => {

    }

    return (
        <AppPage>
            <BaseForm>
                <div>
                    <div id={"input"}>
                        <h3>Event Name</h3>
                        <input value={eventName} type={"text"} onChange={(e) => setEventName(e.target.value)}/>
                    </div>
                    <div id={"input"}>
                        <h3>Event Date</h3>
                        <input type={"date"} name={"dateOfBirth"} value={eventData} onChange={(e) => setEventDate(e.target.value)}/>
                    </div>
                    <div id={"input"}>
                        <h3>Event Start Time</h3>
                        <input type={"time"} name={"dateOfBirth"} value={eventStartTime} onChange={(e) => setEventStartTime(e.target.value)}/>
                    </div>
                    <div id={"input"}>
                        <h3>Event End Time</h3>
                        <input type={"time"} name={"dateOfBirth"} value={eventEndTime} onChange={(e) => setEventEndTime(e.target.value)}/>
                    </div>
                    <div id={"input"}>
                        <h3>Event Type</h3>
                        <select value={eventType} onChange={(e) => setEventType(e.target.value as EventType)}>
                            <option value={EventType.GENERAL_WORKSHOP}>Workshop</option>
                            <option value={EventType.EVENT}>Event</option>
                        </select>
                    </div>
                    <div id={"input"}>
                        <h3>Member Group</h3>
                        <select id="cars" name="cars" value={memberGroupId} onChange={(e) => setMemberGroupId(e.target.value)}>
                            {memberGroups?.map((group) => {
                                return (
                                    <option key={group.id} value={group.id!!}>{group.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button onClick={() => createEvent()}>Create</button>
                </div>
            </BaseForm>
        </AppPage>
    )
}

export default AttendanceEventAdd