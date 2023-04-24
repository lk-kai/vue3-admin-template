<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="iscollapse"
    :collapse-transition="false"
    router
    :default-active="$route.path"
    unique-opened
  >
    <template v-for="(item, index) in menus">
      <el-sub-menu v-if="item.child && item.child.length" :index="item.name">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{item.name}}</span>
        </template>
          <el-menu-item v-for="menuitem in item.child" :index="menuitem.frontpath">
            <el-icon>
              <component :is="menuitem.icon"></component>
            </el-icon>
            <span>{{menuitem.name}}</span>
          </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.frontpath">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{item.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "lside"
}
</script>
<script setup>

import {Document, Location, Setting} from '@element-plus/icons-vue'
import {useUserStore} from '~/store/index.js'
import {computed} from 'vue'
const asideWidth = computed(() => {
  return useUserStore().asideWidth
})
const iscollapse = computed(() => {
  return asideWidth.value !== '250px'
})
const menus = computed(() => {
  return useUserStore().user.menus
})
</script>

<style scoped>
.el-menu {
  position: fixed;
  overflow: scroll;
	white-space: nowrap;
  top: 64px;
  bottom: 0;
  left: 0;
  width: v-bind(asideWidth);
}
</style>
