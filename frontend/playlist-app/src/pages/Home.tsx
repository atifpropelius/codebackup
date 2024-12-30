import React, { useState, useEffect } from 'react';
import { getPlaylists } from '../services/api';
import Navbar from '../components/Navbar';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const Home: React.FC = () => {
    const [playlists, setPlaylists] = useState<any[]>([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            getPlaylists(token).then(response => {
                setPlaylists(response.data);
            });
        }
    }, [token]);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Your Playlists
                </Typography>
                <Grid container spacing={4}>
                    {playlists.map((playlist) => (
                        <Grid item xs={12} sm={6} md={4} key={playlist._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{playlist.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {playlist.description}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    >
                                        View Playlist
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default Home;
