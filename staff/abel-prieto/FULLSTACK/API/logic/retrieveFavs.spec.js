import mongoose, { Types } from 'mongoose' 
import { expect } from 'chai'
import dotenv from 'dotenv'

import retrieveFavs from './retrieveFavs.js'
import { Post, User } from '../data/models.js'
import random from './helpers/random.js'
import { NotFoundError } from './errors.js'

dotenv.config()
const { ObjectId } = Types

describe('retrieveFavs', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    // CASO POSITIVO - Retrieve Favs
    it('succeeds on retrieve fav posts', () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const image = random.image()
        const text = random.text()

        return User.create({ name, email, password })
            .then(user => {
                return Post.create({ author: user.id, image, text })
                    .then(post => {
                        user.favs.push(post)
                        return user.save()
                            .then(user => {
                                return retrieveFavs(user.id)
                                .then(favs => {
                                    expect(favs).to.be.an('array').that.has.lengthOf(1)
                                    expect(favs[0].id).to.equal(post.id)
                                })
                            })
                    })
            })
    })

    // CASO NEGATIVO - User not found
    it('fails on user not found', () => {
        const image = random.image()
        const text = random.text()

        const userId = new ObjectId().toString()

        return Post.create({ author: userId, image, text })
            .then(() => {
                return retrieveFavs(userId)
                    .then(() => { throw new Error('should not reach this point!') })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('user not found')
                    })
            })
    })

    after(() => mongoose.disconnect())
})
