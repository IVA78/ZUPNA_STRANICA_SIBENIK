import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve backend API routes normally
// app.use('/api', apiRouter); // ako imaš API router

// Serve static files
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all for React SPA (all non-API routes)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Frontend running on port ${port}`);
});
