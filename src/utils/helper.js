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