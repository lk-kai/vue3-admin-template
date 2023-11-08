import {
  defineConfig
} from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      backgroundImage: theme => ({
        'login-bg': "url('/src/assets/login.png')"
      })
    }
  }
})
