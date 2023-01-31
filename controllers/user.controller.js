const User = require("../models/user.model")
const Transfer = require("../models/transfer.model")
const { amount } = require("../helpers/accountNumberGenerator")
const catchAsync = require("../utils/catchAsync")

exports.signupUser = catchAsync(async (req, res, next) => {
    const { password, name } = req.body
    const accountNumber = Math.floor(Math.random() * 999999) + 1

    const newUser = await User.create({
        accountNumber,
        password,
        name: name.toLowerCase(),
        amount
    })

    res.status(201).json({
        status: "succses",
        message: "user created successfully",
        newUser
    })
})

exports.loginUser = catchAsync(async (req, res, next) => {
    const { accountNumber, password } = req.body

    const newLogin = await User.findOne({
        where: {
            accountNumber,
            password,
            status: true
        }
    })

    res.status(201).json({
        status: "succses",
        message: "session started successfully",
        newLogin
    })
})

exports.getHistoryUser = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const transfers = await Transfer.findAll({
        where: {
            senderUserId: id,
            status: true
        }
    })

    res.status(200).json({
        status: "succses",
        message: "history obtained",
        transfers
    })
})