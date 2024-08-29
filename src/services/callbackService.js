const http = require("http");
const https = require("https");
const { parse } = require("node-html-parser");
const { addProtocol } = require("../utils/helpers");

function fetchTitle(address, callback) {
  const url = addProtocol(address);
  const protocol = address.startsWith("https") ? https : http;

  protocol
    .get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const root = parse(data);
        const title = root.querySelector("title");
        callback(null, title ? title.text : "NO RESPONSE");
      });
    })
    .on("error", (err) => {
      callback(err);
    });
}

function getTitles(addresses, callback) {
  if (!Array.isArray(addresses)) {
    addresses = [addresses];
  }

  let titles = "";
  let pending = addresses.length;

  addresses.forEach((address) => {
    fetchTitle(address, (err, title) => {
      titles += `<li>${address} - "${title}"</li>`;
      pending -= 1;
      if (pending === 0) {
        callback(null, titles);
      }
    });
  });
}

module.exports = { getTitles };
