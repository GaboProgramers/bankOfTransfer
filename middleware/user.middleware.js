const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validUser = catchAsync(async (req, res, next) => {
    const { name } = req.body

    const user = await User.findOne({
        where: {
            name: name.toLowerCase()
        }
    })

    if (user) {
        return next(new AppError('the user already exists', 400))
    }
    next()
})
