import { useStaticQuery, graphql } from 'gatsby'

// this is a tick way to trigger HMR
import zoefile from "../../zoe-site.yaml"

const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  site.siteMetadata._raw = zoefile

  return zoefile
}

const useAssets = () => {
  
}

export { useSiteMetadata }