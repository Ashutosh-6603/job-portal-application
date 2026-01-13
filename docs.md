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