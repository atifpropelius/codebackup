import axios from 'axios';

export const searchSpotify = async (req, res) => {
    const { query } = req.query;
    const token = await getSpotifyToken(); // Helper function to get token
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    res.json(response.data.tracks.items);
};

async function getSpotifyToken() {
    const response = await axios.post(process.env.SPOTIFY_TOKEN_URL, null, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: process.env.SPOTIFY_CLIENT_ID,
            password: process.env.SPOTIFY_CLIENT_SECRET
        }
    });
    return response.data.access_token;
}
