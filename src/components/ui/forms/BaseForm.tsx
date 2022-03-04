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
  
  #checkboxes {

    margin: 20px 10px;
    
    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 1.2rem;
      display: flex;
      flex-direction: row;
      
      margin: 10px 0;
      
      input {
        margin-right: 10px;
      }
      
    }
  }
  
  > div {
    border-radius: 5px;
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

const BaseForm = ({children} : FormProps) => {

    return (
        <StyledForm>
            {children}
        </StyledForm>
    )

}

export default BaseForm
