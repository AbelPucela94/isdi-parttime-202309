import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import multer from 'multer'
import {
    authenticateUserHandler,
    registerUserHandler,
    retrieveUserHandler,
    retrieveGuestHandler,
    changeUserEmailHandler,
    changeUserPasswordHandler,
    uploadFileHandler,
    downloadFileHandler,
    deleteFileHandler,
    retrieveFilesHandler,

    deleteUsersHandler,
    retrieveAllUsersHandler,
    registerAdminHandler
} from './handlers/index.js'

dotenv.config()

mongoose.connect(process.env.URL_MONGODB_HIINIT_API)
    .then(() => {
        const server = express()
        const jsonBodyParser = express.json()

        // DISK STORAGE
        const upload = multer({ dest: 'uploads/' })

        server.use(cors())

        // ALL API REQUEST
        server.get('/hello', (req, res) => res.send('Hello HIINIT API v0.0'))

        // REGISTER USER
        server.post('/users', jsonBodyParser, registerUserHandler)

        // AUTHENTICATE USER
        server.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        // RETRIEVE USER
        server.get('/users', retrieveUserHandler)

        // RETRIEVE GUEST
        server.get('/guest', retrieveGuestHandler)

        // CHANGE USER EMAIL
        server.patch('/users/email', jsonBodyParser, changeUserEmailHandler)

        // CHANGE USER PASSWORD
        server.patch('/users/password', jsonBodyParser, changeUserPasswordHandler)

        // UPLOAD FILE
        server.post('/upload', upload.single('file'), uploadFileHandler)
        // server.post('/upload', uploadFileBBHandler)

        // RETRIEVE FILES
        server.get('/download', retrieveFilesHandler)

        // DOWNLOAD FILE
        server.get('/download/:fileId', downloadFileHandler)

        // DELETE FILE
        server.delete('/download/delete/:fileId', deleteFileHandler)

        // REGISTER ADMIN
        server.post('/admin', registerAdminHandler)

        // CREATE COMMANDS
        // server.post('/admin/commands', createCommandHandler)

        // CREATE GROUPS
        // server.post('/admin/groups', createGroupHandler)

        // DELETE USERS
        server.delete('/users/delete/:userId', deleteUsersHandler)

        // RETRIEVE ALL USERS
        server.get('/users/all', retrieveAllUsersHandler)

        server.listen(process.env.PORT, () => console.log(`server online! Listen on: ${process.env.PORT}`))
    })
    .catch(error => console.error(error))
