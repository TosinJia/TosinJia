const nav = require('./themeConfig/nav');
const siderbar = require('./themeConfig/sidebar');

module.exports = {
    nav: nav,
    sidebar: 'auto',
    sidebar: siderbar,   
    // sidebar: 'structuring', // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
    sideBarDepth: 6, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    // sidebarHoverTriggerOpen: false, // 侧边栏自动隐藏
    // sidebarOpen: true, // 初始状态是否打开侧边栏，默认true
    
}