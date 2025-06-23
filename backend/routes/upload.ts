import { Router } from 'express';
import multer from 'multer';
import { parseCv } from '../services/parser';

const router = Router();
// Configure multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('cv'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    const text = await parseCv(req.file.buffer, req.file.mimetype);
    // For now, just return the parsed text.
    // Later, we'll use this text to start the interview.
    res.status(200).json({ cvText: text });
  } catch (error) {
    console.error('Error parsing CV:', error);
    if (error instanceof Error) {
        return res.status(500).json({ error: 'Error parsing CV.', message: error.message });
    }
    res.status(500).json({ error: 'An unknown error occurred while parsing the CV.' });
  }
});

export default router;
