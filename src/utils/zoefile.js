const path = require("path");
const fs = require("fs");

const { loadObject } = require("./config");
const { buildZoefile, mergeConfig } = require("./zoefile-parser");

// TODO: parse remote images and use gatsby-plugin-remote-images

const addPluginFromContentDir = (config, { __dirname }) => {

    const { baseContentDir = [ __dirname ], customNodes = [] } = config.siteMetadata;

    const dirs = baseContentDir.filter((i) => fs.existsSync(i)).sort((a, b) => a.length - b.length);

    // the long the first
    dirs.forEach((_dir) => {
        config.plugins.unshift({
            resolve: "gatsby-source-filesystem",
            options: {
                name: "default", // TODO:
                path: _dir,
                ignore: ["**/public/**", "**/.cache/**", "**/.git/**", "**/.svn/**"]
            }
        })
    })

    // and then generate filesystem from dirs x customNodes
    dirs.unshift(__dirname) // add the root directory

    dirs.forEach((_dir) => {
        customNodes.forEach(({ name, when = {} }) => {
            let _dir_ = path.join(_dir, when.path)
            if (!when.path || !fs.existsSync(_dir_)) return
            config.plugins.unshift({
                resolve: "gatsby-source-filesystem",
                options: {
                    name, // use the custom node name
                    path: _dir_,
                    ignore: ["**/public/**", "**/.cache/**", "**/.git/**", "**/.svn/**"]
                }
            })
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
const _loadAndMergeCustomConfig = (config, { __dirname }) => {
    // config-list.txt, should be relative path
    let customConfFiles = [];
    try {
        const data = fs.readFileSync(`config-list.txt`).toString()
        customConfFiles = data.split("\n")
            .map((i) => i.trim())
            .filter((i) => i);
    } catch (err) {

    }

    customConfFiles.forEach(configFile => {
        const c2 = _loadZoefile(configFile) || {}
        config.siteMetadata = mergeConfig(config.siteMetadata, c2.siteMetadata);
        // and add configFile's directory to contextDir
        config.siteMetadata.baseContentDir.push(path.dirname(configFile))
        // merge plugins
        config.plugins.concat(c2.plugins)
        // set pathPrefix
        if (c2.pathPrefix) config.pathPrefix = c2.pathPrefix
    })

    const meta = config.siteMetadata

    // hard code to add _example content dir
    if (process.env.NODE_ENV === 'development') {
        meta.baseContentDir = meta.baseContentDir.concat(
            `${__dirname}/_example`,
            `${__dirname}/_example/content`,
        )
    }

    // hard code to filter duplicates
    meta.baseContentDir = meta.baseContentDir
        .filter((c, idx) => meta.baseContentDir.indexOf(c) === idx)

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
    __dirname = path.dirname(path.resolve(process.cwd(), zoefile));

    // load default zoe config: zoe-site.yaml
    let config = _loadZoefile(zoefile);

    config = _loadAndMergeCustomConfig(config, { __dirname });

    // auto register plugins
    addPluginFromContentDir(config, { __dirname });
    addPluginFromGoogleAnalytics(config, { __dirname });

    return config;
};
