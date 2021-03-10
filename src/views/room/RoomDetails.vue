<template>
  <div class="room-details">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb">
      <el-breadcrumb-item>房间管理</el-breadcrumb-item>
      <el-breadcrumb-item>房间详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="card">
      <!-- 房间列表 -->
      <el-table
        class="room-table"
        :data="tableData"
        style="width: 100%"
        height="100"
        border
        stripe
      >
        <el-table-column prop="id" label="房间编号"></el-table-column>
        <el-table-column prop="name" label="房间名字"></el-table-column>
        <el-table-column prop="iamge" label="房间照片"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RoomDetails",
  data() {
    return {
      roomId: this.$route.query.roomId,
      tableData: []
    };
  },
  created() {
    this.getRoomInfo();
  },
  methods: {
    async getRoomInfo() {
      const { data: res } = await this.$axios.get(
        `https://test.ruixincommunity.cn/admin/room/${this.roomId}`
      );
      this.tableData = [res.data.roomInfo];
    }
  }
};
</script>

<style lang="scss" scoped>
.room-details {
  .breadcrumb {
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .card {
    .room-table {
      margin: 20px 0;
    }
  }
}
</style>
