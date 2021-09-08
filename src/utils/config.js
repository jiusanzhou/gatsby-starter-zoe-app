const fs = require("fs");
const yaml = require("js-yaml");
const toml = require("@iarna/toml");

// load config with extension: json yaml toml

exports.loadObject = (config) => {
    if (typeof config !== "string") return;
    let data = fs.readFileSync(config, "utf8");

    if (config.endsWith(".json")) {
        return json.parse(data);
    } else if (config.endsWith(".yaml") || config.endsWith(".yml")) {
        return yaml.safeLoad(data);
    } else if (config.endsWith(".toml")) {
        return toml.parse(data);
    }

    return;
}

exports.parseObject = (config) => {
    return yaml.safeLoad(config);
}

exports.isConfig = (config) => {
    return typeof config === "string" &&
        config.endsWith(".json")
        || config.endsWith(".yaml")
        || config.endsWith(".yml")
        || config.endsWith(".toml")
}