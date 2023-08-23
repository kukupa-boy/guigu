<script setup lang="ts">
// 添加修改spu的结构
import { ref, nextTick, computed } from "vue";
import {
  getBrandList,
  getImagesList,
  getSaleAttrList,
  getBaseSaleAttrList,
  addOrUpdateSpu,
} from "@/api/product/spu";
import type {
  BrandListData,
  SpuImagesData,
  SaleAttrListData,
  HasSaleAttrResponseDate,
  Trademark,
  SpuImg,
  SpuData,
  HasSaleAttr,
  SaleAttrObj,
} from "@/api/product/spu/type";
import { useCategoryStore } from "@/store/modules/category";
import { ElMessage } from "element-plus";
let store = useCategoryStore();
let $emit = defineEmits(["changeSceneZero"]);
const cancel = () => {
  $emit("changeSceneZero", 0, undefined);
};
// 所有的品牌数据
const AllradeMark = ref<Trademark[]>([]);
// 商品图片
const imgList = ref<SpuImg[]>([]);
// spu销售属性
const saleAttrList = ref<HasSaleAttr[]>([]);
// 全部的销售属性
const allSaleAttr = ref<SaleAttrObj[]>([]);

// 存储已有的spu对象
let spuParams = ref<SpuData>({
  id: 0,
  spuName: "",
  description: "",
  category3Id: store.c3Id,
  tmId: "", // 品牌id
  spuSaleAttrList: [], // 销售属性
  spuImageList: [], // 图片列表
});
// 照片墙预览
const dialogImageUrl = ref<string>("");
const dialogVisible = ref<boolean>(false);
// 初始化带有id的数据
const initHasSpuData = async (row: SpuData) => {
  spuParams.value = row;
  // 获取全部的品牌数据
  let BrandListResult: BrandListData = await getBrandList();
  AllradeMark.value = BrandListResult.data;
  // 获取spu下面的全部售卖商品的图片的数据
  let SpuImagesResult: SpuImagesData = await getImagesList(row.id);
  imgList.value = SpuImagesResult.data.map((item) => {
    return {
      url: item.imgUrl,
      name: item.imgName,
    };
  });
  // 获取spu销售属性列表
  let AttrResponseResult: HasSaleAttrResponseDate = await getBaseSaleAttrList();
  saleAttrList.value = AttrResponseResult.data;
  // 获取spu下面的全部售卖商品的基本销售属性的数据
  let SaleAttrResult: SaleAttrListData = await getSaleAttrList(row.id);
  allSaleAttr.value = SaleAttrResult.data;
  //   spuNames.
};

// 初始化不带有id的数据
const initData = async () => {
  Object.assign(spuParams.value, {
    id: 0,
    spuName: "",
    description: "",
    category3Id: store.c3Id,
    tmId: "", // 品牌id
    spuSaleAttrList: [], // 销售属性
    spuImageList: [], // 图片列表
  });
  imgList.value = [];
  allSaleAttr.value = [];
  unSelectAttrIdAndName.value = "";
  let BrandListResult: BrandListData = await getBrandList();
  AllradeMark.value = BrandListResult.data;
  let AttrResponseResult: HasSaleAttrResponseDate = await getBaseSaleAttrList();
  saleAttrList.value = AttrResponseResult.data;
  spuParams.value.category3Id = store.c3Id;
};
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
  console.log("预览", file);
};

const handleRemove = (file, fileList) => {
  console.log("删除", file, fileList);
};
const beforeAvatarUpload = (file) => {
  // 约束上传文件的大小
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG && !isPNG) {
    ElMessage.error("上传头像图片只能是 JPG/PNG 格式!");
  }
  if (!isLt2M) {
    ElMessage.error("上传头像图片大小不能超过 2MB!");
  }
  return (isJPG || isPNG) && isLt2M;
};

// 计算表格中没有的销售属性(只有没有才被允许添加到表格中)
let unSelectAttr = computed(() => {
  return saleAttrList.value.filter((item) => {
    return !allSaleAttr.value.some((item2) => {
      return item.name === item2.saleAttrName;
    });
  });
});

// 收集还未选择的销售属性的id和名字(添加销售属性的时候需要这个)
const unSelectAttrIdAndName = ref<string>("");
// 添加属性
const addAttrFn = () => {
  let [id, name] = unSelectAttrIdAndName.value.split(":");
  allSaleAttr.value.push({
    baseSaleAttrId: Number(id),
    saleAttrName: name,
    inputVisible: true,
    spuSaleAttrValueList: [],
  });
  // 清空
  unSelectAttrIdAndName.value = "";
  nextTick(() => {
    InputRef.value[InputRef.value.length - 1].focus();
  });
};
const handleClose = (index1, index2) => {
  if (allSaleAttr.value[index1].spuSaleAttrValueList.length <= 1) {
    ElMessage.error("至少保留一个销售属性值");
    return;
  }
  allSaleAttr.value[index1].spuSaleAttrValueList.splice(index2, 1);
};
const InputRef = ref<any>([]);
const newTag = ref<string>("");
const showInput = (row, index) => {
  row.inputVisible = true;
  nextTick(() => {
    InputRef.value[index].focus();
  });
};
const handleInputConfirm = (row, index) => {
  let inputValue = newTag.value;
  if (inputValue) {
    // 判断inputValue是否出现在spuSaleAttrValueList中
    let flag = allSaleAttr.value[index].spuSaleAttrValueList.some((item) => {
      if (item.saleAttrValueName == inputValue) {
        return true;
      }
    });
    if (flag) {
      ElMessage.error("不能添加相同的属性值");
    } else {
      allSaleAttr.value[index].spuSaleAttrValueList.push({
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrValueName: inputValue,
      });
    }
  } else {
    // 如果只有一个值且为空,删除整列数据
    if (allSaleAttr.value[index].spuSaleAttrValueList.length < 1) {
      allSaleAttr.value.splice(index, 1);
      return;
    } else {
      allSaleAttr.value[index].spuSaleAttrValueList.pop();
    }
    // 删除没有inputValue的数据,
    ElMessage.error("请输入属性值");
  }
  newTag.value = "";
  allSaleAttr.value[index].inputVisible = false;
};
const submit = () => {
  // 整理照片墙的数据
  spuParams.value.spuImageList = imgList.value.map((item) => {
    return {
      imgName: item.name,
      imgUrl: item.response ? item.response.data : item.url,
    };
  });
  // 整理属性的数据
  spuParams.value.spuSaleAttrList = allSaleAttr.value;
  addOrUpdateSpu(spuParams.value)
    .then((res) => {
      if (res.code == 200) {
        cancel();
        ElMessage.success(!spuParams.value.id ? "添加成功" : "修改成功");
      } else {
        ElMessage.error(!spuParams.value.id ? "添加失败" : "修改失败");
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
};
// 为什么不传id给子组件自己调用：v-show组件已近渲染，无法在一开始的时候给子组件传递ID
// 对外暴露方法(需要给子组件传递很多值（接口很多），可以拿取子组件的实例调用子组件的方法去渲染子组件)
defineExpose({
  initHasSpuData,
  initData,
});
</script>

<template>
  <div>
    <el-form label-width="100px" :model="spuParams">
      <el-form-item label="spu名称">
        <el-input
          placeholder="请你输入spu名称"
          v-model="spuParams.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="spu品牌">
        <!-- id值需要和后台返回的id值一样才会正确显示 -->
        <el-select v-model="spuParams.tmId">
          <el-option
            v-for="item in AllradeMark"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input
          type="textarea"
          placeholder="请你输入描述"
          v-model="spuParams.description"
        ></el-input>
      </el-form-item>
      <!-- 照片墙 -->
      <el-form-item label="照片墙">
        <el-upload
          class="upload-demo"
          action="/api/admin/product/fileUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          list-type="picture-card"
          v-model:file-list="imgList"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible" append-to-body>
          <img
            style="width: 100%; height: 100%"
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性值">
        <!-- 这个和表格中的属性是互相排斥的 -->
        <el-select
          :placeholder="
            unSelectAttr.length
              ? '还有' + unSelectAttr.length + '个没有选择'
              : ''
          "
          v-model="unSelectAttrIdAndName"
        >
          <el-option
            v-for="item in unSelectAttr"
            :label="item.name"
            :value="item.id + ':' + item.name"
            :key="item.id"
          ></el-option>
        </el-select>
        <el-button
          :disabled="!unSelectAttrIdAndName"
          @click="addAttrFn"
          style="margin-left: 8px"
          type="primary"
          icon="Plus"
          >添加属性</el-button
        >
        <el-table border style="margin-top: 10px" :data="allSaleAttr">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column
            prop="saleAttrName"
            label="销售属性名字"
            width="120"
            align="center"
          />
          <el-table-column
            label="销售属性值"
            prop="spuSaleAttrValueList"
            align="center"
          >
            <template #default="{ row, $index }">
              <el-tag
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                disable-transitions
                @close="handleClose($index, index)"
                style="margin: 5px"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                v-show="row.inputVisible"
                :ref="(vc:any) =>
                InputRef[$index]= vc"
                v-model="newTag"
                placeholder="请输入属性值"
                :input-style="{ width: '100px' }"
                size="small"
                @keyup.enter="handleInputConfirm(row, $index)"
                @blur="handleInputConfirm(row, $index)"
              />
              <el-button
                v-show="!row.inputVisible"
                class="button-new-tag ml-1"
                size="small"
                type="primary"
                @click="showInput(row, $index)"
              >
                +
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="操作" width="80" align="center">
            <template #default="{ $index }">
              <el-button
                type="danger"
                size="default"
                icon="Delete"
                @click="allSaleAttr.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="!(allSaleAttr.length > 0)"
          @click="submit"
          >保存</el-button
        >
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
