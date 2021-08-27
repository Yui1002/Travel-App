import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import Routes from './Routes/Routes.js'

const port = process.env.PORT
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const routes = new Routes();
routes.applyRouting(app)

app.listen(port, () => console.log(`Listening on port ${port}`))