import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import {default as ProjectListWidget} from "../widgets/projects"

const ProjectsList = ({ preview, limit = 3, ...props }) => {
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

    return <ProjectListWidget mt="10" preview={preview} {...props}
        items={data.allRepoProject.nodes} />
}

export default ProjectsList