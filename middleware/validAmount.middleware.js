const Transfer = require("../models/transfer.model");
const User = require("../models/user.model");

exports.validAmount = async (req, res, next) => {
    try {
        const { amount, senderUserId, receiverUserId } = req.body

        // ? usuario que recibe
        const userRx = await User.findOne({
            where: {
                accountNumber: receiverUserId,
                status: true
            }
        })

        const receiverUser = userRx.id

        // ? usuario que envia
        const userTx = await User.findOne({
            where: {
                id: senderUserId,
                status: true
            }
        })

        const amountUser = userTx.amount

        if (amount > amountUser) {
            return res.status(400).json({
                status: "error",
                message: "no cuenta con el dinero suficiente para esta operacion"
            })
        }

        if (receiverUser === senderUserId) {
            return res.status(400).json({
                status: "error",
                message: "no puede enviarse dinero usted mismo"
            })
        }

        const newAmountMakeTransfer = userTx.amount - amount
        const newAmountUserReceiver = userRx.amount + amount

        await userTx.update({
            amount: newAmountMakeTransfer
        })

        await userRx.update({
            amount: newAmountUserReceiver
        })

        await Transfer.create({
            amount,
            senderUserId,
            receiverUserId: receiverUser
        })
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}