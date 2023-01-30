const { DataTypes } = require("sequelize");
const { db } = require("../database/db")

const Transfer = db.define('transfers', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    senderUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receiverUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

module.exports = Transfer