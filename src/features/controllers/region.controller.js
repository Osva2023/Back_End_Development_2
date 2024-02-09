const regionSchema = require('../../shared/schemas/region_Schema.js');
const agentSchema = require('../../shared/schemas/agent_Schema.js');

const createRegion = async (req, res) => {
    try {
        const existingRegion = await regionSchema.findOne({ 
            region: req.body.region 
        });
        if (existingRegion) {
            return res.status(400).send({ message: 'Region already exists' });
        }
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

const displayRegions = async (req, res) => {
   
    
    try {
        const regionID = req.query.region;
        console.log(regionID);                                                        // debugging purposes
        const region = await regionSchema.findOne({region: regionID});
        //console.log(region);                                                          // debugging purposes
        if (!region) {
            return res.status(404).send({ message: 'Region not found' });
        }
        const regionmanager = await agentSchema.find({ region: regionID, position: 'manager' });
        //console.log(regionmanager);                                                  // debugging purposes
        if (!regionmanager) {
            return res.status(404).send({ message: 'Manager not found' });
        }
        const regionManagerInfo = regionmanager.map(agent => ({
            first_name: agent.first_name,
            last_name: agent.last_name,
            email: agent.email,
        }));
        console.log(regionManagerInfo);                                             // debugging purposes 
        const managerFullName = `${regionManagerInfo[0].first_name} ${regionManagerInfo[0].last_name}`;
        console.log(managerFullName);                                                // debugging purposes

        const totalSales = await agentSchema.aggregate([
            { $match: { region: regionID } }, // Filtra por la región específica
            { $group: { _id: null, totalSales: { $sum: "$sales" } } }, // Suma los valores de sales
            { $project: { _id: 0, totalSales: 1 } } // Proyecta el resultado sin el _id
        ]);
        
        // totalSales será un array con un objeto { totalSales: sumatoria }
        console.log(totalSales[0].totalSales);                                                   // debugging purposes
        let sortedAgents = await agentSchema.find().sort({ rating: -1 });
        sortedAgents = sortedAgents.filter((agent) => agent.region.toString() === regionID);
        //console.log(sortedAgents);                                                   // debugging purposes
        if (sortedAgents.length === 0) {
            return res.status(400).send({ message: 'Error sorting agents' });
        }
        const topAgents = sortedAgents.slice(0, 3);
        //console.log(topAgents);                                                       // debugging purposes
        const topAgentsNames = topAgents.map(agent => `${agent.first_name} ${agent.last_name}`);

        return res.status(200).json({region: region.region, address: region.address, total_sales: totalSales[0].totalSales, 
            manager: managerFullName, top_agents: topAgentsNames, });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
}

const displayAllStar = async (req, res) => {
    try {
        const pipeline = [
            { $group: { _id: "$region", topAgent: { $first: "$$ROOT" } } },
            { $sort: { "topAgent.sales": -1 } },
            { $project: { _id: 0, agent: { $concat: ["$topAgent.first_name", " ", "$topAgent.last_name"] } } }
        ];

        const topAgentsByRegion = await agentSchema.aggregate(pipeline);

        if (topAgentsByRegion.length === 0) {
            return res.status(404).send({ message: 'Top agents not found for any region' });
        }

        return res.status(200).json({'All Stars Agents: ': topAgentsByRegion.map(result => result.agent)});
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
}




        module.exports = {
    createRegion, displayRegions, displayAllStar
};
    