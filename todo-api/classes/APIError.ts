interface ErrorData {
    /**
     * Human readable error message
     */
    message: string;
    /**
     * Additional properties
     */
    [key: string]: any;
}

export class APIError extends Error {
    statusCode: number;
    data: ErrorData;

    constructor(statusCode: number, data: ErrorData) {
        super(data?.message || 'Bad request');
        this.statusCode = statusCode;
        this.data = data;
    }
}
