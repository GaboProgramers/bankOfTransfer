const User = require("../models/user.model");

exports.validAccount = async (req, res, next) => {
    try {
        const { accountNumber, password } = req.body

        const userRx = await User.findOne({
            where: {
                accountNumber: accountNumber,
                password: password,
                status: true
            }
        })

        if (!userRx) {
            return res.status(400).json({
                status: 'error',
                message: 'El usuario no esta registrado'
            })
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}