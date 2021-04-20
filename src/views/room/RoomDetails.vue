<template>
  <div class="room-details">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="custom-breadcurmb">
      <el-breadcrumb-item>房间管理</el-breadcrumb-item>
      <el-breadcrumb-item>房间详情</el-breadcrumb-item>
    </el-breadcrumb>

    <table>
      <tr>
        <td>房间编号</td>
        <td>{{ tableData.id }}</td>
      </tr>
      <tr>
        <td>房间描述</td>
        <td>{{ tableData.description }}</td>
      </tr>
      <tr>
        <td>房间名字</td>
        <td>{{ tableData.name }}</td>
      </tr>
      <tr>
        <td>房间图片</td>
        <td>
          <img :src="tableData.images" />
        </td>
      </tr>
    </table>

    <lay-btns-container>
      <template v-slot:left>
        <el-button type="primary" @click="dialogUpdateRoomVisible = true">
          修改房间信息
        </el-button>
      </template>
    </lay-btns-container>

    <lay-btns-container>
      <template v-slot:left>
        <el-button type="info" @click="goBack">
          返回
        </el-button>
      </template>
    </lay-btns-container>
    <!-- 弹窗区域 -->
    <el-dialog
      title="修改房间"
      v-model="dialogUpdateRoomVisible"
      :before-close="handleClose"
    >
      <el-form v-bind:model="updateRoomForm">
        <el-form-item prop="name">
          <el-input
            placeholder="请输入房间的名字"
            v-model="updateRoomForm.name"
            type="text"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="description">
          <el-input
            placeholder="请输入房间描述"
            v-model="updateRoomForm.description"
            type="text"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="image">
          <el-input
            placeholder="请输入房间图片的URL"
            v-model="updateRoomForm.image"
            type="text"
          >
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="handleBtnUpdateRoom">
          提交
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRoomDetail, updateRoom } from "../../network/room";
import { reqError, reqSuccess } from "../../utils/tips";
import LayBtnsContainer from "@/components/layBtnsContainer/LayBtnsContainer.vue";
export default {
  name: "RoomDetails",
  components: {
    LayBtnsContainer
  },
  data() {
    return {
      roomId: this.$route.query.roomId,
      tableData: {},
      updateRoomForm: {
        name: "",
        description: "",
        image: ""
      },
      dialogUpdateRoomVisible: false
    };
  },
  created() {
    this.reuseGetRoomDetail();
  },
  methods: {
    reuseGetRoomDetail() {
      getRoomDetail(this.roomId)
        .then(result => {
          const res = result.data;
          if (res.code !== 200) {
            return reqError(res.message);
          }
          this.tableData = res.data.roomInfo;
          this.updateRoomForm.name = this.tableData.name;
          this.updateRoomForm.description = this.tableData.description;
          this.updateRoomForm.image = this.tableData.image;
        })
        .catch(err => {
          console.log(err);
          return reqError("网络故障");
        });
    },
    reuseUpdateRoom() {
      // 给表单添加一个 id 值
      this.updateRoomForm.id = this.roomId;
      updateRoom(this.updateRoomForm)
        .then(result => {
          const res = result.data;
          if (res.code !== 200) {
            return reqError("更新失败");
          }
          // 更新之后重新获取房间详情
          this.dialogUpdateRoomVisible = false;
          this.tableData = this.updateRoomForm;
          return reqSuccess("更新成功");
        })
        .catch(err => {
          console.log(err);
          return reqError("网络故障");
        });
    },
    // 控制弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭?")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 提交修改房间信息的表单
    handleBtnUpdateRoom() {
      this.reuseUpdateRoom();
      this.dialogAddRoomVisible = true;
    },
    goBack() {
      this.$router.go(-1);
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
table tr:nth-child(even) {
  background-color: #fff;
}
table tr:nth-child(odd) {
  background-color: #fafafa;
}
table td {
  padding: 15px;
  color: #666;
  border: 1px solid #e6e6e6;
}
table td img {
  width: 500px;
}
@media screen and (max-width: 768px) {
  table td img {
    width: 220px;
  }
}
</style>
