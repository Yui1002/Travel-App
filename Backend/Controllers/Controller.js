import Model from '../Models/Model.js'

class Controller {
    constructor() {
        this.Model = new Model()
    }

    async getCountries(req) {
        return await this.Model.getCountriesBasedOnClimate(req)
        
    }
}

export default Controller