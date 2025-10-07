import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '8000', 10);
const HOST = '0.0.0.0';

// Middlewares
const allowedOrigins = [
  process.env.LOCAL_URL || 'http://localhost:3000',
  process.env.PROD_URL,
  process.env.PROD_URL ? `https://www.${process.env.PROD_URL.replace('https://', '')}` : null
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api', routes);

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
