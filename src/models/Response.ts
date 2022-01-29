import {map} from "@firebase/util";

export class Response<T> {

    statusCode: number
    message?: string
    body?: T
    errorBody?: string

    constructor(

        /**
         * Status code returned from the backend (e.g., 200).
         */
        statusCode: number,

        /**
         * Message returned from the backend (e.g., "OK").
         */
        message?: string,

        /**
         * Body of the response.
         */
        body?: T,

        /**
         * Error body returned when the [Request] failed.
         */
        errorBody?: string

    ) {
        this.statusCode = statusCode
        this.message = message
        this.body = body
        this.errorBody = errorBody
    }

    /**
     * `true` if the request could be processed successfully (i.e., the status code is 2xx),
     * or `false` otherwise.
     */
    isSuccessful(): Boolean {
     return this.statusCode >= 200 && this.statusCode <= 299
    }

}