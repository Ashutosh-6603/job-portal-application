import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();
const dbURL = process.env.NEON_DB_URL;
export const sql = neon(dbURL);
