// Initial dependencies and definitions
require('dotenv').config();
const Express = require('express');
const app = Express();
const port = process.env.PORT || 3004;

// Open MongoDB connection
const MongoManager = require('./src/shared/resources/db/mongo-manager')
MongoManager.openMongoConnection();

// Import routes
const HealthRoutes = require('./src/routes/health.routes');


app.use(Express.json());

HealthRoutes.registerHealthRoutes(app);

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})