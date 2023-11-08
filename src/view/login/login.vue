<template>
  <transition name="fade" appear>
    <el-row class="min-h-screen">
      <el-col :span="16" class="flex items-center justify-center bg-cover bg-center bg-no-repeat left bg-login-bg">
      </el-col>
      <el-col :span="8" class="flex flex-col items-center justify-center right bg-light-50 b">
        <el-form
          :model="form"
          :rules="rules"
          label-width="120px"
          ref="formRef"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名">
              <template #prefix>
                <el-icon class="el-input__icon"><User></User></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" show-password placeholder="请输入密码">
              <template #prefix>
                <el-icon class="el-input__icon"><Lock></Lock></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="flex-1" type="primary" :loading="loading" @click="onSubmit">登陆</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </transition>
</template>

<script setup>
import {onBeforeUnmount, onMounted, reactive, ref, toRef, toRefs} from 'vue'
import {Lock, User} from '@element-plus/icons-vue'
import {getInfo, login} from '~/api/manager.js'
import {ElNotification} from 'element-plus'
import { useRouter } from 'vue-router'
import {useUserStore} from '~/store/index.js'
import {setToken} from '~/utils/auth.js'
const form = reactive({
  username: 'admin',
  password: 'admin'
})
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
  ]
}

const formRef = ref(null)
const loading = ref(false)
const router = useRouter()
const onSubmit = () =>{
  ElNotification.closeAll()
  formRef.value.validate(async valid => {
    if (valid) {
      if (form.username !== 'admin' || form.password !== 'admin') {
        return ElNotification({
          type: 'error',
          message: '账号密码不对'
        })

      } else {
        try {
          loading.value = true
          const { token } = await login(form)
          setToken(token)
          ElNotification({
            type: 'success',
            message: '登录成功'
          })
          await router.push('/')
        }finally {
          loading.value = false
        }
      }

    }
  })
}
const onkeyup = (event) => {
  if (event.key === 'Enter') {
    onSubmit()
  }
}
onMounted(() => {
  window.addEventListener('keyup', onkeyup)

})
onBeforeUnmount(() => {
  window.removeEventListener('keyup', onkeyup)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
	transition: all 1s linear;
	.left, .right {
		transition: all 1s linear;
	}
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
  .left {
		transform: translate3d(-200px, 0, 0);
	}
	.right {
		transform: translate3d(200px, 0, 0)
	}
}
</style>
