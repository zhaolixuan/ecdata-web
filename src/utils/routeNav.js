import Layout from '@/layout'

const routes = [
  // 功能页
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('../views/util/login')
  // },
  // 首页
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/'),
        name: 'home',
        meta: { menuIndex: '1' }
      },
      // 测试页
      {
        path: 'test',
        name: 'test',
        meta: {
          menuIndex: '10'
        },
        component: () => import(/* webpackChunkName: "home" */ '../views/test/')
      }
    ]
  },
  // 整体产业发展概况
  {
    path: '/ztcy',
    component: Layout,
    redirect: '/ztcy/online',
    children: [
      {
        // 洛阳零售发展概况
        path: 'online',
        component: () => import(/* webpackChunkName: "home" */ '../views/ztcy/onlineRetail/'),
        name: 'online',
        meta: { menuIndex: '2-1' }
      },
      {
        // 跨境进口概况
        path: 'cross',
        component: () => import(/* webpackChunkName: "home" */ '../views/ztcy/crossBorder/'),
        name: 'cross',
        meta: { menuIndex: '2-2' }
      }
    ]
  },
  // 企业监测
  {
    path: '/qyjc',
    component: Layout,
    redirect: '/qyjc/localmap',
    children: [
      {
        // 本地企业地图
        path: 'localmap',
        component: () => import(/* webpackChunkName: "home" */ '../views/qyjc/localEnterpriseMap'),
        name: 'localmap',
        meta: { menuIndex: '3-1' }
      },
      {
        // 主导产业电商企业
        path: 'leading',
        component: () => import(/* webpackChunkName: "home" */ '../views/qyjc/leadingIndustry'),
        name: 'leading',
        meta: { menuIndex: '3-2' }
      },
      {
        // 主导产业电商企业
        path: 'entchange',
        component: () => import(/* webpackChunkName: "home" */ '../views/qyjc/enterpriseChanges'),
        name: 'entchange',
        meta: { menuIndex: '3-3' }
      },
      {
        // 企业档案
        path: 'dossiers',
        component: () => import(/* webpackChunkName: "home" */ '../views/qyjc/dossiers'),
        name: 'dossiers'
      }
    ]
  },
  // 主导产业监测
  {
    path: '/zdcy',
    component: Layout,
    redirect: '/zdcy/overview',
    children: [
      {
        // 产业概况
        path: 'overview',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/overview/'),
        name: 'overview',
        meta: { menuIndex: '4-1' }
      },
      {
        // 原材料监测
        path: 'radmonitor',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/radMonitor/'),
        name: 'radmonitor',
        meta: { menuIndex: '4-2' }
      },
      {
        // 企业优秀名单
        path: 'enterpriselist',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/enterpriselist/'),
        name: 'enterpriselist',
        meta: { menuIndex: '4-3' }
      },
      {
        // 企业详情
        path: 'businessDetails',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/businessDetails'),
        name: 'businessDetails'
      },
      {
        // 渠道分析
        path: 'channelfx',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/channelAnalysis/'),
        name: 'channelfx',
        meta: { menuIndex: '4-4' }
      },
      {
        // 品类交易分析
        path: 'transaction',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/transaction/'),
        name: 'transaction',
        meta: { menuIndex: '4-5' }
      },
      {
        // 消费者偏好分析
        path: 'consumer',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/consumer/'),
        name: 'consumer',
        meta: { menuIndex: '4-6' }
      },
      {
        // 用户画像分析
        path: 'portrait',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/portrait/'),
        name: 'portrait',
        meta: { menuIndex: '4-7' }
      },
      {
        // 云词分析
        path: 'wordcloud',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/wordCloud/'),
        name: 'wordcloud',
        meta: { menuIndex: '4-8' }
      },
      // 品牌分析
      {
        // 品牌交易规模分析
        path: 'brandjy',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/brandAnalysis/tranding/'),
        name: 'brandjy',
        meta: { menuIndex: '4-9-1' }
      },
      {
        // 品牌价格分析
        path: 'brandprice',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/brandAnalysis/price/'),
        name: 'brandprice',
        meta: { menuIndex: '4-9-2' }
      },
      {
        // 品牌渠道分析
        path: 'brandchannel',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/brandAnalysis/channel/'),
        name: 'brandchannel',
        meta: { menuIndex: '4-9-3' }
      },
      {
        // 品牌热度分析
        path: 'brandheat',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/brandAnalysis/heat/'),
        name: 'brandheat',
        meta: { menuIndex: '4-9-4' }
      },
      {
        // 品牌区域分析
        path: 'brandregion',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/brandAnalysis/region/'),
        name: 'brandregion',
        meta: { menuIndex: '4-9-5' }
      },
      // 价格分析
      {
        // 价格区间交易规模分析
        path: 'pricejy',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/priceAnalysis/tradeSize/'),
        name: 'pricejy',
        meta: { menuIndex: '4-10-1' }
      },
      {
        // 价格区间品牌分析
        path: 'pricebrand',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/priceAnalysis/brand/'),
        name: 'pricebrand',
        meta: { menuIndex: '4-10-2' }
      },
      {
        // 价格区间渠道分析
        path: 'pricechannel',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/priceAnalysis/channel/'),
        name: 'pricechannel',
        meta: { menuIndex: '4-10-3' }
      },
      {
        // TOP单品分析
        path: 'singlep',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/singleItem/'),
        name: 'singlep',
        meta: { menuIndex: '4-11' }
      },
      {
        // TOP店铺分析
        path: 'shop',
        component: () => import(/* webpackChunkName: "home" */ '../views/zdcy/shop/'),
        name: 'shop',
        meta: { menuIndex: '4-12' }
      },
      {
        // 产品流通分析
        path: 'circulate',
        component: () => import( /* webpackChunkName: "home" */ '../views/zdcy/circulate/'),
        name: 'circulate',
        meta: {
          menuIndex: '4-13'
        }
      }
    ]
  },
  // 三农电商
  // {
  //   path: '/snds',
  //   component: Layout,
  //   redirect: '/snds/farmproduce',
  //   children: [
  //     {
  //       // 农产品概况
  //       path: 'farmproduce',
  //       component: () => import(/* webpackChunkName: "home" */ '../views/snds/farmProduce'),
  //       name: 'farmproduce',
  //       meta: { menuIndex: '5-1' }
  //     },
  //     {
  //       // 行业交易规模
  //       path: 'tradescale',
  //       component: () => import(/* webpackChunkName: "home" */ '../views/snds/tradeScale'),
  //       name: 'tradescale',
  //       meta: { menuIndex: '5-2' }
  //     },
  //     {
  //       // 畅销单品
  //       path: 'bestseller',
  //       component: () => import(/* webpackChunkName: "home" */ '../views/snds/bestSeller'),
  //       name: 'bestseller',
  //       meta: { menuIndex: '5-3' }
  //     },
  //     {
  //       // 人气单品
  //       path: 'popularItems',
  //       component: () => import(/* webpackChunkName: "home" */ '../views/snds/popularItems'),
  //       name: 'popularItems',
  //       meta: { menuIndex: '5-4' }
  //     }
  //   ]
  // }
]

const navs = [
  // 首页
  {
    index: '1',
    path: '/',
    title: '首页',
    icon: 'home'
  },
  // 整体产业概况
  {
    index: '2',
    title: '整体产业概况',
    icon: 'chanye',
    children: [
      {
        index: '2-1',
        path: '/ztcy/online',
        title: '网络零售概况'
      },
      {
        index: '2-2',
        path: '/ztcy/cross',
        title: '跨境进口概况'
      }
    ]
  },
  // 企业监测
  {
    index: '3',
    title: '企业监测',
    icon: 'jiance',
    children: [
      {
        index: '3-1',
        path: '/qyjc/localmap',
        title: '本地企业地图'
      },
      {
        index: '3-2',
        path: '/qyjc/leading',
        title: '主导产业电商企业'
      },
      {
        index: '3-3',
        path: '/qyjc/entchange',
        title: '企业变动分析'
      }
    ]
  },
  // 主导产业概况
  {
    index: '4',
    title: '主导产业监测',
    icon: 'zhudao',
    children: [
      {
        index: '4-1',
        path: '/zdcy/overview',
        title: '产业概况'
      },
      {
        index: '4-2',
        path: '/zdcy/radmonitor',
        title: '原材料监测'
      },
      {
        index: '4-3',
        path: '/zdcy/enterpriselist',
        title: '优秀企业名单'
      },
      {
        index: '4-4',
        path: '/zdcy/channelfx',
        title: '渠道分析'
      },
      {
        index: '4-5',
        path: '/zdcy/transaction',
        title: '品类交易分析'
      },
      {
        index: '4-6',
        path: '/zdcy/consumer',
        title: '消费者偏好分析'
      },
      {
        index: '4-7',
        path: '/zdcy/portrait',
        title: '用户画像分析'
      },
      {
        index: '4-8',
        path: '/zdcy/wordcloud',
        title: '云词分析'
      },
      {
        index: '4-9',
        title: '品牌分析',
        children: [
          {
            index: '4-9-1',
            path: '/zdcy/brandjy',
            title: '品牌交易规模分析'
          },
          {
            index: '4-9-2',
            path: '/zdcy/brandprice',
            title: '品牌价格分析'
          },
          {
            index: '4-9-3',
            path: '/zdcy/brandchannel',
            title: '品牌渠道分析'
          },
          // {
          //   index: '4-9-4',
          //   path: '/zdcy/brandheat',
          //   title: '品牌热度分析'
          // },
          {
            index: '4-9-5',
            path: '/zdcy/brandregion',
            title: '品牌区域分析'
          }
        ]
      },
      {
        index: '4-10',
        title: '价格分析',
        children: [
          {
            index: '4-10-1',
            path: '/zdcy/pricejy',
            title: '价格区间交易规模分析'
          },
          // {
          //   index: '4-10-2',
          //   path: '/zdcy/pricebrand',
          //   title: '价格区间品牌分析'
          // },
          {
            index: '4-10-3',
            path: '/zdcy/pricechannel',
            title: '价格区间渠道分析'
          }
        ]
      },
      {
        index: '4-11',
        path: '/zdcy/singlep',
        title: 'TOP单品分析'
      },
      {
        index: '4-12',
        path: '/zdcy/shop',
        title: 'TOP店铺分析'
      }, {
        index: '4-13',
        path: '/zdcy/circulate',
        title: '产品流通分析'
      }
    ]
  },
  // 三农电商
  // {
  //   index: '5',
  //   path: '',
  //   title: '三农电商',
  //   icon: 'dianshang',
  //   children: [
  //     {
  //       index: '5-1',
  //       path: '/snds/farmProduce',
  //       title: '农资和农产品概况'
  //     },
  //     {
  //       index: '5-2',
  //       path: '/snds/tradeScale',
  //       title: '行业交易规模分析'
  //     },
  //     {
  //       index: '5-3',
  //       path: '/snds/bestseller',
  //       title: '畅销单品分析'
  //     },
  //     {
  //       index: '5-4',
  //       path: '/snds/popularItems',
  //       title: '人气单品分析'
  //     }
  //   ]
  // }
  // 测试页
  // {
  //   index: '10',
  //   path: '/test',
  //   title: '测试页',
  //   icon: 'chanye'
  // }
]

export {
  routes,
  navs
}
