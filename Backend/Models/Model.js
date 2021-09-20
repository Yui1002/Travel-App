import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db_setting = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const sql_setting = {
  '3000': "latitude > ?-15 && latitude < ?+15 && longitude > ?-30 && longitude < ?+30",
  '5000': "latitude > ?-20 && latitude < ?+20 && longitude > ?-40 && longitude < ?+40",
  "7000": "latitude > ?-30 && latitude < ?+30 && longitude > ?-50 && longitude < ?+50"
}

class Model {
  async getCountriesBasedOnDistance(req) {
    const con = await mysql.createConnection(db_setting);
    const param_lat = req.latitude;
    const param_lon = req.longitude;
    try {
      if (req.distance === "3000") {
        const requirement =
          "latitude > ?-15 && latitude < ?+15 && longitude > ?-30 && longitude < ?+30";
        const sql = `select name, countrycode from countries where ${requirement}`;
        const [rows, fields] = await con.query(sql, [param_lat, param_lat, param_lon, param_lon]);
        return rows;
      } else if (req.distance === "5000") {
        const requirement =
          "latitude > ?-20 && latitude < ?+20 && longitude > ?-40 && longitude < ?+40";
        const sql = `select name, countrycode from countries where ${requirement}`;
        const [rows, fields] = await con.query(sql, [param_lat, param_lat, param_lon, param_lon]);
        return rows;
      } else if (req.distance === "7000") {
        const requirement =
          "latitude > ?-30 && latitude < ?+30 && longitude > ?-50 && longitude < ?+50";
        const sql = `select name, countrycode from countries where ${requirement}`;
        const [rows, fields] = await con.query(sql, [param_lat, param_lat, param_lon, param_lon]);
        return rows;
      } else if (req.distance === "10000") {
        const requirement =
          "latitude > ?-40 && latitude < ?+40 && longitude > ?-60 && longitude < ?+60";
        const sql = `select name, countrycode from countries where ${requirement}`;
        const [rows, fields] = await con.query(sql, [param_lat, param_lat, param_lon, param_lon]);
        return rows;
      } else if (req.distance === "15000") {
        const requirement =
          "latitude > ?-50 && latitude < ?+50 && longitude > ?-70 && longitude < ?+70";
        const sql = `select name, countrycode from countries where ${requirement}`;
        const [rows, fields] = await con.query(sql, [param_lat, param_lat, param_lon, param_lon]);
        return rows;
      } else {
        const sql = "select name, countrycode from countries";
        const [rows, fields] = await con.query(sql, [param_lat, param_lat, param_lon, param_lon]);
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
      let val;
      switch (param) {
        case "tropical":
          val = 1;
          break;
        case "dry":
          val = 2;
          break;
        case "temperate":
          val = 3;
          break;
        case "continental":
          val = 4;
          break;
        case "polar":
          val = 5;
          break;
      }
      const sql = "select name, countrycode from countries where climate_id=?";
      const [rows, fields] = await con.query(sql, [val]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  async getCountriesBasedOnBudget(req) {
    console.log(req)
    const con = await mysql.createConnection(db_setting);
    try {
      const param = req.val;
      let val;
      switch (param) {
        case "high":
          val = 1;
          break;
        case "upper-middle":
          val = 2;
          break;
        case "lower-middle":
          val = 3;
          break;
        case "low":
          val = 4;
          break;
      }
      if (param === "high") {
        const sql =
          "select name, countrycode from countries where costIndex_id=?";
        const [rows, fields] = await con.query(sql, [val]);
        return rows;
      } else if (param === "upper-middle") {
        const sql =
          "select name, countrycode from countries where costIndex_id=?";
        const [rows, fields] = await con.query(sql, [val]);
        return rows;
      } else if (param === "lower-middle") {
        const sql =
          "select name, countrycode from countries where costIndex_id=?";
        const [rows, fields] = await con.query(sql, [val]);
        return rows;
      } else if (param === "low") {
        const sql =
          "select name, countrycode from countries where costIndex_id=?";
        const [rows, fields] = await con.query(sql, [val]);
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
      let val;
      switch(param) {
        case 'safari': 
        val = 1
        break
        case 'mountain sports': 
        val = 2
        break
        case 'water sports': 
        val = 3;
        break
        case 'winter sports': 
        val = 4;
        break
        case 'historical sites':
        val = 5;
        break
      }

      if (param === "safari") {
        const sql =
          "select name, countrycode from countries where activity_id=?;";
        const [rows, fields] = await con.query(sql, [val]);
        return rows;
      } else if (param === "mountain sports") {
        const sql =
          "select name, countrycode from countries where activity_id=?";
        const [rows, fields] = await con.query(sql, [val]);
        return rows;
      } else if (param === "water sports") {
        const sql =
          "select name, countrycode from countries where activity_id=?";
        const [rows, fields] = await con.query(sql, [val]);
        return rows;
      } else if (param === "winter sports") {
        const sql =
          "select name, countrycode from countries where activity_id=?";
        const [rows, fields] = await con.query(sql, [val]);
        return rows;
      } else if (param === "historical sites") {
        const sql =
          "select name, countrycode from countries where activity_id=?";
        const [rows, fields] = await con.query(sql, [val]);
        return rows;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCountriesMatched(req) {
    const con = await mysql.createConnection(db_setting);

    try {
      let sqlDistance, sqlClimate, sqlBudget, sqlActivity

      if(req.distance === '3000') {
        sqlDistance = 'latitude > ?-15 && latitude < ?+15 && longitude > ?-30 && longitude < ?+30'
      } else if(req.distance === '5000') {
        sqlDistance = 'latitude > ?-20 && latitude < ?+20 && longitude > ?-40 && longitude < ?+40'
      } else if(req.distance === '7000') {
        sqlDistance = 'latitude > ?-30 && latitude < ?+30 && longitude > ?-50 && longitude < ?+50'
      } else if(req.distance === '10000'){
        sqlDistance = 'latitude > ?-40 && latitude < ?+40 && longitude > ?-60 && longitude < ?+60'
      } else if(req.distance === '15000') {
        sqlDistance = 'latitude > ?-50 && latitude < ?+50 && longitude > ?-70 && longitude < ?+70'
      } else {
        sqlDistance = ''
      }

      if(req.climate === 'tropical') {
        sqlClimate = 'climate_id = 1'
      } else if(req.climate === 'dry') {
        sqlClimate = 'climate_id = 2'
      } else if(req.climate === 'temperate') {
        sqlClimate = 'climate_id = 3'
      } else if(req.climate === 'continental'){
        sqlClimate = 'climate_id = 4'
      }

      if(req.budget === 'high') {
        sqlBudget = 'costIndex_id= 1'
      } else if(req.budget === 'upper-middle') {
        sqlBudget = 'costIndex_id = 2'
      } else if(req.budget === 'lower-middle') {
        sqlBudget = 'costIndex_id = 3'
      } else if(req.budget === 'low'){
        sqlBudget = 'costIndex_id = 4'
      }

      if(req.activity === 'safari') {
        sqlActivity = 'activity_id=1'
      } else if(req.activity === 'mountain sports') {
        sqlActivity = 'activity_id = 2'
      } else if(req.activity === 'water sports') {
        sqlActivity = 'activity_id = 3'
      } else if(req.activity === 'winter sports'){
        sqlActivity = 'activity_id = 4'
      } else if(req.activity === 'historical sites') {
        sqlActivity = 'activity_id = 5'
      }

      let sql;
      if(sqlDistance === "") {
        sql = `select name, countrycode from countries where ${sqlClimate} AND ${sqlBudget} AND ${sqlActivity}`;
      } else {
        sql = `select name, countrycode from countries where ${sqlDistance} AND ${sqlClimate} AND ${sqlBudget} AND ${sqlActivity}`;
      }

      const [rows, fields] = await con.query(sql, [req.latitude, req.latitude, req.longitude, req.longitude]);
      console.log(rows)
      return rows;

    } catch (error) {
      console.log(error);
    }
  }
}

export default Model;
