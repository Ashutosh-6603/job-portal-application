import {neon} from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const dbURL = process.env.NEON_DB_URL as string;

export const sql = neon(dbURL);