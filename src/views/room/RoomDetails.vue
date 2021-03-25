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
import { getRoomDetail } from "../../network/room";
import { reqError } from "../../utils/tips";
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
    reuseGetRoomDetail(roomId) {
      getRoomDetail(roomId)
        .then(result => {
          const res = result.data;
          if (res.code !== 200) {
            return reqError("获取数据失败");
          }
          this.tableData = res.data.roomData;
        })
        .catch(err => {
          console.log(err);
          return reqError("网络故障");
        });
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
