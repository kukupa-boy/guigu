<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import {
  getRoleList,
  addOrUpdateRole,
  getRolePermission,
  assignRolePermission,
  deleteRoleFn,
} from "@/api/acl/role";
import type { Role } from "@/api/acl/role/type";
import { ElMessage, ElMessageBox } from "element-plus";
let searchRole = ref("");
// 表格数据
let tableData = ref<Role[]>(null);
let page = ref(1);
let limit = ref(5);
let total = ref(0);
let dialogVisible = ref(false);
let newRoleName = reactive<Role>({
  roleName: "",
  id: 0,
});
let drawer = ref(false);
const props = {
  label: "name",
  children: "children",
};
// 权限数据存放
const treeData = ref(null);
// 节点实例
const tree = ref(null);
// 收集需要展开的节点
const exponse = ref([]);
onMounted(() => {
  getRoleListFn();
});
// 获取角色列表
const getRoleListFn = () => {
  getRoleList(page.value, limit.value, searchRole.value)
    .then((res) => {
      tableData.value = res.data.records;
      total.value = res.data.total;
    })
    .catch((err) => {
      console.log(err);
      ElMessage.error("获取角色列表失败");
    });
  console.log("获取角色列表");
};
// 搜索角色列表
const toSearchList = () => {
  getRoleListFn();
};

// 重置搜索
const toResetList = () => {
  searchRole.value = "";
  getRoleListFn();
};
// 添加角色对话框打开
const addOrEditRole = () => {
  dialogVisible.value = true;
  newRoleName.roleName = "";
};
// 添加或者编辑角色
const addRoleFn = () => {
  if (!newRoleName.roleName) {
    ElMessage.error("请输入角色名");
    return;
  }
  if (newRoleName.roleName.length < 2 || newRoleName.roleName.length > 8) {
    ElMessage.error("角色名长度为2-8位");
    return;
  }
  addOrUpdateRole(newRoleName)
    .then((res) => {
      console.log(res);
      ElMessage.success(newRoleName.id ? "编辑角色成功" : "添加角色成功");
      getRoleListFn();
    })
    .catch((err) => {
      console.log(err);
      ElMessage.error(newRoleName.id ? "编辑角色失败" : "添加角色失败");
    });
  dialogVisible.value = false;
};

// 递归筛选出所有的id【tree组件只需要筛选出最底层的id】（select为true）
const filterId = (data) => {
  data.forEach((item) => {
    if (item.children.length) {
      filterId(item.children);
    } else {
      if (item.select) {
        exponse.value.push(item.id);
      }
    }
  });
};
// 分配权限
const givePower = (row) => {
  exponse.value = [];
  drawer.value = true;
  Object.assign(newRoleName, row);
  getRolePermission(row.id)
    .then((res) => {
      console.log(res);
      treeData.value = res.data[0].children;
      filterId(res.data[0].children);
      console.log("exponse", exponse.value);
      // let id = tree.value.filter(res.data[0].children);
      // console.log("id", id);
      // tree.value.setCheckedKeys(res.data[0].children);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("分配权限", row);
};
// 打开编辑按钮框
const editRole = (row) => {
  dialogVisible.value = true;
  Object.assign(newRoleName, row);
};
// 删除角色
const deleteRole = (row) => {
  ElMessageBox.confirm("此操作将永久删除该角色, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteRoleFn(row.id)
        .then((res) => {
          console.log(res);
          ElMessage.success("删除角色成功");
          if (tableData.value.length === 1 && page.value > 1) {
            page.value--;
          }
          // getRoleListFn();
          // 页面刷新,有些菜单需要刷新
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          ElMessage.error("删除角色失败");
        });
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    });
};
// 分页
const handleSizeChange = (val) => {
  limit.value = val;
  getRoleListFn();
};
const handleCurrentChange = (val) => {
  page.value = val;
  getRoleListFn();
};
// 分配权限
const submit = () => {
  let selectid = tree.value.getCheckedKeys();
  assignRolePermission(newRoleName.id, selectid)
    .then((res) => {
      console.log(res);
      ElMessage.success("分配权限成功");
      drawer.value = false;
      // 页面刷新,有些菜单需要刷新
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      ElMessage.error("分配权限失败");
    });
};
</script>

<template>
  <div>
    <el-card>
      <el-form
        :inline="true"
        style="display: flex; justify-content: space-between"
      >
        <el-form-item label="角色名">
          <el-input v-model="searchRole" placeholder="请输入角色名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toSearchList">搜索</el-button>
          <el-button @click="toResetList">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 16px">
      <el-button type="primary" @click="addOrEditRole">添加角色</el-button>
      <el-table style="margin-top: 16px" :data="tableData" border
        >>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>

        <el-table-column
          prop="createTime"
          label="创建时间"
          width="120px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="120px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="280px">
          <template #default="{ row }">
            <el-button
              type="primary"
              icon="Avatar"
              size="small"
              @click="givePower(row)"
              >分配权限</el-button
            >
            <el-button
              type="warning"
              icon="Edit"
              size="small"
              @click="editRole(row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="DeleteFilled"
              size="small"
              @click="deleteRole(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 16px"
        v-model:current-page="page"
        v-model:page-size="limit"
        :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog v-model="dialogVisible" title="添加角色" width="30%">
      <el-input
        placeholder="请输入角色名"
        v-model="newRoleName.roleName"
      ></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addRoleFn"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer" title="分配权限" :with-header="false">
      <!-- 想要被选中传递id即可[node-key] -->
      <el-tree
        :default-checked-keys="exponse"
        :props="props"
        :data="treeData"
        :default-expand-all="true"
        show-checkbox
        ref="tree"
        node-key="id"
      />
      <template #footer>
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped></style>
