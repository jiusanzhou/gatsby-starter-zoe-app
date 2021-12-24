import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Flex, Heading, HStack, Link, Radio, RadioGroup, SimpleGrid, Tag, Text, useColorModeValue, useRadio, useRadioGroup, VStack } from "@chakra-ui/react"
import React from "react"
import { useState } from "react"
import ItemsView from "../components/itemsView"
import MLink from "../components/link"
import { useSiteMetadata } from "../utils/hooks"

const RadioCard = (props) => {

    const { primaryColor } = useSiteMetadata()

    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()
  
    return (
        //  borderWidth="1px" borderLeftWidth="0px"  _first={{ borderLeftWidth: '1px' }}
        <Box as="label">
            <input {...input} />
            <Box borderRadius="full" py="1" px="3" {...checkbox} cursor="pointer"
                transition="all 0.3s ease-out-in"
                _checked={{
                    bg: `${primaryColor}.600`,
                    color: "white",
                }} >
            {props.children}
            </Box>
        </Box>
    )
  }

const ProjectList = ({ items, preview, limit = 3, itemProps = {}, ...props }) => {
    // if preview mode, just return list directly
    const { primaryColor } = useSiteMetadata()

    const [ selected, setSelected ] = useState("")

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "language-filter",
        defaultValue: "",
        onChange: setSelected,
    })
    const group = getRootProps()

    // generate the language filter
    let languages = {"": 0} // "": for ALL
    items.forEach(({ language }) => {
        if (!languages[language]) languages[language] = 0
        languages[""]++
        languages[language]++
    })

    // build the section list
    return <Box {...props}>
        {/* if is not the preview mode, should show the filter */}
        {/* preview should has this filter??? */}
        {!preview && <Flex mb="5" justifyContent="center">
            <HStack overflow="auto" spacing="2" w="fit-content" p="2" {...group}
                bgColor={useColorModeValue(`gray.100`, `gray.700`)}  borderRadius="full">
                {(Object.keys(languages)).map(language => {
                    const radio = getRadioProps({ value: language })
                    return <RadioCard key={language} {...radio}>
                        {`${language||"All"}`}
                        {/*  (${languages[language]}) */}
                    </RadioCard>
                })}
            </HStack>
        </Flex>}

        {/* the main body, if not preview modd, should't slice(slice the length) */}
        <ItemsView items={items.slice(0, preview?limit:items.length)
            .filter(({ language }) => !selected||language === selected) // filter the language
            .map(item => ({
                ...item,
                title: item.name,
                href: item.homepage || item.html_url,
            }))} {...itemProps} />

        {/* preivew mode should show more button */}
        {preview&&<Flex mt="2rem" w="100%" justifyContent="center">
            {/* TODO: the link should calcute from config */}
            {/* <MLink display="inline-flex" alignItems="center" href="/projects">
                查看更多 <ArrowForwardIcon ml="1" />
            </MLink> */}

            <Button size="sm" as={MLink} href="/projects" pure
                rightIcon={<ArrowForwardIcon />} colorScheme={primaryColor} variant="outline">
                查看更多
            </Button>
        </Flex>}
    </Box>
}

export default ProjectList