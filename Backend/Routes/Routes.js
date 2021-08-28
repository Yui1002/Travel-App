import Controller from '../Controllers/Controller.js'

class Routes {
    constructor() {
        this.Controller = new Controller()
    }

    applyRouting(app) {
        app.post('/getCountriesBasedOnClimate', async (req, res) => {
            const response = await this.Controller.getCountries(req.body)
            res.send(response)
        })

        app.post('/getCountriesBasedOnBudget', async (req, res) => {
            const response = await this.Controller.getCountriesBasedOnBudget(req.body);
            res.send(response)
        })
    }
}  

export default Routes