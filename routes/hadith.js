import express from 'express';

import { getHadithByNumber,getAllEditions, getSections,getInfo, getRandomHadith } from '../controllers/hadith.js';

const router = express.Router();

router.get('/editions', getAllEditions);
router.get('/random', getRandomHadith)
router.get('/info', getInfo)
router.get('/section/:edition/:number', getSections);
router.get('/:edition/:number', getHadithByNumber);

export default router;