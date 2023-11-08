import {defineStore} from 'pinia'
import {getInfo, logout} from '~/api/manager.js'
import {delToken} from '~/utils/auth.js'
import {ElMessageBox} from 'element-plus'
import {router} from '~/router/index.js'
import {useCookies} from '@vueuse/integrations/useCookies'

export const useUserStore = defineStore('user', {
  state(){
    return {
      user: {},
      asideWidth: '250px'
    }
  },
  getters: {
    getUserInfo() {
      return this.user
    }
  },
  actions: {
    async setUserInfo(user) {
      this.user = await getInfo()
      return this.user
    },
    async logOut(){
      ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async res => {
        await logout()
        delToken()
        this.user = {}
        useCookies().remove('tagView')
        await router.push('/login')
      })
    },
    setAsideWidth() {
      if (this.asideWidth === '250px') {
        this.asideWidth = '64px'
      }else if (this.asideWidth === '64px') {
        this.asideWidth = '250px'
      }
    }
  }
})
