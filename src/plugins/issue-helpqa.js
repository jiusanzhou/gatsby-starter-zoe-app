const kebabCase = require("lodash.kebabcase");
const fetch = require("node-fetch");
const path = require("path");
const { purePath } = require("../utils/helper");

class IssueProvider {

}

class GithubIssueProvider {

    constructor(repo, options = {}) {
        let { base_api, labelPrefix, state, issues } = options;

        this._base_api = base_api || this._base_api;
        this._labelPrefix = labelPrefix || this._labelPrefix;
        this._state = state || this._state;

        this.repo = repo;

        this._issues = issues;

        if (!this.repo && !issues)
            throw new Error("miss repo and issues offered.");
    }

    _base_api = "https://api.github.com/repos";
    _labelPrefix = "help";
    _state = null;

    repo;
    assetRegexPatterns = {};

    _categories = [];
    _items = [];


    _apiIssuesList = () => `${this._base_api}/${this.repo}/issues`;
    _apiLabelsList = () => `${this._base_api}/${this.repo}/labels`;

    _queryLabels = `
    query queryLabels($owner: String!, $repo: String, $num: Int = 50) {
        github {
            repository(owner: $owner, name: $repo) {
                labels(last: $num) {
                    nodes {
                        name
                        description
                        color
                    }
                }
            }
        }
    }`

    _queryIssues = `
    query queryIssues($owner: String!, $repo: String, $num: Int = 50) {
        repository(owner: $owner, name: $repo) {
            github {
                issues(last: $num) {
                    nodes {
                        title
                        closed
                        createdAt
                        titleHTML
                        bodyHTML
                        url
                    }
                }
            }
        }
    }`


    // should use parser: 
    // a:b, c:d
    _metaParser = (s) => {
        if (s.indexOf(":")<0&&s.indexOf(",")<0) return {
            description: s,
        }
        
        let res = {}
        s.split(",").forEach((e) => {
            let parts = e.split(":")
            res[parts[0].trim()] = parts.length > 1 ? parts[1].trim() : null
        })
        return res
    }

    _parseCategory(item) {
        let { id, name, description, color } = item;
        if (this._labelPrefix) {
            let parts = item.name.split(":") // TODO: spe?
            if (parts[0] !== this._labelPrefix) {
                return null
            }

            name = parts[1]
        }

        // name => name
        // color => color
        // description => description: icon, ... // TODO:
        return {
            color: `#${color}`,
            name,
            id: `${id}`,
            ...this._metaParser(description),
        }
    }

    _parseHelpItem(item) {
        let { id, state, body, title, number, labels } = item
        if (this._state && this._state !== state || !labels) return null

        let _labels = (labels||[])
            .map((label) => this._parseCategory(label))
            .filter((e) => e)

        return {
            title,
            body,
            state,
            id: `${id}`,
            categories: _labels,
            isPinned: item.assignee !== null,
            createdAt: item.created_at,
            number,
        }
    }

    // category
    async loadCategories() {
        if (this._categories && this._categories.length > 0)
            return new Promise((resolve, reject) => resolve(this._categories));

        return fetch(this._apiLabelsList())
            .then((res) => res.json())
            .then((data) => {
                if (!Array.isArray(data)) {
                    return []; // TODO: reject an error
                }
                this._categories = data
                    .map((e) => this._parseCategory(e))
                    .filter((e) => e)
                return this._categories
            })
    }

    async loadHelpQAItems() {
        if (this._items && this._items.length > 0)
            return new Promise((resolve, reject) => resolve(this._items));

        return fetch(this._apiIssuesList())
            .then((res) => res.json())
            .then((data) => {
                if (!Array.isArray(data)) {
                    return []; // TODO: reject an error
                }
                this._items = data
                    .map((e) => this._parseHelpItem(e))
                    .filter((e) => e)
                return this._items
            })

    }
}

// class GithubDiscusProvider {}

class GiteeIssueProvider {

}


const _providers = {
    github: GithubIssueProvider,
};


const typeData = `
    type HelpQACategory implements Node {
        name: String!
        icon: String # parse from description
        color: String
        description: String
    }
    
    type Category {
        id: String!
        name: String!
    }

    type HelpQAItem implements Node {
        title: String!
        body: String!
        closed: Boolean
        createdAt: String
        isPinned: Boolean
        number: Int!
        categories: [Category] # TODO: improve
    }
    `;


const _loadHelpQAItems = ({ provider = "github", repo }) => {
    if (!_providers[provider]) return new Promise((resolve) => resolve([]));
    return new _providers[provider](repo)
        .loadHelpQAItems()
        .then((e) => e.map((r) => ({ ...r, provider })));
};

const _loadCategories = ({ provider = "github", repo }) => {
    if (!_providers[provider]) return new Promise((resolve) => resolve([]));
    return new _providers[provider](repo)
        .loadCategories()
        .then((e) => e.map((r) => ({ ...r, provider })));
};


const sourceNode = [
    {
        name: "HelpQACategory",
        mediaType: "appplication/json",
        data: [],
        createData: async ({ helpqa }) => {
            return Promise.all([
                ...(helpqa || []).map((e) => _loadCategories(e)),
            ]).then((r) => [].concat.apply([], r));
        }
    },
    {
        name: "HelpQAItem",
        mediaType: "appplication/json",
        data: [],
        createData: async ({ helpqa }) => {
            return Promise.all([
                ...(helpqa || []).map((e) => _loadHelpQAItems(e)),
            ]).then((r) => [].concat.apply([], r));
        }
    },
]


const createPages = async (siteMetadata, { actions, graphql, reporter }) => {
    const {
        basePathHelp,
        // template???
        // helpCenterHomeTemplate
        // helpCenterCategoryListTemplate
        // helpCenterItemDetailTemplate
    } = siteMetadata;

    const { createPage } = actions;

    let _basePathHelp = basePathHelp || "/help"

    let _helpHomeTemplate = "./src/templates/help-home.jsx"

    // create help-center home page
    createPage({
        path: _basePathHelp,
        component: path.resolve(_helpHomeTemplate),
        context: {
            basePathHelp: _basePathHelp,
        }
    })

    // query all categories and items

    const result = await graphql(`
    query {
        allHelpQaItem(sort: {fields: number, order: DESC}) {
          nodes {
            id
            title
            number
          }
        }
        allHelpQaCategory {
          totalCount
          nodes {
            id
            name
            color
            description
          }
        }
      }
    `)

    if (result.errors) {
        reporter.panicOnBuild(`There was an error loading your help content`, result.errors)
        return
    }

    // create cetegories page (list items with current category)
    let cates = result.data.allHelpQaCategory.nodes
    cates.forEach(({ id, name, icon, color, description }) => {
        createPage({
            path: purePath(`${_basePathHelp}/categories/${kebabCase(id)}`),
            component: path.resolve(`./src/templates/help-category.jsx`),
            context: {
                basePathHelp: _basePathHelp,
                id, name, icon, color, description, // the categories
            }
        })
    })

    // create item detail page
    let items = result.data.allHelpQaItem.nodes
    items.forEach(({ id, number, title }) => {
        createPage({
            path: purePath(`${_basePathHelp}/item/${id}`), // number-title???
            component: path.resolve(`./src/templates/help-detail.jsx`),
            context: {
                basePathHelp: _basePathHelp,
                number, title, id
            }
        })
    })
}

// register the types
exports.typeData = typeData;

// call in the sourceNodes to create nodes
exports.sourceNode = sourceNode;

exports.createPages = createPages;




/**
 * delete weibo
 * delWeibo = (id) => fetch("/aj/mblog/del?ajwvr=6", {method: "POST", credentials: 'same-origin', headers: {'content-type': 'application/x-www-form-urlencoded'}, body: `mid=${id}`}).then((r) => r.json()).then((r) => console.log(r))
 * Array.from(document.querySelectorAll('div.WB_feed_detail')).filter((i)=>i.querySelector('.WB_empty')!==null||i.querySelector('.WB_text').textContent.trim()==="Repost").map((i)=>delWeibo(i.parentNode.getAttribute("mid")))
 * Array.from(document.querySelectorAll('div.WB_feed_detail')).filter((i)=>i.querySelector('.WB_empty')!==null||/Repost|转发微博|轉發微博/.test(i.querySelector('.WB_text').textContent.trim())).map((i)=>delWeibo(i.parentNode.getAttribute("mid")))
 */