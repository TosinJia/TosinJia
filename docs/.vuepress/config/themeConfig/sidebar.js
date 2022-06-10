module.exports = {


    '/softwareArchitecture/openSourceFramework/ruoyi/ruoyi-cloud-ow/' : [{
        title : '文档',
        collapsable : false,
        children : [
          '',
          'document/kslj',
          'document/hjbs',
          'document/xmjs',
          'document/htsc',
          'document/qdsc',
          'document/zjwd',
          'document/xmkz',
          'document/spjc',
          'document/gxrz'
        ]
      }, {
        title : '微服务',
        collapsable : false,
        children : [
          'cloud/gateway',
          'cloud/auth',
          'cloud/nacos',
          'cloud/config',
          'cloud/feign',
          'cloud/monitor',
          'cloud/swagger',
          'cloud/skywalking',
          'cloud/sentinel',
          'cloud/file',
          'cloud/seata',
          'cloud/elk',
          'cloud/dokcer'
        ]
      }, {
        title : '其它',
        collapsable : false,
        children : [
          'other/faq',
          'other/donate'
        ]
      }
    ],

      '/softwareArchitecture/': [
      {
        title:'相关技术',
        collapsable: false,
        children:[
          'relatedTechnology',
        ]
      },
      {
        title:'开源框架',
        collapsable: false,
        children:[
          'openSourceFramework/introduction',
          'openSourceFramework/ruoyi/ruoyi-vue/',
          ['openSourceFramework/ruoyi/ruoyi-cloud/', 'RuoYi-Cloud'],
          ['openSourceFramework/ruoyi/ruoyi-cloud-ow/', 'RuoYi-Cloud 官网']
        ]
      },
    ],
    '/tutorials/': [
      {
        title: '教程',
        collapsable: false,
        children:[
          ['gitTutorial','Git教程'],
          'linuxTutorial',
          'vueTutorial'
        ]
      },
    ],
    '/work/': [
      {
        title:'相关技术',
        collapsable: false,
        children:[
          'TruckSell',
        ]
      },
    ],
    '/database/': [
      {
        title: '设计',
        collapsable: false,
        children:[
          'PowerDesigner',
        ]
      },
    ],    
  }