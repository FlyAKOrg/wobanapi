export default (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
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
      atcident: { type: DataTypes.STRING },
      departure: { type: DataTypes.STRING },
      arrival: { type: DataTypes.STRING },
      equipment: { type: DataTypes.STRING },
      departure_time: { type: DataTypes.STRING },
      arrival_time: { type: DataTypes.STRING },
      duration: { type: DataTypes.STRING },
      planned_departure: { type: DataTypes.DATE },
    },
    {
      tableName: "bookings",
      underscored: true,
      timestamps: false,
    }
  );

  return Booking;
};
