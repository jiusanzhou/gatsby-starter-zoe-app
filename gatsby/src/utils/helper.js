exports.mdxResolverPassthrough = (fieldName) => async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`);
    const mdxNode = context.nodeModel.getNodeById({
      id: source.parent,
    });
    const resolver = type.getFields()[fieldName].resolve;
    const result = await resolver(mdxNode, args, context, {
      fieldName,
    });
    return source[fieldName] || result;
}

exports.purePath = (a) => a.replace(/\/\/+/g, "/")

exports.normalizePlugins = (plugins = [], baseDir = "src/plugins") => {
  return plugins.map(p =>  p.indexOf("/") < 0 ? `${baseDir}/${p}` : p)
}

exports.bgColorFromPrimary = (color) => {
  if (color === "black" || color === "white") {
    return [`gray.400`, `gray.400`]
  } else {
    return [`${color}.200`, `${color}.700`]
  }
}