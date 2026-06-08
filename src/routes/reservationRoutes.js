const express = require("express");
const reservationService = require("../services/reservationService");

const router = express.Router();

router.get("/", (req, res) => {
    const reservations = reservationService.gettAllReservations();
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

    if(reservationService.isSeatReserved(concertId, seatNumber)){
        return res.status(409).json({
            message: "Seat already reserved",
        });
    }

    const reservation =
        reservationService.createReservation(
            concertId,
            userName,
            seatNumber
        );
    res.status(201).json(reservation);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const deletedReservation = reservationService.deleteReservation(id);

    if(!deletedReservation){
        return res.status(404).json({
            message: "Reservation not found",
        });
    }

    res.json({
        message: "Reservation cancelled",
    });
});

module.exports = router;