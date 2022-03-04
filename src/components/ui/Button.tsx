import styled from "styled-components";
import {MouseEventHandler} from "react";
import {CustomComponentProps} from "../CustomComponentProps";


export enum ButtonSize {
    SMALL,
    REGULAR,
    LARGE
}

export enum ButtonStyle {
    PRIMARY,
    SECONDARY,
    ACCENT
}

interface ButtonProps extends CustomComponentProps {
    label: string
    size: ButtonSize
    style: ButtonStyle
    onClick:  MouseEventHandler<HTMLButtonElement> | undefined;
}

const StyledButton = styled.button<Pick<ButtonProps, 'size' | 'style'>>`
  padding: 10px;
  
  cursor: pointer;+
  border-radius: 5px;
  background-color: ${props => props.theme.colours.secondary.blue};
  color: ${props => props.theme.colours.primary.light};
  
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
`

const CustomButton = ({label, size, style, onClick, className}: ButtonProps) => {

    return (
        <StyledButton size={size} style={style} onClick={onClick} className={className}>
            {label}
        </StyledButton>
    )
}

const Button = styled(CustomButton)``

export default Button