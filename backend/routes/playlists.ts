import express from 'express';
import { createPlaylist, getPlaylists } from '../controllers/playlistController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();
router.post('/', authenticateJWT, createPlaylist);
router.get('/', authenticateJWT, getPlaylists);

export default router;
