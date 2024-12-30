import mongoose, { Schema, Document } from 'mongoose';

interface IPlaylist extends Document {
    userId: string;
    name: string;
    description?: string;
    songs: {
        title: string;
        artist: string;
        album: string;
        spotifyId: string;
    }[];
}

const PlaylistSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: String,
    songs: [
        {
            title: String,
            artist: String,
            album: String,
            spotifyId: String
        }
    ]
});

export default mongoose.model<IPlaylist>('Playlist', PlaylistSchema);
