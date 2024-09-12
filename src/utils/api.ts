import ky from 'ky';

const API_URL = 'http://127.0.0.1:8000/api';
//const API_URL = "http://192.168.31.253:8000/api";


export const api = ky.extend({
    prefixUrl: API_URL, //process.env.API_URL;                                                                                                                                                                                  
}); 