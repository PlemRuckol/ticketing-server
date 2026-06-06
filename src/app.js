const express = require("express");

const app = express();
const PORT = 3000;

const concerts = [
    {
        id: 1,
        title: "뮤지컬 레미제라블",
        date: "2026-07-01",
    },
    {
        id: 2,
        title: "Jazz Night",
        date: "2026-07-15",
    },
];

app.get("/", (req, res) => {
  res.send("Ticketing Server Start!");
});

app.get("/concerts", (req, res) => {
  res.json(concerts);
});

app.get("/concerts/:id", (req, res) => {
    const id = Number(req.params.id);

    const concert = concerts.find(c => c.id === id);

    if (!concert){
        return res.status(404).json({
            message: "Concert not found"
        });
    }

    res.json(concert);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});