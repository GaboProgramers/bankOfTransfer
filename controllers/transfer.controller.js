exports.sendTransfer = (req, res) => {
    const { amount, senderUserId, receiverUserId } = req.body

    res.json({
        transfer: {
            amount,
            senderUserId,
            receiverUserId
        }
    })
}