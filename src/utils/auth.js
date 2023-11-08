import { useCookies } from '@vueuse/integrations/useCookies'
import {ElNotification} from 'element-plus'
const cookie = useCookies()
const TOKEN = 'admin-token'
export const getToken = () => {
  return cookie.get(TOKEN)
}

export const setToken = (token) => {
  cookie.set(TOKEN,token)
}

export const delToken = () => {
  cookie.remove(TOKEN)
}

export const toast = (msg, type = 'success',duration = 1000) => {
  ElNotification({
    type: type,
    message: msg,
    duration: duration
  })
}
