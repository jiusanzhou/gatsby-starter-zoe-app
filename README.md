<div align="center">

# `zoe app`

Yeh! A easy way to manage your site or application stuff.

</div>

When I want to start a side project, I need to care about lots of things
which may not the real matter, but I have no choice to let them go, things
like:

- version release: release a new version of application
- change log: a landing page to preview change logs
- user agreement and privacy policy:
- a landing page:
- help documents:
- Q&A:
- some simple json pieces:
- media data: logo or banner or something else

I don't want to re copy and paste those code again and again. And I real have
no need to use a CMS. So I build this to help me to manage those boring things.

Hope your guys enjoy it!


---

### Usage

**Just care about your own content. No need to fork or clone this repository!**

1. Enter your content directory.

2. Run the command to build site:
    ```bash
    curl -sSL https://git.io/zoe-site | bash
    ```

Customize your site by creating a new configuration file,
which can be named `zoe-site.yaml` (or `zoe-site.toml`)

Checkout the default [zoe-site.yaml](zoe-site.yaml) for full fields.

### Advance

If you want to modify some components, you can fork and clone the code.

**1. Develop**

`yarn site dev`

**2. Build**

`yarn site build`
