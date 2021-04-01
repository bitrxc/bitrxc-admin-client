<template>
  <div class="room-details">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="custom-breadcurmb">
      <el-breadcrumb-item>房间管理</el-breadcrumb-item>
      <el-breadcrumb-item>房间详情</el-breadcrumb-item>
    </el-breadcrumb>

    <table>
      <tr>
        <td><div>房间编号</div></td>
        <td>{{ tableData.tmp }}</td>
      </tr>
      <tr>
        <td>房间描述</td>
        <td>{{ tableData.tmp }}</td>
      </tr>
      <tr>
        <td>房间图片</td>
        <td>{{ tableData.tmpe }}</td>
      </tr>
    </table>
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
      tableData: {}
    };
  },
  created() {
    this.reuseGetRoomDetail();
  },
  methods: {
    reuseGetRoomDetail(roomId) {
      getRoomDetail(roomId)
        .then(result => {
          const res = result.data;
          console.log(res);
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

<style scoped>
.custom-breadcurmb {
  padding: 5px;
  padding-bottom: 10px;
}
table {
  width: 100%;
}
table tr {
  border: 1px solid #ccc;
  background: #eeefff;
}
table td {
  padding: 5px 7px;
  color: #666;
}
table td div {
  width: 100px;
}
</style>
