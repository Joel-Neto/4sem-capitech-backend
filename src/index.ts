import express, { urlencoded } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';
import { setupSwagger } from './swagger';

dotenv.config();

mongoose
  .connect(process.env.DB_PATH!)
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(urlencoded({ extended: true }));
    app.use(cors());

    app.get('/', (_req, res) => {
      res.status(200).json({ entry: 'API Capitech rodando!' });
    });

    setupSwagger(app);
    app.use(routes);

    app.listen(3000, () => {
      console.log('api rodando em http://localhost:3000');
    });
  })
  .catch(() => console.log('Erro ao conectar ao mongodb'));
