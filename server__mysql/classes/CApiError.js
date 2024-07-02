class CApiError extends Error
{
    status;
    errors;

    constructor (status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static unauthorizedError() {
        return new CApiError(401, 'User not logined')
    }

    static badRequest(message, errors = []) {
        return new CApiError(400, message, errors)
    }

}

module.exports = CApiError;