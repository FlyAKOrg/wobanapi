module.exports = (sequelize, DataTypes) => {
  const Logbook = sequelize.define(
    "Logbook",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      airline: { type: DataTypes.STRING },
      flight_number: { type: DataTypes.STRING },
      planned_departure: { type: DataTypes.STRING },
      planned_arrival: { type: DataTypes.STRING },
      actual_departure: { type: DataTypes.STRING },
      actual_arrival: { type: DataTypes.STRING },
      equipment: { type: DataTypes.STRING },
      offblock_time: { type: DataTypes.DATE },
      onblock_time: { type: DataTypes.DATE },
      duration: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING },
      simulator: { type: DataTypes.STRING },
      fuel_start: { type: DataTypes.FLOAT(8, 2) },
      fuel_end: { type: DataTypes.FLOAT(8, 2) },
      distance_flown: { type: DataTypes.FLOAT(10, 1) },
      positions: { type: DataTypes.JSON },
    },
    {
      tableName: "logbook",
      underscored: true,
      timestamps: false,
    }
  );

  return Logbook;
};
