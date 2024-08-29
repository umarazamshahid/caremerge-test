function addProtocol(url) {
  // Add 'http://' if the URL does not start with 'http://' or 'https://'
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
}

module.exports = { addProtocol };
