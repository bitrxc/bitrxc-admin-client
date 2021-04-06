<template>
  <div class="room-list">
    <el-input type="text" v-model="searchValue" clearable @clear="handleClear">
      <template #append>
        <el-button icon="el-icon-search" @click="handleBtnSearch"></el-button>
      </template>
    </el-input>

    <!-- 用户列表 -->
    <el-table class="custom-table" :data="tableData" height="580" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="id" label="房间编号"></el-table-column>
      <el-table-column prop="name" label="房间姓名"></el-table-column>
      <el-table-column prop="image" label="房间图片"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handelBtnClick(scope.row.id)"
          >
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleBtnDeleteRoomItem(scope.row.id, scope.row.index)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="totalElements"
        :current-page="current"
        :page-sizes="[10, 20, 40]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        small
        background
      >
      </el-pagination>
      <el-button type="success" @click="dialogAddRoomVisible = true">
        添加
      </el-button>
    </div>

    <!-- 弹窗区域 -->
    <el-dialog
      title="添加房间"
      v-model="dialogAddRoomVisible"
      :before-close="handleClose"
    >
      <el-form v-bind:model="addRoomForm">
        <el-form-item prop="name">
          <el-input
            placeholder="请输入房间的名字"
            v-model="addRoomForm.name"
            type="text"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="description">
          <el-input
            placeholder="请输入房间描述"
            v-model="addRoomForm.description"
            type="text"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="image">
          <el-input
            placeholder="请输入房间图片的URL"
            v-model="addRoomForm.image"
            type="text"
          >
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="handleBtnAddRoomItem">
          提交
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoomList,
  addRoomItem,
  deleteRoomItem,
  searchRooms
} from "../../network/room";
import { reqSuccess, reqError, reqInfo } from "../../utils/tips";
export default {
  name: "RoomList",
  data() {
    return {
      tableData: [],
      // 表单查询有关的数据
      searchValue: "",
      // 与表单分页有关的数据
      totalPage: null,
      totalElements: null,
      current: 1,
      limit: 10,
      // 与弹窗相关的数据
      dialogAddRoomVisible: false,
      addRoomForm: {
        name: "",
        description: "",
        image: ""
      }
    };
  },
  created() {
    this.reuseGetRoomList();
  },
  methods: {
    reuseGetRoomList() {
      let correctCurrent = this.current - 1; // 前端分页从 1 开始, 后端分页从 0 开始
      getRoomList(correctCurrent, this.limit)
        .then(result => {
          const res = result.data;
          if (res.code !== 200) {
            return reqError("获取数据失败");
          }
          this.totalPage = res.data.totalPage;
          this.totalElements = res.data.totalElements;
          this.tableData = res.data.rooms;
        })
        .catch(err => {
          console.log(err);
          return reqError("网络故障");
        });
    },
    reuseAddRoomItem() {
      addRoomItem(this.addRoomForm)
        .then(result => {
          const res = result.data;
          if (res.code !== 200) {
            return reqError("添加房间失败");
          }
          reqSuccess("添加房间成功");
          this.reuseGetRoomList();
          // 清空添加的表单，以备下次添加
          this.addRoomForm.name = "";
          this.addRoomForm.description = "";
          this.addRoomForm.image = "";
        })
        .catch(err => {
          console.log(err);
          return reqError("网络故障");
        });
    },
    reuseDeleteRoomItem(roomId, index) {
      deleteRoomItem(roomId)
        .then(result => {
          const res = result.data;
          if (res.code !== 200) {
            return reqError("删除房间失败");
          }
          reqSuccess("删除房间成功");
          // 刷新
          this.tableData.splice(index, 1);
        })
        .catch(err => {
          console.log(err);
          return reqError("网络故障");
        });
    },
    reuseSearchRooms() {
      searchRooms(this.searchValue)
        .then(result => {
          console.log(result);
          const res = result.data;
          if (res.code !== 200) {
            return reqError("获取数据失败");
          }
          this.tableData = res.data.rooms;
        })
        .catch(err => {
          console.log(err);
          return reqError("网络故障");
        });
    },
    // 点击按钮进入审批界面
    handelBtnClick(id) {
      this.$router.push({
        path: "/roomDetails",
        query: {
          roomId: id
        }
      });
    },
    // 监听 limit 的改变
    handleSizeChange(newLimit) {
      this.limit = newLimit;
      this.current = 1;
      this.reuseGetRoomList();
    },
    // 监听 current 的改变
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.reuseGetRoomList();
    },
    // 控制弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭?")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 添加房间
    handleBtnAddRoomItem() {
      this.reuseAddRoomItem();
      this.dialogAddRoomVisible = false;
    },
    handleBtnDeleteRoomItem(roomId, index) {
      this.$confirm("此操作将删除该房间, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.reuseDeleteRoomItem(roomId, index);
        })
        .catch(() => {
          reqInfo("取消删除");
        });
    },
    // 搜索
    handleBtnSearch() {
      this.reuseSearchRooms();
    },
    // 清空搜索时触发
    handleClear() {
      this.reuseGetRoomList();
    }
  }
};
</script>

<style scoped>
.custom-table {
  width: 100%;
}
.paging {
  padding: 5px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}

@media screen and (max-width: 768px) {
  /* 手机屏幕时, 不显示总页数, 前一个、后一个按钮 */
  .paging ::v-deep(.el-pagination) {
    padding: 0;
  }
  body .paging ::v-deep(.el-pagination__total),
  body .paging ::v-deep(.btn-prev),
  body .paging ::v-deep(.el-pager),
  body .paging ::v-deep(.btn-next) {
    display: none;
  }
  .paging ::v-deep(.el-pagination__jump) {
    margin: 0;
  }
  .paging .el-button {
    margin: 10px 7px;
  }
}
</style>
