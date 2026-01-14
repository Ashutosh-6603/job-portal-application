# Job Portal – Steps to Create the Job Portal Application

---

## Step 1: Create Project Folders
- Create two folders at the root level:
  - `frontend`
  - `services`

## Step 2: Create Service Folders
- Inside the `services` folder, create the following folders:
  - `auth`
  - `user`

## Step 3: Navigate to Auth Service
- Open the terminal and run the following command:

```bash
cd services/auth
```
## AUTH SERVICE

## Step 4: Initialize the Application
- Initialize the auth service application by running the following command:

```bash
npm init -y
```

## Step 5: Install TypeScript Globally
- Install TypeScript globally on your system:

```bash
npm i -g typescript
```

## Step 6: Initialize TypeScript
- Initialize TypeScript configuration for the auth service:

```bash
npx tsc --init
```

## Step 7: Update tsconfig.json
- After initializing TypeScript, a tsconfig.json file will be created.

- Update the file with the following configuration:

```js
{
  "compilerOptions": {
    "target": "es2020",
    "module": "nodenext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Step 8: Create Source Folder and Update Package Configuration
- Create a folder named `src` inside the `auth` folder.
- Then edit the `package.json` file to include the following field:

```json
"type": "module"
```

## Step 9: Install Required Packages
- In the `auth` microservice folder, install the necessary packages by running the following command:

```bash
npm i express dotenv bcrypt jsonwebtoken
npm i -D @types/express @types/dotenv @types/bcrypt @types/jsonwebtoken typescript nodemon concurrently
```

## Step 10: Create Source Files
- Inside the `src` folder, create two files named:
  - `index.ts`
  - `app.ts`

## Step 11: Create the Express Application
- In `app.ts`, create and export the Express app:

```js
import express from "express";

const app = express();

export default app;
```

## Step 12: Import and Start the Server
- In `index.ts`, import the Express app and start the server:

```js
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Auth service is running on port ${port}`);
});
```

## Step 13: Create Environment File
- In the root of the `auth` service directory, create a `.env` file.
- Add the following:

```env
PORT=5000
```

## Step 14: Generate the Build
- To compile the TypeScript code and generate the build for the auth service, run the following command:

```bash
tsc
```

## Step 15: Add Scripts to `package.json`
- Edit the `package.json` file and add the following scripts:

```json
"build": "npm install && tsc",
"start": "node dist/index.js",
"dev": "concurrently \"tsc -w\" \"nodemon dist/index.js\""
```

## Note on Script Commands
- **build command**: Installs dependencies and generates the build of the microservice.
- **start command**: Runs the server from the `dist` (build) folder.
- **dev command**: Uses "concurrently" to run two commands at once: compiling TypeScript(generating the build) and running the server simultaneously.

## Step 16: Create a Neon Database Project
- Go to Neon DB.
- Create a new project named `job-portal`.

## Step 17: Add Database URL to Environment File
- After creating the project, click on "Connect to your database."
- Copy the connection string URL.
- In your auth service `.env` file, add:

```env
DB_URL=<url>
```

## Step 18: Install Neon Database Client
- To connect to your serverless Neon PostgreSQL DB, install the required package:

```bash
npm i @neondatabase/serverless
```

## Step 19: Set Up Database Connection
- Inside the `src` folder, create a `utils` folder.
- In the `utils` folder, create a file named `db.ts`.
- Add the following code to establish the database connection:

```js
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const dbURL = process.env.DB_URL as string;

export const sql = neon(dbURL);
```

## Step 20: Initialize Database Connection
- In `index.ts`, add a method to initialize the database tables:

```js
import { sql } from "./utils/db.js";

async function initDB() {
  try {
    await sql`
      DO $$
      BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
      CREATE TYPE user_role AS ENUM ('jobseeker', 'recruiter');
      END IF;
      END$$;
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        role user_role NOT NULL,
        bio TEXT,
        resume VARCHAR(255),
        resume_public_id VARCHAR(255),
        profile_pic VARCHAR(255),
        profile_pic_public_id VARCHAR(255),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        subscription TIMESTAMP
      );
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS skills (
        skill_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
      );
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS user_skills (
        user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        skill_id INTEGER NOT NULL REFERENCES skills(skill_id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, skill_id)
      );
    `;
    
    console.log("✅ Database tables checked/created successfully");
  } catch (error) {
    console.log("❌ Error initiating database:", error);
  }
}
```

- After the queries are done, update your server initialization to this, after the above code snippet:

```js
initDB().then(() => {
  app.listen(port, () => {
    console.log(`Auth service is running on port ${port}`);
  });
});
```

## Step 21: Create Auth Routes
- Inside the `src` folder, create a `routes` folder.
- Inside `routes`, create a file named `auth.ts` with the following:

```js
import express from "express";

const router = express.Router();

export default router;
```

## Step 22: Register Routes in App
- In `app.ts`, import the auth routes and use them:

```js
import express from "express";
import authRoutes from "./routes/auth.js";

const app = express();

app.use("/api/auth", authRoutes);

export default app;
```