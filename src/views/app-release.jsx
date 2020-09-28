import React, { useEffect, useState } from "react";

import yaml from "js-yaml";

import {
    AiOutlineApple,
    AiOutlineAndroid,
    AiOutlineWindows,
} from "react-icons/ai";

import { FaAppStore } from "react-icons/fa";
import { Box, Button, Flex, SimpleGrid, Stack, Text, Tooltip } from "@chakra-ui/core";

const _icons = {
    android: AiOutlineAndroid,
    ios: FaAppStore,
    windows: AiOutlineWindows,
    macos: AiOutlineApple,
};

const _unsupportedTooltip = "马不停蹄地开发中...";

const _platforms = ["android", "ios", "windows", "macos"];

const _labels = {
    android: "Android",
    ios: "iOS",
    windows: "Windows",
    macos: "MacOS",
};

const _nodata = () => {
    return (
        <Box bg="tomato" px="1em" py=".5em">
            <Text color="white">暂未发布任何版本</Text>
        </Box>
    );
};

const DownloadButtons = ({
    repo,
    assets = {
        android: "https://www.coolapk.com/",
    },
    urls = {},

    hiddenUnsupported = true,
    icons = {},
    labels = {},
    rounded = true,
    itemProps = { m: ".5em", size: "lg", variant: "outline" },

    isExternal = true,

    supportPlatforms = _platforms,
    unsuportedTooltip = _unsupportedTooltip,

    itemPrefix,
    itemSuffix,

    // variantColor = "teal",
    // variant = "solid",

    ...props
}) => {
    // TODO: only support platform, icon-label mode
    // 直接输入各平台的下载链接

    let [loaded, setLoaded] = useState(true);
    let [vdata, setVdata] = useState(null);

    useEffect(() => {
        setLoaded(false);
        let ver = new GithubVersionProvider(repo);
        ver.latestVersion()
            .then((v) => {
                setVdata(v);
            })
            .finally(() => setLoaded(true));
    }, []);

    if (
        !repo &&
        Object.keys(assets).length === 0 &&
        Object.keys(urls).length === 0
    ) {
        return <_nodata />;
    }

    return (
        <Flex
            spacing={2}
            flexWrap="wrap"
            w="100%"
            justify="center"
            {...props}
        >
            {supportPlatforms
                .filter((e) => !hiddenUnsupported || assets[e] || urls[e])
                .map((e, idx) => (
                    // <_withTooltip
                    //     key={`btn_${idx}`}
                    //     label={
                    //         null && !assets[e] && !urls[e]
                    //             ? unsuportedTooltip
                    //             : null
                    //     }
                    // >
                        <Flex p=".4em">
                            <Button
                                rounded={rounded ? "full" : null}
                                leftIcon={_icons[e]}
                                // variantColor={variantColor}
                                // variant={variant}
                                isLoading={!loaded}
                                isDisabled={!assets[e] && !urls[e]}
                                {...itemProps}
                                onClick={() => {
                                    let u = vdata && vdata.assets[e];
                                    u = u || assets[e] || urls[e];
                                    if (!u) {
                                        // alsert error
                                        return;
                                    }
                                    window.open(u, isExternal ? "" : "_self");
                                }}
                            >
                                <Text>
                                    {itemPrefix}
                                    {_labels[e]}
                                    {itemSuffix}
                                </Text>
                                {/* TODO: google play, apple store */}
                            </Button>
                        </Flex>
                    // </_withTooltip>
                )) || <_nodata />}
        </Flex>
    );
};

const _withTooltip = (props) => {
    return props.label ? <Tooltip {...props} /> : props.children;
};

export { DownloadButtons };

// Github Provider 加载最新版本的数据
class GithubVersionProvider {
    constructor(repo, options = {}) {
        let { base_api, assetRegexPatterns = {} } = options;
        this._base_api = base_api || this._base_api;
        this.assetRegexPatterns = assetRegexPatterns || this.assetRegexPatterns;
        this.repo = repo;

        if (!this.repo) throw "miss repo offered.";
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

        return res;
    }

    _parseMeta(note) {
        let m = RegExp(this._metaRegexp).exec(note);
        if (!m) return null; // match failed
        return yaml.safeLoad(m[1]);
    }

    async loadVersion() {
        if (!this._versions)
            return new Promise((resolve, reject) => resolve(this._versions));

        // TODO: order versions list
        // TODO: next page.

        return fetch(this._apiList())
            .then((res) => res.json())
            .then((data) => {
                this._versions = data
                    .map((e) => this._adapter(e))
                    .filter((i) => i);
                return this._versions;
            });
    }

    async latestVersion() {
        // parse from list
        return this.loadVersion().then((vs) => {
            let v;
            for (let i in vs) {
                let e = vs[i];
                if (!this.prerelease && e.prerelease) continue;
                v = e;
                break;
            }
            if (!v) return v;

            // 1. use regexp to get data date out. ```yaml version\n```,
            // 2. unmarshal use `yaml|json`,
            let meta = this._parseMeta(v.release_note);

            // remove the meta in note
            v.release_note = v.release_note.replaceAll(this._metaRegexp, "");

            if (meta === null) return v;

            v.meta = meta;

            // combine data to version information.
            if (meta.version) v.version = meta.version;
            meta.assets &&
                Object.keys(meta.assets).forEach((k) => {
                    let vv = meta.assets[k];
                    if (vv != null) v.assets[k] = vv;
                });
            meta.urls &&
                Object.keys(meta.urls).forEach((k) => {
                    let v = meta.urls[k];
                    if (v != null) v.urls[k] = v;
                });
            return v;
        });
    }
}

// VersionProvider
class VersionProvider {}
