import { Box } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import React from 'react';
import MSection from '../components/section';
import Layout from '../layouts';
import { HelpCategoriesList, HelpCenterHeader, HelpItemsList } from '../widgets/helpqa';

const HelpHome = ({ data, pageContext }) => {
    const items = data.allHelpQaItem.nodes
    const cates = data.allHelpQaCategory.nodes

    return <Layout title="帮助中心">
        <Box>
            <HelpCenterHeader />

            <MSection p="0">
                <HelpItemsList items={items} title="热门问题" />
                <HelpCategoriesList categories={cates} />
            </MSection>
        </Box>
    </Layout>
}

export default HelpHome;


// query hot(pinned) items
// query categories
export const query = graphql`
query {
    allHelpQaItem(
      sort: {fields: number, order: ASC}
      filter: {isPinned: {eq: true}}
    ) {
      nodes {
        id
        title
        isPinned
        number
      }
    }
    allHelpQaCategory {
      nodes {
        id
        name
        color
        description
        icon
      }
    }
  }
`