<div align="center">

# `zoe app`

Yeh! A easy way to create your landing page.

</div>

## Why

When starting a side project, I have to take care of many auxiliary tasks
that may not seem critical but cannot be ignored, such as building a simple landing page or FAQ section.

I don’t want to repeatedly copy and paste the same code. And I really have
no need for a full CMS. So I built this to help me manage those mundane chores.

Hope you guys find this useful!

## Features

- **Simple**: You only need a single line of code to launch your product website.
- **Powerful**: It can be extended with many functional blocks, including FAQ, pricing, etc.
- **Multi-framework**: It supports React frameworks like Gatsby and Next.js.
- **Customizable**: You can easily customize your own unique theme through custom themes.

## Blocks

|Block|Description|Gatsby|NextJS|
|:--|:--|:--|:--|
|Release|Release a new version of application|✅|✅|
|Changelog|A landing page to preview change logs|✅|✅|
|Compliance|Compliance solutions for user agreement and privacy policy|✅|✅|
|Landing|A landing page to setup a simple site|✅|✅|
|Pricing|The pricing strategies to compare and guide|✅|✅|
|FAQ|Alist of questions and answers relating to a particular subject|✅|✅|
|Q&A|A help center|✅|✅|
|Docs|A document site|🚧|🚧|

*Welcome to submit PR to support more blocks!*

## Usage

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
