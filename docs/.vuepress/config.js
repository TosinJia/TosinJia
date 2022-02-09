module.exports = {
    title: 'TosinJia\'s blog',
    description: "TosinJia个人网站",
    themeConfig:{
        nav: [
            { text: 'Home', link: '/' },
            {text: '搭建', items:[
                {text: '搭建', link:'/build/'},         // 以'/'结束，默认读取 README.md
                {text: '搭建2', link:'/build/README1'}, // 可不写后缀 .md
            ]},
            {text:"bing", link:"https://www.bing.com/"},
        ],
        sidebar: 'auto',
        sideBarDepth: 3,
    }
}