import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'

import toggleLikePost from './toggleLikePost.js'
import random from './helpers/random.js'
import { User, Post } from '../data/models.js'
import { NotFoundError } from './errors.js'

const { ObjectId } = Types

dotenv.config()

describe('toogleLikePost', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(() => User.deleteMany())
    beforeEach(() => Post.deleteMany())

    // CASO POSITIVO
    it('succeeds on toggle like post', () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const image = random.image()
        const text = random.text()

        return User.create({ name, email, password })
            .then(user => {
                return Post.create({ author: user.id, image, text })
                    .then(post => {
                        return toggleLikePost(user.id, post.id)
                            .then(() => {
                                return Post.findOne({ image: image })
                                    .then(post => {
                                        expect(post.likes).to.be.an('array').that.has.lengthOf(1)
                                        expect(post.likes[0].toString()).to.equal(user.id)
                                    })
                            })
                    })
            })
    })

    // CASO NEGATIVO - User Not Found
    it('fails on user not found', () => {
        const image = random.image()
        const text = random.text()
        const userId = new ObjectId().toString()

        return Post.create({ author: userId, image, text })
            .then(post => {
                return toggleLikePost(userId, post.id)
                    .then(() => { throw new Error('should not reach this point!') })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('user not found')
                    })
            })
    })

    // CASO NEGATIVO - Post Not Found
    it('fails on post not found', () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const postId = new ObjectId().toString()

        return User.create({ name, email, password })
            .then(user => {
                return toggleLikePost(user.id, postId)
                    .then(() => { throw new Error('should not reach this point!') })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('post not found')
                    })
            })
    })


    after(() => mongoose.disconnect())
})
