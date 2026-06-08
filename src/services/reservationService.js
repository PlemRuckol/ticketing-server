let reservations = [];
let nextReservationId = 1;

function getAllReservations(){
    return reservations;
}

function getReservationById(id){
    return reservations.find(
        reservation => reservation.id === id
    );
}

function createReservation(
    concertId,
    userName,
    seatNumber
){
    const reservation = {
        id: nextReservationId++,
        concertId,
        userName,
        seatNumber,
        status: "CONFIRMED",
        createadAt: new Date().toISOString()
    };

    reservations.push(reservation);

    return reservation;
}

function isSeatReserved(concertId, seatNumber){
    return reservations.some(
        reservation =>
            reservation.concertId === concertId &&
        reservation.seatNumber === seatNumber
    );
}

function deleteReservation(id){
    const reservationIndex = reservations.findIndex(
        (reservation) => reservation.id === id
    );

    if(reservationIndex === -1){
        return null;
    }

    const deletedReservation = reservations.splice(reservationIndex, 1);
    return deletedReservation[0];
}

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    isSeatReserved,
    deleteReservation,
};