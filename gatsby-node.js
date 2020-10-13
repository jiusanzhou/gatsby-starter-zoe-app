/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const crypto = require("crypto");
const path = require('path')
const template = require('lodash.template')

// This is a shortcut so MDX can import components without gross relative paths.
// Example: import { Image } from '$components';
exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
      resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        alias: { $: path.resolve(__dirname, 'src') },
      },
    })
}

const _needCreateNodes = [
  'src/helper/app-release'
]

// import nodes to create, how to create multi
exports.sourceNodes = ({ actions }) => {
  // get siteMeta data
  // create node

  return new Promise((resolve, reject) => {

    // loads all nodes we need to create
    _needCreateNodes.forEach((e) => {
      const c = require(path.resolve(__dirname, e)).createNode
      if (!c) return

      if (typeof c === 'function') {
        // just call the function
        return c(actions)
      }

      // name, and data
      c.createData && c.createData({ repo: 'moeapp/mtb-mobile' }).then((res) => {
        res.forEach((v) => {
          // create release node
          actions.createNode({
            ...v,
            internal: {
              type: c.name,
              contentDigest: crypto
                .createHash(`md5`)
                .update(JSON.stringify(v))
                .digest(`hex`),
              mediaType: c.mediaType || "application/json"
            }
          })
        })
        resolve()
      }).catch((e) => {
        console.log("====>", e)
        reject(e)
      })
    })
  })
}
