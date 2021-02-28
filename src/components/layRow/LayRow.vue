<template>
  <div class="lay-row" v-bind:style="rowStyleObject">
    <!-- 参数名 -->
    <div class="lay-row-item"><slot name="title"></slot></div>
    <!-- 参数说明 -->
    <div class="lay-row-item"><slot name="explain"></slot></div>
    <!-- 参数操作 -->
    <div class="lay-row-item"><slot name="operation"></slot></div>
  </div>
</template>

<script>
export default {
  name: "LayRow",
  props: {
    bgcolor: String
  },
  data() {
    return {
      rowStyleObject: {
        backgroundColor: this.bgcolor
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.lay-row {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  border: 1px solid #eeeeee;
  /* 多终端适配, 滚动 */
  overflow-x: auto;

  .lay-row-item {
    padding: 10px 40px;
    text-align: center;
    flex-shrink: 0;
  }
}
</style>
