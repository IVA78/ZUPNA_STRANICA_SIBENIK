const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Serviraj statične fajlove
app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Frontend running on port ${port}`);
});
