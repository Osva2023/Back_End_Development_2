const RegionController = require('../features/controllers/region.controller');
const {regionMiddleware} = require('../shared/middleware/base_middleware');

const regionRoutes = (app) => {
    app.post('/region-create', RegionController.createRegion);
    app.get('/region', RegionController.displayRegions);
    app.get('/all-stars', RegionController.displayAllStar);
};

module.exports = {
    regionRoutes};

