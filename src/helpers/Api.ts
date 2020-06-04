import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44321/api/',
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
