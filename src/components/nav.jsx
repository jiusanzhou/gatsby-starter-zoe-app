import { SmallCloseIcon, HamburgerIcon, TriangleDownIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, Heading, Icon, IconButton, Link, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, SimpleGrid, Text, useColorMode, useColorModeValue, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

import { colors } from "../styles/colors";
import MLink from "./link";

// no need to handle with recuive,
// because we only handle 2 level

const PCNav = ({ navs = [], ...props }) => {
    // responsive return
    const { colorMode } = useColorMode()
    return <Flex {...props}>
        {navs.map(({ title, href, items }, index) => {
            return (!items || items.length === 0) ?
                // just return link or text
                <Flex fontWeight="bold" mx=".6rem" key={index}>
                    {href
                    ? <MLink pure href={href} _hover={{}}>{title}</MLink>
                    : <Text>{title}</Text>}
                </Flex>
            : <Flex mx=".6rem" key={index}>
                <Popover trigger="hover">
                    <PopoverTrigger>
                        <Flex fontWeight="bold" role="group" alignItems="center">
                            {href
                                ? <MLink pure href={href} _hover={{}}>{title}</MLink>
                                : <Text>{title}</Text>}
                            <Icon as={ChevronDownIcon} ml=".2rem"
                                _groupHover={{
                                    transform: "rotate( -180deg )",
                                    transition: "all 0.2s ease-out"
                                }} />
                        </Flex>
                    </PopoverTrigger>

                    {/* TODO: use size lg */}
                    <PopoverContent style={{width: "var(--chakra-sizes-lg)"}}>
                        <PopoverArrow />
                        <PopoverBody style={{width: "var(--chakra-sizes-lg)"}}>
                            <SimpleGrid columns={2} spacing={4}>
                                {items.map(({title, description, href, icon, color}, index) => <Flex key={index}>
                                    <MLink pure href={href} _hover={{textDecoration: "none"}} w="100%">
                                        <Flex w="100%"
                                            key={index}
                                            p="2" borderRadius=".5rem"
                                            transition="all .3s ease-in-out"
                                            _hover={{bg: `${color||colors[index%colors.length]||'gray'}.${colorMode === "light" ? "100" : "700"}`}}>
                                            <Avatar mr=".5rem" size="xs" src={icon} name={title} />
                                            <Box>
                                                <Text fontSize="1rem" fontWeight="bold">{title}</Text>
                                                <Text fontSize=".8rem" color={useColorModeValue("gray.700", "gray.200")}>{description}</Text>
                                            </Box>
                                        </Flex>
                                    </MLink>
                                </Flex>)}
                            </SimpleGrid>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Flex>
        })}
    </Flex>
}

const SMNav = ({ navs = [], ...props }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    return <Popover trigger="click" onOpen={toggle} onClose={toggle} {...props}>
        <PopoverTrigger>
            <IconButton
                borderRadius="full"
                display={props.display}
                transition="all .3s ease-in-out"
                icon={isOpen?<SmallCloseIcon />:<HamburgerIcon />} />
        </PopoverTrigger>
        <PopoverContent display={props.display} h="100vh" sx={{ width: "100vw", overflow: "auto"}}>
            <PopoverBody>
                <VStack my="5" alignItems="flex-start" spacing={5}>
                    {navs.map(({ title, href, items }, index) => {
                        return (!items || items.length === 0) ?
                            // just return link or text
                            <Flex fontWeight="bold" mx=".6rem" key={index}>
                                {href
                                ? <MLink pure href={href} _hover={{}}>{title}</MLink>
                                : <Text>{title}</Text>}
                            </Flex>
                        : <Flex mx=".6rem" key={index} flexDir="column">
                            <Flex fontWeight="bold">
                                {href
                                    ? <MLink pure href={href} _hover={{}}>{title}</MLink>
                                    : <Text>{title}</Text>}
                            </Flex>
                            <VStack mt="1rem" ml="1rem" alignItems="flex-start">
                                {items.map(({title, description, href, icon, color}, index) => <Flex key={index}>
                                    <Avatar mr=".5rem" size="xs" src={icon} name={title} />
                                    <Text fontSize=".875rem">{title}</Text>
                                </Flex>)}
                            </VStack>
                        </Flex>
                    })}
                </VStack>
            </PopoverBody>
        </PopoverContent>
    </Popover>
}

const Nav = (props) => {
    return <Flex alignItems="center" mr="1rem">
        <PCNav display={["none", "none", "none", "flex"]} {...props} />
        <SMNav display={["flex", "flex", "flex", "none"]} {...props} />
    </Flex>
}

export default Nav;