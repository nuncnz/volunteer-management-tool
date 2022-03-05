import styled, {DefaultTheme, ThemedStyledProps} from "styled-components";
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
    styling: ButtonStyle
    onClick:  MouseEventHandler<HTMLButtonElement> | undefined;
}

const StyledButton = styled.button<Pick<ButtonProps, 'size' | 'styling'>>`
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  transition: all 0.3s ease;
  color: ${props => props.theme.colours.primary.light};

  &:hover {
    opacity: 0.8;
  }
  
  ${props => {
    if (props.styling == ButtonStyle.PRIMARY) {
      return `
        background-color: ${props.theme.colours.secondary.blue}
      `
    } else if (props.styling == ButtonStyle.SECONDARY) {
      return `
        background-color: ${props.theme.colours.secondary.red}
      `
    }
  }}
  
`

const CustomButton = ({label, size, styling, onClick, className}: ButtonProps) => {

    return (
        <StyledButton size={size} styling={styling} onClick={onClick} className={className}>
            {label}
        </StyledButton>
    )
}

const Button = styled(CustomButton)``

export default Button