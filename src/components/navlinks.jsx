import { Box, Link, List, ListItem, Text } from "@chakra-ui/core";
import React from "react";
import { Link as GatsbyLink } from "gatsby"

export default ({ links = [] }) => {
    // merge links with catetory
    let blocks = {};
    links.forEach((e) => {
        if (!blocks[e.category]) blocks[e.category||''] = [];
        blocks[e.category||''].push(e);
    });

    // TODO: calc the count of blocks, if only '', split to

    return Object.keys(blocks).map((c) => (
        <Box key={`_${c}`}>
            {c && (
                <Text fontWeight="600" mb="1rem" fontSize="md">
                    {c}
                </Text>
            )}
            <List>
                {blocks[c].map((i) => (
                    <ListItem mt=".5rem" key={`_${i.title}`}>
                        <Link as={GatsbyLink} to={i.href}>{i.title}</Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    ));
};
