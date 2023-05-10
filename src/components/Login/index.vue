<template>
  <div class="login">
    <div class="passwordLogin">
      <div class="logo" >
        <img src="./img/logo.jpg" alt="" />
      </div>
      <el-form :model="loginForm" status-icon :rules="loginRule" label-width="auto" class="loginForm">
        <el-form-item label="用户名：" prop="telphone">
          <el-input v-model.trim="loginForm.userName" type="input" placeholder="请输入您的用户名" />
        </el-form-item>
        <el-form-item class="captcha" label="密码：" prop="captcha">
          <el-input v-model.trim="loginForm.passWord" type="password" placeholder="输入密码"/>
        </el-form-item>
        <el-button @click="loginOfPassword" class="loginBtn">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import { loginByPassword } from '@/api/login'
import { useRouter } from 'vue-router';
const router = useRouter()
const { closeDialog } = defineProps(['closeDialog'])

let loginForm = reactive({
  userName: '',
  passWord: ''
})

const loginRule = reactive({
  userName: [
    { required: true, message: '账号必填', trigger: 'blur' },
  ],
  passWord: [
    { required: true, message: '密码必填', trigger: 'blur' },
  ],
})

function loginOfPassword() {
  if (loginForm.userName.length < 8 && loginForm.passWord.length < 4) {
    ElMessage.warning(`格式不正确`)
  }
  loginByPassword(loginForm.userName, loginForm.passWord).then(
      res => {
        if (res.code === 0) {
          localStorage.setItem('token', res.data.token)
            localStorage.setItem('cookie', res.cookie)
          ElMessage.success('登录成功')
            closeDialog()
          router.go(0)
        } else {
          ElMessage.error('登录失败')
        }
      }
  ).catch(_ => {
    console.log(_)
    ElMessage.error('登录失败')
  })
}

</script>

<style lang="less" scoped>
.login {
  .passwordLogin {
    padding: 0 0.5rem;

    .suggest {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      cursor: pointer;

      img {
        width: 50px;
        height: 50px;
      }

      span {
        margin: 20px;
        height: 40px;
        background-color: #aaa;
        border-radius: 10px;
        color: white;
        padding: 0 15px;
        line-height: 40px;
        font-size: 15px;
      }
    }

    .logo {
      display: flex;
      justify-content: center;
      // margin: 2.5rem 0;
      margin-top: 20px;

      img {
        width: 140px;
        height: 120px;
      }
    }

    .loginForm {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 1rem 0;

      .captcha {
        display: flex;

        .el-input {
          width: 100%;
        }

        .el-button {
          font-size: 10px;
          margin-left: 1rem;
        }


      }

      .loginBtn {
        width: 8rem;
        margin: 0.5rem auto;
        background-color: #db4242;
        color: white;
        font-size: 18px;
        font-weight: 500;
      }
    }

    .passwordLogin {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      cursor: pointer;

      &:active {
        color: #aaa;
      }
    }
  }
}
</style>
