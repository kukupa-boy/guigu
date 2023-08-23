<script setup lang="ts">
// spu指一个产品的单元，比如iphone12，iphone11，ipad pro，macbook pro，macbook air等
// sku是库存量单位，比如iphone12 128G 白色 中国大陆版
import { onBeforeUnmount, ref, watch } from "vue";
import { useCategoryStore } from "@/store/modules/category";
import { getHasSpuList, getSkuList, deleteSpu } from "@/api/product/spu";
import type {
  records,
  SpuListData,
  SpuData,
  SkuListData,
  SkuData,
} from "@/api/product/spu/type";
import { ElMessage, ElMessageBox } from "element-plus";
import SkuForm from "./skuForm.vue";
import SpuForm from "./spuForm.vue";
const store = useCategoryStore();
// 0 列表 1添加修改spu 2添加sku的结构
let scene = ref<number>(0);
let page = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
const tableData = ref<records>([]);
let skuInstance = ref(null);
let spuInstance = ref(null);
let skuDataList = ref<SkuData[]>([]);
let skuDialog = ref(false);
const getList = (newVal) => {
  getHasSpuList(page.value, limit.value, newVal).then((res) => {
    if (res.code !== 200) {
      ElMessage.error(res.message);
      return;
    }
    let result: SpuListData = res;
    tableData.value = result.data.records;
    page.value = result.data.current;
    limit.value = result.data.size;
    total.value = result.data.total;
    ElMessage.success("获取列表成功");
  });
};
// 监听 useCategoryStore.c3Id 的变化，如果变化了，就重新获取列表
watch(
  () => store.c3Id,
  (newVal) => {
    if (newVal) {
      getList(newVal);
    }
  }
);
const handleSizeChange = (val) => {
  limit.value = val;
  getList(store.c3Id);
};
const handleCurrentChange = (val) => {
  page.value = val;
  getList(store.c3Id);
};
// 查看sku
const findSkuById = async (row) => {
  let result: SkuListData = await getSkuList(row.id);
  skuDataList.value = result.data;
  skuDialog.value = true;
};
// 改变场景
const changeSecne = (val, row: SpuData) => {
  if (val === 1 && row) {
    // 为什么不传id给子组件自己调用：v-show组件已近渲染，无法在一开始的时候给子组件传递ID
    // 需要给子组件传递很多值，可以拿取子组件的实例调用子组件的方法去渲染子组件
    spuInstance.value.initHasSpuData(row);
    // 修改spu
  } else if (val === 0 && !row) {
    // 获取spu的列表
    getList(store.c3Id);
  } else if (val === 1 && !row) {
    // 添加spu
    page.value = 1; // 添加完成跳转第一页
    spuInstance.value.initData();
  } else if (val === 2 && row) {
    // 添加sku
    skuInstance.value.initSkuData(row);
  }
  scene.value = val;
};
const deleteSpuFn = (id) => {
  // 删除spu
  ElMessageBox.confirm("是否删除该spu", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteSpu(id).then((res) => {
        if (res.code == 200) {
          ElMessage.success("删除成功");
          // 重新获取列表,判断当前的数组是否大于一
          if (tableData.value.length > 1) {
            getList(store.c3Id);
          } else if (tableData.value.length == 1 && page.value > 1) {
            page.value = page.value - 1;
          }
        } else {
          ElMessage.error(res.message);
        }
      });
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    });
};
// 清空仓库的数据
onBeforeUnmount(() => {
  store.$reset();
});
</script>

<template>
  <div>
    <el-card>
      <Category :scene="scene"></Category>
    </el-card>
    <div style="margin-top: 16px"></div>
    <el-card v-show="scene == 0">
      <el-button
        type="primary"
        icon="plus"
        :disabled="store.c3Id ? false : true"
        @click="changeSecne(1, undefined)"
        >添加SPU</el-button
      >
      <div style="margin-top: 16px"></div>
      <el-table border :data="tableData">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column
          prop="spuName"
          label="spu名称"
          align="center"
          width="180"
        />
        <el-table-column
          show-overflow-tooltip
          prop="description"
          label="spu描述"
        />
        <el-table-column align="center" label="操作" width="260">
          <template #default="{ row }">
            <!-- 添加 -->
            <el-button
              @click="changeSecne(2, row)"
              type="primary"
              icon="Plus"
              title="添加sku"
            >
            </el-button>
            <!-- 修改 -->
            <el-button
              type="warning"
              icon="Edit"
              @click="changeSecne(1, row)"
              title="修改spu"
            ></el-button>
            <!-- 查看 -->
            <el-button
              type="info"
              icon="View"
              @click="findSkuById(row)"
              title="查看spu"
            ></el-button>
            <el-button
              @click="deleteSpuFn(row.id)"
              type="danger"
              icon="DeleteFilled"
              title="删除spu"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="margin-top: 16px"></div>
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="limit"
        background
        :total="total"
        :page-sizes="[3, 5, 9]"
        layout="prev, pager, next, jumper,->,total, sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
    <el-card v-show="scene == 2">
      <SkuForm ref="skuInstance" @changeSceneZero="changeSecne"></SkuForm>
    </el-card>
    <el-card v-show="scene == 1">
      <SpuForm ref="spuInstance" @changeSceneZero="changeSecne"></SpuForm>
    </el-card>
    <el-dialog v-model="skuDialog">
      <!-- 展示skuDataList -->
      <el-table border :data="skuDataList">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column
          prop="skuName"
          label="sku名称"
          align="center"
          width="180"
        />
        <el-table-column prop="price" label="sku价格" />
        <el-table-column prop="price" label="sku重量" />
        <el-table-column label="sku图片">
          <template #default="{ row }">
            <img :src="row.imgUrl" style="height: 80px; width: 80px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<style scoped></style>
