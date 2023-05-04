import { Box, Flex, HStack, Link, Tag, TagLabel, TagLeftIcon, Wrap, WrapItem } from '@chakra-ui/react'
import kebabCase from 'lodash.kebabcase'
import React from 'react'
import MLink from '../components/link'
import { genColor } from '../styles/colors'

const Tags = ({ items = [], simple = false, counted = false, ...props }) => {
    return <Wrap spacing={4} {...props}>{(items||[]).map(({name, totalCount}, idx) => (
        <WrapItem key={idx}>
            <MLink pure href={`/blogs/tag/${kebabCase(name)}`}>
                <Tag borderRadius="full" colorScheme={simple?"gray":genColor(name.slice(0).charCodeAt())}>
                    <TagLabel># {name} {counted?`(${totalCount})`:""}</TagLabel>
                </Tag>
            </MLink>
        </WrapItem>))}
    </Wrap>
}

export default Tags