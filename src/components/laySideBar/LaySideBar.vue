<template>
  <el-menu
    background-color="#24292e"
    text-color="#ffffff"
    active-text-color="#0dbc79"
    unique-opened
    :collapse="isCollapse"
    :collapse-transition="false"
    router
  >
    <el-submenu index="/orderList">
      <template #title>
        <i class="el-icon-location"></i>
        <span>预约管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/orderList">预约列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- <el-submenu index="/userList">
      <template #title>
        <i class="el-icon-location"></i>
        <span>管理员管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userList">管理员列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu> -->
    <!-- <el-submenu index="/roleList">
      <template #title>
        <i class="el-icon-location"></i>
        <span>权限说明</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/roleList">角色列表</el-menu-item>
        <el-menu-item index="/authorizationList">权限列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu> -->
    <!-- <el-submenu index="/classification">
      <template #title>
        <i class="el-icon-location"></i>
        <span>房间管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/roomList">房间列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu> -->
    <!-- <el-submenu index="/orderCharts">
      <template #title>
        <i class="el-icon-location"></i>
        <span>数据统计</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/orderCharts">预约统计</el-menu-item>
      </el-menu-item-group>
    </el-submenu> -->
    <!-- <el-submenu index="/personalDetails">
      <template #title>
        <i class="el-icon-location"></i>
        <span>个人信息管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/personalDetails">个人信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu> -->
  </el-menu>
</template>

<script>
export default {
  name: "LaySideBar"
};
</script>
