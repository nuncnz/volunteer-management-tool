/**
 * Represents the response from a request made.
 */
export class Response {

    /**
     * The HTTP Status code of the response
     */
    status: number

    /**
     * The body of the response
     */
    body: any | null

    /**
     * The error body of the response.
     */
    errorBody: any | null

    constructor(status: number, body?: any, errorBody?: any) {
        this.status = status
        this.body = body || null
        this.errorBody = errorBody || null
    }

    isSuccessful = (): boolean => {
        return this.status < 300 && this.status >= 200
    }

}