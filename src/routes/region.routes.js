const RegionController = require('../features/controllers/region.controller');
const {agentMiddleware} = require('../shared/middleware/base_middleware');

const regionRoutes = (app) => {
    app.post('/region-create', agentMiddleware, RegionController.createRegion);
    app.get('/region', agentMiddleware, RegionController.displayRegions);
    app.get('/all-stars', agentMiddleware, RegionController.displayAllStar);
};

module.exports = {
    regionRoutes};

