// 自动化导入svg文件
// webpack创建一个以svg目录为上下文的require函数  导入svg目录下以.svg结尾的文件
const req = require.context('./svg', false, /\.svg$/)

// req函数的keys方法会获取所有svg文件,如["./denglong.svg", "./yuanxiao.svg"]
req.keys()
// map方法再遍历每个文件依次执行req函数完成导入
    .map(req)

// 全局注册SvgIcon组件
import Vue from 'vue'
import SvgIcon from "@/components/SvgIcon"

Vue.component('svg-icon', SvgIcon)