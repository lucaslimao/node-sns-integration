const { logger } = require('musii-node-helper')
const repository = require('../repository/index')
const service = require('../services/user')

const LOG_PREFIX = '[Handler Worker]'

const start = (fn) => async (event) => {

    logger.info(`${LOG_PREFIX}[Start]`)

    await repository().map()

    return fn(event)

}

const error = event => {
    logger.info(`${LOG_PREFIX}[Worker][Error]${JSON.stringify(event)}`)
}

const worker = async event => {

    try {

        const records = event.Records

        await Promise.all(

            records.map(async record => {
            
                logger.info(`${LOG_PREFIX}[Worker][Record]${JSON.stringify(record.Sns.MessageAttributes)}`)

                await service().follow(record.Sns.MessageAttributes.tag.Value)

            })

        )

        return {
            statusCode: 200,
            body: 'Execute success. '
        }

    } catch (error) {

        logger.info(`${LOG_PREFIX}[Worker][Error]${JSON.stringify(error)}`)

        return {
            statusCode: 500,
            body: 'Execute fail. '
        }

    }

}

module.exports = {
    error: start(error),
    worker: start(worker)
}