const repository = require('node-mongoose-repository')
const mongoose = require('mongoose')
const { logger } = require('musii-node-helper')

const follow = (logPrefix, model) => async tag => {

    try {

        const response = await model.findOne({
            tag: tag
        })

        logger.info(`${logPrefix}[Follow]${JSON.stringify(response)}`)

        return response

    } catch (error) {

        throw error

    }

}

module.exports = () => {

    const model = repository.get('PartialUser')

    const logPrefix = `[${model.name} Service]`

    return {
        follow: follow(logPrefix, model)
    }

}