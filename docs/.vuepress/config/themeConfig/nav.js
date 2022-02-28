
module.exports =[
    { text: '首页', link: '/' },
    {text: '软件架构', items:[
        {text: '相关技术', link:'/softwareArchitecture/relatedTechnology'},  // 可不写后缀 .md
        {text: '开源框架', 
            items:[
                {text:'简介', link:'/softwareArchitecture/openSourceFramework/introduction'},
                {text:'RuoYi-Vue', link:'/softwareArchitecture/openSourceFramework/ruoyi/ruoyi-vue/'},
            ]
        },
    ]},
    {text: '教程', 
        items:[
            {text: 'Git教程', link:"/tutorials/gitTutorial"},
            {text: 'Linux教程', link:"/tutorials/linuxTutorial"},
            {text: 'Vue教程', link:"/tutorials/vueTutorial"},
    ]},
    {text: '数据库', 
        items:[
            {text: '设计', 
                items:[
                    {text:'PowerDesigner', link:'/database/PowerDesigner'},
                    {text:'Oracle', link:'/database/oracle'}
                ]
            }
        ],
    },
    {text: '搭建', items:[
        {text: '站点搭建', link:'/build/'},         // 以'/'结束，默认读取 README.md
        {text: '三方Markdown', link:'/build/thirdPartyMd'},
    ]},    
    {text:"bing", link:"https://www.bing.com/"},
]