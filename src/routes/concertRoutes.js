const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const [rows] = await pool.query(
            "SELECT id, title, venue, concert_date, created_at FROM concerts"
        );
        res.json(rows);
    } catch(error){
        res.status(500).json({ message: "Database error "});
    }
});

router.get("/:id", async (req, res) => {
    try{
        const id = Number(req.params.id);

        const [rows] = await pool.query(
            "SELECT id, title, venue, concert_date, created_at FROM concerts WHERE id = ?",
            [id]
        );

        if(rows.length === 0){
            return res.status(404).json({
                message: "Concert not found",
            });
        }

        res.json(rows[0]);

    } catch(error){
        console.error(error);
        res.status(500).json({message: "Database error"});
    }
});

module.exports = router;