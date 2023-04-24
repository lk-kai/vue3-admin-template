<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    class="demo-tabs"
    @tab-click="tabclick"
    @tab-remove="tabremove"
  >
    <el-tab-pane
      v-for="item in tagViewList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
      :closable="item.path!=='/'"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "itagview"
}
</script>

<script setup>
import {ref} from 'vue'
import {onBeforeRouteUpdate, useRoute, useRouter} from 'vue-router'
import {useCookies} from '@vueuse/integrations/useCookies'
import {router} from '~/router/index.js'

const editableTabsValue = ref(useRoute().path)
const tagViewList = ref([
  {
    title: '后台首页',
    path: '/'
  },
])
// editableTabs.value = new Array(100).fill(1).map((item,index) =>{
//   return {
//     title: `item${index+1}`,
//     name: index+1,
//     content: `item${index+1}`
//   }
// })

const hasTag = (path) => {
  return !!tagViewList.value.find(item => item.path === path)
}

const addTag = (route) => {
  editableTabsValue.value = route.path
  if (!hasTag(route.path)) {
    tagViewList.value.push({
      title: route.meta.title || '',
      path: route.path
    })
    useCookies().set('tagView', tagViewList.value)
  }
}

const initTagview = () => {
  tagViewList.value = useCookies().get('tagView') || [{
    title: '后台首页',
    path: '/'
  }]
}
initTagview()
const tabclick = (val) => {
  router.push(val.props.name)
}
const tabremove = (targetName) => {
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tagViewList.value.forEach((tab, index) => {
      if (tab.path === targetName) {
        const nextTab = tagViewList.value[index + 1] || tagViewList.value[index - 1]
        if (nextTab) {
          activeName = nextTab.path
          router.push(activeName)
        }
      }
    })
  }
  editableTabsValue.value = activeName
  tagViewList.value = tagViewList.value.filter(item => item.path !== targetName)
  useCookies().set('tagView', tagViewList.value)
}
onBeforeRouteUpdate((to, from) => {
  addTag(to)
})
</script>

<style scoped>
.el-tabs {
  position: fixed;
  top: 74px;
  height: 44px;
}
:deep(.el-tabs__header ){
  border: none!important;
}
:deep(.el-tabs__nav) {
  border: none!important;
}
:deep(.el-tabs__item) {
  border: 1px solid!important;
  /*background-color: #fff;*/
  margin: 0 4px;
}
</style>
