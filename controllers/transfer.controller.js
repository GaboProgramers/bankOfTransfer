exports.sendTransfer = async (req, res) => {

    await res.status(200).json({
        status: "sucsess",
        message: 'transaccion exitosa'
    })
}