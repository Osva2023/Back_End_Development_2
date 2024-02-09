
require('dotenv').config();
const API_KEY = "Rocket1234"
                                       
const agentMiddleware = (req, res, next) => {
   const apiKey = req.headers['authorization'];
   console.log(API_KEY);                                       // debugging purposes
   console.log(apiKey);                                       // debugging purposes
                                          // debugging purposes
    if (!apiKey) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    if (apiKey !==  API_KEY) {
        return res.status(403).send({ message: 'Forbidden' });
    } 

    const currentDate = new Date().toLocaleString();
    console.log(`API Leveraged: Metodo: ${req.method}, Ruta: ${req.originalUrl}, Fecha: ${currentDate}`);
    next();
    
};


module.exports = { agentMiddleware };