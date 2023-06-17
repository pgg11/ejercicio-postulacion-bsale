const Flight = require('../models/flightModel');

const formatUtils = require('../utils/dataFormatting');
const seatAssignmentUtils = require('../utils/seatAssignmentLogic');

const getFlightPassengers = async (flightId) => {

    try{
        const flightQuery = await Flight.getFlightInfo(flightId);
        const passengersQuery = await Flight.getFlightPassengers(flightId);

        const firstClassPassengersQuery = await Flight.getFirstClassPassengers(flightId);
        const secondClassPassengersQuery = await Flight.getSecondClassPassengers(flightId);
        const thirdClassPassengersQuery = await Flight.getThirdClassPassengers(flightId);


        const firstClassSeatsQuery = await Flight.getFirstClassSeats(flightId);
        const secondClassSeatsQuery = await Flight.getSecondClassSeats(flightId);
        const thirdClassSeatsQuery = await Flight.getThirdClassSeats(flightId);


        let flightInfo = formatUtils.objectKeysToCamel(flightQuery[0]);
        let passengersInfo = formatUtils.queryObjectToArrayObject(passengersQuery);
        
        let firstClassSeats = formatUtils.queryObjectToArrayObject(firstClassSeatsQuery);
        let firstClassPassengersInfo = formatUtils.queryObjectToArrayObject(firstClassPassengersQuery);

        let secondClassSeats = formatUtils.queryObjectToArrayObject(secondClassSeatsQuery);
        let secondClassPassengersInfo = formatUtils.queryObjectToArrayObject(secondClassPassengersQuery);

        let thirdClassSeats = formatUtils.queryObjectToArrayObject(thirdClassSeatsQuery);
        let thirdClassPassengersInfo = formatUtils.queryObjectToArrayObject(thirdClassPassengersQuery);


        let passengers =[firstClassPassengersInfo, secondClassPassengersInfo, thirdClassPassengersInfo];
        let seats = [firstClassSeats, secondClassSeats, thirdClassSeats];

        seatAssignmentUtils.automaticCheckIn(passengersInfo,passengers,seats);
        
        flightInfo.passengers = passengersInfo;

        return {code: 200, data: flightInfo};
        
    }catch(err){
        console.error(err);
        return ({code: 404, data: {} });
    }
    
}

module.exports = { getFlightPassengers };