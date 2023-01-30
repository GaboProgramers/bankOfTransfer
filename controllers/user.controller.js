const User = require("../models/user.model")
const Transfer = require("../models/transfer.model")
const { amount } = require("../helpers/accountNumberGenerator")

exports.signupUser = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}

exports.loginUser = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}

exports.getHistoryUser = async (req, res) => {
    try {
        const transfers = await Transfer.findAll({
            where: {
                status: true
            }
        })

        res.status(200).json({
            status: "succses",
            message: "history obtained",
            transfers
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}