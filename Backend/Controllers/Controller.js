import Model from '../Models/Model.js'

class Controller {
    constructor() {
        this.Model = new Model()
    }

    async getCountries(req) {
        return await this.Model.getCountriesBasedOnClimate(req)
    }

    async getCountriesBasedOnBudget(req) {
        return await this.Model.getCountriesBasedOnBudget(req)
    }
}

export default Controller