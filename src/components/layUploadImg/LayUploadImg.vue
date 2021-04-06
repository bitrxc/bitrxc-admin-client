<template>
  <el-upload class="upload-demo" drag :action="uploadApi" :on-success="success">
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
  name: "LayUploadImg",
  data() {
    return {
      uploadApi: "https://api.bitrxc.com/admin/image/room/1"
    };
  },
  methods: {
    success() {
      alert("上传成功");
    }
  }
};
</script>

<style></style>
