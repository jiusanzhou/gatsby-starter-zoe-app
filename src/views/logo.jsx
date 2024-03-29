import { Flex } from "@chakra-ui/react";
import React from "react";

import Logo from "../components/logo";

import { useSiteMetadata } from "../utils/hooks";

const ViewLogo = ({ ...props }) => {
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

export default ViewLogo