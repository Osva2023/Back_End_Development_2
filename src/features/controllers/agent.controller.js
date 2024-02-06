
const agentSchema = require('../../shared/schemas/agent_Schema.js');


const createAgent = async(req, res) => {
    const agentCheck = await agentSchema.create(req.body);
    console.log(agentCheck)
    if (!agentCheck) {
        return res.status(400).send({ message: 'Error creating agent' });
    }
    return res.status(200).send({ message: 'Agent created successfully', data: agentCheck });
};


module.exports = {
    createAgent
};
