import React from "react";

import { Box, SimpleGrid } from "@chakra-ui/core";

import { useSiteMetadata } from "../../utils/hooks";
import { Socials } from "../../components/socials";
import Logo from "../../views/logo";
import GoTop from "../../components/gotop";
import Navlinks from "../../components/navlinks";
import Copyright from "../../components/copyright";

const Footer = ({
    children,
    disableBorder,
    disableGotop,
    disableLogo,
    disableSocials,
    disableLinks,
    logoProps = {},
    ...props
}) => {
    const {
        copyright,
        primaryColor,
        author,
        links = [],
        socials = {},
    } = useSiteMetadata();
    return (
        <Box
            w="100%"
            borderTopStyle="solid"
            borderTopWidth={!disableBorder ? "1px" : "0"}
        >
            <Box
                left="0"
                right="0"
                top="0"
                px={["1em", "0", "0", "0"]}
                pt="2rem"
                pb="1rem"
                margin="0 auto"
                position="relative"
                borderTopStyle="solid"
                {...props}
            >
                {/* back to top button */}
                {!disableGotop && <GoTop colorScheme={primaryColor} />}

                {/* extend section */}
                {children}

                {/* footer main section */}
                {/* TODO: use links to section generate grid layout */}
                <SimpleGrid
                    w="100%"
                    mt={[".5rem", ".7rem", ".7rem", "1rem"]}
                    columns={[1, 1, 3, 4]}
                    spacing="1rem"
                >
                    <Box>
                        {/* logo */}
                        {!disableLogo && <Logo expend={true} {...logoProps} />}
                        {/* social links */}
                        {!disableSocials && <Socials mt="1rem" socials={socials} />}
                    </Box>

                    {/* nav links */}
                    {!disableLinks && <Navlinks links={links} />}
                </SimpleGrid>

                {/* copyright */}
                <Copyright
                    flexWrap="wrap"
                    mt="2rem"
                    copyright={copyright}
                    author={author}
                />
            </Box>
        </Box>
    );
};

Footer.propTypes = {};

export default Footer;
