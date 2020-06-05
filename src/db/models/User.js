module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    verified: { type: DataTypes.BOOLEAN },
    verification_token: { type: DataTypes.STRING },
    hours: { type: DataTypes.FLOAT },
    rank: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE }
  }, {
    tableName: 'users',
    underscored: true
  });

  return User;
}