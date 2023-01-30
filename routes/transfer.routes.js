const { Router } = require("express")
const { sendTransfer } = require("../controllers/transfer.controller")
const { validUserReceiberTransfer, validUserSenderTransfer } = require("../middleware/validAmount.middleware")

const router = Router()

router.post('/', validUserReceiberTransfer, validUserSenderTransfer, sendTransfer)

module.exports = {
    userTransfer: router
}