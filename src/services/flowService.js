const axios = require("axios");
const async = require("async");
const { parse } = require("node-html-parser");
const { addProtocol } = require("../utils/helpers");

const getTitles = (addresses, callback) => {
  if (!Array.isArray(addresses)) {
    addresses = [addresses];
  }

  async.map(
    addresses,
    (address, cb) => {
      const url = addProtocol(address);
      axios
        .get(url, { timeout: 5000 })
        .then((response) => {
          const root = parse(response.data);
          const title = root.querySelector("title").innerText || "NO RESPONSE";
          cb(null, `<li>${address} - "${title}"</li>`);
        })
        .catch((error) => {
          cb(null, `<li>${address} - NO RESPONSE</li>`);
        });
    },
    (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results.join(""));
    }
  );
};

module.exports = { getTitles };
