require('dotenv').config();

const PORT = process.env.PORT || 3004;
const ENV = process.env.NODE_ENV || 'local';

const helloWorld = async(req, res) => {
  res.send('Hello World!!');
};

const status = async(req, res) => {
  res.status(200).send(`The server in '${ENV}' is listening on port: '${PORT}'`);
};

const error = async(req, res) => {
  res.status(400).send('Error on required request body or parameters.');
}
module.exports = {helloWorld, status, error};