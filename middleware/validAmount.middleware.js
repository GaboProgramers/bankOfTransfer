const User = require("../models/user.model");

exports.validUserReceiberTransfer = async (req, res, next) => {
    try {
        // ? 1. RECIBIMOS POR LA req.body LA INFORMACION QUE NOS LLEGA POR LA REQUES
        const { accountNumber } = req.body

        // ? 2. BUSCAMOS EL USUARIO QUE VA AH RECIBIR LA TRANSFERENCIA,
        // ? SIEMPRE Y CUANDO EL NUMERO DE CUENTA SEA IGUAL AL QUE RECIBIMOS POR LA req.body
        const userReceiberTransfer = await User.findOne({
            where: {
                accountNumber,
                status: true
            }
        })

        // ? 3. VERIFICAMOS QUE EL USUARIO EXISTA SI NO ENVIAMOS UN ERROR
        if (!userReceiberTransfer) {
            return res.status(404).json({
                status: "error",
                message: "user not found"
            })
        }

        // ? 4. AGREGAMOS UNA NUEVA PROPIEDAD A LA req CON EL ID DEL USUARIO QUE VA A RECIBIR
        req.receiverUserId = userReceiberTransfer.id
        // ? 5. AGREGAMOS OTRA PROPIEDAD A LA req CON EL NOMBRE DE LA VARIABLE DONDE OBTENEMOS,
        // ? AL USUARIO QUE VA AH RECIBIR.
        req.userReceiberTransfer = userReceiberTransfer

        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error'
        });
    }
}

exports.validUserSenderTransfer = async (req, res, next) => {
    try {
        // ? 1. RECIBIMOS POR LA req.body LA INFORMACION QUE NOS LLEGA POR LA REQUES
        const { senderUserId } = req.body

        // ? 2. BUSCAMOS EL USUARIO QUE VA AH ENVIAR LA TRANSFERENCIA,
        // ? SIEMPRE Y CUANDO EL ID SEA IGUAL AL QUE RECIBIMOS POR LA req.body
        const userSenderTransfer = await User.findOne({
            where: {
                id: senderUserId,
                status: true
            }
        })

        // ? 3. VERIFICAMOS QUE EL USUARIO EXISTA SI NO ENVIAMOS UN ERROR
        if (!userSenderTransfer) {
            return res.status(404).json({
                status: "error",
                message: "user not found"
            })
        }

        // ? 4. AGREGAMOS UNA NUEVA PROPIEDAD A LA req CON LA CATIDAD QUE TIENE EL USUARIO A ENVIAR.
        req.amountSenderUser = userSenderTransfer.amount
        // ? 5. AGREGAMOS OTRA PROPIEDAD A LA req CON EL NOMBRE DE LA VARIABLE DONDE OBTENEMOS,
        // ? AL USUARIO QUE VA AH ENVIAR.
        req.userSenderTransfer = userSenderTransfer

        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}