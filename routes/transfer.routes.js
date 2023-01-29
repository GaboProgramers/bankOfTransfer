const { Router } = require("express")
const { sendTransfer } = require("../controllers/transfer.controller")

const router = Router()

router.post('/', sendTransfer)

module.exports = {
    userTransfer: router
}