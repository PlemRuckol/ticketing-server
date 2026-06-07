const express = require("express");

const router = express.Router();

const concerts = [
    {
        id: 1,
        title: "뮤지컬 레미제라블",
        date: "2026-07-01",
        venue: "블루스퀘어",
    },
    {
        id: 2,
        title: "Jazz Night",
        date: "2026-07-15",
        venue: "세종문화회관",
    },
];

router.get("/", (req, res) => {
    res.json(concerts);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const concert = concerts.find((concert) => concert.id === id);

    if(!concert){
        return res.status(404).json({
            message: "Concert not found",
        });
    }

    res.json(concert);
});

module.exports = router;