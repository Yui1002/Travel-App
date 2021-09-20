const Reference = {
  distance: function (req) {
    let id_distance;
    switch (req) {
      case "3000":
        id_distance =
          "latitude > ?-15 && latitude < ?+15 && longitude > ?-30 && longitude < ?+30";
        break;
      case "5000":
        id_distance =
          "latitude > ?-20 && latitude < ?+20 && longitude > ?-40 && longitude < ?+40";
        break;
      case "7000":
        id_distance =
          "latitude > ?-30 && latitude < ?+30 && longitude > ?-50 && longitude < ?+50";
        break;
      case "10000":
        id_distance =
          "latitude > ?-40 && latitude < ?+40 && longitude > ?-60 && longitude < ?+60";
        break;
      case "15000":
        id_distance =
          "latitude > ?-50 && latitude < ?+50 && longitude > ?-70 && longitude < ?+70";
        break;
      default:
        id_distance = "";
    }
    return id_distance;
  },

  climate: function (req) {
    let id_climate;
    switch (req) {
      case "tropical":
        id_climate = 1;
        break;
      case "dry":
        id_climate = 2;
        break;
      case "temperate":
        id_climate = 3;
        break;
      case "continental":
        id_climate = 4;
        break;
      case "polar":
        id_climate = 5;
        break;
      default:
        console.log("Id not found");
    }
    return id_climate;
  },

  budget: function (req) {
    let id_budget;
    switch (req) {
      case "high":
        id_budget = 1;
        break;
      case "upper-middle":
        id_budget = 2;
        break;
      case "lower-middle":
        id_budget = 3;
        break;
      case "low":
        id_budget = 4;
        break;
      default:
        console.log("Id not found");
    }
    return id_budget;
  },

  activity: function (req) {
    let id_activity;
    switch (req) {
      case "safari":
        id_activity = 1;
        break;
      case "mountain sports":
        id_activity = 2;
        break;
      case "water sports":
        id_activity = 3;
        break;
      case "winter sports":
        id_activity = 4;
        break;
      case "historical sites":
        id_activity = 5;
        break;
      default:
        console.log("Id not found");
    }
    return id_activity;
  },
};

export default Reference;
