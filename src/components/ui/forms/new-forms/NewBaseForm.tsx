import {CustomComponentProps} from "../../../CustomComponentProps";
import StyledTextField from "../../mui/TextField";
import styled from "@emotion/styled";

const BaseFormContainer = styled.div`
  border: 2px solid black;
  padding: 25px;
  
  ${StyledTextField} {
    margin: 30px;
  }
  
`

export const InputRow = styled.div`

  display: flex;
  flex-direction: row;

`

/**
 * This component will serve as the base for all model editing and viewing.
 *
 * @param {CustomComponentProps} props
 * @constructor
 */
const NewBaseForm = (props: CustomComponentProps) => {

    return (
        <BaseFormContainer>
            {props.children}
        </BaseFormContainer>
    )

}

export default NewBaseForm