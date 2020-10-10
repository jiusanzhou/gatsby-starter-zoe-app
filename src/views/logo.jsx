import { Flex } from "@chakra-ui/core";
import React from "react";

import Logo from "../components/logo";

import { useSiteMetadata } from "../utils/hooks";

export default ({ ...props }) => {
    const { title, logo, version, description, primaryColor } = useSiteMetadata();
    return (
        <Flex w="fit-content">
            <Logo
                name={title}
                description={description}
                img={logo}
                sup={version}
                colorScheme={primaryColor}
                {...props}
            />
        </Flex>
    );
};
