<template>
  <header>
    <span>睿信社区管理系统后台</span>
    <slot name="search"></slot>
    <div class="selector">
      <slot name="selector"></slot>
    </div>
    <button>登出</button>
  </header>
</template>

<style>
header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}
button {
  outline: none;
  border: none;
  border-radius: 5px;
  width: 60px;
  height: 30px;
  color: #fff;
  background-color: #078aae;
}
@media screen and (max-width: 992px) {
  header span {
    display: none;
  }
  header .selector {
    display: none;
  }
}
</style>
