import ky from 'ky';

const API_URL = 'http://127.0.0.1:8000/api';
//const API_URL = "http://192.168.31.253:8000/api";



export const api = ky.extend({
    prefixUrl: API_URL, //process.env.API_URL; 
    credentials: 'include', 
    hooks: {
        afterResponse: [
            async (request, options, response) => {
                if (response.status === 401) {
                    try {
                        await ky.post(`${API_URL}/jwt/refresh/`, {credentials: 'include'})

                        const relativeUrl = request.url.replace(API_URL+'/', '');

                        // Réessaie la requête originale avec le nouveau token
                        const retryResponse = await api(relativeUrl, {
                            ...options,
                            headers: {
                                ...options.headers,
                            },
                        });

                        return retryResponse;
                    } catch (error) {
                        console.error('Error refreshing token', error);
                        throw error; 
                    }
                }

                return response;  // Retourne la réponse originale si pas de 401
            }
        ]
    }
});

export default api;
