const fetch = require("node-fetch");
const yaml = require("js-yaml");

// Github Provider 加载最新版本的数据
class GithubVersionProvider {
    constructor(repo, options = {}) {
        let { base_api, versions, assetRegexPatterns = {} } = options;
        this._base_api = base_api || this._base_api;
        this.assetRegexPatterns = assetRegexPatterns || this.assetRegexPatterns;
        this.repo = repo;
        this._versions = versions;

        if (!this.repo && !versions)
            throw new Error("miss repo and versions offered.");
    }

    _base_api = "https://api.github.com/repos";

    repo;
    prerelease = false;
    assetRegexPatterns = {};

    _versions = [];

    // parse meta from release notes.

    _apiList = () => `${this._base_api}/${this.repo}/releases`;
    _apiLatest = () => `${this._apiList()}/latest`;

    // TODO: yaml or json
    _metaRegexp = "```yaml version((.|\n|\r)*)```";

    _adapter(o = {}) {
        if (o.draft) return null;

        // the result
        let res = {};

        res.id = `${o.id}`;
        res.title = o.name;
        res.url = o.url;
        res.repo = this.repo;
        res.version = o.tag_name;
        res.prerelease = o.prerelease;
        res.created_at = o.created_at;
        res.published_at = o.published_at;

        // parse the assets
        let assets = {};

        // 从 assets 中找到匹配的
        Object.keys(this.assetRegexPatterns).forEach((k) => {
            let p = this.assetRegexPatterns[k];
            // 找到assets中的文件标识
            let _rexp = RegExp(p);
            for (let i in o.assets || []) {
                let e = o.assets[i];
                if (_rexp.test(e.name)) {
                    assets[k] = e.browser_download_url;
                }
            }
        });

        res.assets = assets;

        res.release_note = o.body;

        res._raw = o;

        // convert all to my type

        // 1. use regexp to get data date out. ```yaml version\n```,
        // 2. unmarshal use `yaml|json`,
        let meta = this._parseMeta(res.release_note);

        // remove the meta in note
        res.release_note = res.release_note.replace(this._metaRegexp, "");

        if (meta === null) return res;

        res.meta = meta;

        // combine data to version information.
        if (meta.version) res.version = meta.version;
        meta.assets &&
            Object.keys(meta.assets).forEach((k) => {
                let vv = meta.assets[k];
                if (vv != null) res.assets[k] = vv;
            });
        meta.urls &&
            Object.keys(meta.urls).forEach((k) => {
                let vv = meta.urls[k];
                if (vv != null) res.urls[k] = vv;
            });

        return res;
    }

    _parseMeta(note) {
        let m = RegExp(this._metaRegexp).exec(note);
        if (!m) return null; // match failed
        return yaml.safeLoad(m[1]);
    }

    async loadVersions() {
        if (this._versions && this._versions.length > 0)
            return new Promise((resolve, reject) => resolve(this._versions));

        // TODO: order versions list
        // TODO: next page.

        return fetch(this._apiList())
            .then((res) => res.json()) // or use staticData
            .then((data) => {
                if (!Array.isArray(data)) {
                    return []; // TODO: reject an error
                }
                // check the data type if is not a array, reject a error
                this._versions = data
                    .map((e) => this._adapter(e))
                    .filter((i) => i);
                return this._versions;
            });
    }

    async latestVersion() {
        // parse from list
        return this.loadVersions().then((vs) =>
            vs.find((e) => !(!this.prerelease && e.prerelease))
        );
    }
}

const createNode = {
    name: "GithubRelease",
    mediaType: "appplication/json",
    // how to provider the data: []
    data: [],
    createData: ({ releaseRepo }) => {
        // check type of releaseRepo
        if (Array.isArray(releaseRepo)) {
            return Promise.all(
                releaseRepo.map((e) =>
                    new GithubVersionProvider(e).loadVersions()
                )
            ).then((r) => [].concat.apply([], r));
        } else {
            // must be string
            return new GithubVersionProvider(releaseRepo).loadVersions();
        }
    },
};

exports.GithubVersionProvider = GithubVersionProvider;

exports.createNode = createNode;
