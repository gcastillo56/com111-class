# COM-111: Web Application Development

Here is a quick step by step guide on basic understanding of the tools and projects we will use during this course.

## Command line cheat sheet
Here is a compact Linux command line cheat sheet designed specifically for web development workflows.


### 📁 Navigation & Directory Inspection

| Command | What it does | Pro-Tip / Use Case |
| --- | --- | --- |
| **`pwd`** | Print current path | Find out exactly where you are in the directory tree. |
| **`ls`** | List files | Basic folder contents list. |
| **`ls -la`** | Detailed + hidden files | Shows file permissions, sizes, and crucial hidden config files like `.env`, `.gitignore`, and `.git/`. |
| **`cd <folder>`** | Change directory | Move forward into a folder. |
| **`cd ..`** | Move up one level | Step out of a subfolder (e.g., leaving `src/components` back to `src`). |
| **`cd -`** | Toggle last directory | **Developer Favorite:** Instantly toggle back and then forth between two paths (like switching between your `/frontend` and `/backend` directories). |
| **`cd ~`** | Go home | Jumps straight to the root user directory. |

---

### 🛠️ File & Folder Manipulation

| Command | What it does | Pro-Tip / Use Case |
| --- | --- | --- |
| **`mkdir <name>`** | Create a folder | Set up a new project directory. |
| **`mkdir -p <path>`** | Create nested folders | `mkdir -p src/app/api` creates all three folders at once. |
| **`touch <file>`** | Create an empty file | Quickly spin up local config files like `touch .env.local`. |
| **`cat <file>`** | View small files | Instantly print a file's code to the terminal (e.g., `cat package.json`). |
| **`less <file>`** | View large files | Opens an interactive viewer for large log files so you can scroll without lagging your terminal. Press `q` to exit. |
| **`rm <file>`** | Delete a file | Permanently deletes a single file. **No trash bin recovery!** |
| **`rm -rf <folder>`** | Force delete a folder | The ultimate cleanup tool. Run `rm -rf node_modules` to completely wipe out dependencies when a build breaks. |

---

### 📡 Ports, Processes & System Management

| Command | What it does | Pro-Tip / Use Case |
| --- | --- | --- |
| **`htop`** (or `top`) | System monitor | Real-time view of your RAM/CPU. Use this if your Docker container suddenly feels slow to check for runaway processes. |
| **`lsof -i :<port>`** | Inspect a port | If your server crashes saying "Port 3000 is already in use", run `lsof -i :3000` to find the exact Process ID (PID) locking it up. |
| **`kill -9 <PID>`** | Force kill a process | Instantly terminates a stuck background process using the ID you found via `lsof`. |
| **`clear`** | Clear screen | Wipes the terminal history display clean so you can focus on a fresh command stream. |

---

### ⚡ Productivity Shortcuts & Search

* **`Tab` Key:** Type the first 2 or 3 letters of a filename or path and hit `Tab` to auto-complete it. **Double-Tab** shows you a list of matching alternatives.
* **`Ctrl + C`:** The universal cancel key. Instantly halts a running local server, stuck build process, or long script execution.
* **`history`:** Displays a list of all your previously run commands.
* **`history \| grep "<keyword>"`:** Filters your history. Forgot that complex Docker or Git command you ran yesterday? Run `history | grep "docker"` to find it instantly.



## The Git Workflow

### Core Workflow Commands

| Phase             | Goal                  | Command                        | What It Does                                                        |
| :---------------- | :-------------------- | :----------------------------- | :------------------------------------------------------------------ |
| **Sync & Prep**   | Check status          | `git status`                   | Shows current branch and uncommitted changes.                       |
|                   | Pull updates          | `git pull origin <branch>`     | Downloads the latest code from GitHub.                              |
|                   | Branch out            | `git checkout -b <new-branch>` | Creates a new branch and switches to it.                            |
| **Work & Stage**  | Stage everything      | `git add .`                    | Adds all modified/new files to staging.                             |
|                   | Stage specific        | `git add <file-path>`          | Adds only a specific file.                                          |
| **Commit & Push** | Save snapshot         | `git commit -m "Message"`      | Wraps staged files into a permanent snapshot.                       |
|                   | **Push (First Time)** | `git push -u origin <branch>`  | **Creates the branch on GitHub** and links it to your local branch. |
|                   | Push (Normal)         | `git push`                     | Uploads local commits to the already-linked remote branch.          |
| **Review & Undo** | Compact logs          | `git log --oneline`            | Shows a condensed history of commits.                               |
|                   | Unstage files         | `git reset`                    | Removes files from staging without deleting code.                   |
|                   | Trash changes         | `git restore .`                | **Danger!** Deletes all uncommitted local changes.                  |

---

### Branch Management & Merging

| Action        | Command                             | What It Does                                                |
| :------------ | :---------------------------------- | :---------------------------------------------------------- |
| List local    | `git branch`                        | Lists local branches (active one has a `*`).                |
| List all      | `git branch -a`                     | Lists local AND remote branches.                            |
| Merge branch  | `git merge <branch>`                | Integrates the specified branch into your _current_ branch. |
| Delete local  | `git branch -d <branch>`            | Deletes the branch locally (only if safely merged).         |
| Force delete  | `git branch -D <branch>`            | **Danger!** Deletes local branch even if unmerged.          |
| Delete remote | `git push origin --delete <branch>` | Deletes the branch off the GitHub server.                   |

---

## Node.js

Here is a quick, step-by-step guide to setting up a standard Node.js project from scratch.

### 1. Initialize the Project

Create a new folder for your project, navigate into it using your terminal, and generate your `package.json` file.

```bash
mkdir my-node-project
cd my-node-project
npm init
```

Answer the setup questions to create your initial app manager.

_(Add the `-y` flag to automatically skip the setup questionnaire and uses standard default settings)._

### 2. Install Dependencies

Install the core packages you need. For a typical web server, you will likely want `express`. It is also highly recommended to install `nodemon` as a development dependency so your server restarts automatically when you save changes.

```bash
npm install express
npm install --save-dev nodemon
```

### 3. Create the Entry Point

Create your main application file in the root directory. This is usually named `server.js` or `index.js`.

```bash
touch server.js

```

### 4. Configure Your Scripts

Open the `package.json` file and update the `"scripts"` section. This allows you to use simple `npm run` commands to start your application.

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

```

### 5. Add Boilerplate Code

Open your `server.js` file and add a minimal Express setup to verify everything is wired up correctly.

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// A simple test route
app.get("/api/status", (req, res) => {
  res.json({ status: "success", message: "Node project is running!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

### 6. Run the Server

Start your project using the development script.

```bash
npm run dev
```

Your terminal should output `Server listening on port 3000`, and you can test it by navigating to `http://localhost:3000/api/status` in your browser or Postman.

## React (NextJS) without Tailwind

Here is a quick, step-by-step guide to setting up a Next.js project using standard CSS or CSS Modules instead of Tailwind.

### 1. Initialize the Project

Run the Next.js create command in your terminal. We will use the interactive mode because it is the most reliable way to opt out of Tailwind.

```bash
npx create-next-app@latest my-next-project
cd my-next-project
```

When you run the command, Next.js will ask you a series of questions. Answer them like this to ensure Tailwind is excluded while keeping modern features like the App Router:

- Would you like to use the recommended Next.js defaults? ›**No, customize settings**
- Would you like to use TypeScript? … **Yes**
- Which linter would you like to use? › **ESLint**
- Would you like to use React Compiler? … **Yes**
- Would you like to use Tailwind CSS? … **No**
- Would you like your code inside a `src/` directory? … **Yes**
- Would you like to use App Router? (recommended) … **Yes**
- Would you like to customize the import alias (`@/*` by default)? … **No**
- Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? … **No**

### 2. Clean Up the Boilerplate

Because you opted out of Tailwind, Next.js will generate standard CSS files (`page.module.css` and `globals.css`). It is usually best to clear out their default boilerplate to start fresh.

Open `src/app/globals.css` and delete everything. Add this basic reset:

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: sans-serif;
  background-color: #f4f4f9;
  color: #333;
}
```

### 3. Create a CSS Module

Next.js supports CSS Modules out of the box, which is the standard way to style Next.js apps without Tailwind. This scopes your CSS locally to the component so class names do not clash.

Open the existing `src/app/page.module.css` file, delete the default styles, and add your own:

```css
.container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  color: #0070f3;
  margin-bottom: 1rem;
}

.button {
  padding: 0.5rem 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #005bb5;
}
```

### 4. Wire Up Your Component

Now, open `src/app/page.tsx` (or `.jsx`), delete the default Next.js landing page code, and import your CSS module.

```tsx
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Welcome to Next.js</h1>
      <p style={{ marginBottom: "1rem" }}>
        This project uses standard CSS Modules instead of Tailwind.
      </p>
      <button className={styles.button}>Click Me</button>
    </main>
  );
}
```

### 5. Run the Development Server

Start the project to verify everything is working.

```bash
npm run dev

```

Navigate to `http://localhost:3000` (or whichever port your dev container is forwarding), and you will see your freshly styled, non-Tailwind Next.js application.

### To integrate Bootstrap to our project

---

Make sure you have already installed bootstrap in your project

```sh
npm install react-bootstrap bootstrap
```

#### Locate your Root Layout

Look for a file named `layout.tsx` (or `layout.jsx`).

- If you chose to use the `src/` directory, it will be at **`src/app/layout.tsx`**.
- If you didn't, it will be at **`app/layout.tsx`**.

#### Import the Bootstrap CSS

Open `layout.tsx` and add the Bootstrap CSS import near the top, right alongside any existing global CSS imports.

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// 1. Import Bootstrap CSS right here
import "bootstrap/dist/css/bootstrap.min.css";

// 2. Keep your custom global CSS below Bootstrap so it can override it if needed
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Next.js Bootstrap App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

#### Use it in your Pages

Because `layout.tsx` wraps every page in your Next.js app, Bootstrap's CSS is now available globally.

You can immediately open `src/app/page.tsx` and start using standard Bootstrap classes or `react-bootstrap` components.

```tsx
// src/app/page.tsx
import { Container, Button } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="mt-5 text-center">
      <h1 className="text-primary mb-4">Next.js + Bootstrap</h1>
      <Button variant="success">It Works!</Button>
    </Container>
  );
}
```
