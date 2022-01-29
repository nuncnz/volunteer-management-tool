import {firestore} from "firebase-admin";
import WhereFilterOp = firestore.WhereFilterOp;

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