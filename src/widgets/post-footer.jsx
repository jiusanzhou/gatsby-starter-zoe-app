import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import MLink from '../components/link'
import { purePath } from '../utils/helper'

const PostFooter = ({ basePathBlog, next, previous, ...props }) => {
    return <Box>
        {/* TODO: author and license */}

        {/* next previous nav */}
        <Flex flexWrap="wrap" justifyContent="space-between">
            <Flex alignItems="center">
                {previous?<>
                <ArrowBackIcon mr=".5rem" />,
                <MLink fontWeight="bold" pure href={purePath(`${basePathBlog}/${previous.slug}`)}>
                    {previous.title}
                </MLink>
                </>:null}
            </Flex>

            <Flex alignItems="center">
                {next?<>
                <MLink fontWeight="bold" pure href={purePath(`${basePathBlog}/${next.slug}`)}>
                    {next.title}
                </MLink>,
                <ArrowForwardIcon ml=".5rem" />
                </>:null}
                
            </Flex>
        </Flex>

        <Divider my="2rem" />
    </Box>
}

export default PostFooter