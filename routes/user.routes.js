const { Router } = require("express")
const { check } = require("express-validator")
const { signupUser, loginUser, getHistoryUser } = require("../controllers/user.controller")
const { validUser } = require("../middleware/user.middleware")
const { validateFields } = require("../middleware/validateFiel.middleware")

const router = Router()

router.post('/signup', [
    check('name', 'Name is require').not().isEmpty(),
    validateFields,
    validUser
], signupUser)

router.post('/login', loginUser)
router.get('/:id/history', getHistoryUser)

module.exports = {
    userRouter: router
}