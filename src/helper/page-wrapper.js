
const pageWrapHelper = (rules = [], path) => {
    // TODO: improve *
    // use micromatch to match
    // let p = rules.filter((e) => e.path === "*" || e.path === path || new RegExp(e.path).test(path))
    let p = rules.filter((e) => micromatch.isMatch(path, e.path))
    return p.length > 0 ? p[0] : null
}

exports.pageWrapHelper = pageWrapHelper;