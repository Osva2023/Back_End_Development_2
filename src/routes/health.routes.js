const HealthController = require('../features/health/health.controller');
const { agentMiddleware } = require('../shared/middleware/base_middleware');

const registerHealthRoutes = (app) => {
  app.get('/hello',agentMiddleware, HealthController.helloWorld);
  app.get('/status',agentMiddleware, HealthController.status);
  app.get('/error',agentMiddleware, HealthController.error);
};
module.exports = {registerHealthRoutes};