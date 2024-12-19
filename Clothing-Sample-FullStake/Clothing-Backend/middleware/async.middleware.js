function asyncMiddleware(fn) {
    return async (req,res,next) => {
        try {
            await fn(req,res,next) // run the function you passed into
        } catch (error) {
            next(error) // if error occur , go to the next middle ware
        }
    };
}

module.exports = asyncMiddleware;