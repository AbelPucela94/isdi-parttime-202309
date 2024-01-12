const logic = require('../logic')
const { NotFoundError, CredentialsError, ContentError } = require('../logic/errors')

module.exports = (req, res) => {
    try {
        const userId = req.headers.authorization.substring(7)
        const { password, newPassword, againNewPassword } = req.body

        logic.changePasswordUser(userId, password, newPassword, againNewPassword, error => {
            if (error) {
                let status = 500

                if (error instanceof NotFoundError) {
                    status = 404
                }

                if (error instanceof CredentialsError) {
                    status = 401
                }

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(200).send()
            // Envía código 200 de 'OKEY'

        })
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 406
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}