import express from 'express';
import { searchSpotify } from '../controllers/spotifyController';

const router = express.Router();
router.get('/search', searchSpotify);

export default router;
