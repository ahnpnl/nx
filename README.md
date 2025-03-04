<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

<div align="center">

[![Build Status](https://travis-ci.org/nrwl/nx.svg?branch=master)](https://travis-ci.org/nrwl/nx)
[![License](https://img.shields.io/npm/l/@nrwl/workspace.svg?style=flat-square)]()
[![NPM Version](https://badge.fury.io/js/%40nrwl%2Fworkspace.svg)](https://www.npmjs.com/@nrwl/workspace)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)]()
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Join the chat at https://gitter.im/nrwl-nx/community](https://badges.gitter.im/nrwl-nx/community.svg)](https://gitter.im/nrwl-nx/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

</div>

<hr>

<p align="center">
  <a href="https://hubs.ly/H0hWwWd0" target="_blank">  
    <img 
         width="728"
         src="https://images.ctfassets.net/8eyogtwep6d2/4FZPkA6lK3IEwJFlmfB47/4b5fef4738d4b23c41007329fca37ad0/nrwl-connect-banner-with-shadow.png?w=1024"  
         alt="Nrwl Connect platform">
  </a>
</p>

<hr>

# What is Nx?

🔎 **Extensible Dev Tools for Monorepos.**

## Nx Helps You

### Use Modern Tools

Using Nx, you can add TypeScript, Cypress, Jest, Prettier, and Nest into your dev workflow. Nx sets up these tools and allows you to use them seamlessly. Nx fully integrates with the other modern tools you already use and love.

### Build Full-Stack Applications

With Nx, you can build full-stack applications using modern frameworks. You can share code between the frontend and the backend. And you can use the same `build/test/serve` commands throughout the whole dev experience.

### Develop like Google, Facebook, and Microsoft

With Nx, you can develop multiple full-stack applications holistically and share code between them all in the same workspace. Nx provides advanced tools which help you scale your enterprise development. Nx also helps enforce your organization’s standards and community best practices.

# Getting Started

## Creating an Nx Workspace

**Using `npx`**

```bash
npx create-nx-workspace myworkspace
```

**Using `npm init`**

```bash
npm init nx-workspace myworkspace
```

**Using `yarn create`**

```bash
yarn create nx-workspace myworkspace
```

If it's your first Nx project, the command will recommend you to install `@nrwl/cli` globally, so you can invoke `nx` directly without going through yarn or npm.

## Creating First Application

By default, an Nx workspace starts blank. There are no applications to build, serve, and test. To create one, you need to add capabilities to the workspace.

**To add a web components app, run:**

```bash
yarn add @nrwl/web
nx g @nrwl/web:app myapp # or just "nx g myapp"
```

```bash
npm install --save-dev @nrwl/web
nx g @nrwl/web:app myapp # or just "nx g myapp"
```

**To add an Angular app, run:**

```bash
yarn add @nrwl/angular
nx g @nrwl/angular:app myapp # or just "nx g myapp"
```

```bash
npm install --save-dev @nrwl/angular
nx g @nrwl/angular:app myapp # or just "nx g myapp"
```

**To add a React app, run:**

```bash
yarn add @nrwl/react
nx g @nrwl/react:app myapp # or just "nx g myapp"
```

```bash
npm install --save-dev @nrwl/react
nx g @nrwl/react:app myapp # or just "nx g myapp"
```

If `nx g` fails, use: `yarn nx g @nrwl/web:app myapp` or `npm run nx -- g @nrwl/web:app myapp`.

Regardless of what framework you chose, the resulting file tree will look like this:

```treeview
<workspace name>/
├── apps/
│   ├── myapp/
│   └── myapp-e2e/
├── libs/
├── tools/
├── nx.json
├── package.json
├── tsconfig.json
└── tslint.json
```

## Serving Application

- Run `nx serve myapp` to serve the newly generated application!
- Run `nx test myapp` to test it.
- Run `nx e2e myapp-e2e` to run e2e tests for it.

Angular users can also run `ng g/serve/test/e2e`.

You are good to go!

### Documentation

- [Nx Documentation and Guides](https://nx.dev)
- [Nx blog posts](https://blog.nrwl.io/nx/home)

### Books

- [Enterprise Monorepo Patterns](https://go.nrwl.io/angular-enterprise-monorepo-patterns-new-book?utm_campaign=Book%3A%20Monorepo%20Patterns%2C%20Jan%202019&utm_source=Github&utm_medium=Banner%20Ad)

### Videos

- [Nx Quickstart - How to Scale a JavaScript Project](https://www.youtube.com/watch?v=VUyBY72mwrQ)
- [Video course on using Nx Workspaces](https://angularplaybook.com/p/nx-workspaces)

### Talks

- [Angular at Large Organizations](https://www.youtube.com/watch?v=piQ0EZhtus0)
- [Nx: The New Way to Build Enterprise Angular Apps](https://www.youtube.com/watch?v=xo-1SDmvM8Y)
- [Supercharging the Angular CLI](https://www.youtube.com/watch?v=bMkKz8AedHc)
- [Hands on Full Stack development with Nx and Bazel](https://www.youtube.com/watch?v=1KDDIhcQORM)

## Misc

- [nx-examples](https://github.com/nrwl/nx-examples) repo has branches for different nx comments to display expected behavior and example app and libraries. Check out the branch (workspace, ngrx...) to see what gets created for you. More info on readme.
- [xplat - Cross-platform tools for Nx workspaces](https://nstudio.io/xplat/)

## Want to help?

If you want to file a bug or submit a PR, read up on our [guidelines for contributing](https://github.com/nrwl/nx/blob/master/CONTRIBUTING.md).

## Core Team

| Victor Savkin                                                          | Jason Jean                                                            | Benjamin Cabanes                                                            | Brandon Roberts                                                          | Wes Grimes                                                           |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| ![Victor Savkin](https://avatars1.githubusercontent.com/u/35996?s=150) | ![Jason Jean](https://avatars2.githubusercontent.com/u/8104246?s=150) | ![Benjamin Cabanes](https://avatars2.githubusercontent.com/u/3447705?s=150) | ![Brandon Roberts](https://avatars1.githubusercontent.com/u/42211?s=150) | ![Wes Grimes](https://avatars2.githubusercontent.com/u/324308?s=150) |
| [vsavkin](https://github.com/vsavkin)                                  | [FrozenPandaz](https://github.com/FrozenPandaz)                       | [bcabanes](https://github.com/bcabanes)                                     | [brandonroberts](https://github.com/brandonroberts)                      | [wesleygrimes](https://github.com/wesleygrimes)                      |
