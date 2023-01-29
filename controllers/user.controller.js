const User = require("../models/user.model")

exports.signupUser = async (req, res) => {
    try {
        const { password, name } = req.body

        const accountNumber = Math.floor(Math.random() * 999999) + 1

        const newUser = await User.create({
            accountNumber,
            password,
            name: name.toLowerCase()
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

        const newUser = await User.findOne({
            accountNumber: accountNumber,
            password: password
        })

        res.status(201).json({
            status: "succses",
            message: "Sesion iniciada satisfactoriamente",
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