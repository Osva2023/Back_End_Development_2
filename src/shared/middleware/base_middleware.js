const agentMiddleware = (req, res, next) => {
    const currentDate = new Date().toLocaleString();
    console.log(`API Leveraged: Metodo: ${req.method}, Ruta: ${req.originalUrl}, Fecha: ${currentDate}`);
    next();
    res.status(200);
};


module.exports = { agentMiddleware };