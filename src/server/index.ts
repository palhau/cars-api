require("isomorphic-fetch");
const dotenv = require("dotenv");

const serverApp = require("@APP");

dotenv.config();

serverApp.listen(process.env.PORT || 8080, () => {
  console.info(">>> 🌎 Started at http://localhost:%s/", 8080); // eslint-disable-line
});

module.exports = serverApp;
