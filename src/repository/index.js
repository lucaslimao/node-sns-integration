const repository = require('node-mongoose-repository')
const userSchema = require('./schemas/user')

const getTableName = modelName => `musii-${modelName}`.toLowerCase()

const opt = { timestamps: true }

const map = async () => {
    await repository.map('PartialUser', getTableName('PartialUser'), userSchema, opt)
}

module.exports = () => {
    return {
        map
    }
}