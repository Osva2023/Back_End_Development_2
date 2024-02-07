
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
    if (sortedAgents.length === 0) {
        return res.status(400).send({ message: 'Error sorting agents' });
    }
    return res.status(200).send({ message: 'Agents sorted successfully', data: sortedAgents });
};
const byratingAgents = async(req, res) => {
    let sortedAgents = await agentSchema.find().sort({ rating: -1 });
    const region = req.query.region;
    sortedAgents = sortedAgents.filter((agent) => agent.region === region);
    if (!sortedAgents) {
        return res.status(400).send({ message: 'Error sorting agents' });
    }
    return res.status(200).send({ message: 'List of agents sorted by rating', data: sortedAgents });
};
const updatingAgent = async (req, res) => {
    const allowedKeys = ['first_name', 'last_name', 'email', 'region'];
    const updates = Object.keys(req.body);
    console.log(allowedKeys);                                                       // debugging purposes
    console.log(updates);                                                           // debugging purposes
    const isValidOperation = Object.keys(req.body).every((update) => allowedKeys.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ message: 'Invalid updates!' });
    }

    try {
        const agent = await agentSchema.findById(req.params.id); // BUT NOT ID

        if (!agent) {
            return res.status(404).send({ message: 'Agent not found' });
        }

        updates.forEach((update) => {
            agent[update] = req.body[update];
        });

        await agent.save();

        return res.status(200).send({ message: 'Agent updated successfully', data: agent });
    } catch (error) {
        return res.status(500).send({ message: 'Error updating agent' });
    }
};

    
const deletingAgent = async (req, res) => {
    try {
        const deleted = await agentSchema.deleteOne({_id: req.params.id});
        console.log(deleted);                                                    // debugging purposes
        if (!deleted) {
            return res.status(404).send({ message: 'Agent not found' });
        }
        if (deleted.deletedCount === 1) {
            return res.status(200).send({ message: 'Agent deleted successfully' });
        } else {
            return res.status(400).send({ message: 'Error deleting agent' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
};

module.exports = { createAgent, sortingAgents, byratingAgents, updatingAgent, deletingAgent };