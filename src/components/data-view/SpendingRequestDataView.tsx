import styled from "styled-components";
import {CustomComponentProps} from "../../models/app/CustomComponentProps";
import {SpendingRequest} from "../../models/db/SpendingRequest";
import Button, {ButtonSize} from "../Button";


const DataViewContainer = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;



  #data {
    h4 {
      width: calc(100% - 2*10px);
      border: none;
      border-bottom: 1px solid;
      height: 1.5rem;
      font-weight: normal;
      &:focus {
        border: none;
      }
    }

    h3 {
      width: calc(100% - 2*10px);
    }
    
    margin: 20px 10px;
  }
  
  > div {
    border-radius: 5px;
    padding: 20px;
    border: 2px solid;
    width: 600px;
  }
  
  #links {
    h4 {
      border: none;  
    }
    border-bottom: 1px solid;
  }
  
`

interface SpendingRequestDataViewProps extends CustomComponentProps {
    spendingRequest: SpendingRequest
}

const DataView = ({spendingRequest} : SpendingRequestDataViewProps) => {

    const approve = () => {

    }

    return (
        <DataViewContainer>
            <div>
                <div id={"data"}>
                    <h3>Submitter</h3>
                    <h4>{spendingRequest.submitter}</h4>
                </div>
                <div id={"data"}>
                    <h3>Amount</h3>
                    <h4>${spendingRequest.amount}</h4>
                </div>
                <div id={"data"}>
                    <h3>GST</h3>
                    <h4>{spendingRequest.gstInclusive ? "Yes" : "No"}</h4>
                </div>
                <div id={"data"}>
                    <h3>Budget</h3>
                    <h4>{spendingRequest.budget}</h4>
                </div>
                <div id={"data"}>
                    <h3>Spending Reason</h3>
                    <h4>{spendingRequest.spendingReason}</h4>
                </div>
                <div id={"data"}>
                    <h3>Spending Details</h3>
                    <h4>{spendingRequest.spendingDetails}</h4>
                </div>
                <div id={"data"}>
                    <h3>Number of Approvers Required</h3>
                    <h4>{spendingRequest.requiredApprovers}</h4>
                </div>
                <div id={"data"}>
                    <h3>Extra Info</h3>
                    <div id={"links"}>
                        <h4>{spendingRequest.doc ? <a rel={"noreferrer"} href={spendingRequest.doc!!} target={"_blank"}>File</a> : "-"}</h4>
                        <h4>{spendingRequest.link ? <a rel={"noreferrer"} href={spendingRequest.link!!} target={"_blank"}>Link</a> : "-"}</h4>
                    </div>
                </div>
                <div id={"data"}>
                    <h3>Approvals</h3>
                    {spendingRequest ? spendingRequest.approvals.map((approval) => {
                        return (
                            <h4 key={approval!!.email}>{approval!!.email}</h4>
                        )
                    }) : null}
                </div>
                <Button label={"Approve"} size={ButtonSize.REGULAR} onClick={() => approve()} />
            </div>
        </DataViewContainer>
    )

}

export const SpendingRequestDataView = styled(DataView)``