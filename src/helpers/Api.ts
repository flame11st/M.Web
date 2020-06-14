import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://mwebapi1.azurewebsites.net/api/' : 'https://localhost:44321/';

const api = axios.create({
    baseURL: baseUrl,
});

const requestInterceptor = (request: any) => {
    // eslint-disable-next-line no-param-reassign
    request.withCredentials = true;
    return request;
};

const handleUnauthorizedError = (error: any) => {
    if (error.response && error.response.status === 401) {
        return api.get('Identity/RefreshToken').then(() => api.request(error.config));
    }
    return Promise.reject(error);
};
api.interceptors.request.use(request => requestInterceptor(request));

api.interceptors.response.use(response => response, error => handleUnauthorizedError(error));

export default api;
