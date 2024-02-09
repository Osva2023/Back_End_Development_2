const RegionController = require('../features/controllers/region.controller');
const {agentMiddleware, authentJWTMiddleware} = require('../shared/middleware/base_middleware');

const regionRoutes = (app) => {
    app.post('/region-create',agentMiddleware, authentJWTMiddleware, RegionController.createRegion);
    app.get('/region',agentMiddleware, authentJWTMiddleware, RegionController.displayRegions);
    app.get('/all-stars', agentMiddleware, authentJWTMiddleware, RegionController.displayAllStar);
};

module.exports = {
    regionRoutes};

