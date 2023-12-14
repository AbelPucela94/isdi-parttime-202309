const JSON = require('../utils/JSON')
const {validateText, validateFunction} = require('../utils/validators')

function authenticateUser(email, password, callback) {
    validateText(email, 'name')
    validateText(password, 'password')
    validateFunction(callback, 'callback')

    JSON.parseFromFile("./data/users.json", (error, users) => {
        if (error) {
            callback(error)

            return
        }

        let user = users.find(user => user.email === email)

        if (!user) {
            callback(new Error('user not found'))

            return
        }

        if (password !== user.password) {
            callback(new Error('wrong credentials'))

            return
        }

        callback(null, user.id)
    })
}

module.exports = authenticateUser