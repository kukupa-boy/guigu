<script setup lang="ts">
import {
  reqAllPermission,
  reqAddOrUpdatePermission,
  reqDeletePermission,
} from "@/api/acl/permission";
import { ElMessage, ElMessageBox } from "element-plus";
import type {
  MenuData,
  MenuResponseData,
  addDataTypes,
} from "@/api/acl/permission/type";
import { onMounted, ref } from "vue";

const tableData = ref<MenuData[]>(null);
let dialogVisible = ref(false);

const addData = ref<addDataTypes>({
  name: "",
  code: "",
  pid: 0,
  level: 0,
});
onMounted(async () => {
  getList();
});
const getList = async () => {
  const result: MenuResponseData = await reqAllPermission();
  console.log("result", result.data[0]);
  tableData.value = [result.data[0]];
};
// 添加菜单打开
const addMenu = (row: MenuData, index) => {
  if (index == 0) {
    Object.assign(addData.value, {
      name: "",
      code: "",
      pid: row.id,
      level: row.level + 1, // 添加子菜单所以要加一
    });
  } else {
    Object.assign(addData.value, {
      name: row.name,
      code: row.code,
      pid: row.pid,
      level: row.level,
      id: row.id,
    });
  }

  dialogVisible.value = true;
};
// 提交菜单
const addOrEditMenu = () => {
  reqAddOrUpdatePermission(addData.value)
    .then((res) => {
      if (res.code == 200) {
        ElMessage.success("保持成功");
        dialogVisible.value = false;
        getList();
      } else {
        ElMessage.error("保存失败");
      }
    })
    .catch(() => {
      ElMessage.error("保存失败");
    });
};
// 删除菜单
const deleteMenu = (row: MenuData) => {
  ElMessageBox.confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      reqDeletePermission(row.id)
        .then((res) => {
          if (res.code == 200) {
            ElMessage.success("删除成功");
            // 刷新页面
            getList();
            // window.location.reload();
          } else {
            ElMessage.error("删除失败");
          }
        })
        .catch(() => {
          ElMessage.error("删除失败");
        });
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    });
};
</script>

<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="name" label="名称" />
      <!-- 权限值相当于路由的name，到时候用于做权限管理 -->
      <el-table-column prop="code" label="权限值" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作">
        <!-- 一级不能编辑和删除，一级二级添加菜单，三级添加功能，四级添加菜单禁用 -->
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="addMenu(row, 0)"
            :disabled="row.level == '4'"
            >{{ row.level == 3 ? "添加功能" : "添加菜单" }}</el-button
          >
          <el-button
            type="warning"
            size="small"
            :disabled="row.level == '1'"
            @click="addMenu(row, 1)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            :disabled="row.level == '1'"
            @click="deleteMenu(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      :title="addData.level == 3 ? '添加功能' : '添加功能'"
      width="30%"
    >
      <el-form label-width="80px">
        <el-form-item :label="addData.level == 3 ? '功能名称' : '菜单名称'">
          <el-input
            :placeholder="
              addData.level == 3 ? '请输入功能名称' : '请输入菜单名称'
            "
            v-model="addData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input placeholder="添加权限值" v-model="addData.code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addOrEditMenu"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped></style>
