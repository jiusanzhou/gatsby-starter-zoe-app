import { useStaticQuery, graphql } from 'gatsby'

// this is a tick way to trigger HMR
import zoefile from "../../zoe.yaml"

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
            menu {
              title
              href
              items {
                title
                href
              }
            }
            links {
              title
              items {
                title
                href
              }
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