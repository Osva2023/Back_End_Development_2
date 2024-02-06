
const agentSchema = require('../../shared/schemas/agent_Schema.js');


const createAgent = async(req, res) => {
    const agentCheck = await agentSchema.create(req.body);
    console.log(agentCheck)
    if (!agentCheck) {
        return res.status(400).send({ message: 'Error creating agent' });
    }
    return res.status(200).send({ message: 'Agent created successfully', data: agentCheck });
};

const sortingAgents = async(req, res) => {
    const sortedAgents = await agentSchema.find().sort({ last_name: 1 });
    if (!sortedAgents) {
        return res.status(400).send({ message: 'Error sorting agents' });
    }
    return res.status(200).send({ message: 'Agents sorted successfully', data: sortedAgents });
};

module.exports = {
    createAgent,
    sortingAgents
};
