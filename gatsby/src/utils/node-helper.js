const fs = require('fs');

exports.loadPlugins = (dir = "src/plugins") => {
    return fs.readdirSync(dir).map(key => `${dir}/${key}`)
}