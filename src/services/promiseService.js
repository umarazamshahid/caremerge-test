const axios = require("axios");
const { parse } = require("node-html-parser");
const { addProtocol } = require("../utils/helpers");

const getTitles = (addresses) => {
  if (!Array.isArray(addresses)) {
    addresses = [addresses];
  }

  const promises = addresses.map((address) => {
    const url = addProtocol(address);
    return axios
      .get(url, { timeout: 5000 })
      .then((response) => {
        const root = parse(response.data);
        const title = root.querySelector("title").innerText || "NO RESPONSE";
        return `<li>${address} - "${title}"</li>`;
      })
      .catch(() => {
        return `<li>${address} - NO RESPONSE</li>`;
      });
  });

  return Promise.all(promises).then((results) => results.join(""));
};

module.exports = { getTitles };
