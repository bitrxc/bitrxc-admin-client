<template>
  <div class="lay-card" v-bind:style="cardStyleObject">
    <slot></slot>
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

<style lang="scss" scoped>
.lay-card {
  display: flex;
  display: -webkit-flex;
  padding: 20px;
  margin: 10px 0 20px;
  background-color: #fffffe;
  border: 1px solid #dcdfe6;
  font-size: 13px;
  color: #909399;
  font-weight: bold;
}
</style>
