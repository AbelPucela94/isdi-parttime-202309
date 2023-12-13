const JSON = require("../utils/JSON")
const { validateText, validateFunction } = require("../utils/validators")

function retrieveUser(userId, callback) {
    validateText(userId, "user id")
    validateFunction(callback, "callback")

    JSON.parseFromFile("./data/users.json", (error, users) => {
        if (error) {
            callback(error)

            return
        }

        let user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error("user not found"))

            return
        }

        delete user.password
        delete user.email
        delete user.favs

        callback(null, user)
    })
}

module.exports = retrieveUser