
const pageWrapHelper = (rules = [], path) => {
    // TODO: improve *
    let p = rules.filter((e) => e.path === "*" || e.path === path || new RegExp(e.path).test(path))
    return p.length > 0 ? p[0] : null
}

exports.pageWrapHelper = pageWrapHelper;