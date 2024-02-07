const AgentController = require('../features/controllers/agent.controller.js');
const {agentMiddleware} = require('../shared/middleware/base_middleware.js');
const agentRoutes = (app) => {
    app.post('/agent-create', agentMiddleware, AgentController.createAgent);  // in the middle we need to call a middleware to validate the body
    app.get ('/agents', agentMiddleware, AgentController.sortingAgents); // in the middle we need to call a middleware to validate the body 
    app.get ('/agents-by-region', agentMiddleware, AgentController.byratingAgents);  
    app.patch ('/agent-update-info/:id', agentMiddleware, AgentController.updatingAgent); 
    app.delete ('/agent-delete/:id', agentMiddleware, AgentController.deletingAgent);                                                  
};

module.exports = {
    agentRoutes
};