import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '个人主页', icon: 'user' }
    }]
  },



  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ],
    hidden: true
  },

  // 404 page must be placed at the end !!!
  //{ path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
{
    path: '/upload',
    component: Layout,
    name: 'Certification',
    meta: { title: '模型管理', icon: 'el-icon-s-claim', roles: ['user'] },
    children: [
      {
        path: 'model',
        name: 'Certification_apply',
        component: () => import('@/views/upload_model/index'),
        meta: { title: '上传模型', icon: 'el-icon-document', roles: ['user'] }
      },
      {
        path: 'all',
        name: 'Certification_list',
        component: () => import('@/views/mymodel/index'),
        meta: { title: '我的模型', icon: 'list', activeMenu: '/certification/list', roles: ['user'] }
      },
    ]
  },

  {
    path: '/',
		component: Layout,
		children: [
			{
				path: 'upload_data/',
				component: () => import('@/views/upload_data/index'),
				meta: {title: '隐私计算', icon: 'eye-open'}
			}
		]
  },
  

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/zzmsmm/AI_Watermark_Protection',
        meta: { title: 'Github Link', icon: 'link', roles: ['user'] }
      }
    ]
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
