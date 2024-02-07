const regionSchema = require('../../shared/schemas/region_Schema.js');

const createRegion = async (req, res) => {
    try {
        const regionCheck = await regionSchema.create(req.body);
        console.log(regionCheck);
        if (!regionCheck) {
            return res.status(400).send({ message: 'Error creating region' });
        }
        return res.status(200).send({ message: 'Region created successfully', data: regionCheck });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

module.exports = {
    createRegion
};
    