const path = require("path");
const fs = require("fs");

const { loadObject } = require("./config");
const { buildZoefile, mergeConfig } = require("./zoefile-parser");

// TODO: parse remote images and use gatsby-plugin-remote-images

const addPluginFromContentDir = (config, { __dirname }) => {
    const { baseContentDir = [ __dirname ] } = config.siteMetadata;

    baseContentDir.forEach((_dir) => {
        config.plugins.push({
            resolve: "gatsby-source-filesystem",
            options: {
                name: "default", // TODO:
                path: _dir,
                ignore: ["**/public/**", "**/.cache/**", "**/.git/**", "**/.svn/**"]
            }
        })
    })
}

const addPluginFromGoogleAnalytics = (config, { __dirname }) => {
    const { googleAnalyticsTrackingId } = config.siteMetadata;

    if (googleAnalyticsTrackingId && googleAnalyticsTrackingId.indexOf("xxxxx") < 0) {
        config.plugins.push({
            resolve: "gatsby-plugin-google-analytics",
            options: {
                trackingId: googleAnalyticsTrackingId,
                respectDNT: true,
            }
        })
    }
}

// load and merge custom config
const _loadAndMergeCustomConfig = (config) => {
    // config-list.txt, should be relative path
    let customConfFiles = [];
    fs.readFile(`config-list.txt`, 'utf8', (err, data) => {
        if (err) return
        customConfFiles = data.split("\n")
            .map((i) => i.trim())
            .filter((i) => i);
    })

    customConfFiles.forEach(configFile => {
        config = mergeConfig(config, _loadZoefile(configFile));
        // and add configFile's directory to contextDir
        config.baseContentDir.push(path.dirname(configFile))
    })

    config.baseContentDir.filter((c, idx) => config.baseContentDir.indexOf(c) === idx)

    return config;
}

// _loadZoefile load zoefile
const _loadZoefile = (zoefile=`./zoe-site.yaml`) => {
    // set global: make sure first call zoefile is root of this project
    __dirname = path.dirname(path.resolve(process.cwd(), zoefile));

    // load zoe configuration from file
    const zoe = loadObject(zoefile);
    const config = buildZoefile(zoe, { __dirname });

    return config;
}

exports.loadZoefile = (zoefile=`./zoe-site.yaml`) => {
    // load default zoe config: zoe-site.yaml
    let config = _loadZoefile(zoefile);

    config = _loadAndMergeCustomConfig(config);

    // auto register plugins
    addPluginFromContentDir(config, { __dirname });
    addPluginFromGoogleAnalytics(config, { __dirname });

    return config;
};
