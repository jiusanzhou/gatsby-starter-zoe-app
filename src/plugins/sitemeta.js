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

type SiteSiteMetadata implements Node {

    title: String!
    author: Author
    navs: [Nav]
    links: [Link]
    socials: Author
    releases: [Release]
    projects: [Project]
    helpqa: [Helpqa]
    comments: Comment

}`;

exports.typeData = typeData;