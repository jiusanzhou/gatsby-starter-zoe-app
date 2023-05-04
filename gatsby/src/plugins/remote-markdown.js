// remote markdown generator

'use strict';

const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

const get = require('lodash/get');

// https://github.dev/graysonhicks/gatsby-plugin-remote-images/blob/master/gatsby-node.js