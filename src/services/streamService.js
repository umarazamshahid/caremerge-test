const { Observable, from } = require("rxjs");
const { map, reduce, mergeMap } = require("rxjs/operators");
const http = require("http");
const https = require("https");
const { parse } = require("node-html-parser");
const { addProtocol } = require("../utils/helpers");

const getTitles = (addresses) => {
  if (!Array.isArray(addresses)) {
    addresses = [addresses];
  }

  const titleObservables = addresses.map((address) => {
    const url = addProtocol(address);
    const client = url.startsWith("https") ? https : http;

    return new Observable((observer) => {
      let data = "";

      client
        .get(url, (response) => {
          response.on("data", (chunk) => {
            data += chunk;
          });

          response.on("end", () => {
            try {
              const root = parse(data);
              const title =
                root.querySelector("title").innerText || "NO RESPONSE";
              observer.next(`<li>${address} - "${title}"</li>`);
              observer.complete();
            } catch {
              observer.next(`<li>${address} - NO RESPONSE</li>`);
              observer.complete();
            }
          });
        })
        .on("error", () => {
          observer.next(`<li>${address} - NO RESPONSE</li>`);
          observer.complete();
        });
    });
  });

  return from(titleObservables).pipe(
    mergeMap((observable) => observable),
    reduce((acc, curr) => acc + curr, ""),
    map((results) => `<ul>${results}</ul>`)
  );
};

module.exports = { getTitles };
