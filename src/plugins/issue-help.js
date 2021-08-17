const fetch = require("node-fetch");
const { graphql } = require("@octokit/graphql");


class IssueProvider {

}

class GithubIssueProvider {

    constructor(repo, options = {}) {
        let { base_api, issues } = options;
        this._base_api = base_api || this._base_api;
        this.repo = repo;
        this._issues = issues;

        if (!this.repo && !issues)
            throw new Error("miss repo and issues offered.");
    }

    _base_api = "https://api.github.com/repos";

    repo;
    assetRegexPatterns = {};

    _issues = [];

    _apiIssuesList = () => `${this._base_api}/${this.repo}/issues`;
    _apiLabelsList = () => `${this._apiList()}/labels`;

    _query = `
query queryIssues($owner: String!, $repo: String, $num: Int = 50) {
    repository(owner: $owner, name: $repo) {
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
        labels(last: $num) {
            nodes {
                name
                description
                color
            }
        }
    }
}
    `

    async loadProjects() {

    }
}

// class GithubDiscusProvider {}

class GiteeIssueProvider {

}

/**
 * delete weibo
 * delWeibo = (id) => fetch("/aj/mblog/del?ajwvr=6", {method: "POST", credentials: 'same-origin', headers: {'content-type': 'application/x-www-form-urlencoded'}, body: `mid=${id}`}).then((r) => r.json()).then((r) => console.log(r))
 * Array.from(document.querySelectorAll('div.WB_feed_detail')).filter((i)=>i.querySelector('.WB_empty')!==null||i.querySelector('.WB_text').textContent.trim()==="Repost").map((i)=>delWeibo(i.parentNode.getAttribute("mid")))
 * Array.from(document.querySelectorAll('div.WB_feed_detail')).filter((i)=>i.querySelector('.WB_empty')!==null||/Repost|转发微博|轉發微博/.test(i.querySelector('.WB_text').textContent.trim())).map((i)=>delWeibo(i.parentNode.getAttribute("mid")))
 */