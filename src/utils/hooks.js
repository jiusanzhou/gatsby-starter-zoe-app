// this is a tick way to trigger HMR
import { graphql, useStaticQuery } from "gatsby";
const yaml = require("js-yaml");

const parseObject = (config) => {
  // TODO: only supported json parse???
  return yaml.safeLoad(config);
}

var zoe = null
// if add fields in config, should modify the fragment
const useSiteMetadata = () => {
  // if (!zoe) zoe = loadZoefile("../../zoe-site.yaml")
  // return zoe.siteMetadata

  // use the global cache
  if (zoe) return zoe;

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          ...SiteSiteMetadataFragment
        }
      }
    }

    fragment SiteSiteMetadataFragment on SiteSiteMetadata {
      baseContentDir
      basePathBlog
      basePathHelp
      description
      googleAnalyticsTrackingId
      lang
      version
      zoePlugins
      url
      title
      logo
      maxWidth
      pathPrefix
      primaryColor
      socials {
        email
        facebook
        github
        linkedin
        telegram
        twitter
      }
      copyright {
        from
        holder
        location
      }
      remoteImageUrlPatterns
      remoteImageNodes {
        type
        field
        patterns
      }
      releases {
        provider
        repo
      }
      projects {
        owners
        provider
        tag
      }
      navs {
        href
        title
        items {
          color
          description
          href
          title
        }
      }
      organization {
        logo
        name
        url
      }
      pageWrappers {
        match
        path
        component {
          type
        }
      }
      comments {
        categoryID
        provider
        repo
        repoID
        theme
      }
      links {
        category
        href
        title
      }
      author {
        avatar
        email
        facebook
        github
        homepage
        linkedin
        minibio
        name
        telegram
        twitter
        wechat
      }
      layouts {
        default
      }
    }
  `)

  const meta = data.site.siteMetadata

  // copy
  let res = { ...meta }

  // hard code to turn string to object
  res.layouts = {} // copy layouts, dont change the query cache
  Object.keys(meta.layouts).forEach(key => {
    res.layouts[key] = parseObject(meta.layouts[key])
  })

  // must use the global cache
  // because we had change the query cache
  // so query again `res.layouts` will be `object Object`
  zoe = res
  return res
}

export { useSiteMetadata }