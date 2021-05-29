//项目的菜单配置
export default[
  {
    title: '首页', // 菜单标题名称
    key: 'home', // 对应的path
    // icon: 'home', // 图标名称
    icon: 'HomeOutlined',
    path: '/admin/home'//对应路径
  },
  {
    title: '商品',
    key: 'prod_about',
    icon:'{<HomeOutlined />}',
    children: [ // 子菜单列表
      {
        title: '分类管理',
        key: 'category',
        icon:'{<HomeOutlined />}',
        path: '/admin/prod_about/category'
      },
      {
        title: '商品管理',
        key: 'product',
        icon:'{<HomeOutlined />}',
        path: '/admin/prod_about/product'
      },
    ]
  },

  {
    title: '用户管理',
    key: 'user',
    icon:'{<HomeOutlined />}',
    path: '/admin/user'
  },
  {
    title: '角色管理',
    key: 'role',
    icon:'{<HomeOutlined />}',
    path: '/admin/role'
  },

  {
    title: '图形图表',
    key: 'charts',
    icon:'{<HomeOutlined />}',
    children: [
      {
        title: '柱形图',
        key: 'bar',
        icon: '{<HomeOutlined />}',
        path: '/admin/charts/bar'
      },
      {
        title: '折线图',
        key: 'line',
        icon: '{<HomeOutlined />}',
        path: '/admin/charts/line'
      },
      {
        title: '饼图',
        key:  'pie',
        icon: '{<HomeOutlined />}',
        path: '/admin/charts/pie'
      },
    ]
  },
]
