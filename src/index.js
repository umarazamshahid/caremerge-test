require("dotenv").config();
const express = require("express");
const app = express();
const titleRoutes = require("./routes/titleRoutes");

const PORT = process.env.PORT || 3000;

app.use("/I/want/title", titleRoutes);

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
