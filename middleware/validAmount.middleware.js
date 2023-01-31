const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validUserReceiberTransfer = catchAsync(async (req, res, next) => {
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
        return next(new AppError('User not found', 404))
    }

    // ? 4. AGREGAMOS UNA NUEVA PROPIEDAD A LA req CON EL ID DEL USUARIO QUE VA A RECIBIR
    req.receiverUserId = userReceiberTransfer.id
    // ? 5. AGREGAMOS OTRA PROPIEDAD A LA req CON EL NOMBRE DE LA VARIABLE DONDE OBTENEMOS,
    // ? AL USUARIO QUE VA AH RECIBIR.
    req.userReceiberTransfer = userReceiberTransfer

    next()
})

exports.validUserSenderTransfer = catchAsync(async (req, res, next) => {
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
        return next(new AppError('User not found', 404))

    }

    // ? 4. AGREGAMOS UNA NUEVA PROPIEDAD A LA req CON LA CATIDAD QUE TIENE EL USUARIO A ENVIAR.
    req.amountSenderUser = userSenderTransfer.amount
    // ? 5. AGREGAMOS OTRA PROPIEDAD A LA req CON EL NOMBRE DE LA VARIABLE DONDE OBTENEMOS,
    // ? AL USUARIO QUE VA AH ENVIAR.
    req.userSenderTransfer = userSenderTransfer

    next()
})