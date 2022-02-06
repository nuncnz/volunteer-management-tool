import {ReactNode} from "react";
import styled from "styled-components";

const StyledForm = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  
  
  
  #input {
    input, select {
      width: calc(100% - 2*10px);
      border: none;
      border-bottom: 1px solid;
      height: 1.5rem;
      &:focus {
        border: none;
      }
    }
    
    select {
      height: 2em;
    }
    
    h3 {
      width: calc(100% - 2*10px);
    }

    margin: 20px 10px;
  }
  
  button {

    margin: 10px 10px;
    
    height: 40px;
    width: 100px;
    font-weight: bold;
    border-radius: 15px;
    
    
  }
  
  > div {
    margin-top: 100px;
    border-radius: 25px;
    padding: 20px;
    border: 2px solid;
    width: 600px;
  }
  
  #names {
    display: flex;
    flex-direction: row;
    margin-bottom: -20px;
    div {
      width: 50%;
    }
  }
  

`

interface FormProps {
    children: ReactNode
}

const Form = ({children} : FormProps) => {

    return (
        <StyledForm>
            {children}
        </StyledForm>
    )

}

export default Form
