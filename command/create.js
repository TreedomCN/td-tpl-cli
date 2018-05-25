'use strict'

const ora = require('ora')  // load
const download = require('download-git-repo')  // 拉取github上的文件。
const chalk = require('chalk')  // 改变输出文字的颜色
// const exec = require('child_process').exec
const boxen = require('boxen')

const fs = require('fs')
const path = require('path')

const template = require('../template/template');

const log = console.log
const info = console.info

const getMsg = function (name) {

    let msg =
        `Run: \n`
        + `  ${chalk`{rgb(10, 100, 200) $ cd ${name}}`} 
        \n`
        + `  ${chalk`{rgb(10, 100, 200) $ npm install}`}
        \n`
        + `  ${chalk`{rgb(10, 100, 200) $ npm run dev}`}
        \n`
        +`Github: \n`
        + `  ${chalk`{rgb(10, 100, 200) Go to 'https://github.com/TreedomCN' create private repository}`} 
        \n`
        + `  ${chalk`{rgb(10, 100, 200) $ git init}`} 
        \n`
        + `  ${chalk`{rgb(10, 100, 200) $ git add .}`}
        \n`
        + `  ${chalk`{rgb(10, 100, 200) $ git commit -m 'init'}`}
        \n`
        + `  ${chalk`{rgb(10, 100, 200) $ git remote add origin project-repository-url}`}
        \n`
        + `  ${chalk`{rgb(10, 100, 200) $ git push origin master}`}`

    return msg;
}

module.exports = function (name, type) {

    let tpl_type = type === 'master' ? 'normal': type || 'normal',
        project_name = name;

    let tpl_type_object = template.tpl[tpl_type];

    // 没有模版直接跳出
    if (!tpl_type_object) {
        info('')
        info(chalk.red(`not find ${tpl_type} template !!!`))
        info('')
        process.exit()
    }

    // 建设中的模版直接下载基础模版
    if (!tpl_type_object['repository']) {
        info('')
        info(chalk.red(`${tpl_type} template 等待添加中 !!!`))
        info('')
        info(chalk.red(`正在帮你下载基本项目的template...`))
        tpl_type = 'normal'
        tpl_type_object = template.tpl['normal']
        // process.exit()
    }

    let gitPath = `${tpl_type_object['repository']}#${tpl_type_object['branch']}`
    info('')
    // log(gitPath)
    const spinner = ora('Downloading template from github...').start()
    download(gitPath, name, function (err) {
        if (!err) {
            spinner.clear()
            info('')
            spinner.succeed([`${chalk`{green 项目创建成功！可执行以下操作！}`} `])
            info(boxen(getMsg(project_name), {padding: 1, margin: 1, borderColor: 'yellow'}));

            // 修改项目的package的信息
            fs.readFile(`${process.cwd()}/${project_name}/package.json`, (err, data) => {
                if (!err) {
                    let _data = JSON.parse(data.toString())
                    _data.name = project_name
                    // _data.version = '1.0.0'
                    let str = JSON.stringify(_data, null, 4);
                    fs.writeFile(`${process.cwd()}/${project_name}/package.json`, str, function (err) {
                        if (err) {
                            info(err)
                        }
                        process.exit()
                    })
                } else {
                    info(err)
                    process.exit()
                }
            });
        } else {
            spinner.warn([`${chalk`{red 发生错误: ${err}}`} `])

            process.exit()
        }
    })
}
