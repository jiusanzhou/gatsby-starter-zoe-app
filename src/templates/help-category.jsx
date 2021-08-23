import { graphql } from 'gatsby';
import React from 'react';
import MSection from '../components/section';
import Layout from '../layouts';
import { HelpCenterHeader, HelpItemsList } from '../widgets/helpqa';

const HelpCategory = ({ data, pageContext: { name, description, icon, color } }) => {
    const items = data.allHelpQaItem.nodes
    return <Layout title={`${name} - 帮助中心`}>
        <HelpCenterHeader textAlign="left" title={name} description={description} />
        <MSection>
            <HelpItemsList title={name} items={items} />
        </MSection>
    </Layout>
}

export default HelpCategory;

export const query = graphql`
query ($id: String!){
    allHelpQaItem(
      sort: {fields: number, order: DESC}
      filter: {categories: {elemMatch: {id: { eq: $id }}}}
    ) {
      nodes {
        id
        title
        isPinned
        number
      }
    }
  }
`