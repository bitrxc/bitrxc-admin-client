<template>
  <div>
    <!-- <img src="@/assets/img/NoBug.png" /> -->
    <lay-upload-img></lay-upload-img>
  </div>
</template>

<script>
import LayUploadImg from "@/components/layUploadImg/LayUploadImg.vue";

export default {
  name: "NotFound",
  components: {
    LayUploadImg
  }
};
</script>

<style scoped>
img {
  height: 100%;
}
@media screen and (max-width: 768px) {
  img {
    width: 100%;
  }
}
</style>
