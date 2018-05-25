# td-tpl-cli [![npm package](https://img.shields.io/npm/v/td-tpl-cli.svg)](https://www.npmjs.com/package/td-tpl-cli)

A simple CLI for scaffolding td-tpl.

### Installation ###

Prerequisites: [Node.js](https://nodejs.org/en/) (>=6.x, 8.x preferred), npm version 3+ and [Git](https://git-scm.com/).

``` bash
$ npm install -g td-tpl-cli
```

### Usage ###

``` bash
$ td create <project-name> <tpl-type>

$ td check
```

Example:

``` bash
$ td create td-card-20180101 normal

$ td create td-card-20180101 video-once

$ td create td-card-20180101 video-multiple
```

``` bash
$ td check  // 输出已有模版的json信息

模版类型暂分为以下几种：
normal （基础项目）
video-once（单一视频）
video-multiple（多段视频）
pc-normal（pc-基本项目）

```
### License ###

[MIT](https://opensource.org/licenses/MIT)
