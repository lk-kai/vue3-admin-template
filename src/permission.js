import {addRoutes, router} from '~/router/index.js'
import {getToken, toast} from '~/utils/auth.js'
import {useUserStore} from '~/store/index.js'
import NProgress from 'nprogress'

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = to.meta.title ? to.meta.title : ''
  const token = getToken()
  if (!token && to.path !== '/login') {
    return next({path: '/login'})
  }
  if (token && to.path === '/login') {
    return next({path: from.path ? from.path: '/'})
  }
  if (token) {
    const store = useUserStore()
    if (!Object.keys(store.getUserInfo).length) {
      const { menus } = await store.setUserInfo()
      addRoutes(menus)
      return next(to.path)
    }
  }

  next()
})
router.afterEach(() => NProgress.done())
