/**
 * The main/index function, things we should do:
 * - clone the zoe site theme (default: jiusanzhou/gatsby-starter-zoe-app) 
 *   as theme
 * - generate the zoe-site config list  (loadzoefile should implement load multi file)
 * - build: npm run install && npm run build
 * - copy [dist] to [target]
 * - commint to current branch or create a new branch
 */

const { execSync, spawn, spawnSync } = require("child_process");
const child_process = require("child_process");
const fs = require("fs");
const path = require("path");

const print = console.log;

// how to load yaml file

const defaultTempDir = "/tmp";
const defaultTheme = "jiusanzhou/gatsby-starter-zoe-app";
const defaultConfName = "zoe-site";
const defaultConfListFileName = "config-list.txt";

function get_git_root() {
    let c = process.cwd();
    while (c != "/" && !dir_exits(`${c}/.git`)) {
        // check has .git
        c = path.dirname(c);
    }

    if (c === "/") return null;

    return c;
}

function in_theme_dir(theme, gitRoot) {
    if (!gitRoot) return false;

    try {
        let data = fs.readFileSync(`${gitRoot}/.git/config`);
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
        execSync(`cd ${target} && git checkout . && git pull`);
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

function cmd_develop() {
    print("Run `yarn develop`")
    spawnSync("yarn", ["develop"], {
        detached: false,
        stdio: "inherit"
    })
}

function cmd_build(assetsDir) {

    // clean first
    execSync(`yarn clean`);

    print("Run `yarn build`");
    spawnSync("yarn", ["build"], {
        detached: false,
        stdio: "inherit"
    })

    print(`Build successfully! Files in ${assetsDir}`);
    // TODO: copy assets to target
}

function cmd_release(oldcwd, assetsDir, target) {
    print(`Release assets from ${assetsDir}`);
    // check if assets already has content
    if (!dir_exits(assetsDir)) {
        print("Assset directory not exits, make sure you have build it.");
        return;
    }

    // TODO:
    // static => just copy files
    // .@gh-pages => copy files and commit to branch
    // https://github.com/a/b@branch => copy files and commit to branch
    // publish to remote
}

function main() {
    print("Welcome `zoe site`!")

    // TODO: parse from args
    const contextDir = process.cwd(); // TODO: from args
    const confName = defaultConfName; // TODO: from args
    const theme = defaultTheme; // TODO: from args
    const confList = defaultConfListFileName; // TODO: from args
    const tmpdir = process.env.ZOE_TEMPDIR || defaultTempDir; // os.tmpdir();
    const assetsDir='public';

    // store current work directory
    const oldCwd = process.cwd();
    
    // git root directory
    const gitRoot = get_git_root();

    const inThemeDir = in_theme_dir(theme, gitRoot);

    if (inThemeDir) {
        print("In the theme directory. Recommand run `yarn [command]`");
    }

    // set workdir
    let workdir = gitRoot;

    const _assetsDir = path.join(workdir, assetsDir)

    // if out of theme directory, change workdir to tmp one 
    if (!inThemeDir) {
        workdir = `${tmpdir}/zoe-site/${theme.split('/').slice(-1)[0]}`;

        // clone theme to directory, make sure theme directory exists
        clone_theme(theme, workdir);
    }

    print("Work directory: " + workdir);

    // in the theme directory, means we are most likely development
    // don't generate config list if git root equals cwd
    if (!inThemeDir || oldCwd !== gitRoot) {
        // generate config list
        const confs = get_conffiles(contextDir, confName);
        // if (confs.length === 0) {
        //     print(`There are no config, make sure you have a ${confName}.[yaml|yml|toml|json] file`);
        //     return;
        // }

        // write confs relative path to theme directory .txt
        const _conflistfile = path.join(workdir, confList);
        print(`Generating config list into: ${_conflistfile}`);
        fs.writeFileSync(_conflistfile, confs.join("\n"));
    }

    // change directory
    print(`Change working directory: ${workdir}`)
    process.chdir(workdir);

    // ok let's do normal things

    print("Install depencences ...")
    execSync("npm install -g yarn")
    execSync(`yarn`)

    let cmd = "build";

    const args = process.argv.slice(2);
    if (args.length > 0) {
        cmd = args[0];
    }

    switch (cmd) {
        case "develop":
        case "dev":
            cmd_develop(...args.slice(1));
            break;
        case "build":
            cmd_build(_assetsDir, ...args.slice(1));
            break;
        case "release":
            cmd_release(oldCwd, _assetsDir, ...args.slice(1));
            break;
        default:
            print(`Unknown command: ${cmd}`);
    }
}

// start the main function
// develop
// build
main();