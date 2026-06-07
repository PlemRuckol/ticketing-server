const express = require("express");

const router = express.Router();

let reservations = [];
let nextReservationId = 1;

router.get("/", (req, res) => {
    res.json(reservations);
});

router.get("/:id", (req, res) =>{
    const id = Number(req.params.id);

    const reservation = reservations.find((reservation) => reservation.id === id);

    if(!reservation){
        return res.status(404).json({
            message: "Reservation not found",
        });
    }
    res.json(reservation);

});

router.post("/", (req, res) => {
    const { concertId, userName, seatNumber } = req.body;
    if(!concertId || !userName || !seatNumber){
        return res.status(400).json({
            message: "concertId, userName, seatNumber are required",
        });
    }
    const reservation = {
        id: nextReservationId++,
        concertId,
        userName,
        seatNumber,
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
    };
    reservations.push(reservation);
    res.status(201).json(reservation);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const reservationIndex =  reservations.findIndex(
        (reservation) => reservation.id === id
    );

    if(reservationIndex === -1){
        return res.status(404).json({
            message: "Reservation not found",
        });
    }
    reservations.splice(reservationIndex, 1);

    res.json({
        message: "Reservation cancelled",
    });
});

module.exports = router;