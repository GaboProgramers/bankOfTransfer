const User = require("../models/user.model");

exports.validUser = async (req, res, next) => {
    try {
        const { name } = req.body

        const user = await User.findOne({
            where: {
                name: name.toLowerCase()
            }
        })

        if (user) {
            return res.status(400).json({
                status: 'error',
                message: 'the user already exists'
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