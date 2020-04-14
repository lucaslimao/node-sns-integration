const { logger } = require('musii-node-helper')
const repository = require('../repository/index')
const service = require('../services/user')

const LOG_PREFIX = '[Handler Worker]'

const start = (fn) => async (event) => {

    logger.info(`${LOG_PREFIX}[Start]`)

    await repository().map()

    return fn(event)

}

const worker = async event => {

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

}

module.exports = {
    worker: start(worker)
}