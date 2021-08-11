
import { Flex, Link, VStack } from "@chakra-ui/react"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import ProjectList from "../widgets/projects"
import MLink from "../components/link"


const ProjectsPreview = ({ preview = true, limit = 3, ...props }) => {
    const data = useStaticQuery(graphql`
query RepoProjects {
    allRepoProject(sort: { fields: updated_at, order: DESC }) {
        nodes {
            name
            description
            homepage
            html_url
            language
        }
    }
}`)

    return <VStack mt={[10, 10]} {...props}>
        <ProjectList items={data.allRepoProject.nodes.slice(0, limit)} />
        <Flex w="100%" justifyContent="flex-end">
            <MLink href="https://labs.zoe.im">
                查看更多
            </MLink>
        </Flex>
    </VStack>
}

export default ProjectsPreview