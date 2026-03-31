import express, { Application } from 'express';
import cors from 'cors';
import { initialize } from './_helpers/db';
import usersController from './users/users.controller';
import { errorHandler } from './_middleware/errorHandler';

const app: Application = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/users', usersController);

// ─── Global Error Handler (must be last) ─────────────────────────────────────
app.use(errorHandler);

// ─── Bootstrap ────────────────────────────────────────────────────────────────
const PORT = 4000;

initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  });

export default app;