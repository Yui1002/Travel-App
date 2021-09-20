import mysql from "mysql2/promise";
import dotenv from "dotenv";
import Reference from './Reference.js'
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
    const param_lat = req.latitude;
    const param_lon = req.longitude;
    try {
      let id_distance = Reference.distance(req.distance);
      if(req.distance === "more15000") {
        const sql = "select name, countrycode from countries"
        const [rows, fields] = await con.query(sql); 
        return rows;
      } else {
        const sql = `select name, countrycode from countries where ${id_distance}`;
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
      let id_climate = Reference.climate(req.climate)
      const sql = "select name, countrycode from countries where climate_id=?";
      const [rows, fields] = await con.query(sql, [id_climate]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  async getCountriesBasedOnBudget(req) {
    const con = await mysql.createConnection(db_setting);
    try {
      let id_budget = Reference.budget(req.budget)
      const sql = "select name, countrycode from countries where costIndex_id=?";
      const [rows, fields] = await con.query(sql, [id_budget]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  async getCountriesBasedOnActivities(req) {
    const con = await mysql.createConnection(db_setting);
    try {
      let id_activity = Reference.activity(req.activity)
      const sql = "select name, countrycode from countries where activity_id=?;";
      const [rows, fields] = await con.query(sql, [id_activity]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  async getCountriesMatched(req) {
    const con = await mysql.createConnection(db_setting);
    try {
      let id_distance = Reference.distance(req.distance)
      let id_climate = Reference.climate(req.climate)
      let id_budget = Reference.budget(req.budget)
      let id_activity = Reference.activity(req.activity);

      if(id_distance === "") {
        let sql = `select name, countrycode from countries where climate_id=? AND costIndex_id=? AND activity_id=?;`;
        let [rows, fields] = await con.query(sql, [id_climate, id_budget, id_activity]);
        return rows
      } else {
        let sql = `select name, countrycode from countries where ${id_distance} AND climate_id=? AND costIndex_id=? AND activity_id=?;`;
        let [rows, fields] = await con.query(sql, [req.latitude, req.latitude, req.longitude, req.longitude, id_climate, id_budget, id_activity])
        return rows
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Model;
