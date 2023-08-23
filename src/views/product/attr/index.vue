<script setup lang="ts">
import { useCategoryStore } from "@/store/modules/category";
import { addOrUpdateAttr, deleteAttr } from "@/api/product/attr";
import { watch, reactive, ref, nextTick, onBeforeMount } from "vue";
import { Attr } from "@/api/product/attr/type";
import { ElMessage, ElMessageBox } from "element-plus";
let store = useCategoryStore();
watch(
  () => store.c3Id,
  (newVal) => {
    store.arrList = [];
    if (newVal !== "") {
      store.getAttrList();
    }
  }
);
// 0表示展示列表，1表示添加属性
let scene = ref<number>(0);
// 新增数据列表
let changeScene = (value) => {
  attrParams.attrName = "";
  attrParams.attrValueList = [];
  scene.value = value;
};
// 编辑数据列表
let editItem = (row) => {
  changeScene(1);
  // 深拷贝
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
  // 保证数据不为空
  if (attrParams.attrValueList.length > 0) {
    attrParams.attrValueList.forEach((item) => {
      item.flag = false;
    });
  }
};
// 定义一个数组存储input的组件实例
let inputRef = ref<any[]>([]);
// 新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: "", // 属性名
  attrValueList: [
    // 属性的值
    // {
    //   valueName: "",
    // },
  ],
  categoryId: store.c3Id, // 三级分类id
  categoryLevel: 3, // 三级分类
});
// 添加属性
let addAttr = () => {
  attrParams.attrValueList.push({
    valueName: "",
    flag: true,
  });
  nextTick(() => {
    // 组件刚刚创建不一定能拿到实例，所以需要使用nextTick
    inputRef.value[attrParams.attrValueList.length - 1].focus();
  });
};
const submit = () => {
  // 保证属性名不为空
  if (!attrParams.attrName) {
    ElMessage.error("属性名不能为空");
    return;
  }
  // 保证属性值不为空
  if (attrParams.attrValueList.length === 0) {
    ElMessage.error("属性值不能为空");
    return;
  }
  addOrUpdateAttr(attrParams).then((res) => {
    if (res.code === 200) {
      changeScene(0);
      store.getAttrList();
      ElMessage.success("添加成功");
    } else {
      ElMessage.error(res.message);
    }
  });
};
// 定义一个响应式数据控制查看模式和编辑模式的切换
// 查看模式
const toLook = (row, index) => {
  row.flag = false;
  // 保证文本内容有值不为空（失去焦点的时候）
  if (row.valueName) {
    // 如果数据重复，进行删除
    for (let i = 0; i < attrParams.attrValueList.length; i++) {
      // i !== index 保证不是同一个数据
      if (
        attrParams.attrValueList[i].valueName === row.valueName &&
        i !== index
      ) {
        console.log(index, i);
        attrParams.attrValueList.splice(index, 1);
        ElMessage.error("属性值不能重复");
        return;
      }
    }
    row.flag = false;
  } else {
    // 如果为空删除数据为空的数据
    attrParams.attrValueList.splice(index, 1);
    ElMessage.error("属性值不能为空");
    row.flag = true;
  }
};
// 编辑模式
const toEdit = (row, index) => {
  row.flag = true;
  // 进行聚焦
  // ref函数将instance传递给inputRef,通过inputRef[index]获取到当前点击的实例
  nextTick(() => {
    inputRef.value[index].focus();
  });
};
// 删除模式
const deleteItem = (row) => {
  ElMessageBox.confirm("此操作将永久删除该属性, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteAttr(row.id).then((res) => {
        if (res.code === 200) {
          store.getAttrList();
          ElMessage.success("删除成功!");
        } else {
          ElMessage.error(res.message);
        }
      });
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    });
};
onBeforeMount(() => {
  // 组件销毁的时候重置store
  store.$reset();
});
</script>

<template>
  <div>
    <el-card>
      <Category :scene="scene"></Category>
    </el-card>
    <el-card v-show="!scene" style="margin-top: 16px">
      <el-button
        type="primary"
        icon="Plus"
        @click="changeScene(1)"
        :disabled="!store.c3Id"
      >
        添加平台属性
      </el-button>
      <div style="margin-top: 16px"></div>
      <el-table :data="store.arrList" border width="100%">
        <el-table-column
          prop="id"
          align="center"
          label="序号"
          type="index"
          width="80"
        />
        <el-table-column
          prop="attrName"
          align="center"
          label="属性名称"
          width="150"
        />
        <el-table-column prop="attrValueList" align="center" label="属性值名称">
          <template #default="{ row }">
            <el-tag
              effect="dark"
              class="mx-1"
              v-for="item in row.attrValueList"
              :key="item.id"
              style="margin-right: 8px"
            >
              <div>{{ item.valueName }}</div>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template #default="{ row }">
            <el-button
              type="warning"
              size="default"
              icon="Edit"
              @click="editItem(row)"
            ></el-button>
            <el-button
              type="danger"
              size="default"
              icon="Delete"
              @click="deleteItem(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card v-show="scene" style="margin-top: 16px">
      <el-form :model="attrParams" class="demo-form-inline">
        <el-form-item label="属性名称" prop="attrParams.attrName">
          <el-input
            :input-style="{ width: '180px' }"
            v-model="attrParams.attrName"
            placeholder="请输入属性名称"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="Plus"
            :disabled="!attrParams.attrName"
            @click="addAttr"
          >
            添加属性
          </el-button>
          <el-button @click="changeScene(0)"> 取消 </el-button>
        </el-form-item>
        <el-form-item>
          <!-- 动态表格 -->
          <el-table :data="attrParams.attrValueList" border style="width: 100%">
            <el-table-column
              prop="id"
              align="center"
              label="序号"
              type="index"
              width="80"
            ></el-table-column>
            <el-table-column prop="attrName" label="属性值">
              <template #default="{ row, $index }">
                <el-input
                  v-show="row.flag"
                  placeholder="请输入属性值名称"
                  v-model="row.valueName"
                  @blur="toLook(row, $index)"
                  :ref="(vc:any)=>inputRef[$index]=vc"
                ></el-input>
                <div
                  v-show="!row.flag"
                  @click="toEdit(row, $index)"
                  style="width: 100%; height: 100%"
                >
                  {{ row.valueName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="{ $index }">
                <el-button
                  type="danger"
                  size="default"
                  icon="Delete"
                  @click="attrParams.attrValueList.splice($index, 1)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit"> 保存 </el-button>
          <el-button @click="changeScene(0)"> 取消 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
