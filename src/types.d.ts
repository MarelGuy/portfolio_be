class CustomError extends Error {
    constructor(public httpStatusCode: number, public statusCode: number) {

    }
}
