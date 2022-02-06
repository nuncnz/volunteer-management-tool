import styled from "styled-components";


export enum ButtonSize {
    SMALL,
    REGULAR,
    LARGE
}

interface ButtonProps {
    label: string
    size: ButtonSize
    onClick: (click: any) => void
}


const StyledButton = styled.button<Pick<ButtonProps, 'size'>>`
    
    margin: 15px;
    
`

const Button = ({label, size, onClick}: ButtonProps) => {

    return (
        <StyledButton size={size} onClick={() => onClick}>
            {label}
        </StyledButton>
    )
}

export default Button