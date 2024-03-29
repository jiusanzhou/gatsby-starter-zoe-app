module.exports = (themeOptions) => {
    const pathPrefix = themeOptions.pathPrefix || `/`
    const blogPath = themeOptions.blogPath || `/blog`
    const postsPath = themeOptions.postsPath || `content/posts`
    const postsPrefix = themeOptions.postsPrefix || `/`
    const pagesPath = themeOptions.pagesPath || `content/pages`
    const tagsPath = themeOptions.tagsPath || `/tags`
    const externalLinks = themeOptions.externalLinks || []
    const navigation = themeOptions.navigation || []
    const showLineNumbers = themeOptions.showLineNumbers !== false
    const showCopyButton = themeOptions.showCopyButton !== false
    const formatString = themeOptions.formatString || `DD.MM.YYYY`
    const mdx = typeof themeOptions.mdx === `undefined` ? true : themeOptions.mdx
    const sharp = typeof themeOptions.sharp === `undefined` ? true : themeOptions.sharp
  
    return {
      pathPrefix,
      blogPath,
      postsPath,
      postsPrefix,
      pagesPath,
      tagsPath,
      externalLinks,
      navigation,
      showLineNumbers,
      showCopyButton,
      formatString,
      mdx,
      sharp,
    }
  }
  