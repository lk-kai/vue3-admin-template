<template>
  <el-container>
    <el-header>
      <lhead></lhead>
    </el-header>
    <el-container class="wrap">
      <el-aside>
        <lside></lside>
      </el-aside>
      <el-main>
        <Ltagview />
        <router-view v-if="refresh"></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script setup>
import Ltagview from '~/layouts/components/ltagview.vue'
import Lside from '~/layouts/components/lside.vue'
import Lhead from '~/layouts/components/lhead.vue'
import {computed, nextTick, provide, ref} from 'vue'
import {useUserStore} from '~/store/index.js'

const asideWidth = computed(() => {
  return useUserStore().asideWidth
})

const refresh = ref(true)

const reload = async () => {
  console.log(1)
  refresh.value = false
  await nextTick()
  refresh.value = true
}
provide('reload', reload)
</script>

<style scoped>
.el-header {
  height: 64px!important;
}
.el-aside {
  width: v-bind(asideWidth);
}
.wrap {
  position: absolute;
  top: 64px;
  right: 0;
  left: 0;
  bottom: 0;
}
.el-main {
	margin-top: calc(var(--el-main-padding) + 44px);
  padding-top: 0
}
</style>
