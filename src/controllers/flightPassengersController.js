const flightPassengersService = require('../services/flightPassengersService'); 

const getFlightPassengers = async (req,res) => {
    try{
        const result = await flightPassengersService.getFlightPassengers(req.params.id);
        res.send( { code: result.code, data: result.data} );
    }catch(error){
        res.send(error);
    }
};

module.exports = {getFlightPassengers};