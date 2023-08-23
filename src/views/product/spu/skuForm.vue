<script setup lang="ts">
import { useCategoryStore } from "@/store/modules/category";
import { getImagesList, getSaleAttrList, addSku } from "@/api/product/spu";
import type { AttrList } from "@/api/product/attr/type";
import type {
  SpuImagesData,
  SaleAttrListData,
  SpuImg,
  SaleAttrObj,
  SkuData,
} from "@/api/product/spu/type";
import { ref } from "vue";
import { ElMessage } from "element-plus";
let store = useCategoryStore();
let $emit = defineEmits(["changeSceneZero"]);

const plateformList = ref<AttrList>([]);
const imgList = ref<SpuImg[]>([]);
// 全部的销售属性
const allSaleAttr = ref<SaleAttrObj[]>([]);
// 收集sku的参数
const skuParams = ref<SkuData>({
  category3Id: "",
  spuId: "",
  skuName: "",
  tmId: "",
  price: "",
  weight: "",
  skuDesc: "",
  skuAttrValueList: [], //平台属性
  skuSaleAttrValueList: [], //销售属性
  skuDefaultImg: "",
});
const initSkuData = async (row) => {
  // 清除数据
  skuParams.value = {
    category3Id: "",
    spuId: "",
    skuName: "",
    tmId: "",
    price: "",
    weight: "",
    skuDesc: "",
    skuAttrValueList: [], //平台属性
    skuSaleAttrValueList: [], //销售属性
    skuDefaultImg: "",
  };
  // 获取平台属性属性
  await store.getAttrList();
  let attrList: AttrList = store.arrList;
  plateformList.value = attrList;
  // 获取照片墙的图片
  let SpuImagesResult: SpuImagesData = await getImagesList(row.id);
  imgList.value = SpuImagesResult.data;
  // 获取销售属性
  let AttrResponseResult: SaleAttrListData = await getSaleAttrList(row.id);
  allSaleAttr.value = AttrResponseResult.data;
  // 收集传递过来的数据
  skuParams.value.category3Id = row.category3Id;
  skuParams.value.spuId = row.id;
  skuParams.value.tmId = row.tmId;
};
let multipleTableRef = ref(null);
// 设置默认图片
const handler = (row, index) => {
  // 重置所有的默认图片
  imgList.value.forEach((item) => {
    item.isDefault = false;
    // 重置所有表格中的selection(element-plus的方法都可以通过ref拿到实例进行调用)
    multipleTableRef.value.toggleRowSelection(item, false);
  });
  multipleTableRef.value.toggleRowSelection(row, true);
  imgList.value[index].isDefault = true;
  skuParams.value.skuDefaultImg = row.imgUrl;
  //
};
const cancel = () => {
  $emit("changeSceneZero", 0, undefined);
};
const submit = () => {
  // 筛选平台属性
  skuParams.value.skuAttrValueList = plateformList.value
    .map((item) => {
      if (item.selectPlateformValue) {
        return {
          attrId: item.selectPlateformValue.split(":")[0],
          valueId: item.selectPlateformValue.split(":")[1],
        };
      }
    })
    .filter((l) => l != undefined);
  // 筛选销售属性
  skuParams.value.skuSaleAttrValueList = allSaleAttr.value
    .map((item) => {
      if (item.selectSaleAttrValue) {
        return {
          saleAttrId: item.selectSaleAttrValue.split(":")[0],
          saleAttrValueId: item.selectSaleAttrValue.split(":")[1],
        };
      }
    })
    .filter((l) => l != undefined);
  addSku(skuParams.value)
    .then((res) => {
      if (res.code == 200) {
        ElMessage.success("添加sku成功");
        $emit("changeSceneZero", 0, undefined);
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
};
defineExpose({
  initSkuData,
});
</script>

<template>
  <div>
    <el-form>
      <el-form-item label="sku名称" prop="name">
        <el-input placeholder="sku名称" v-model="skuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)" prop="description">
        <el-input placeholder="价格(元)" v-model="skuParams.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)" prop="description">
        <el-input placeholder="重量(克)" v-model="skuParams.weight"></el-input>
      </el-form-item>
      <el-form-item label="sku描述" prop="description">
        <el-input
          type="textarea"
          placeholder="sku描述"
          v-model="skuParams.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性" prop="description">
        <!-- 如何收集平台属性的属性和属性值：收集到plateFormList上 -->
        <el-form :inline="true">
          <template v-for="item in plateformList" :key="item.id">
            <el-form-item :label="item.attrName" class="elItemStyle">
              <el-select
                :placeholder="'请选择' + item.attrName"
                :input-style="'inputStyle'"
                v-model="item.selectPlateformValue"
              >
                <el-option
                  :value="item.id + ':' + '' + attrValue.id"
                  v-for="attrValue in item.attrValueList"
                  :key="attrValue.id"
                  :label="attrValue.valueName"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性" prop="description">
        <el-form :inline="true">
          <template v-for="item in allSaleAttr" :key="item.id">
            <el-form-item :label="item.saleAttrName" class="elItemStyle">
              <el-select
                v-model="item.selectSaleAttrValue"
                :placeholder="'请输入' + item.saleAttrName"
                :input-style="'inputStyle'"
              >
                <el-option
                  v-for="attrValue in item.spuSaleAttrValueList"
                  :key="attrValue.id"
                  :label="attrValue.saleAttrValueName"
                  :value="item.id + ':' + '' + attrValue.id"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table
          border
          ref="multipleTableRef"
          :data="imgList"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            label="图片"
            width="180"
            align="center"
            prop="imgUrl"
          >
            <template #default="{ row }">
              <img :src="row.imgUrl" style="height: 80px; width: 80px" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" />
          <el-table-column
            property="address"
            label="操作"
            show-overflow-tooltip
            width="120"
          >
            <template #default="{ row, $index }">
              <el-button
                :type="!row.isDefault ? 'primary' : 'warning'"
                title="添加图片"
                @click="handler(row, $index)"
                >设置默认</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.inputStle {
  min-width: 180px;
  margin-top: 22px;
}
.elItemStyle {
  margin-top: 16px;
}
</style>
