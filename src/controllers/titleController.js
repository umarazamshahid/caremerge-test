const callbackService = require("../services/callbackService");

exports.handleGetTitle = (req, res, implementation) => {
  // To be implemented based on the control flow method

  switch (implementation) {
    case "callbacks":
      callbackService.getTitles(req.query.address, (err, titles) => {
        if (err) {
          res.status(500).send("<h1>Server Error</h1>");
        } else {
          res
            .status(200)
            .send(
              `<html><head></head><body><h1> Following are the titles of given websites: </h1><ul>${titles}</ul></body></html>`
            );
        }
      });
      break;

    default:
    // res.sendStatus(400).send("<h1>Bad Request</h1>");

    // ... other cases for different implementations
  }
};
