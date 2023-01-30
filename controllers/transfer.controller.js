const Transfer = require("../models/transfer.model")

exports.sendTransfer = async (req, res) => {
    try {
        // ? 1. Recibir por la req.body lo que vamos a recibir en la peticion.
        const { amount, senderUserId } = req.body
        // ? 2. Recibimos por la req las variables enviadas desde las validaciones.
        const { receiverUserId, amountSenderUser, userReceiberTransfer, userSenderTransfer } = req

        // ? 3. verificamos que el monto enviado no sea mayor al monto de la cuenta del usuario.
        if (amount > amountSenderUser) {
            return res.status(400).json({
                status: "error",
                message: "insufficient fund"
            })
        }

        // ? 4. Verificamos que el ID del que envia no sea igual al ID que recibe.
        if (receiverUserId === senderUserId) {
            return res.status(400).json({
                status: "error",
                message: "Can't send money to your same account"
            })
        }

        // ? 5. CREAMOS UNA VARIABLE QUE NOS VA A ALMACENAR EL NUEVO MONTO DEL USUARIO QUE ENVIA.
        const newAmountMakeTransfer = +(userSenderTransfer.amount) - amount

        // ? 6. CREAMOS UNA VARIABLE PARA ALMACENAR EL NUEVO MONTO DE LA PERSONA QUE RECIBE.
        const newAmountUserReceiver = +(userReceiberTransfer.amount) + amount

        // ? 7. ACTUALIZAMOS LA CUENTA DEL USUARIO CON EL NUEVO MONTO QUE RECIBIO.
        await userReceiberTransfer.update({
            amount: newAmountUserReceiver
        })

        // ? 8. ACTUALIZAMOS LA CUENTA DEL USUARIO CON EL NUEVO MONTO QUE LE QUEDO DESPUES DE LA TRANSFERENCIA.
        await userSenderTransfer.update({
            amount: newAmountMakeTransfer
        })

        // ? 9. REGISTRAMOS EN NUESTRA BASE DE DATOS ESA NUEVA TRANSFERENCIA REALIZADA.
        const newTransfer = await Transfer.create({
            amount,
            senderUserId,
            receiverUserId
        })

        // ? 10. ENVIAMOS LA RESPUESTA AL CLIENTE.
        res.status(200).json({
            status: "sucsess",
            message: 'successful transfer',
            newTransfer
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}