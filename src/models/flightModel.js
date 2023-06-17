const mySQL = require('../config/database');

const FlightModel = {

    getFlightInfo: (id) => {
        const query = "SELECT * FROM flight WHERE flight_id =" + id;
        return new Promise((res, rej) => {
            mySQL.conn.query(query, (err, rows) => {
                if(err) return rej(err);
                res(rows);
            })
        })
    },

    getFlightPassengers: (id) => {
        const query = "SELECT p.passenger_id, p.dni, p.name, p.age, p.country, " + 
        "bp.boarding_pass_id, bp.purchase_id, bp.seat_type_id, bp.seat_id " + 
        "FROM passenger p INNER JOIN boarding_pass bp ON p.passenger_id=bp.passenger_id WHERE flight_id=" + id;
        
        return new Promise((res, rej) => {
            mySQL.conn.query(query, (err, rows) => {
                if(err) return rej(err);
                res(rows);
            })
        });
    },

    getFirstClassPassengers: (id) => {

        const query = "select p.passenger_id, bp.purchase_id, s.seat_id, s.seat_type_id, s.seat_column, s.seat_row" +
        " FROM passenger p INNER JOIN boarding_pass bp ON p.passenger_id=bp.passenger_id" +
        " INNER JOIN seat s ON s.seat_id = bp.seat_id WHERE bp.seat_type_id = 1" +
        " AND bp.flight_id = " + id;

        return new Promise((res, rej) => {
            mySQL.conn.query(query, (err, rows) => {
                if(err) return rej(err);
                res(rows);
            })
        });
    },

    getSecondClassPassengers: (id) => {

        const query = "select p.passenger_id, bp.purchase_id, s.seat_id, s.seat_type_id, s.seat_column, s.seat_row" +
        " FROM passenger p INNER JOIN boarding_pass bp on p.passenger_id=bp.passenger_id" +
        " INNER JOIN seat s on s.seat_id = bp.seat_id WHERE bp.seat_type_id = 2" +
        " AND bp.flight_id = " + id;

        return new Promise((res, rej) => {
            mySQL.conn.query(query, (err, rows) => {
                if(err) return rej(err);
                res(rows);
            })
        });
    },

    getThirdClassPassengers: (id) => {

        const query = "select p.passenger_id, bp.purchase_id, s.seat_id, s.seat_type_id, s.seat_column, s.seat_row" +
        " FROM passenger p INNER JOIN boarding_pass bp on p.passenger_id=bp.passenger_id" +
        " INNER JOIN seat s on s.seat_id = bp.seat_id WHERE bp.seat_type_id = 3" +
        " AND bp.flight_id = " + id;

        return new Promise((res, rej) => {
            mySQL.conn.query(query, (err, rows) => {
                if(err) return rej(err);
                res(rows);
            })
        });
    },

    getFirstClassSeats: (id) => {
        const query = "SELECT s.seat_id, s.seat_column, s.seat_row, s.airplane_id" +
        " FROM flight  f INNER JOIN airplane a ON f.airplane_id = a.airplane_id" +
        " INNER JOIN seat s ON a.airplane_id = s.airplane_id WHERE s.seat_type_id = 1" +
        " AND f.flight_id = " + id;

        return new Promise((res, rej) => {
            mySQL.conn.query(query, (err, rows) => {
                if(err) return rej(err);
                res(rows);
            })
        });
    },

    getSecondClassSeats: (id) => {
        const query = "SELECT s.seat_id, s.seat_column, s.seat_row, s.airplane_id" +
        " FROM flight  f INNER JOIN airplane a ON f.airplane_id = a.airplane_id" +
        " INNER JOIN seat s ON a.airplane_id = s.airplane_id WHERE s.seat_type_id = 2" +
        " AND f.flight_id = " + id;

        return new Promise((res, rej) => {
            mySQL.conn.query(query, (err, rows) => {
                if(err) return rej(err);
                res(rows);
            })
        });
    },

    getThirdClassSeats: (id) => {
        const query = "SELECT s.seat_id, s.seat_column, s.seat_row, s.airplane_id" +
        " FROM flight  f INNER JOIN airplane a ON f.airplane_id = a.airplane_id" +
        " INNER JOIN seat s ON a.airplane_id = s.airplane_id WHERE s.seat_type_id = 3" +
        " AND f.flight_id = " + id;

        return new Promise((res, rej) => {
            mySQL.conn.query(query, (err, rows) => {
                if(err) return rej(err);
                res(rows);
            })
        });
    }
}

module.exports = FlightModel;