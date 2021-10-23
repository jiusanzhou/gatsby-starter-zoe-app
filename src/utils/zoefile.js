const path = require("path");
const fs = require("fs");

const { loadObject } = require("./config");
const { buildZoefile, mergeConfig } = require("./zoefile-parser");

// TODO: parse remote images and use gatsby-plugin-remote-images

const addPluginFromRss = (config, { __dirname }) => {
    const { rss, title } = config.siteMetadata;

    if (rss) {
        config.plugins.push({
            resolve: "gatsby-plugin-feed",
            options: {
                query: `{
                    site {
                      siteMetadata {
                        title
                        description
                        url
                        basePathBlog
                      }
                    }
                }`,
                feeds: rss.feeds || [
                    {
                        query: `{
                            allMdxPost(
                              sort: { order: DESC, fields: [createdTime] },
                            ) {
                              edges {
                                node {
                                  excerpt
                                  description
                                  createdTime
                                  slug
                                  title
                                  html
                                }
                              }
                            }
                        }`,
                        serialize: ({ query: { site, allMdxPost } }) => {
                            const { basePathBlog } = site.siteMetadata
                            return allMdxPost.edges.map(edge => {
                              return Object.assign({}, edge.node.frontmatter, {
                                title: edge.node.title,
                                description: edge.node.description || edge.node.excerpt,
                                pubDate: edge.node.createdTime,
                                url: site.siteMetadata.url + basePathBlog + "/" + edge.node.slug,
                                guid: site.siteMetadata.url + basePathBlog + "/" + edge.node.slug,
                                // custom_elements: [{ "content:encoded": edge.node.html }],
                              })
                            })
                        },
                        output: rss.path || "/rss.xml",
                        title: rss.title || `${title} RSS Feed`,
                    },
                ]
            }
        })
    }
}

const addPluginFromEnv = (config, { __dirname }) => {
    if (process.env.GITHUB_TOKEN) {
        config.plugins.push({
            resolve: "gatsby-source-graphql",
            options: {
                typeName: "Github",
                fieldName: "github",
                url: "https://api.github.com/graphql",
                headers: {
                    "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
                }
            }
        })
    }
}

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

const addPluginFromGoogleTag = (config, { __dirname }) => {
    const {
        gtagTrackingIds,
        gtagOptimizeId,
        gtagExclude,
    } = config.siteMetadata;
    if (!gtagTrackingIds || gtagTrackingIds.length <= 0) return;

    config.plugins.push({
        resolve: "gatsby-plugin-google-gtag",
        options: {
            trackingIds: gtagTrackingIds,
            // TODO: make bellow more configurable
            gtagConfig: {
                optimize_id: gtagOptimizeId,
                anonymize_ip: false,
                cookie_expires: 0,
            },
            pluginConfig: {
                head: false,
                respectDNT: false,
                exclude: gtagExclude,
            },
        }
    })
}

// load and merge with zoe data
const _loadAndMergeZoe = (config, { __dirname }) => {
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
        const c2 = _loadZoefile(configFile, { _onlyZoe: true }) || {}
        config = mergeConfig(config, c2);
        // and add configFile's directory to contextDir
        config.baseContentDir.push(path.dirname(configFile))
    })

    // hard code to add _example content dir
    if (process.env.NODE_ENV === 'development') {
        config.baseContentDir = config.baseContentDir.concat(
            `${__dirname}/_example`,
            `${__dirname}/_example/content`,
        )
    }

    // hard code to filter duplicates
    config.baseContentDir = config.baseContentDir
        .filter((c, idx) => config.baseContentDir.indexOf(c) === idx)

    return config;
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
        if (c2.assetPrefix) config.assetPrefix = c2.assetPrefix
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
const _loadZoefile = (zoefile=`./zoe-site.yaml`, { _onlyZoe }) => {
    // set global: make sure first call zoefile is root of this project
    __dirname = path.dirname(path.resolve(process.cwd(), zoefile));

    // load zoe configuration from file
    const zoe = loadObject(zoefile);
    const config = buildZoefile(zoe, { __dirname, _onlyZoe });

    return config;
}

exports.loadZoefile = (zoefile=`./zoe-site.yaml`) => {
    __dirname = path.dirname(path.resolve(process.cwd(), zoefile));

    // load default zoe config: zoe-site.yaml
    let config = _loadZoefile(zoefile, { _onlyZoe: true });

    // merge from others zoe data
    config = _loadAndMergeZoe(config, { __dirname });

    // build again with teh merged config, for replace ${zoe.} and build meta
    config = buildZoefile(config, { __dirname, _onlyZoe: false });

    // auto register plugins
    addPluginFromContentDir(config, { __dirname });
    addPluginFromGoogleAnalytics(config, { __dirname });
    addPluginFromEnv(config, { __dirname });
    addPluginFromRss(config, { __dirname });
    addPluginFromGoogleTag(config, { __dirname });

    return config;
};
