const fetch = require("node-fetch");

class GithubProjectProvider {
    constructor(tag, owners, options = {}) {
        let { base_api } = options;
        this._base_api = base_api || this._base_api;
        this.users = owners;
        this.tag = tag;

        if (!this.tag)
            throw new Error("miss tags offered.");
    }

    _base_api = "https://api.github.com/search/repositories";
    users = ["jiusanzhou"];
    tag = "zoe-lab";

    q = () => [this.tag, ...this.users.map((e) => "user:"+e)].join(" ");

    async loadProjects() {
        return fetch(`${this._base_api}?q=${encodeURIComponent(this.q())}`)
            .then((res) => res.json()) // or use staticData
            .then(({ items, total_count, incomplete_results }) => {
                // get html and parse opengraph image
                return items;
            });
    }

    // graphql

    // graphqlQuery = ```
    // {
    //     search(query: "zoe-lab user:jiusanzhou", type: REPOSITORY, first: 10) {
    //       nodes {
    //         ... on Repository {
    //           id
    //           name
    //           url
    //           openGraphImageUrl
    //         }
    //       }
    //       pageInfo {
    //         hasNextPage
    //       }
    //     }
    //   }
    // ```
}

const _providers = {
    github: GithubProjectProvider,
};

const _loadProjects = ({ provider = "github", tag, owners }) => {
    if (!_providers[provider]) return new Promise((resolve) => resolve([]));
    return new _providers[provider](tag, owners)
        .loadProjects()
        .then((e) => e.map((r) => ({ ...r, id: `${r.id}`, provider })));
};

const typeData = `
    type Owner {
        id: Int
        avatar_url: String
        type: String
        login: String
        url: String
    }

    type RepoProject implements Node {
        provider: String
        id: String
        default_branch: String
        description: String
        created_at: String
        full_name: String
        homepage: String
        html_url: String
        language: String
        license: String
        name: String
        private: Boolean
        pushed_at: String
        published_at: String
        stargazers_count: Int
        updated_at: String
        owner: Owner
    }`;

const sourceNode = {
    name: "RepoProject",
    mediaType: "appplication/json",
    // how to provider the data: []
    data: [],
    createData: ({ projects = [] }) => {
        return Promise.all([
            ...projects.map((e) => _loadProjects(e)),
        ]).then((r) => [].concat.apply([], r));
    },
};

exports.GithubProjectProvider = GithubProjectProvider;

// call in the sourceNodes to create nodes
exports.sourceNode = sourceNode;

// register the types
exports.typeData = typeData;

// TODO: use worker.dev to load banner or use graphql to search