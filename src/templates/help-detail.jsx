import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts';
import { HelpCenterHeader, HelpItemDetail } from '../widgets/helpqa';

const HelpDetail = ({ data: { helpQaItem }, pageContext }) => {
    return <Layout title={`${helpQaItem.title} - 帮助中心`}>
        <HelpCenterHeader title={helpQaItem.title} textAlign="left" />
        <HelpItemDetail item={helpQaItem} />
    </Layout>
}

export default HelpDetail;

export const query = graphql`
query ($id: String!) {
    helpQaItem(id: { eq: $id }) {
        id
        title
        body
        createdAt
        isPinned
        number
    }
}
`