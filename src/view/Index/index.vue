<template>
  {{useUserStore().user}}}
  <el-cascader v-model="value" :props="props" />
</template>

<script setup>
import {useUserStore} from '~/store/index.js'
import {ref} from 'vue'
const value = ref([1,2,4,8])
let id = 0
const props = {
  lazy: true,
  lazyLoad(node, resolve) {
    const { level } = node
    console.log(level,node)
    setTimeout(() => {
      const nodes = Array.from({ length: level + 1 }).map((item) => ({
        value: ++id,
        label: `Option - ${id}`,
        leaf: level >= 3,
      }))
      // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
      resolve(nodes)
    }, 1000)
  },
}
</script>

<style scoped>

</style>
