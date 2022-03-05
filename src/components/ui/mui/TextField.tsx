import {TextField} from "@mui/material";
import {CustomComponentProps} from "../../CustomComponentProps";
import styled from "@emotion/styled";

export enum ComponentSize {
    SMALL = "small",
    NORMAL = "medium"
}

interface CustomTextFieldProps extends CustomComponentProps{
    label: string
    required?: boolean
    size?: ComponentSize
    onChange?: (text: string) => any
    isEditable?: boolean
}

const CustomTextField = ({className, label, required, size, onChange, isEditable}: CustomTextFieldProps) => {

    return (
        <TextField variant={"outlined"}
                   label={label}
                   size={size || "small"}
                   required={required || false}
                   onChange={onChange ? (e) => {onChange(e.target.value)} : () => {}}
                   inputProps={{readOnly: isEditable ? !isEditable : false}}/>
    )

}

const StyledTextField = styled(CustomTextField)`

    margin: 30px;
    
`

export default StyledTextField