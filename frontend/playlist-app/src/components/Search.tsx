import React, { useState } from 'react';
import { searchSongs } from '../services/api';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@mui/material';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async () => {
        if (query) {
            const { data } = await searchSongs(query);
            setResults(data);
        }
    };

    return (
        <div className="p-4">
            <TextField
                label="Search for Songs"
                variant="outlined"
                fullWidth
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button
                onClick={handleSearch}
                variant="contained"
                color="primary"
                sx={{ mb: 4 }}
            >
                Search
            </Button>

            <Grid container spacing={4}>
                {results.map((song: any) => (
                    <Grid item xs={12} sm={6} md={4} key={song.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{song.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {song.artist} - {song.album}
                                </Typography>
                                <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                                    Add to Playlist
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Search;
