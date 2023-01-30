const { Router } = require("express")
const { sendTransfer } = require("../controllers/transfer.controller")
const { validAmount } = require("../middleware/validAmount.middleware")

const router = Router()

router.post('/', validAmount, sendTransfer)

module.exports = {
    userTransfer: router
}