module.exports = {
    title: 'TosinJia\'s blog',
    description: "TosinJia个人网站",
    themeConfig:{
        nav: [
            { text: 'Home', link: '/' },
            {text: '搭建', items:[
                {text: '搭建', link:'/build/'},         // 以'/'结束，默认读取 README.md
            ]},
            {text: '软件架构', items:[
                {text: '相关技术', link:'/softwareArchitecture/relatedTechnology'}  // 可不写后缀 .md
            ]},
            {text:"bing", link:"https://www.bing.com/"},
        ],
        sidebar: 'auto',
        sideBarDepth: 6,
    },
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