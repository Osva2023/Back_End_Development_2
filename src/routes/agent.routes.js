const AgentController = require('../features/controllers/agent.controller.js');
const {agentMiddleware} = require('../shared/middleware/base_middleware.js');
const agentRoutes = (app) => {
    app.post('/agent-create', agentMiddleware, AgentController.createAgent); // in the middle we need to call a middleware to validate the body
};

module.exports = {
    agentRoutes
};