import * as CONSTANTS from '../constant/index.js'

export default {
    install: (app, options) => {
        app.provide('CONSTANTS', CONSTANTS);
        console.log("全局常量插件已安装")
    },
}
