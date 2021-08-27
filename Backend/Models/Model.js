import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config()

const db_setting = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

class Model {
    async getCountriesBasedOnClimate(req) {
        const con = await mysql.createConnection(db_setting);
        try {
            const param = req.val
            const sql = 'select name from climate where category1=?';
            const [rows, fields] = await con.query(sql, [param])
            return rows
            
        } catch(error) {
            console.log(error)
        }
    }
}

export default Model