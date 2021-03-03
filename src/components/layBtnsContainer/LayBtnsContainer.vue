<template>
  <div class="lay-btns-container">
    <slot name="left"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: "LayBtnsContainer"
};
</script>

<style>
.lay-btns-container {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  padding: 15px;
}
</style>
