

                                       
const agentMiddleware = (req, res, next) => {
   

    const currentDate = new Date().toLocaleString();
    console.log(`API Leveraged: Metodo: ${req.method}, Ruta: ${req.originalUrl}, Fecha: ${currentDate}`);
    next();
    
};

const jwt = require('jsonwebtoken');
const { secret } = require('../../../api.js');

const authentJWTMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
if (!authHeader) {
    return res.status(401).send({ message: 'Unauthorized' });
}

const token = authHeader.split(' ')[1]; // Split on the space and take the second part
if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
}

console.log(token); // debugging purposes

try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
} catch(error) {
    console.error(error); // debugging purposes
    return res.status(403).send({ message: 'Forbidden' });
}
};





module.exports = { authentJWTMiddleware, agentMiddleware };