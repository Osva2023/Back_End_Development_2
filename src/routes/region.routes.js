const RegionController = require('../features/controllers/region.controller');
const {regionMiddleware} = require('../shared/middleware/base_middleware');

const regionRoutes = (app) => {
    app.post('/region-create', RegionController.createRegion);
};

module.exports = {
    regionRoutes};

