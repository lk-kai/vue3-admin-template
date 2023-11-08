import instance from '~/utils/request.js'
import {ElMessageBox} from 'element-plus'
import {delToken} from '~/utils/auth.js'
import { useRouter } from 'vue-router'

export const login = (params = {}) => {
  return instance.post('/admin/login',{
    ...params
  })
}

export const getInfo = () => {
  return instance.post('/admin/getinfo')
}

export const logout = () => {
  return  instance.post('/admin/logout')
}
