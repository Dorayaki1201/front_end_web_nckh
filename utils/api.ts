import queryString from 'query-string';

interface IRequest {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
    body?: any;
    queryParams?: any;
    useCredentials?: boolean;
    headers?: HeadersInit;
    nextOption?: RequestInit;
}

export const sendRequest = async <T>(props: IRequest): Promise<T> => {
    let {
        url,
        method,
        body,
        queryParams = {},
        useCredentials = false,
        headers = {},
        nextOption = {}
    } = props;

    let token = '';
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('accessToken') || '';
    }
    const defaultHeaders = new Headers({
        'Content-Type': 'application/json',
        ...headers
    });
    if (token) {
        defaultHeaders.append('Authorization', `Bearer ${token}`);
    }
    const options: RequestInit = {
        method: method,
        headers: defaultHeaders,
        ...nextOption
    };
    if (body && method !== 'GET' && method !== 'HEAD') {
        options.body = JSON.stringify(body);
    }
    if (useCredentials) {
        options.credentials = "include";
    }
    if (queryParams && Object.keys(queryParams).length > 0) {
        url = `${url}?${queryString.stringify(queryParams)}`;
    }
    const res = await fetch(url, options);
    let json;
    try {
        json = await res.json();
    } catch (err) {
        json = null;
    }
    if (res.ok) {
        return json as T;
    } else {
        throw {
            statusCode: res.status,
            message: json?.message ?? "Đã xảy ra lỗi hệ thống",
            error: json?.error ?? "Unknown Error"
        };
    }
};