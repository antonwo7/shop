const Net = require('../models/Net')

class NetService
{
    async getNets() {
        return Net.findAll({raw: true})
    }
}

module.exports = new NetService()