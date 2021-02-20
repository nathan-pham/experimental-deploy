const run = (res, req, callback) => {
    return new Promise((resolve, reject) => {
        callback(req, res, (result) => {
            return result instanceof Error
                ? reject(reject)
                : resolve(result)
        })
    })
}

export default run