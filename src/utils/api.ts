import ky from 'ky';

const API_URL = 'http://127.0.0.1:8000/api';

export const api = ky.extend({
    prefixUrl: API_URL, //process.env.API_URL
    retry: 4,
    credentials: 'include'
});