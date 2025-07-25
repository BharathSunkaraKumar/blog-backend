import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes  from './routes/auth.js';
import postRoutes from './routes/posts.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log('MongoDB connected'))
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send('api is running')
})
app.use('/api/auth', authRoutes );
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));