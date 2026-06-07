const express = require("express");
const concertRoutes = require("./routes/concertRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ticketing Server Start!");
});

app.use("/concerts", concertRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});