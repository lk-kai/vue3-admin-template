<template>
  <el-result
    icon="warning"
    title="Warning Tip"
    sub-title="Please follow the instructions"
  >
    <template #extra>
      <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
      <el-button type="primary" @click="store.logOut()">退出登录</el-button>
    </template>
  </el-result>
</template>

<script setup>
import {logout} from '~/api/manager.js'
import {useUserStore} from '~/store/index.js'
const store = useUserStore()

</script>

<style scoped>

</style>
