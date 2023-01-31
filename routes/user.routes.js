const { Router } = require("express")
const { check } = require("express-validator")
const { signupUser, loginUser, getHistoryUser } = require("../controllers/user.controller")
const { validateFields } = require("../middleware/validateFiel.middleware")
const { validAccount } = require("../middleware/verificAccount.middleware")

const router = Router()

router.post('/signup', [
    check('name', 'Name is require').not().isEmpty(),
    check('password', 'password is require').not().isEmpty(),
    validateFields
], signupUser)

router.post('/login', validAccount, loginUser)
router.get('/:id/history', getHistoryUser)

module.exports = {
    userRouter: router
}