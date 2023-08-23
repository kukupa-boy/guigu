<script setup lang="ts">
import { UserFilled, Lock } from "@element-plus/icons-vue";
import useUserState from "@/store/modules/user";
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getNowTime } from "@/utils/time";
import type { FormInstance, FormRules } from "element-plus";

let useStore = useUserState();
let loading = ref(false);
let router = useRouter();
let route = useRoute();
console.log("route", route);
let ruleFormRef = ref<FormInstance>();
interface RuleForm {
  username: string;
  password: string;
}
let ruleForm = reactive<RuleForm>({
  username: "admin",
  password: "atguigu123",
});
// 自定义校验规则
// rule为数组的校验对象，value为表单元素的文本内容，callback为回调函数(校验规则通过需要返回这个函数，不通过注入错误信息)
// ts-ignore
let validatePassword = (rule: any, value: string, callback: any) => {
  console.log("rule", rule);
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (/^.{5,10}$/.test(value)) {
      callback();
    } else {
      callback(new Error("密码长度在 5 到 10 个字符"));
    }
  }
};
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 5, max: 10, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  password: [{ validator: validatePassword, trigger: "blur" }],
});

const loginFn = async () => {
  //  校验表单
  // validate返回一个promise对象
  let flag = await ruleFormRef.value?.validate();
  if (!flag) return;
  loading.value = true;
  // 发起axios请求
  useStore
    .userLogin({ username: ruleForm.username, password: ruleForm.password })
    .then(() => {
      ElNotification({
        title: "hi " + ruleForm.username + " " + getNowTime() + "！",
        message: "登陆成功",
        type: "success",
        duration: 1000,
      });
      loading.value = false;
      // 如果退出的时候携带redirect参数，登陆成功后跳转到redirect指定的页面
      if (route.query.redirect) {
        router.push({ path: route.query.redirect as string });
        return;
      }
      router.push({ path: "/" });
    })
    .catch((error) => {
      console.log("登陆失败");
      ElNotification({
        title: "失败",
        message: error.message,
        type: "error",
      });
      loading.value = false;
      router.push({ path: "/404" });
    });
};
</script>

<template>
  <div class="bg">
    <div class="loginForm">
      <div class="loginForm__title">Hello</div>
      <div class="loginForm_content">欢迎来到硅谷甄选</div>
      <el-row>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleFormRef"
          class="elform"
          style="margin-top: 24px; width: 100%"
        >
          <el-col :span="18" :offset="3">
            <el-form-item prop="username">
              <el-input
                :prefix-icon="UserFilled"
                v-model="ruleForm.username"
                type=""
                size="small"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18" :offset="3">
            <el-form-item prop="password">
              <el-input
                show-password
                :prefix-icon="Lock"
                v-model="ruleForm.password"
                size="small"
                placeholder="请输入密码"
                type="password"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18" :offset="3">
            <el-form-item>
              <el-button
                :loading="loading"
                type="primary"
                size="small"
                style="width: 100%"
                @click="loginFn"
                >登录</el-button
              >
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg {
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .loginForm {
    width: 450px;
    height: 270px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: 300px;
    transform: translate(-50%, -50%);
    border-radius: 2x;
    background-image: url("@/assets/images/login_form.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    .loginForm__title {
      font-size: 30px;
      font-weight: bold;
      color: #fff;
      margin-top: 30px;
      padding: 0 0 0 30px;
    }
    .loginForm_content {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      margin-top: 30px;
      padding: 0 0 0 30px;
    }
  }
}
</style>
