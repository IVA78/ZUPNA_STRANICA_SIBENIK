const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Serviraj statične fajlove
app.use(express.static(path.join(__dirname, "dist")));

app.listen(port, () => {
  console.log(`Frontend running on port ${port}`);
});
