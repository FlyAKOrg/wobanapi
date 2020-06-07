export default (sequelize, DataTypes) => {
  const LogbookDetail = sequelize.define(
    "LogbookDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      logbook_id: {
        type: DataTypes.INTEGER,
      },
      latitude: { type: DataTypes.FLOAT(10, 8) },
      longitude: { type: DataTypes.FLOAT(10, 7) },
      altitude: { type: DataTypes.INTEGER },
      groundspeed: { type: DataTypes.INTEGER },
      entry: { type: DataTypes.STRING },
      created_at: { type: DataTypes.DATE },
    },
    {
      tableName: "logbook_details",
      underscored: true,
      timestamps: false,
    }
  );

  return LogbookDetail;
};
