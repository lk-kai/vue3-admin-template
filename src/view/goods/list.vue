<template>
  <el-upload
    class="avatar-uploader"
    action="#"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
  >
  <video v-if='videoUrl' :src='videoUrl'></video>
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
// https://www.weiminy.cn:8898/upload
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { cutFile, concurRequest } from './utils'
import { getInfo } from '~/api/manager.js'

const videoUrl = ref('')
const beforeAvatarUpload = async (file) => {
  console.log(file)
  const obj = await cutFile(file)
  console.log(obj)
  const requestList = obj.hashList.map(item => ({
    getInfo,
    ...item
  }))
  const res =  await concurRequest(requestList)
  console.log(res)

}

</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
