module.exports = {

    themeConfig: {
        // navbar: false,  //使用 themeConfig.navbar 来禁用所有页面的导航栏 https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F%E9%93%BE%E6%8E%A5

        //https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F%E9%93%BE%E6%8E%A5
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },   //https://vuepress.vuejs.org/zh/guide/directory-structure.html#%E9%BB%98%E8%AE%A4%E7%9A%84%E9%A1%B5%E9%9D%A2%E8%B7%AF%E7%94%B1
          
          { text: 'Foo', link: '/foo/' },
          { text: 'Bar', link: '/bar/' },

          { text: 'External', link: 'https://bing.com' },

          { text: 'Guide1', link: '/guide/', target:'_blank' },
          { text: 'External1', link: 'https://bing.com', target:'_self', rel:'' },
          {
            text: 'Languages',
            ariaLabel: 'Language Menu',
            items: [
              { text: 'Chinese', link: '/language/chinese/' },
              { text: 'Japanese', link: '/language/japanese/' }
            ]
          },
          {
            text: 'Languages1',
            items: [
              { text: 'Group1', items: [
                { text: 'Chinese11', link: '/language/chinese/' },
                { text: 'Japanese11', link: '/language/japanese/' }                  
              ] },
              { text: 'Group2', items: [
                { text: 'Chinese12', link: '/language/chinese/' },
                { text: 'Japanese12', link: '/language/japanese/' }                        
              ] }
            ]
          }
        ],

        // https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F
        // sidebar: [
        //     '/',
        //     '/page-a',
        //     ['/page-b', 'Explicit link text'],
        //     '/guide/',
        //     '/language/chinese/',
        //     '/language/japanese/'
        //   ],
        // https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%B5%8C%E5%A5%97%E7%9A%84%E6%A0%87%E9%A2%98%E9%93%BE%E6%8E%A5
        sidebarDepth: 5,
        // https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E6%98%BE%E7%A4%BA%E6%89%80%E6%9C%89%E9%A1%B5%E9%9D%A2%E7%9A%84%E6%A0%87%E9%A2%98%E9%93%BE%E6%8E%A5
        displayAllHeaders: true, // 默认值：false

        // https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E6%B4%BB%E5%8A%A8%E7%9A%84%E6%A0%87%E9%A2%98%E9%93%BE%E6%8E%A5
        // activeHeaderLinks: false, // 默认值：true

        // https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%88%86%E7%BB%84
        // sidebar: [
        //     {
        //       title: 'Group 1',   // 必要的
        //       path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        //       collapsable: false, // 可选的, 默认值是 true,
        //       sidebarDepth: 1,    // 可选的, 默认值是 1
        //       children: [
        //         '/'
        //       ]
        //     },
        //     {
        //       title: 'Group 2',
        //       children: [ 
        //         '/language/chinese/',
        //         '/language/japanese/'
        //        ],
        //       initialOpenGroupIndex: -1 // 可选的, 默认值是 0
        //     }
        //   ],

        //   https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%A4%9A%E4%B8%AA%E4%BE%A7%E8%BE%B9%E6%A0%8F
        sidebar: {
            '/foo/': [
              '',     /* /foo/ */
              'one',  /* /foo/one.html */
              'two'   /* /foo/two.html */
            ],
      
            '/bar/': [
              '',      /* /bar/ */
              'three', /* /bar/three.html */
              'four'   /* /bar/four.html */
            ],
      
            // fallback
            '/': [
              '',        /* / */
              'contact', /* /contact.html */
              'about'    /* /about.html */
            ]
          },

        // https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E4%BE%A7%E6%A0%8F
        // sidebar: 'auto',
      },
      // https://vuepress.vuejs.org/zh/guide/markdown.html#%E8%A1%8C%E5%8F%B7
      markdown: {
        lineNumbers: true,
        // https://vuepress.vuejs.org/zh/guide/markdown.html#%E8%BF%9B%E9%98%B6%E9%85%8D%E7%BD%AE
        // markdown-it-anchor 的选项
        anchor: { permalink: false },
        // markdown-it-toc 的选项
        toc: { includeLevel: [1, 2,3,4,5,6] },
        extendMarkdown: md => {
          // 使用更多的 markdown-it 插件!
          // md.use(require('markdown-it-xxx'))
        }
      }     
}
