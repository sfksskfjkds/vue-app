
const title = 'vue项目实战'
const path = require('path')
// 获取绝对路径
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    devServer: {
        port: 9001
    },
    // webpack基础配置
    configureWebpack: {
        //设置页面标题
        name: title         
    },
    /*  
        webpack高级配置之链式配置,chainWebpack
        npm i svg-sprite-loader -D处理svg图标
        新增规则
    */
   chainWebpack(config) {
    /* 1.修改当前项目默认的svg配置,排除icons目录
        vue-cli提供了命令vue inspect可查看当前webpack所有配置,vue inspect --rules查看所有规则
        vue inspect --rule svg查看svg的配置规则,当前默认配置如下，当前需要在此配置里面排除svg目录excludes
        // config.module.rule('svg')
        {
            test: /\.(svg)(\?.*)?$/,
            use: [
                {
                loader: 'F:\\web-kaikeba\\plactise\\vue-app\\my-first-app\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                    name: 'img/[name].[hash:8].[ext]'
                }
                }
            ]
        }
    */
    //    所有的规则配置都是在config.module.rule下
   config.module.rule('svg')
        .exclude.add(resolve('./src/icons/svg'))
    /* 
        此时再查看配置发现加了个exclude项
        // config.module.rule('svg')
        {
            test: /\.(svg)(\?.*)?$/,

            exclude: [
            'F:\\web-kaikeba\\plactise\\vue-app\\my-first-app\\src\\icons\\svg'
            ],

            use: [
            {
                loader: 'F:\\web-kaikeba\\plactise\\vue-app\\my-first-app\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                name: 'img/[name].[hash:8].[ext]'
                }
            }
            ]
        }
    
    */

    // 2.新增一个规则icons，添加icons里面的svg文件
    config.module.rule('icons')
        .test(/\.svg$/)   //匹配以.svg结尾的文件{test:/\.svg$/}
        .include.add(resolve('./src/icons/svg'))
        /* 
            vue inspect --rule icons查看当前配置如下
            {
                test:/\.svg$/,
                include: [
                    'F:\\web-kaikeba\\plactise\\vue-app\\my-first-app\\src\\icons\\svg'
                ]
            } 
            添加完路径后，此时配置已经深入到数组里面了，再想给对象添加配置就需要用end()跳到上一层与test,include同层
        */
       .end()  // 回到上一层
       .use('svg-sprite-loader') //use项是一个数组，里面配置用到的loader,
       /* 
            vue inspect --rule icons查看当前配置如下
            {
                test:/\.svg$/,
                include: [
                    'F:\\web-kaikeba\\plactise\\vue-app\\my-first-app\\src\\icons\\svg'
                ],
                use: [
                    {}
                ]
            } 
        */
       .loader('svg-sprite-loader')
       /* 
            vue inspect --rule icons查看当前配置如下
            {
                test:/\.svg$/,
                include: [
                    'F:\\web-kaikeba\\plactise\\vue-app\\my-first-app\\src\\icons\\svg'
                ],
                use: [
                    {
                        loader: 'svg-sprite-loader'
                    }
                ]
            } 
            
       */
        //    对svg-sprite-loader配置选项symbolId，以icon-开头，后面动态加上项目里面的svg名称，比如icon-denglong
       .options({
           symbolId: 'icon-[name]' 
       })
       /* 
        vue inspect --rule icons查看当前配置如下
            {
                test:/\.svg$/,
                include: [
                    'F:\\web-kaikeba\\plactise\\vue-app\\my-first-app\\src\\icons\\svg'
                ],
                use: [
                    {
                        options: {
                            symbolId: 'icon-[name]'
                        }
                    }
                ]
            } 
       */
   }
    
}