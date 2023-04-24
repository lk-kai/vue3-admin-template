<template>
  <div class="header">
    <div class="logo">
      <el-icon></el-icon>
      <span >后台管理系统</span>
    </div>
    <el-icon class="icon-btn">
      <fold v-if="store.asideWidth === '250px'" @click="store.setAsideWidth()"></fold>
      <Expand v-else @click="store.setAsideWidth()" />
    </el-icon>
    <el-tooltip effect="dark" content="刷新页面" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh"><refresh></refresh></el-icon>
    </el-tooltip>
    <div>
      <el-tooltip effect="dark" :content="!isFullscreen? '全屏':'退出全屏'" placement="bottom">
        <el-icon class="icon-btn" @click="toggleDark(!isDark)">
          <Sunny v-if="isDark"></Sunny>
          <Moon v-else></Moon>
        </el-icon>
      </el-tooltip>
      <el-tooltip effect="dark" :content="!isFullscreen? '全屏':'退出全屏'" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen"></full-screen>
          <aim v-else></aim>
        </el-icon>
      </el-tooltip>
      <el-avatar class="mr-2" :size="25" :src="store.getUserInfo.avatar" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{store.getUserInfo.username}}
          <el-icon class="icon-btn">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="store.logOut()">退出登录</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {Aim, ArrowDown, Expand, Fold, FullScreen, Moon, Refresh, Sunny} from '@element-plus/icons-vue'
import {useUserStore} from '~/store/index.js'
import { useFullscreen, useDark, useToggle } from '@vueuse/core'
import {inject, ref} from 'vue'
const store = useUserStore()
const reload = inject('reload')
const handleRefresh = () => {
  reload()
}
const { isFullscreen, enter, exit, toggle } = useFullscreen()
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    line-height: 64px;
    display: flex;
    align-items: center;
  }
  .header div {
    height: 100%;
    display: flex;
    align-items: center;
    &:last-child {
      margin-left: auto;
    }
  }
  .logo {
    width: 250px!important;
    display: flex;
    align-items: center;
    justify-content: center;
    @apply font-thin text-xl
  }
  .logo span {
    font-weight: bold;
  }
  .icon-btn {
	  width: 42px;
    height: 64px;
    cursor: pointer;
	  @apply font-thin text-xl
  }
  .el-dropdown {
    height: 64px;
    line-height: 64px;
	  @apply font-thin text-xl
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
    outline: none;
    cursor: pointer;
  }
</style>
