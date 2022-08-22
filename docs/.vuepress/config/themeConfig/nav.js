
module.exports =[
    { text: '首页', link: '/' },
    {text: '软件架构', items:[
        {text: '相关技术', link:'/softwareArchitecture/relatedTechnology'},  // 可不写后缀 .md
        {text: '开源框架', 
            items:[
                {text:'简介', link:'/softwareArchitecture/openSourceFramework/introduction'},
                {text:'前端框架', link:'/softwareArchitecture/openSourceFramework/fontEnd/'},
                {text:'RuoYi-Vue', link:'/softwareArchitecture/openSourceFramework/ruoyi/ruoyi-vue/'},
                {text:'RuoYi-Cloud', link:'/softwareArchitecture/openSourceFramework/ruoyi/ruoyi-cloud/'},
                
            ]
        },
    ]},
    {text: '工作流', items:[
        {text:'Activiti基础', link:'/softwareArchitecture/openSourceFramework/workflow/Activiti基础'},
        {text:'Activiti进阶', link:'/softwareArchitecture/openSourceFramework/workflow/Activiti进阶'},
        {text:'Activiti整合', link:'/softwareArchitecture/openSourceFramework/workflow/Activiti整合'},
    ]},
    {text: '教程', 
        items:[
            {text: 'Linux教程', link:"/tutorials/linuxTutorial"},
            {text: 'Maven教程', link:"/tutorials/maven"},
            {text: 'Git教程', link:"/tutorials/gitTutorial"},
            {text: 'Vue教程', link:"/tutorials/vueTutorial"},
            {text: 'Thymeleaf教程', link:"/tutorials/thymeleaf"},
            {text: 'Docker教程', link:"/tutorials/docker"},
            {text: '虚拟机', link:"/tutorials/virtualMachine"},
    ]},

    {text: '数据库', 
        items:[
            {text: '设计', 
                items:[
                    {text:'PowerDesigner', link:'/database/PowerDesigner'},
                    {text:'Oracle', link:'/database/oracle'},
                    {text:'MySQL', link:'/database/mysql'}
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