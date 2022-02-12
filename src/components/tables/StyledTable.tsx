import styled from "styled-components";
import {ReactNode} from "react";
import {CustomComponentProps} from "../../utils/CustomComponentProps";

const CustomTable = styled.table`

  text-align: left;
  //min-width: 50vw;
  border-spacing: 0;

  thead {
    background-color: ${props => props.theme.colours.primary.dark};
    color: ${props => props.theme.colours.primary.light};
  }

  th {
    height: 3rem;
  }
  
  td {
    padding: 15px 0;
    border-bottom: 2px solid black;

    img {
      margin: 10px;
    }
  }

  th, td {
    padding-left: 15px;
    padding-right: 50px;
  }
  
  #clickable {
    cursor: pointer;
    transition: 0.2s all ease;

    &:hover {
      background-color: lightgray;
    }
  }
`

interface StyledTableProps extends CustomComponentProps {
    children: ReactNode
}

const StyledTable = ({children, className} : StyledTableProps) => {
    return (
        <CustomTable className={className}>
            {children}
        </CustomTable>
    )
}

const Table = styled(StyledTable)``

export default Table