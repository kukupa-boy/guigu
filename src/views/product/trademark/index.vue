<script setup lang="ts">
import {
  getTradeMarkList,
  saveOrUpdateTradeMark,
  deleteTradeMark,
} from "@/api/product/trademark";
import { onMounted, reactive, ref } from "vue";
import type { TableData, TradeMarkList } from "@/api/product/trademark/type";
import type { FormInstance, FormRules, UploadProps } from "element-plus";

import { ElMessage, ElMessageBox } from "element-plus";
let tableData = reactive<TableData>({
  page: 1,
  limit: 3,
  total: 0,
  list: [],
});
let closeSate = ref<boolean>(false);
let ruleFormRef = ref<FormInstance>();
interface RuleForm {
  id: number;
  tmName: string;
  logoUrl: string;
}
// 新增修改数据
let ruleForm = reactive<RuleForm>({
  id: 0,
  tmName: "",
  logoUrl: "",
});
let rules = reactive<FormRules<RuleForm>>({
  tmName: [
    { required: true, message: "请输入品牌名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  logoUrl: [{ required: true, message: "请上传品牌logo", trigger: "blur" }],
});
onMounted(() => {
  getList(tableData.page, tableData.limit);
});
const getList = async (page: number, limit: number) => {
  let result: TradeMarkList = await getTradeMarkList(page, limit);
  tableData.total = result.data.total;
  tableData.list = result.data.records;
};
const handleSizeChange = (value) => {
  tableData.limit = value;
  getList(tableData.page, tableData.limit);
};
const handleCurrentChange = (value) => {
  tableData.page = value;
  getList(tableData.page, tableData.limit);
};
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  ruleForm.logoUrl = response.data;
  // ruleForm.logoUrl = URL.createObjectURL(uploadFile.raw!);
  console.log("response", response, ruleForm.logoUrl, uploadFile);
  // 图片上传成功清理表单验证的提示信息
  ruleFormRef.value.clearValidate("logoUrl");
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type !== "image/jpeg" &&
    rawFile.type !== "image/png" &&
    rawFile.type !== "image/gif"
  ) {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
const confirm = (ruleFormRef) => {
  ruleFormRef.validate(async (valid) => {
    if (valid) {
      // 表单验证通过
      // 发送请求
      // 关闭弹窗
      saveOrUpdateTradeMark(ruleForm).then((res) => {
        if (res.code === 200) {
          ElMessage({
            message: ruleForm.id ? "修改成功" : "添加成功",
            type: "success",
          });
          getList(tableData.page, tableData.limit);
        } else {
          ElMessage({
            message: ruleForm.id ? "修改失败" : "添加失败",
            type: "error",
          });
        }
        closeSate.value = false;
      });
    } else {
      // 表单验证失败
      return false;
    }
  });
};
// 修改按钮
const edit = (row) => {
  // 清除表单验证信息
  ruleFormRef.value?.clearValidate();
  // 展示已有品牌的数据
  ruleForm.id = row.id;
  ruleForm.tmName = row.tmName;
  ruleForm.logoUrl = row.logoUrl;
  closeSate.value = true;
};
// 取消编辑
const cancelEdit = () => {
  ruleForm.id = 0;
  ruleForm.tmName = "";
  ruleForm.logoUrl = "";
  closeSate.value = false;
};
// 新建tradeMarkdialog
const createTrademark = () => {
  ruleForm.id = 0;
  ruleForm.tmName = "";
  ruleForm.logoUrl = "";
  // 打开编辑前清除表单验证信息(第一次打开可能没有ruleFormRef实例)
  ruleFormRef.value?.clearValidate();
  // 第二种清除表单验证信息的方法
  /*
    nextTick(() => {
      ruleFormRef.value.resetFields();
    });
  */
  closeSate.value = true;
};

// 表单删除
const deleteTradeMarkFn = (row) => {
  ElMessageBox.confirm("此操作将永久删除该品牌, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteTradeMark(row.id)
        .then((res) => {
          if (res.code === 200) {
            getList(tableData.page, tableData.limit);
            ElMessage({
              type: "success",
              message: "删除成功!",
            });
          } else {
            ElMessage({
              type: "error",
              message: "删除失败!",
            });
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "删除失败",
          });
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};
</script>

<template>
  <el-card class="box-card">
    <el-button type="primary" icon="Plus" @click="createTrademark">
      添加按钮</el-button
    >
    <div style="margin-top: 16px"></div>
    <el-table :data="tableData.list" border style="width: 100%">
      <el-table-column
        prop="id"
        align="center"
        label="序号"
        type="index"
        width="80"
      />
      <el-table-column
        prop="tmName"
        align="center"
        label="品牌名称"
        width="180"
      />
      <el-table-column prop="logoUrl" align="center" label="品牌logo">
        <template #default="scope">
          <img
            :src="scope.row.logoUrl"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="option" align="center" label="品牌操作">
        <template #default="{ row }">
          <el-button type="primary" icon="Edit" @click="edit(row)" circle />
          <el-button
            type="danger"
            icon="Delete"
            @click="deleteTradeMarkFn(row)"
            circle
          />
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 16px"></div>
    <!-- prev, pager, next, jumper,->,sizes,total 表示分页器六个组件的位置，->表示将后面的组件放置到最右边 -->
    <el-pagination
      v-model:current-page="tableData.page"
      v-model:page-size="tableData.limit"
      :page-sizes="[3, 5, 7, 9]"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="tableData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      v-model="closeSate"
      :title="!ruleForm.id ? '添加品牌' : '修改品牌'"
      width="40%"
      destroy-on-close
      @closed="cancelEdit"
      center
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="ruleForm.tmName" />
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl">
          <!-- 必须带有api，否则代理服务器不会发送请求 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="ruleForm.logoUrl"
              :src="ruleForm.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div
          class="dialog-footer"
          style="display: flex; justify-content: flex-end"
        >
          <el-button @click="cancelEdit">取消</el-button>
          <el-button type="primary" @click="confirm(ruleFormRef)">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  border: 1px solid #f8f8f8;
}
</style>
