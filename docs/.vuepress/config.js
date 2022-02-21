const themeConfig = require('./config/themeConfig');

module.exports = {
    title: 'TosinJia',
    description: "TosinJia",
    port: 10001, //端口号    
    head: [
        // 引入自定义js
        ["script", {"language": "javascript", "type": "text/javascript", "src": "/js/pgmanor-self.js"}],
		[
			'link', {
				rel : 'icon',
				href : '/images/favicon.ico'
			}
		],       

    ],
    themeConfig: themeConfig,

    markdown:{
        toc:{includeLevel: [1,2,3,4,5,6]}
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