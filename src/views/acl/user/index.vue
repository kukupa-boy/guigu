<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import {
  getAllUser,
  addUser,
  getAllRole,
  editRole,
  deleteUser,
  deleteBatchUser,
} from "@/api/acl/user";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import user from "@/store/modules/user";
import type {
  User,
  UserReponseData,
  Records,
  RoleReponseData,
  Role,
} from "@/api/acl/user/type";
let search = ref("");
let drawerVisible = ref(false);
let page = ref(1);
let limit = ref(5);
let total = ref(0);
let tableData = ref<Records>(null);
let userFormInstance = ref<FormInstance>();
let userForm = reactive<User>({
  username: "",
  password: "",
  name: "",
  id: "",
});
let store = user();
let userRules = reactive<FormRules<User>>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" },
  ],
  name: [
    { required: true, message: "请输入用户昵称", trigger: "blur" },
    { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" },
  ],
});
let roleDrawerVisible = ref(false);
// 收集用户角色分配数据
let roleAllocationData = reactive({
  id: "",
  username: "",
  currentCheckData: null, // 当前选中的checkbox数据
});
let roleFormInstance = ref<FormInstance>();
let roleAllocationRules = reactive<FormRules<any>>({
  currentCheckData: [
    { required: true, message: "请选择角色", trigger: "blur" },
  ],
});
let checkAll = ref(false); // 角色是否全选
let isIndeterminate = ref(false); // 角色是否半选
let allCheckData = ref<Role[]>(null); // 所有角色数据
let deleteIdList = ref<string[]>([]); // 批量删除的id列表
onMounted(() => {
  getList();
});
// 获取用户列表
const getList = async () => {
  let result: UserReponseData = await getAllUser(
    page.value,
    limit.value,
    search.value
  );
  if (result.code === 200) {
    total.value = result.data.total;
    tableData.value = result.data.records;
    page.value = result.data.current;
  } else {
    ElMessage.error(result.message);
  }
};
// 当前页数变化
const handleSizeChange = (value: number) => {
  limit.value = value;
  getList();
};
// 当前页码变化
const handleCurrentChange = (value: number) => {
  page.value = value;
  getList();
};
// 添加或者编辑用户
const addOrEditUser = (row: User) => {
  userForm.username = "";
  userForm.password = "";
  userForm.name = "";
  userForm.id = "";
  if (row) {
    Object.assign(userForm, row);
  }
  drawerVisible.value = true;
};
// 取消添加或者编辑用户
const cancelAddOrEditUser = () => {
  userFormInstance.value?.resetFields();
  drawerVisible.value = false;
};
// 确定添加或者编辑用户
const confirmAddOrEditUser = () => {
  userFormInstance.value?.validate(async (valid) => {
    if (valid) {
      addUser(userForm).then((res) => {
        if (res.code === 200) {
          ElMessage.success(userForm.id ? "编辑成功" : "添加成功");
          userFormInstance.value?.resetFields();
          drawerVisible.value = false;
          // 编辑完成后当前的用户可能没有了，这个时候要跳转到登陆页
          // 清除token和store，然后浏览器刷新
          store.clearUser().then(() => {
            // getList();
            window.location.reload();
          });
        } else {
          ElMessage.error(userForm.id ? "编辑失败" : "添加失败");
        }
      });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
// drawer关闭的回调
const closeDrawer = () => {
  userFormInstance.value?.resetFields();
};
// 表格选择的回调
const handleSelectionChange = (val: User[]) => {
  // 用户选择的表格头
  deleteIdList.value = val.map((item) => {
    return item.id;
  });
};
// 打开分配角色的drawer
const roleAllocation = async (row: User) => {
  Object.assign(roleAllocationData, row);
  // 获取已有的角色和选中的角色进行渲染
  let result: RoleReponseData = await getAllRole(row.id);
  if (result.code === 200) {
    allCheckData.value = result.data.allRolesList;
    roleAllocationData.currentCheckData = result.data.assignRoles;
    roleDrawerVisible.value = true;
    getList();
  } else {
    ElMessage.error(result.message);
  }
};
// 关闭或者修改分配角色的drawer
const cancelOrEditRole = (index) => {
  if (index === 0) {
    console.log("关闭");
    // 清除当前表单验证
    roleFormInstance.value?.resetFields();
    roleDrawerVisible.value = false;
  } else if (index === 1) {
    roleFormInstance.value?.validate(async (valid) => {
      if (valid) {
        let arrid: number[] = Object.values(
          roleAllocationData.currentCheckData.map((item) => {
            return item.id;
          })
        );
        let data = {
          userId: roleAllocationData.id,
          roleIdList: arrid,
        };
        editRole(data)
          .then((res) => {
            if (res.code === 200) {
              getList();
              roleDrawerVisible.value = false;
            } else {
              ElMessage.error(res.message);
            }
          })
          .catch((error) => {
            ElMessage.error(error);
          });
      } else {
        console.log("error submit!!");
        return false;
      }
    });
    console.log("修改");
  }
};
// 控制全选和全选半选的状态
const handleCheckAllChange = (val: boolean) => {
  roleAllocationData.currentCheckData = val ? allCheckData.value : [];
  isIndeterminate.value = false;
};
// 控制全选，半选的状态
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === allCheckData.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allCheckData.value.length;
};
//删除用户
const deleteUserFn = (row: User) => {
  ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteUser(row.id).then((res) => {
        if (res.code === 200) {
          store.clearUser().then(() => {
            getList();
            window.location.reload();
          });
          ElMessage.success("删除成功");
          getList();
        } else {
          ElMessage.error(res.message);
        }
      });
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    });
};
// 批量删除
const deleteAll = () => {
  ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteBatchUser(deleteIdList.value).then((res) => {
        if (res.code === 200) {
          ElMessage.success("删除成功");
          getList();
        } else {
          ElMessage.error("删除失败");
        }
      });
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    });
};
const toSearchList = () => {
  getList();
};
const toResetList = () => {
  search.value = "";
  getList();
};
</script>

<template>
  <div>
    <el-card>
      <el-form
        :inline="true"
        style="display: flex; justify-content: space-between"
      >
        <el-form-item label="用户名">
          <el-input v-model="search" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toSearchList">搜索</el-button>
          <el-button @click="toResetList">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 16px">
      <el-button type="primary" @click="addOrEditUser">添加用户</el-button>
      <el-button
        type="danger"
        @click="deleteAll"
        :disabled="deleteIdList.length < 1"
        >批量删除</el-button
      >
      <el-table
        style="margin-top: 16px"
        :data="tableData"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column
          prop="name"
          show-overflow-tooltip
          label="用户昵称"
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色"
          width="180px"
        ></el-table-column>
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
              @click="roleAllocation(row)"
              >分配角色</el-button
            >
            <el-button
              type="warning"
              icon="Edit"
              size="small"
              @click="addOrEditUser(row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="DeleteFilled"
              size="small"
              @click="deleteUserFn(row)"
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
    <!-- 添加编辑角色 -->
    <el-drawer
      v-model="drawerVisible"
      :title="!userForm.id ? '添加用户' : '编辑用户'"
      @closed="closeDrawer"
    >
      <el-form
        :rules="userRules"
        :model="userForm"
        ref="userFormInstance"
        label-width="80px"
        :hide-required-asterisk="true"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="userForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            v-model="userForm.name"
            placeholder="请输入用户昵称"
          ></el-input>
        </el-form-item>

        <el-form-item label="用户密码" prop="password" v-if="!userForm.id">
          <el-input
            v-model="userForm.password"
            placeholder="请输入用户密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelAddOrEditUser">取消</el-button>
        <el-button type="primary" @click="confirmAddOrEditUser">确定</el-button>
      </template>
    </el-drawer>
    <!-- 角色分配 -->
    <el-drawer
      v-model="roleDrawerVisible"
      title="分配角色"
      @closed="cancelOrEditRole(0)"
    >
      <el-form
        :rules="roleAllocationRules"
        :model="roleAllocationData"
        ref="roleFormInstance"
        label-width="80px"
        :hide-required-asterisk="true"
      >
        <el-form-item label="用户姓名" prop="username">
          <el-input
            :disabled="true"
            v-model="roleAllocationData.username"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色列表" prop="currentCheckData">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <el-checkbox-group
            v-model="roleAllocationData.currentCheckData"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="item in allCheckData"
              :key="item"
              :label="item"
              >{{ item.roleName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelOrEditRole(0)">取消</el-button>
        <el-button type="primary" @click="cancelOrEditRole(1)">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped></style>
