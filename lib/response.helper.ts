export const success = (response: any, status?: number, message?: string) => {
    let res = {
        message: "Success",
        status: 200,
        data: response
    }
    if (status) {
        res.status = status;
    }
    if (message) {
        res.message = message;
    }
    return res;
}

export const error = (message?: string, status?: number) => {
    let res = {
        message: "Success",
        status: 400,
    }
    if (status) {
        res.status = status;
    }
    if (message) {
        res.message = message;
    }
    return res;
}