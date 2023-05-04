require("dotenv").config({path: `.env.${process.env.NODE_ENV}`})
require("global-agent").bootstrap()

const { loadZoefile } = require("./src/utils/zoefile");

// define zoe configuration file.
const zoefile = `${__dirname}/zoe-site.yaml`;

module.exports = {
  // add extend config at here like, developMiddleware
  ...loadZoefile(zoefile)
};
