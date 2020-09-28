import { useStaticQuery, graphql } from 'gatsby'

// this is a tick way to trigger HMR
import zoefile from "../../zoe-site.yaml"

const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
            title
            description
            url
            lang
            author {
              name
              minibio
              avatar
              email
            }
            logo {
              name
              img
            }
            socials {
              email
              facebook
              github
              telegram
              twitter
              linkedin
            }
            copyright {
              content
            }
        }
      }
    }
  `)

  site.siteMetadata._raw = zoefile

  return site.siteMetadata
}

const useAssets = () => {
  
}

export { useSiteMetadata }