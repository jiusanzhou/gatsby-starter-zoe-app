import React, { useEffect, useState } from "react";

import yaml from "js-yaml";

import {
    AiOutlineApple,
    AiOutlineAndroid,
    AiOutlineWindows,
} from "react-icons/ai";

import { FaAppStore } from "react-icons/fa";
import { Box, Button, Flex, Text, Tooltip } from "@chakra-ui/core";

import { GithubVersionProvider } from "../helper/app-release"

const _icons = {
    android: <AiOutlineAndroid />,
    ios: <FaAppStore />,
    windows: <AiOutlineWindows />,
    macos: <AiOutlineApple />,
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
    assets = {},
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

    // colorScheme = "teal",
    // variant = "solid",

    ...props
}) => {
    // TODO: only support platform, icon-label mode
    // 直接输入各平台的下载链接

    let [loaded, setLoaded] = useState(true);
    let [vdata, setVdata] = useState(null);

    // query release first
    // const data = useStaticQuery(graphql`
    // query GithubRelease {
    //     github {
    //         repository(owner: ${owner}, name: ${reponame}) {
    //           releases(first: 10) {
    //             totalCount
    //             nodes {
    //               id
    //               publishedAt
    //               createdAt
    //               isDraft
    //               tagName
    //               author {
    //                 name
    //                 email
    //               }
    //               description
    //             }
    //             pageInfo {
    //               hasNextPage
    //             }
    //           }
    //           description
    //         }
    //       }
    // }`)
    // console.log("===>", data)

    useEffect(() => {
        setLoaded(false);

        // how to start as server build
        // if we are dynamic load
        let ver = new GithubVersionProvider(repo);
        ver.latestVersion()
            .then((v) => {
                setVdata(v);
            })
            .finally(() => setLoaded(true));
    }, [repo]);

    if (
        !repo &&
        Object.keys(assets).length === 0 &&
        Object.keys(urls).length === 0
    ) {
        return <_nodata />;
    }

    return (
        <Flex spacing={2} flexWrap="wrap" w="100%" justify="center" {...props}>
            {supportPlatforms
                .filter(
                    (e) =>
                        !hiddenUnsupported ||
                        assets[e] ||
                        urls[e] ||
                        (vdata && vdata.assets && vdata.assets[e])
                )
                .map((e, idx) => (
                    <Flex key={`_${idx}`} p=".4em">
                        <Button
                            rounded={rounded ? "full" : null}
                            leftIcon={_icons[e]}
                            // colorScheme={colorScheme}
                            // variant={variant}
                            isLoading={!loaded}
                            isDisabled={
                                !assets[e] &&
                                !urls[e] &&
                                !(vdata && vdata.assets[e])
                            }
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
                )) || <_nodata />}
        </Flex>
    );
};

export const _withTooltip = (props) => {
    return props.label ? <Tooltip {...props} /> : props.children;
};

export { DownloadButtons };