import styled from "styled-components";
import {MouseEventHandler} from "react";
import {CustomComponentProps} from "../utils/CustomComponentProps";


export enum ButtonSize {
    SMALL,
    REGULAR,
    LARGE
}

interface ButtonProps extends CustomComponentProps {
    label: string
    size: ButtonSize
    onClick:  MouseEventHandler<HTMLButtonElement> | undefined;
}

const StyledButton = styled.button<Pick<ButtonProps, 'size'>>`
  padding: 10px;
  
  cursor: pointer;
  border-radius: 5px;
  background-color: ${props => props.theme.colours.secondary.blue};
  color: ${props => props.theme.colours.primary.light};
  
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
`

const CustomButton = ({label, size, onClick, className}: ButtonProps) => {

    return (
        <StyledButton size={size} onClick={onClick} className={className}>
            {label}
        </StyledButton>
    )
}

const Button = styled(CustomButton)``

export default Button