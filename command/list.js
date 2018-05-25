'use strict'

const chalk = require('chalk')  // 改变输出文字的颜色

const template = require('../template/template');

const log = console.log
const info = console.info

module.exports = function () {
    info(chalk.green(JSON.stringify(template.tpl, null, 4)))
    process.exit()
}
