import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/dbConnect';
import campaignRoutes from './routes/campaignRoutes';
import { errorHandler } from './helper/customError';
import personalizedMessageRoutes from './routes/personalizedMessageRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




app.use('/campaigns', campaignRoutes);
app.use('/personalized-message', personalizedMessageRoutes);

app.use(errorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
