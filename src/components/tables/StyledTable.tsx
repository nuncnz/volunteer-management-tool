import styled from "styled-components";
import {ReactNode} from "react";

const Table = styled.table`

  text-align: left;
  width: 60%;

  input {
    border: 1px solid black;
    color: black;
  }

  border-spacing: 0;




  td {
    padding: 15px 0;
    border-bottom: 2px solid black;

    img {
      margin: 10px;
    }

  }

  th {
    height: 3rem;
  }

  th, td {
    padding-left: 15px;
  }

  #clickable {

    cursor: pointer;

    transition: 0.2s all ease;

    &:hover {
      background-color: lightgray;
    }
  }

  thead {




    background-color: ${props => props.theme.colours.primary.dark};
    color: ${props => props.theme.colours.primary.light};
  }


`

interface StyledTableProps{
    children: ReactNode
}

const StyledTable = ({children} : StyledTableProps) => {
    return (
        <Table>
            {children}
        </Table>
    )
}

export default StyledTable