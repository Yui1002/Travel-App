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

    async getCountriesBasedOnBudget(req) {
        const con = await mysql.createConnection(db_setting);
        try {
            const param = req.val
            if(param === 'expensive') {
                const sql = 'select name from costOfLivingIndex where id <= 20'
                const [rows, fields] = await con.query(sql)
                return rows
            } else if(param === 'middle') {
                const sql = 'select name from costOfLivingIndex where id >= 21 && id <= 100'
                const [rows, fields] = await con.query(sql);
                return rows
            } else {
                const sql = 'select name from costOfLivingIndex where id >= 101 && id <= 139'
                const [rows, fields] = await con.query(sql);
                return rows
            }
        } catch(error) {
            console.log(error)
        }
    }

    async getCountriesBasedOnActivities(req) {
        const con = await mysql.createConnection(db_setting);
        try {
            const param = req.val
            console.log(param)
            if(param === 'Safari') {
                console.log('okok')
                const sql = 'select name from costOfLivingIndex where activities1=?;'
                const [rows, fields] = await con.query(sql, [param])
                return rows
            } else if(param === 'Mountain sports') {
                const sql = "select name from costOfLivingIndex where activities1=? OR activities2=?"
                const [rows, fields] = await con.query(sql, [param, param]);
                return rows
            } else if(param === 'Water sports') {
                const sql = "select name from costOfLivingIndex where activities1=? OR activities2=?"
                const [rows, fields] = await con.query(sql, [param, param]);
                return rows
            } else if(param === 'Winter sports') {
                const sql = "select name from costOfLivingIndex where activities1=? OR activities2=?"
                const [rows, fields] = await con.query(sql, [param, param]);
                return rows
            } else if(param === 'Historical sites') {
                const sql = "select name from costOfLivingIndex where activities1=? OR activities2=?"
                const [rows, fields] = await con.query(sql, [param, param]);
                return rows
            }
        } catch(error) {
            console.log(error)
        }
    }
}

export default Model