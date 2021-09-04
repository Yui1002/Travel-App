import Model from "../Models/Model.js";

class Controller {
  constructor() {
    this.Model = new Model();
  }

  async getCountriesBasedOnDistance(req) {
    return await this.Model.getCountriesBasedOnDistance(req);
  }

  async getCountries(req) {
    return await this.Model.getCountriesBasedOnClimate(req);
  }

  async getCountriesBasedOnBudget(req) {
    return await this.Model.getCountriesBasedOnBudget(req);
  }

  async getCountriesBasedOnActivities(req) {
    return await this.Model.getCountriesBasedOnActivities(req);
  }

  async getFlags(req) {
    return await this.Model.getFlags(req);
  }

  async getCountriesMatched(req) {
      return await this.Model.getCountriesMatched(req)
  }
}

export default Controller;
