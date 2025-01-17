import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('Starting up auth...');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not set');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

start();
