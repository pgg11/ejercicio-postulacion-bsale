function automaticCheckIn(passengersInfo, passengersPerClass, seats){
    let firstClassPassengers = passengersPerClass[0];
    let secondClassPassengers = passengersPerClass[1];
    let thirdClassPassengers = passengersPerClass[2];

    let firstClassAvailableSeats = removeOccupiedSeats(seats[0],firstClassPassengers);
    let secondClassAvailableSeats = removeOccupiedSeats(seats[1],secondClassPassengers);
    let thirdClassAvailableSeats =  removeOccupiedSeats(seats[2],thirdClassPassengers);

    let mapSeatClass = {
        1: firstClassAvailableSeats,
        2: secondClassAvailableSeats,
        3: thirdClassAvailableSeats
    }

    //Asigna asientos a pasajeros con sus compañeros de viaje por clase
    for(let passenger of passengersInfo){
        if(!passenger.seatId){
            let seatClass = passenger.seatTypeId;
            //Busco los compañeros de viaje que ya tengan asiento
            let companionPassengers = passengersInfo.filter(p => p.purchaseId === passenger.purchaseId && p.seatId);
            if(companionPassengers.length > 0){
                //Busca asiento hasta encontrar asiento cercano al de los compañeros
                for(let companion of companionPassengers){
                    let seat = findSeat(passenger, seats[seatClass-1],mapSeatClass[seatClass],companion);
                    if(seat){
                        passenger.seatId = seat;
                        mapSeatClass[seatClass] = removeOccupiedSeats(mapSeatClass[seatClass],[passenger]);    
                        break;
                    }                 
                }
            }
        }
    }

    for(let passenger of passengersInfo){
        if(!passenger.seatId){
            let seatClass = passenger.seatTypeId;
            passenger.seatId = mapSeatClass[seatClass][0].seatId;
            mapSeatClass[seatClass] = removeOccupiedSeats(mapSeatClass[seatClass],[passenger]);
        }
    }
}


function findSeat(passenger,seats,availableSeats,companionPassenger){
    let airplaneId = seats[0].airplaneId;
    let seatId;
    if(passenger.age < 18){
        seatId = getSameRowSeat(companionPassenger,seats,availableSeats,airplaneId);
        return seatId;
    }else{
        seatId = getSameColSeat(companionPassenger,seats,availableSeats,airplaneId);
        if(seatId){
            return seatId;
        }else{
            seatId = getSameRowSeat(companionPassenger,seats,availableSeats,airplaneId);
            return seatId;
        }
    }

    
}

function getSameRowSeat(passenger,seats,availableSeats,airplane){
    let passengerSeatType = passenger.seatTypeId;
    let passengerSeatId = passenger.seatId;
    let passengerSeat = seats.filter( s => s.seatId === passengerSeatId)[0];
    let passengerSeatCol = passengerSeat.seatColumn;
    let passengerSeatRow = passengerSeat.seatRow;

    let previousColumn = getPreviousColumn(passengerSeatCol,airplane,passengerSeatType);
    let nextColumn = getNextColumn(passengerSeatCol,airplane,passengerSeatType);

    if(previousColumn){
        let seat = availableSeats.filter( seat => seat.seatColumn === previousColumn && seat.seatRow === passengerSeatRow)[0];
        if(seat){
            return seat.seatId;
        }
    }

    if(nextColumn){
        let seat = availableSeats.filter( seat => seat.seatColumn === nextColumn && seat.seatRow === passengerSeatRow)[0];
        if(seat){
            return seat.seatId;
        }
    }

    return false;
}

function getSameColSeat(passenger,seats,availableSeats,airplane){
    let passengerSeatId = passenger.seatId;
    let passengerSeat = seats.filter( s => s.seatId === passengerSeatId)[0];
    let passengerSeatCol = passengerSeat.seatColumn;
    let passengerSeatRow = passengerSeat.seatRow;

    let previousRow = getPreviousRow(passengerSeatRow,airplane);
    let nextRow = getNextRow(passengerSeatRow,airplane);

    if(previousRow){
        let seat = availableSeats.filter( seat => seat.seatRow === previousRow && seat.seatColumn === passengerSeatCol)[0];
        if(seat){
            return seat.seatId;
        }
    }

    if(nextRow){
        let seat = availableSeats.filter( seat => seat.seatRow === nextRow && seat.seatColumn === passengerSeatCol)[0];
        if(seat){
            return seat.seatId;
        }
    }

    return false;
}

function getNextColumn(colName, airplaneId, seatTypeId) {
    if(airplaneId === 1){   
        const cols = ['A','B','C','D','E','F','G'];
        let index = cols.indexOf(colName); 
        if(seatTypeId === 1){
            if(index === 0 || index === 5){
                return cols[index + 1];
            }
            if(index === 1){
                return cols[index + 4];
            }
            return false;
        }
    
        if(seatTypeId === 2 || seatTypeId === 3){
            if( index === 2){
                return cols[index+2]
            }
            if (index === 6){
                return false;
            }
            return cols[index+1]
        }
    }

    if(airplaneId === 2){
        const cols = ['A','B','C','D','E','F','G','H','I'];
        let index = cols.indexOf(colName); 
        if(seatTypeId === 1){
            if(index === 0 || index === 4){
                return cols[index+4]
            }
            return false;
        }
    
        if(seatTypeId === 2 || seatTypeId === 3){
            if(index === 1 || index === 5){
                return cols[index+2];
            }
            if(index === 8){
                return false;
            }
            return cols[index+1];
        }
    }
}

function getPreviousColumn(colName, airplaneId, seatTypeId) {
    if(airplaneId === 1){
        const cols = ['A','B','C','D','E','F','G'];
        let index = cols.indexOf(colName);
        if(seatTypeId === 1 || seatTypeId === 6){
            return cols[index-1];
        }
    
        if(seatTypeId === 5){
            return cols[index-4]
        }
        return false;
    }

    if(airplaneId === 2){
        const cols = ['A','B','C','D','E','F','G','H','I'];
        let index = cols.indexOf(colName);
        if(seatTypeId === 1){
            if(index === 8 || index === 4){
                return cols[index-4]
            }
            return false;
        }

        if(seatTypeId === 2 || seatTypeId === 3){
            if(index === 7 || index === 3){
                return cols[index-2]
            }
            if(index === 0){
                return false;
            }
            return cols[index-1];
        }
    }
}

function getNextRow(row, airplaneId) {

    if(airplaneId === 1){
        if( (row > 0 && row < 4) || (row > 7 && row < 15) || (row > 18 && row < 34)){
            let newRow = row + 1;
            return newRow;
        }
        return false;
    }

    if(airplaneId === 2){
        if( (row > 0 && row < 5) || (row > 8 && row < 14) || (row > 17 && row < 31)){
            let newRow = row + 1;
            return newRow;
        }
        return false
    }
}

function getPreviousRow(row, airplaneId) {

    if(airplaneId === 1){
        if( (row > 1 && row < 5) || (row > 8 && row < 16) || (row > 19 && row < 35)){
            let newRow = row - 1;
            return newRow;
        }
        return false;
    }

    if(airplaneId === 2){
        if( (row > 1 && row < 6) || (row > 9 && row < 15) || (row > 18 && row < 32)){
            let newRow = row -1;
            return newRow;
        }
        return false;
    }
}

function removeOccupiedSeats(seats, passengers){
    for(let passenger of passengers){
        seats = seats.filter(seat => seat.seatId !== passenger.seatId);
    }

    return seats;
}

module.exports = { automaticCheckIn }