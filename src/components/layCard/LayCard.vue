<template>
  <div class="lay-card" v-bind:style="cardStyleObject">
    <div class="title"><slot name="title"></slot></div>
    <div class="content"><slot name="content"></slot></div>
  </div>
</template>

<script>
export default {
  name: "LayCard",
  props: {
    bgcolor: String
  },
  data() {
    return {
      cardStyleObject: {
        backgroundColor: this.bgcolor
      }
    };
  }
};
</script>

<style scoped>
.lay-card {
  padding: 10px;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ccc;
}
.lay-card .title {
  font-size: 14px;
  color: #909399;
  font-weight: bold;
  box-shadow: 1px #333;
  padding-bottom: 7px;
}
.lay-card .content {
  font-size: 14px;
  color: #333;
}
</style>
