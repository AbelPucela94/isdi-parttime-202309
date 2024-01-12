const logic = require('../logic')
const { NotFoundError, ContentError } = require('../logic/errors')

module.exports = (req, res) => {
    try {
        const postId = req.headers.authorization.substring(7)

        const { userId } = req.params

        logic.toggleFavPost(postId, userId, error => {
            if (error) {
                let status = 500

                if (error instanceof NotFoundError) {
                    status = 404
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            }
    
            res.status(204).send()
        })
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 406
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}