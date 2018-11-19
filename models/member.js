module.exports = (sequelize, DataTypes) => (
    sequelize.define('Member',{
        id: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING(500),
            defaultValue: 'default'
        },
        regDate:{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    })
);