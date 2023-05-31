<template>
  <header>
    <div class="logo">
      <img src="./img/logo.png" alt="" />
    </div>
    <div class="pageSkip">
      <el-button :icon="ArrowLeft" circle @click="router.back()" />
      <el-button :icon="ArrowRight" circle @click="router.forward()" />
    </div>
    <div class="search">
      <el-popover placement="bottom" :width="320" trigger="click">
        <template #reference>
          <el-input class="search-input" placeholder="请输入内容" :prefix-icon="Search" v-model.trim="keywords"
            @keyup.enter.native="toSearch"></el-input>
        </template>
      </el-popover>
    </div>
    <div class="toLogin">
      <div v-if="!cookie">
        <img @click="loginDialogIsVisible = true" src="./img/login.jpg" alt="" />
        <span @click="loginDialogIsVisible = true" alt="">用户登录</span>
      </div>
      <div v-if="cookie" class="userInfo" @click="toUserDetails">
        <img :src="accountInfo.avatarUrl" alt="" />
        <span>{{ accountInfo.nickname }}</span>
      </div>
      <el-dialog v-model="loginDialogIsVisible" width="30%" :modal="false" :center="true" :draggable="true" top="10vh">
        <Login :closeDialog="closeDialog"></Login>
      </el-dialog>
    </div>
    <div class="toRegister">
      <div v-if="!cookie">
        <img @click="registerDialogIsVisible = true" src="./img/login.jpg" alt="" />
        <span @click="registerDialogIsVisible = true" alt="">用户注册</span>
      </div>
      <el-dialog v-model="registerDialogIsVisible" width="30%" :modal="false" :center="true" :draggable="true" top="10vh">
        <Register :closeDialog="closeDialog"></Register>
      </el-dialog>
    </div>
    <div class="quit" v-if="cookie">
      <el-button :icon="SwitchButton" circle size="large" @click="quitDialogIsVisible = true" />
    </div>
    <el-dialog v-model="quitDialogIsVisible" title="退出登录" width="30%" :center="true" :modal="false" :draggable="true">
      <span class="quitHint">确定退出登录？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="toLogout">确定</el-button>
          <el-button @click="quitDialogIsVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </header>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight, Search, SwitchButton } from '@element-plus/icons-vue'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import Login from '../Login/index.vue'
import Register from "@/components/Login/register.vue";
import {getAccountInfoApi, logoutApi, register} from '@/api/login'
import { hotSearchApi } from '@/api/search'
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user'
const router = useRouter()
const userStore = useUserStore()

let keywords = ref('')

function toSearch() {
  sessionStorage.setItem('keywords', keywords.value)
  if (keywords.value) {
    router.push({
      name: 'searchSongs',
      params: {
        keywords: keywords.value,
      },
    })
  } else {
    ElMessage.warning('请输入有效的搜索关键字 ！')
  }
}

let hotSearch = ref()

function goHotSearch(searchWord: string) {
  router.push({
    name: 'searchSongs',
    params: {
      keywords: searchWord,
    },
  })
}

let loginDialogIsVisible = ref(false)
let quitDialogIsVisible = ref(false)
let registerDialogIsVisible = ref(false)

function closeDialog() {
  loginDialogIsVisible.value = false
  registerDialogIsVisible.value = false
}

function toLogout() {
  localStorage.removeItem('cookie')
  localStorage.removeItem('token')
  quitDialogIsVisible.value = false
  router.go(0)
}

let accountInfo = ref({ avatarUrl: '', nickname: '' })

let cookie = computed(() => {
  return localStorage.getItem('cookie')
})

async function getAccountInfo() {
  if (!localStorage.getItem('cookie')) {
    return
  }
  const res: any = await getAccountInfoApi()
  if (res.profile === null) {
    await logoutApi()
    localStorage.removeItem('cookie')
    localStorage.removeItem('token')
    ElMessage.warning('登录异常,已退出登录！')
    return
  }
  accountInfo.value = res.profile
  userStore.uid = res.profile.userId
  userStore.getUserData()
}

function toUserDetails() {
  router.push({
    name: 'myMusic',
  })
}

</script>

<style lang="less" scoped>
header {
  height: 100%;
  width: 100%;
  display: flex;
  background-color: #303030;
  align-items: center;
  position: relative;

  .logo {
    margin: 0 25px;

    img {
      height: 50px;
      //图片对其方式，容易影响布局
      vertical-align: middle;
    }
  }

  .pageSkip {
    margin: 20px;

    .el-button {
      background-color: #303030;
      // background-color: #e13e3e;
      border: none;
      color: white;
    }
  }

  .search {
    margin: 20px;

    // 深度选择器，影响子组件
    :deep(.search-input) {
      .el-input__wrapper {
        border-radius: 20%;
        // background-color: #e13e3e;
        background-color: #303030;
        box-shadow: none;

        input {
          color: white;

          &::-webkit-input-placeholder {
            color: rgba(255, 255, 255);
          }
        }

        .el-input__prefix {
          color: white;
        }
      }
    }
  }

  .toLogin {
    position: absolute;
    right: 180px;

    div {
      img {
        width: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin: 0 5px;
        cursor: pointer;
      }

      span {
        color: white;
        font-family: '等线';
        font-size: 15px;
      }
    }

    .userInfo {
      cursor: pointer;
    }
  }
  .toRegister {
    position: absolute;
    right: 50px;

    div {
      img {
        width: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin: 0 5px;
        cursor: pointer;
      }

      span {
        color: white;
        font-family: '等线';
        font-size: 15px;
      }
    }

    .userInfo {
      cursor: pointer;
    }
  }
  .quit {
    position: absolute;
    right: 40px;

    .el-button {
      // background-color: #e13e3e;
      background-color: #303030;
      color: white;
      border: 0;
    }
  }

  .quitHint {
    font-size: 16px;
    text-align: center;
  }
}

// 热搜榜
.hotsearch {
  height: 20rem;
  overflow-y: scroll;

  .title {
    cursor: default;
    margin-left: 1rem;
    margin-bottom: 1rem;
    font-size: 16px;
    font-weight: 600;
  }

  .item {
    height: 2.5rem;
    line-height: 2.5rem;
    padding-left: 1rem;
    padding-right: 2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 1rem;

    &:hover {
      background-color: #eee;
    }
  }
}
</style>
