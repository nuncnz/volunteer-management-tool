import NewBaseForm, {InputRow} from "./NewBaseForm";
import StyledTextField from "../../mui/TextField";

const NewMemberForm = () => {

    return (
        <NewBaseForm>
            <InputRow>
                <StyledTextField label={"First name"} required={true} />
                <StyledTextField label={"Last name"} required={true} />
            </InputRow>
            <StyledTextField label={"Email"} required={true} />
        </NewBaseForm>
    )

}

export default NewMemberForm


