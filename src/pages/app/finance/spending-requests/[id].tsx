import AppPage from "../../../../components/pages/AppPage";
import {GetServerSidePropsContext} from "next";
import classToDto from "../../../../models/util/ClassToDto";
import Table from "../../../../components/ui/tables/StyledTable";
import {SpendingRequest} from "../../../../models/spending-request/SpendingRequest";
import {SpendingRequestDataView} from "../../../../components/ui/forms/SpendingRequestDataView";
import styled from "styled-components";
import Button from "../../../../components/ui/Button";
import {DI} from "../../../../di/DI";

const UsersContent = styled.div`

  display: flex;
  flex-direction: row;
  align-items: start;

  ${Table} {
    margin-right: 100px;
  }

  > div {
    ${Button} {
      margin-top: 30px;
    }
  }
`

const SpendingRequestsPage = ({request} : {request: SpendingRequest}) => {

    return (
        <AppPage>
            <UsersContent>
                {request ? <SpendingRequestDataView spendingRequest={request}/> : null}
            </UsersContent>
        </AppPage>
    )

}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const {id} = context.query

    const request = await DI.SpendingRequestService.getSpendingRequest(id as string)

    return {
        props: {
            request: classToDto(request)
        }
    }
}

export default SpendingRequestsPage