import { graphql } from "gatsby";
import React from "react";
import MSection from "../components/section";
import Layout from "../layouts";
import Tags from "../widgets/tags";

const TagList = ({ data }) => {
    const tags = data.allMdxPost.group

    return <Layout title="文章标签">
      <MSection minH="calc(100vh - 20rem)" justifyContent="" textAlign="left"
      title="标签" description={`共有 ${tags.length} 个标签`}>
        <Tags mt="2" items={tags.map((tag) => ({
          ...tag,
          name: tag.fieldValue,
        }))} counted />
      </MSection>
    </Layout>
}

export default TagList

export const query = graphql`
query {
  allMdxPost(sort: { fields: tags___name, order: DESC }) {
    group(field: tags___name) {
      fieldValue
      totalCount
    }
  }
}`