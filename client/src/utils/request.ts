export function convertRequestData (data: any, files: FileList) {
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
    }

    for (let key in data) {
        formData.append(key, data[key])
    }

    return formData;
}

export function apiUri(fileName: string) {
    return process.env.REACT_APP_API_URL + fileName
}

export function buildParams<T extends object>(data: T): URLSearchParams {
    const params = new URLSearchParams()

    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(value => params.append(key, value.toString()))
        } else {
            if (value !== null) params.append(key, value.toString())
        }
    });

    return params
}

export function parseParams(params: URLSearchParams) {
    return [...params.entries()].reduce((acc, cur) => {
        const key = cur[0]
        const value = cur[1]
        if (!(key in acc)) {
            acc[key] = value
        } else {
            if (Array.isArray(acc[key])) {
                acc[key].push(value)
            } else {
                acc[key] = [acc[key], value]
            }
        }
        return acc;
    }, {} as {[key: string]: any})
}
