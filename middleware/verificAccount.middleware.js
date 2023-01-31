const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validAccount = catchAsync(async (req, res, next) => {
    const { accountNumber, password } = req.body

    const userRx = await User.findOne({
        where: {
            accountNumber: accountNumber,
            password: password,
            status: true
        }
    })

    if (!userRx) {
        return next(new AppError('the user is not registered', 400))
    }
    next()
})