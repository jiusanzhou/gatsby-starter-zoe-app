import { Box, Button, Center, Flex, Heading, Link, Radio, RadioGroup, SimpleGrid, Tag, Text, useColorModeValue, useRadio, useRadioGroup, VStack } from "@chakra-ui/react"
import React from "react"
import { useState } from "react"
import ItemsView from "../components/itemsView"
import MLink from "../components/link"
import { useSiteMetadata } from "../utils/hooks"

const { primaryColor } = useSiteMetadata()

const RadioCard = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()
  
    return (
      <Box as="label" borderWidth="1px" borderLeftWidth="0px">
        <input {...input} />
        <Box px={5} py={3} {...checkbox} cursor="pointer"
            _checked={{
                bg: `${primaryColor}.600`,
                color: "white",
                borderColor: `${primaryColor}.600`,
            }} >
          {props.children}
        </Box>
      </Box>
    )
  }

const ProjectList = ({ items, preview, limit = 3, ...props }) => {
    // if preview mode, just return list directly

    const [ selected, setSelected ] = useState("")

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "language-filter",
        defaultValue: "",
        onChange: setSelected,
    })
    const group = getRootProps()

    // generate the language filter
    let languages = {"": true} // "": for ALL
    items.forEach(({ language }) => languages[language] = true)
    languages = Object.keys(languages)

    // build the section list
    return <Box {...props}>
        {/* if is not the preview mode, should show the filter */}
        {/* preview should has this filter??? */}
        {!preview && <Flex {...group} mb="5" flexWrap="wrap"
        _first={{ borderLeftWidth: '1px' }}>
            {languages.map(language => {
                const radio = getRadioProps({ value: language })
                return <RadioCard key={language} {...radio}>
                    {language||"全部"}
                </RadioCard>
            })}
        </Flex>}

        {/* the main body, if not preview modd, should't slice(slice the length) */}
        <ItemsView items={items.slice(0, preview?limit:items.length)
            .filter(({ language }) => !preview||!selected||language === selected) // filter the language
            .map(item => ({
                ...item,
                title: item.name,
                href: item.homepage || item.html_url,
            }))} />

        {/* preivew mode should show more button */}
        {preview&&<Flex mt="2rem" w="100%" justifyContent="center">
            {/* TODO: the link should calcute from config */}
            <MLink href="/projects">查看更多</MLink>
        </Flex>}
    </Box>
}

export default ProjectList