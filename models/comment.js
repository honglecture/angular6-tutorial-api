module.exports = (sequelize, DataTypes) => (
    sequelize.define('Comment',{
        id: {
            type: DataTypes.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING(10000),
            allowNull: false
        },
        writer: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        regDate:{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        boardId: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        }
    })
);


