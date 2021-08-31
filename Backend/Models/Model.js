import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db_setting = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

class Model {
  async getCountriesBasedOnDistance(req) {
    const con = await mysql.createConnection(db_setting);
    const param_lat = req.lat;
    const param_lon = req.lon;
    try {
      if (req.distance === "3000") {
        const requirement =
          "latitude > ?-15 && latitude < ?+15 && longitude > ?-30 && longitude < ?+30";
        const sql = `select name, countrycode from costOfLivingIndex where ${requirement}`;
        const [rows, fields] = await con.query(sql, [
          param_lat,
          param_lat,
          param_lon,
          param_lon,
        ]);
        return rows;
      } else if (req.distance === "5000") {
        const requirement =
          "latitude > ?-20 && latitude < ?+20 && longitude > ?-40 && longitude < ?+40";
        const sql = `select name, countrycode from costOfLivingIndex where ${requirement}`;
        const [rows, fields] = await con.query(sql, [
          param_lat,
          param_lat,
          param_lon,
          param_lon,
        ]);
        return rows;
      } else if (req.distance === "7000") {
        const requirement =
          "latitude > ?-30 && latitude < ?+30 && longitude > ?-50 && longitude < ?+50";
        const sql = `select name, countrycode from costOfLivingIndex where ${requirement}`;
        const [rows, fields] = await con.query(sql, [
          param_lat,
          param_lat,
          param_lon,
          param_lon,
        ]);
        return rows;
      } else if (req.distance === "10000") {
        const requirement =
          "latitude > ?-40 && latitude < ?+40 && longitude > ?-60 && longitude < ?+60";
        const sql = `select name, countrycode from costOfLivingIndex where ${requirement}`;
        const [rows, fields] = await con.query(sql, [
          param_lat,
          param_lat,
          param_lon,
          param_lon,
        ]);
        return rows;
      } else if (req.distance === "15000") {
        const requirement =
          "latitude > ?-50 && latitude < ?+50 && longitude > ?-70 && longitude < ?+70";
        const sql = `select name, countrycode from costOfLivingIndex where ${requirement}`;
        const [rows, fields] = await con.query(sql, [
          param_lat,
          param_lat,
          param_lon,
          param_lon,
        ]);
        return rows;
      } else {
        const sql = "select name, countrycode from costOfLivingIndex";
        const [rows, fields] = await con.query(sql, [
          param_lat,
          param_lat,
          param_lon,
          param_lon,
        ]);
        return rows;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCountriesBasedOnClimate(req) {
    const con = await mysql.createConnection(db_setting);
    try {
      const param = req.val;
      const sql =
        "select name, countrycode from costOfLivingIndex where climate=?";
      const [rows, fields] = await con.query(sql, [param]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  async getCountriesBasedOnBudget(req) {
    const con = await mysql.createConnection(db_setting);
    try {
      const param = req.val;
      if (param === "expensive") {
        const sql =
          "select name, countrycode from costOfLivingIndex where id <= 20";
        const [rows, fields] = await con.query(sql);
        return rows;
      } else if (param === "middle") {
        const sql =
          "select name, countrycode from costOfLivingIndex where id >= 21 && id <= 100";
        const [rows, fields] = await con.query(sql);
        return rows;
      } else {
        const sql =
          "select name, countrycode from costOfLivingIndex where id >= 101 && id <= 139";
        const [rows, fields] = await con.query(sql);
        return rows;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCountriesBasedOnActivities(req) {
    const con = await mysql.createConnection(db_setting);
    try {
      const param = req.val;

      if (param === "Safari") {
        const sql = "select name, countrycode from costOfLivingIndex where activities1=?;";
        const [rows, fields] = await con.query(sql, [param]);
        return rows;
      } else if (param === "Mountain sports") {
        const sql =
          "select name, countrycode from costOfLivingIndex where activities1=? OR activities2=?";
        const [rows, fields] = await con.query(sql, [param, param]);
        return rows;
      } else if (param === "Water sports") {
        const sql =
          "select name, countrycode from costOfLivingIndex where activities1=? OR activities2=?";
        const [rows, fields] = await con.query(sql, [param, param]);
        return rows;
      } else if (param === "Winter sports") {
        const sql =
          "select name, countrycode from costOfLivingIndex where activities1=? OR activities2=?";
        const [rows, fields] = await con.query(sql, [param, param]);
        return rows;
      } else if (param === "Historical sites") {
        const sql =
          "select name, countrycode from costOfLivingIndex where activities1=? OR activities2=?";
        const [rows, fields] = await con.query(sql, [param, param]);
        return rows;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Model;
