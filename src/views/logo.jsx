import { Flex } from "@chakra-ui/core";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import Logo from "../components/logo";

import { useSiteMetadata } from "../utils/hooks";

export default ({ ...props }) => {
    const { title, logo } = useSiteMetadata();
    return (
        <Flex w="fit-content">
            <Logo name={title} img={logo} {...props} />
        </Flex>
    );
};
