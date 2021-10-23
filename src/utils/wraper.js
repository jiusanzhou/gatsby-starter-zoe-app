const micromatch = require("micromatch")

const pageWrapHelper = (rules = [], path) => {
    // use micromatch to match
    return rules.find((e) => micromatch.isMatch(path, e.path))
}

exports.pageWrapHelper = pageWrapHelper;