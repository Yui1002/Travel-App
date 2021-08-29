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

    async getCountriesBasedOnActivities(req) {
        return await this.Model.getCountriesBasedOnActivities(req)
    }
}

export default Controller