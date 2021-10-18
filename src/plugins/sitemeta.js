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

type SiteSiteMetadata implements Node {

    title: String!

    author: Author

    navs: [Nav]

}`;

exports.typeData = typeData;