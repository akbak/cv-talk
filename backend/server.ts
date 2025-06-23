import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });



import express from 'express';
import cors from 'cors';
import uploadRouter from './routes/upload';
import chatRouter from './routes/chat';

const app = express();
const port = process.env.BACKEND_PORT || 5001;

app.use(cors());
app.use(express.json());

// Make the 'uploads' directory static to serve files if needed, though not required for this project's logic
app.use('/uploads', express.static('uploads'));

app.use('/api/upload', uploadRouter);
app.use('/api/chat', chatRouter);

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
