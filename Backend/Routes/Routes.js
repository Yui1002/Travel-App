import Controller from "../Controllers/Controller.js";

class Routes {
  constructor() {
    this.Controller = new Controller();
  }

  applyRouting(app) {
    app.post("/getCountriesBasedOnDistance", async (req, res) => {
      const response = await this.Controller.getCountriesBasedOnDistance(
        req.body
      );
      res.send(response);
    });

    app.post("/getCountriesBasedOnClimate", async (req, res) => {
      const response = await this.Controller.getCountries(req.body);
      res.send(response);
    });

    app.post("/getCountriesBasedOnBudget", async (req, res) => {
      const response = await this.Controller.getCountriesBasedOnBudget(
        req.body
      );
      res.send(response);
    });

    app.post("/getCountriesBasedOnActivities", async (req, res) => {
      const response = await this.Controller.getCountriesBasedOnActivities(
        req.body
      );
      res.send(response);
    });

    app.post("/getCountriesMatched", async (req, res) => {
      const response = await this.Controller.getCountriesMatched(
        req.body
      );
      res.send(response);
    });

    
  }
}

export default Routes;
