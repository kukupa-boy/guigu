<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getSkuList,
  skuUp,
  skuDown,
  getSkuInfo,
  deleteSku,
} from "@/api/product/sku";
import type { SkuData } from "@/api/product/sku/type";
import { ElMessage, ElMessageBox } from "element-plus";
let page = ref<number>(1);
let limit = ref<number>(10);
let total = ref<number>(0);
let tableDate = ref<SkuData[]>([]);
let drawer = ref<boolean>(false);
const detail1 = ref<SkuData>(null);
const handleSizeChange = (val) => {
  limit.value = val;
  getList();
};
const handleCurrentChange = (val) => {
  page.value = val;
  getList();
};
const getList = () => {
  getSkuList(page.value, limit.value)
    .then((res) => {
      if (res.code === 200) {
        total.value = res.data.total;
        tableDate.value = res.data.records;
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
};
// 上架或者下架
const upOrDown = (row) => {
  ElMessageBox.confirm(
    `是否${row.isSale == 1 ? "下架" : "上架"}该商品`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(() => {
      if (row.isSale == 1) {
        skuDown(row.id).then((res) => {
          if (res.code === 200) {
            ElMessage.success("下架" + res.message);
            getList();
          } else {
            ElMessage.error(res.message);
          }
        });
      } else {
        skuUp(row.id).then((res) => {
          if (res.code === 200) {
            ElMessage.success("上架" + res.message);
            getList();
          } else {
            ElMessage.error(res.message);
          }
        });
      }
    })
    .catch(() => {
      ElMessage.info("已取消操作");
    });
};
// 查看sku详情
const toView = async (row) => {
  // 获取sku详情
  let result = await getSkuInfo(row.id);
  console.log("detail", detail1.value);
  // .then((res) => {
  if (result.code === 200) {
    detail1.value = result.data;
    drawer.value = true;
  } else {
    ElMessage.error(result.message);
  }
  // });
};
// 删除sku
const deleteSkuFn = (row) => {
  ElMessageBox.confirm(`是否删除该商品`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteSku(row.id).then((res) => {
        if (res.code === 200) {
          ElMessage.success("删除" + res.message);
          if (page.value > 1 && tableDate.value.length === 1) {
            page.value = page.value - 1;
          }
          getList();
        } else {
          ElMessage.error(res.message);
        }
      });
    })
    .catch(() => {
      ElMessage.info("已取消操作");
    });
};
onMounted(() => {
  getList();
});
</script>

<template>
  <el-card>
    <el-table border :data="tableDate">
      <el-table-column label="序号" type="index" width="80px" align="center" />
      <el-table-column
        label="名称"
        width="150px"
        prop="skuName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="描述"
        width="400px"
        prop="skuDesc"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="默认图片" width="150" prop="skuDefaultImg">
        <template #default="{ row }">
          <el-image
            :src="row.skuDefaultImg"
            fit="cover"
            style="width: 100px; height: 100px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="重量(g)" width="120px" prop="weight" />
      <el-table-column label="价格(元)" width="120px" prop="price" />
      <el-table-column label="操作" fixed="right" width="210px">
        <template #default="{ row }">
          <!-- 为1表示上架的状态，为0表示下架的状态  -->
          <el-button
            :type="row.isSale == 1 ? 'warning' : 'success'"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            size="small"
            @click="upOrDown(row)"
          ></el-button>
          <el-button type="primary" icon="Edit" size="small"></el-button>
          <el-button
            type="info"
            icon="View"
            size="small"
            @click="toView(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="DeleteFilled"
            size="small"
            @click="deleteSkuFn(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 16px"></div>
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="limit"
      background
      :total="total"
      :page-sizes="[10, 20, 30]"
      layout="prev, pager, next, jumper,->,total, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <el-drawer v-model="drawer" title="sku详情">
      <el-row style="margin-top: 10px">
        <el-col :span="6">名称</el-col>
        <el-col :span="18">{{ detail1.skuName }}</el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6">描述</el-col>
        <el-col :span="18">{{ detail1.skuDesc }}</el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6">价格(元)</el-col>
        <el-col :span="18">{{ detail1.price }}</el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6">平台属性</el-col>
        <el-col :span="18">
          <el-tag
            class="ml-2"
            type="success"
            :key="item.id"
            v-for="item in detail1.skuAttrValueList"
            >{{ item.valueName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="6">销售属性</el-col>
        <el-col :span="18">
          <el-tag
            class="ml-2"
            type="success"
            :key="item.id"
            v-for="item in detail1.skuSaleAttrValueList"
            >{{ item.saleAttrValueName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px" v-if="detail1.skuImageList.length > 0">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">
          <el-carousel
            :interval="4000"
            type="card"
            height="100px"
            indicator-position="none"
          >
            <el-carousel-item
              v-for="item in detail1.skuImageList"
              :key="item.id"
            >
              <h3 text="2xl" justify="center">
                <img :src="item.imgUrl" style="width: 100%; height: 100%" />
              </h3>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </el-card>
</template>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 100px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
