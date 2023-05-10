<template>
  <div class="myMusic">
    <div class="userInfo">
<!--      <div class="img">-->
<!--        <img :src="userInfo.avatarUrl" alt="" />-->
<!--      </div>-->
      <div class="text">
        <div class="basic">
          <div class="nickname">{{userInfo.Username}}</div>
          <div class="level">Lv.{{userInfo.Level}}</div>
        </div>
        <el-divider />
        <div class="userData">
          <div class="message">
            <div class="count">{{ userInfo.CountMoment }}</div>
            <div class="tag">动态</div>
          </div>
          <div class="attention" @click="toFollows">
            <div class="count">{{ userInfo.CountFollow }}</div>
            <div class="tag">关注</div>
          </div>
          <div class="fans" @click="toFolloweds">
            <div class="count">{{ userInfo.CountFollowed }}</div>
            <div class="tag">粉丝</div>
          </div>
        </div>
        <div class="uid">
          用户ID：<span>{{ userInfo.Id }}</span>
        </div>
        <div class="description">
          个人介绍：<span>{{ userInfo.signature }} </span>
          <span>{{ userInfo.Description }}</span>
        </div>
      </div>
    </div>
    <div class="subscribedPlaylist">
      <div class="title">
        我的喜欢
      </div>
      <CSonglist :songlist="userLike" />
    </div>
    <div class="createPlaylist" v-if="userInfo.CountCreatePlaylist">
      <div class="title">
        创建的歌单({{userInfo.CountCreatePlaylist}})
      </div>
      <CPlaylist :playlists="userCreatePlaylists" />
    </div>
    <div class="subscribedPlaylist" v-if="userInfo.CountLikePlaylist">
      <div class="title">
        收藏的歌单({{userInfo.CountLikePlaylist}})
      </div>
      <CPlaylist :playlists="userLikePlaylists" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, ref} from 'vue';
import { useUserStore } from '@/stores/user'
import CPlaylist from '@/components/common/CPlaylist.vue'
import { useRouter } from 'vue-router'
import {userInfoApi, userLikeSongsApi, userLikePlaylistsApi, userCreatePlaylistsApi} from "@/api/user";
import CSonglist from "@/components/common/CSonglist.vue";


const router = useRouter()
const userStore = useUserStore()

let isLoading = ref(false)
let userInfo = ref()
let userLike = ref()
let userLikePlaylists = ref()
let userCreatePlaylists = ref()
async function getUserInfo() {
  isLoading.value = true
  const res1: any = await userInfoApi()
  const res2: any = await userLikeSongsApi()
  const res3: any = await userLikePlaylistsApi()
  const res4: any = await userCreatePlaylistsApi()
  userInfo.value = res1.data.user
  userLike.value = res2.data
  userLikePlaylists.value = res3.data
  userCreatePlaylists.value = res4.data
  isLoading.value = false
}

onBeforeMount(()=>{
  getUserInfo()
})

function toFollows() {
  router.push({
    name: 'follows',
    params: {
      id: userStore.uid
    }
  })
}
function toFolloweds() {
  router.push({
    name: 'followeds',
    params: {
      id: userStore.uid
    }
  })
}

</script>

<style lang="less" scoped>
.myMusic {
  .userInfo {
    display: flex;
    padding: 0 1rem;
    width: 100%;
    margin-bottom: 2rem;

    .img img {
      height: 12rem;
      width: 12rem;
      border-radius: 50%;
    }

    .text {
      margin-left: 2rem;
      width: 100%;

      .basic {
        display: flex;
        align-items: center;
        padding-left: 1rem;

        .nickname {
          font-size: 24px;
          font-weight: 600;
          margin-right: 1rem;
        }

        .level {
          font-size: 13px;
          width: 2.2rem;
          height: 1.2rem;
          line-height: 1.2rem;
          border-radius: 10px;
          text-align: center;
          background-color: #ccc;
        }
      }

      .userData {
        display: flex;
        margin-bottom: 1rem;

        &>div {
          border-right: 1px solid #ddd;
          text-align: center;
          padding: 0 2rem;
          cursor: pointer;

          .count {
            font-size: 18px;
          }

          .tag {
            font-size: 12px;
            color: #444;
          }
        }
      }

      .uid,
      .description {
        padding-left: 0.5rem;
        font-size: 13px;
        margin-bottom: 0.5rem;

        span {
          color: #444;
        }
      }
    }
  }

  .createPlaylist,
  .subscribedPlaylist {
    margin-bottom: 1rem;

    .title {
      font-size: 18px;
      font-weight: 600;
      margin-left: 0.5rem;
      padding: 0.5rem;
    }
  }
}
</style>
