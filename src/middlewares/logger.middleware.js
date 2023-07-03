import logger from '../logger/factory.js'

const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.debug(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`
    )
    next()
}

export default addLogger