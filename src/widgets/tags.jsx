import { Box, Flex, HStack, Link, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react'
import React from 'react'
import MLink from '../components/link'
import { genColor } from '../styles/colors'

const Tags = ({ items = [], simple = false, counted = false, ...props }) => {
    return <Flex flexWrap="wrap" spaceing={4} {...props}>{items.map(({name, totalCount, slug}, idx) => (
    <Box pr="2" pb="4" key={idx}>
        <MLink pure href={`/blogs/tag/${slug}`}>
            <Tag borderRadius="full" colorScheme={simple?"gray":genColor(name.slice(0).charCodeAt())}>
                <TagLabel># {name} {counted?`(${totalCount})`:""}</TagLabel>
            </Tag>
        </MLink>
    </Box>))}</Flex>
}

export default Tags