const AgentController = require('../features/controllers/agent.controller.js');
const {agentMiddleware, authentJWTMiddleware} = require('../shared/middleware/base_middleware.js');
const agentRoutes = (app) => {
    app.post('/agent-create',agentMiddleware, authentJWTMiddleware, AgentController.createAgent);  // in the middle we need to call a middleware to validate the body
    app.get ('/agents', agentMiddleware, authentJWTMiddleware, AgentController.sortingAgents); // in the middle we need to call a middleware to validate the body 
    app.get ('/agents-by-region', agentMiddleware, authentJWTMiddleware, AgentController.byratingAgents);  
    app.patch ('/agent-update-info/:id',agentMiddleware, authentJWTMiddleware, AgentController.updatingAgent); 
    app.delete ('/agent-delete/:id',agentMiddleware, authentJWTMiddleware, AgentController.deletingAgent);                                                  
};

module.exports = {
    agentRoutes
};