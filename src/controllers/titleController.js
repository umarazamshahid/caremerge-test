const callbackService = require("../services/callbackService");
const flowService = require("../services/flowService");
const promiseService = require("../services/promiseService");
const streamService = require("../services/streamService");

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
    case "flow":
      flowService.getTitles(req.query.address, (err, titles) => {
        if (err) {
          return res.status(500).send("<h1>Server Error</h1>");
        }
        res.send(`
                <html>
                <head></head>
                <body>
                <h1>Following are the titles of given websites:</h1>
                <ul>${titles}</ul>
                </body>
                </html>
            `);
      });
      break;
    case "promises":
      promiseService
        .getTitles(req.query.address)
        .then((titles) => {
          res.send(`
                        <html>
                        <head></head>
                        <body>
                        <h1>Following are the titles of given websites:</h1>
                        <ul>${titles}</ul>
                        </body>
                        </html>
                    `);
        })
        .catch((err) => {
          res.status(500).send("<h1>Server Error</h1>");
        });
      break;
    case "streams":
      streamService
        .getTitles(req.query.address)
        .then((titles) => {
          res.send(`
                        <html>
                        <head></head>
                        <body>
                        <h1>Following are the titles of given websites:</h1>
                        <ul>${titles}</ul>
                        </body>
                        </html>
                    `);
        })
        .catch((err) => {
          res.status(500).send("<h1>Server Error</h1>");
        });
      break;
    default:
      res.status(400).send("Invalid implementation flag");
      break;
  }
};
