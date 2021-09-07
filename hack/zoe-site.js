/**
 * The main/index function, things we should do:
 * - clone the zoe site theme (default: jiusanzhou/gatsby-starter-zoe-app) 
 *   as theme
 * - generate the zoe-site config list  (loadzoefile should implement load multi file)
 * - build: npm run install && npm run build
 * - copy [dist] to [target]
 * - commint to current branch or create a new branch
 */

const { execSync } = require("child_process");
const os = require('os');
const fs = require("fs");
const path = require("path");

const print = console.log;

// how to load yaml file

const defaultTheme = "jiusanzhou/gatsby-starter-zoe-app";
const defaultConfName = "zoe-site";
const defaultConfListFileName = "config-list.txt";

function in_theme_dir(theme) {
    try {
        let data = fs.readFileSync(".git/config");
        return data.toString().indexOf(theme) > 0;
    } catch (e){
        return false;
    }
}

const _supportedConfExt = ["yaml", "yml", "toml", "json"]
function get_conffiles(contextDir, name) {
    // has zoe-site config in current working directory
    const ns = [path.join(contextDir, name)]
        .concat(_supportedConfExt.map(
            (i) => `${path.join(contextDir, name)}.${i}`
        ))
    let cs = [];
    for (let i=0; i<ns.length; i++) {
        try {
            if (fs.existsSync(`${ns[i]}`)) cs.push(ns[i]);
        } catch (e) {}
    }

    return cs;
}

function dir_exits(dir) {
    try {
        return fs.existsSync(dir)
    } catch(e) {
        return false;
    }
}

// clone theme repo to target directory
function clone_theme(theme, target) {
    if (dir_exits(target)) {
        // git pull, TODO: handle the branch and checkout changes
        print("Update theme from remote: git pull");
        execSync(`cd ${target} && git pull`);
        return
    }

    // https://github.com/jiusanzhou/gatsby-starter-zoe-app => ${theme}
    // github.com/jiusanzhou/gatsby-starter-zoe-app => https://${theme}
    // jiusanzhou/gatsby-starter-zoe-app => https://github.com/${theme}
    // gatsby-starter-zoe-app=>https://github.com/jiusanzhou/${theme}
    if (theme.indexOf("://") < 0) {
        switch (theme.split("/").length) {
        case 1: theme = `https://github.com/jiusanzhou/${theme}`; break;
        case 2: theme = `https://github.com/${theme}`; break;
        case 3: theme = `https://${theme}`; break;
        }
    }
    
    // if $target already exits, just pull
    // git clone ${theme} ${target}
    print(`Clone repo to local: git clone ${theme} ${target}`)
    execSync(`git clone ${theme} ${target}`)
}

function main() {
    print("Welcome `zoe site`!")

    const contextDir = process.cwd(); // . ???
    const confName = defaultConfName;
    const theme = defaultTheme
    const confList = defaultConfListFileName;

    const confs = get_conffiles(contextDir, confName);
    if (confs.length === 0) {
        print(`There are no config, make sure you have a ${confName}.[yaml|yml|toml|json] file`);
        return;
    }

    if (in_theme_dir(theme)) {
        print("In the theme directory. Just run `yarn [command]`");
        return;
    }

    const tmpdir = "/tmp" // os.tmpdir()
    const workdir = `${tmpdir}/zoe-site/${theme.split('/').slice(-1)[0]}`;

    print("Work directory: " + workdir);

    // clone theme to directory, make sure theme directory exists
    clone_theme(theme, workdir);

    // write confs relative path to theme directory .txt
    const _conflistfile = path.join(workdir, confList);
    print(`Generating config list into: ${_conflistfile}`);
    fs.writeFileSync(_conflistfile, confs.join("\n"));

    // change directory
    print(`Change working directory: ${workdir}`)
    process.chdir(workdir);

    // ok let's do normal things

    print("Install depencences ...")
    execSync(`yarn`)

    print("Start ...")
    // execSync(`yarn `)
}

// start the main function
// develop
// build
main();