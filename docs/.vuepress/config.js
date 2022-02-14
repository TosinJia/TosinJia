module.exports = {
    title: 'TosinJia\'s blog',
    description: "TosinJia个人网站",
    themeConfig:{
        nav: [
            { text: '首页', link: '/' },
            {text: '搭建', items:[
                {text: '搭建', link:'/build/'},         // 以'/'结束，默认读取 README.md
                {text: '三方Markdown', link:'/build/thirdPartyMd'},
            ]},
            {text: '软件架构', items:[
                {text: '相关技术', link:'/softwareArchitecture/relatedTechnology'},  // 可不写后缀 .md
                {text: '开源框架', link:'/softwareArchitecture/openSourceFramework'},
                {text: 'Git教程', link:"/softwareArchitecture/gitTutorial"},
                {text: 'Linux教程', link:"/softwareArchitecture/linuxTutorial"},
            ]},
            {text:"bing", link:"https://www.bing.com/"},
        ],
        // sidebar: 'auto',
        sidebar:{
          '/softwareArchitecture/': [
            'relatedTechnology',
            'openSourceFramework',
            ['gitTutorial','Git教程'],
            'linuxTutorial'
          ],
        },        
        sideBarDepth: 6,
        
    },

    markdown:{
        toc:{includeLevel: [1,2,3,4,5,6]}
    },
    head: [
        // 引入自定义js
        ["script", {"language": "javascript", "type": "text/javascript", "src": "/js/pgmanor-self.js"}]
    ],
    plugins: [
        [
            'fulltext-search',
        ],[
            'md-enhance',{
                // 启用下角标功能
                sub: true,
                // 启用上角标
                sup: true,
            }
        ]

    ],
}