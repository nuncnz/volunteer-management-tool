import {WhereFilterOp} from "@firebase/firestore-types";

export class Query {

    searchField: string
    operator: WhereFilterOp
    searchValue: string

    constructor(
        searchField: string,
        operator: WhereFilterOp,
        searchValue: string,
    ) {

        this.searchField = searchField
        this.operator = operator
        this.searchValue = searchValue
    }

}