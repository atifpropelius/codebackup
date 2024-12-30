
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = async (userData: any) => {
    return await api.post('/auth/register', userData);
};

export const loginUser = async (userData: any) => {
    return await api.post('/auth/login', userData);
};

export const getPlaylists = async (token: string) => {
    return await api.get('/playlists', { headers: { Authorization: `Bearer ${token}` } });
};

export const createPlaylist = async (playlistData: any, token: string) => {
    return await api.post('/playlists', playlistData, { headers: { Authorization: `Bearer ${token}` } });
};

export const searchSongs = async (query: string) => {
    return await api.get(`/spotify/search?query=${query}`);
};

export default api;
