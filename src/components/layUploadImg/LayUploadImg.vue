<template>
  <el-upload
    class="upload-demo"
    drag
    action="https://test.ruixincommunity.cn/admin/upload/image/room/2"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <template #tip>
      <div class="el-upload__tip">
        只能上传 jpg/png 文件，且不超过 500kb
      </div>
    </template>
  </el-upload>
</template>

<script>
export default {
  name: "LayUploadImg"
};
</script>

<style></style>
