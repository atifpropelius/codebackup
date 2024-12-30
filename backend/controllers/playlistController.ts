import { Request, Response } from 'express';
import Playlist from '../models/Playlist';

export const createPlaylist = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const newPlaylist = new Playlist({ userId: req.userId, name, description, songs: [] });
    await newPlaylist.save();
    res.status(201).json(newPlaylist);
};

export const getPlaylists = async (req: Request, res: Response) => {
    const playlists = await Playlist.find({ userId: req.userId });
    res.json(playlists);
};

