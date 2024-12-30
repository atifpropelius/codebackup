import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { getPlaylists, createPlaylist } from '../services/api';

interface Playlist {
    _id: string;
    name: string;
    description: string;
}

const Playlist: React.FC = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [open, setOpen] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [newPlaylistDescription, setNewPlaylistDescription] = useState('');

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        try {
            const data = await getPlaylists();
            setPlaylists(data);
        } catch (error) {
            console.error('Failed to fetch playlists', error);
        }
    };

    const handleAddPlaylist = async () => {
        if (newPlaylistName.trim() === '' || newPlaylistDescription.trim() === '') {
            alert('Please enter a name and description for the playlist');
            return;
        }

        try {
            await createPlaylist({ name: newPlaylistName, description: newPlaylistDescription });
            setNewPlaylistName('');
            setNewPlaylistDescription('');
            setOpen(false);
            fetchPlaylists();
        } catch (error) {
            console.error('Failed to create playlist', error);
        }
    };


    return (
        <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Your Playlists
                </Typography>
                <List>
                    {playlists.map((playlist) => (
                        <ListItem
                            key={playlist._id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" >
                                    <Delete />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={playlist.name}
                                secondary={playlist.description}
                            />
                        </ListItem>
                    ))}
                </List>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={() => setOpen(true)}
                >
                    Add New Playlist
                </Button>

                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Add a New Playlist</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Playlist Name"
                            fullWidth
                            margin="normal"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                        />
                        <TextField
                            label="Playlist Description"
                            fullWidth
                            margin="normal"
                            value={newPlaylistDescription}
                            onChange={(e) => setNewPlaylistDescription(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddPlaylist} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    );
};

export default Playlist;
