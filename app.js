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
const AgentRoutes = require('./src/routes/agent.routes');
const RegionRoutes = require('./src/routes/region.routes');

app.use(Express.json());

HealthRoutes.registerHealthRoutes(app);
AgentRoutes.agentRoutes(app);
RegionRoutes.regionRoutes(app);

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})