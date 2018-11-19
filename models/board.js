module.exports = (sequelize, DataTypes) => (
    sequelize.define('Board',{
        id: {
            type: DataTypes.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(10000),
            allowNull: false,
        },
        writer: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        regDate:{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    })
);