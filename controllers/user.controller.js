const User = require("../models/user.model")
const { accountNumber, amount } = require("../helpers/accountNumberGenerator")

exports.signupUser = async (req, res) => {
    try {
        const { password, name } = req.body

        const newUser = await User.create({
            accountNumber,
            password,
            name: name.toLowerCase(),
            amount
        })

        res.status(201).json({
            status: "succses",
            message: "Usuario creado satisfactoriamente",
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
            message: "Sesion iniciada satisfactoriamente",
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

exports.getHistoryUser = (req, res) => {
    console.log(req.body);
    const { id } = req.body

    res.json({
        status: "succses",
        message: "Route - get history User - Controllers",
        userHistory: {
            id
        }
    })
}