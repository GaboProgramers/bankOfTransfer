const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { userRouter } = require("../routes/user.routes")
const { userTransfer } = require("../routes/transfer.routes")
const { db } = require("../database/db")

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 4000

        this.paths = {
            users: "/api/v1/users",
            transfer: "/api/v1/transfer"
        }

        this.database()

        this.middlewares()

        this.routes()
    }

    middlewares() {
        if (process.env.NODE_ENV === 'development') {
            this.app.use(morgan('dev'))
        }
        this.app.use(cors())
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.paths.users, userRouter)
        this.app.use(this.paths.transfer, userTransfer)
    }

    database() {
        db.authenticate()
            .then(() => console.log('Database authenticated'))
            .catch(error => console.log('aqui esta el err', error))

        db.sync()
            .then(() => console.log('Database synced'))
            .catch(error => console.log('aqui esta el err', error))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('server is runin on port', this.port);
        })
    }
}

module.exports = Server