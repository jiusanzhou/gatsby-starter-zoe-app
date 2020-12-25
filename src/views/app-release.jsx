import React, { useEffect, useState } from "react";

import {
    AiOutlineApple,
    AiOutlineAndroid,
    AiOutlineWindows,
} from "react-icons/ai";

import { FaAppStore } from "react-icons/fa";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/core";

import {
    GithubVersionProvider,
    GiteeVersionProvider,
} from "../helper/app-release";
import { useStaticQuery, graphql } from "gatsby";
import { useSiteMetadata } from "../utils/hooks";

const _icons = {
    android: <AiOutlineAndroid />,
    ios: <FaAppStore />,
    windows: <AiOutlineWindows />,
    macos: <AiOutlineApple />,
};

const _unsupportedTooltip = "It's under development...";

const _platforms = ["android", "ios", "windows", "macos"];

const _labels = {
    android: "Android",
    ios: "iOS",
    windows: "Windows",
    macos: "MacOS",
};

const _metaLabels = {
    updateAt: "Update at:",
    version: "Version:",
};

const _providers = {
    github: GithubVersionProvider,
    gitee: GiteeVersionProvider,
};

const _nodata = ({ message }) => {
    return (
        <Box bg="tomato" px="1em" py=".5em">
            <Text color="white">There is no any release.</Text>
            {message && <Text color="white">{message}</Text>}
        </Box>
    );
};

const DownloadButtons = ({
    repo,
    assets = {},
    urls = {},

    // dynamic load versions data
    dynamic = false,
    // versions data provider
    provider = "github",

    hiddenUnsupported = true,
    icons = {},
    labels = {},
    rounded = true,
    itemProps = {},

    disableLabel = false,
    isExternal = true,

    supportPlatforms = _platforms,
    unsuportedTooltip = _unsupportedTooltip,

    itemPrefix,
    itemSuffix,

    metaLabels = {},

    colorScheme,

    ...props
}) => {
    // TODO: only support platform, icon-label mode
    // 直接输入各平台的下载链接

    let [loaded, setLoaded] = useState(true);
    let [vdata, setVdata] = useState(null);

    // query release first
    // TODO: change this to VersionRelease use provider to filter the github/gitee
    const data = useStaticQuery(graphql`
        query VersionRelease {
            allVersionRelease {
                nodes {
                    id
                    repo
                    title
                    version
                    created_at
                    prerelease
                    published_at
                    release_note
                    assets {
                        android
                    }
                }
            }
        }
    `);

    useEffect(() => {
        setLoaded(false);

        // how to start as server build
        // if we are dynamic load
        // TODO: provider can be a class
        let ver = new _providers[provider](repo, {
            versions: dynamic
                ? null
                : data.allVersionRelease.nodes.filter(
                      (e) => e.repo === repo && e.provider === provider
                  ),
        });
        ver.latestVersion()
            .then((v) => {
                setVdata(v);
            })
            .finally(() => setLoaded(true));
    }, [repo, data, dynamic, provider]);

    const { primaryColor } = useSiteMetadata();

    if (!_providers[provider]) {
        return <_nodata message={"Unknown provider: " + provider} />;
    }

    if (
        !repo &&
        Object.keys(assets).length === 0 &&
        Object.keys(urls).length === 0
    ) {
        return <_nodata />;
    }

    return (
        <Flex flexWrap="wrap" w="100%" justify="center" {...props}>
            {supportPlatforms
                .filter(
                    (e) =>
                        !hiddenUnsupported ||
                        assets[e] ||
                        urls[e] ||
                        (vdata && vdata.assets && vdata.assets[e])
                )
                .map((e, idx) => (
                    <Flex
                        key={`_${idx}`}
                        p=".4em"
                        flexDir="column"
                        alignItems="center"
                    >
                        <Button
                            rounded={rounded ? "full" : null}
                            leftIcon={_icons[e]}
                            // variant={variant}
                            isLoading={!loaded}
                            isDisabled={
                                !assets[e] &&
                                !urls[e] &&
                                !(vdata && vdata.assets[e])
                            }
                            // variant="outline"
                            colorScheme={primaryColor}
                            {...itemProps}
                            onClick={() => {
                                let u = vdata && vdata.assets[e];
                                u = u || assets[e] || urls[e];
                                if (!u) {
                                    // alsert error
                                    return;
                                }
                                u =
                                    u.indexOf("?") > 0
                                        ? u + "&_=" + Date.now()
                                        : u + "?_=" + Date.now();
                                window.open(u, isExternal ? "" : "_self");
                            }}
                        >
                            <Text>
                                {itemPrefix}
                                {!disableLabel && (labels[e] || _labels[e])}
                                {itemSuffix}
                            </Text>
                            {/* TODO: google play, apple store */}
                        </Button>
                        <SimpleGrid mt=".8rem" rows="2">
                            <Text opacity=".5">
                                {metaLabels["version"] ||
                                    _metaLabels["version"]}{" "}
                                {vdata.version}
                            </Text>
                            <Text opacity=".5">
                                {metaLabels["updateAt"] ||
                                    _metaLabels["updateAt"]}{" "}
                                {vdata.published_at}
                            </Text>
                        </SimpleGrid>
                    </Flex>
                )) || <_nodata />}
        </Flex>
    );
};

const AppRelease = (props) => {
    return <DownloadButtons {...props} />;
};

export default AppRelease;
