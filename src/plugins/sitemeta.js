// create siteMeta scheme

const typeData = `
type Author {
    name: String!
    email: String
    homepage: String
    avatar: String
    minibio: String
    github: String
    twitter: String
    facebook: String
    telegram: String
    linkedin: String
    wechat: String
}

type Nav {
    title: String
    color: String
    href: String
    description: String
    items: [Nav]
}

type Link {
    title: String
    category: String
    href: String
}

type Release {
    provider: String
    repo: String!
}

type Project {
    provider: String
    tag: String
    owners: [String]
}

type Helpqa {
    provider: String
    repo: String
    labelPrefix: String
}

type Comment {
    provider: String
    repo: String
    repoID: String
    category: String
    categoryID: String
    theme: String
}

type Organization {
    name: String
    url: String
    logo: String
}

type Copyright {
    from: String
    holder: String
    location: String
}

type Component {
    type: String
}

type PageWrappers {
    match: String
    path: String
    component: Component
}

type Layouts {
    default: String
}

type SiteSiteMetadata implements Node {

    url: String
    title: String!
    description: String
    logo: String
    lang: String
    version: String

    author: Author
    organization: Organization
    socials: Author
    navs: [Nav]
    links: [Link]
    copyright: Copyright

    releases: [Release]
    projects: [Project]
    helpqa: [Helpqa]
    comments: Comment

    baseContentDir: [String]
    basePathBlog: String
    basePathHelp: String
    pathPrefix: String

    googleAnalyticsTrackingId: String

    primaryColor: String
    maxWidth: [String]
    layouts: Layouts
    pageWrappers: PageWrappers

    zoePlugins: [String]
}`;

exports.typeData = typeData;