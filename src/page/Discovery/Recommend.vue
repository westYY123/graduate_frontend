<template>
  <div class="recommend" v-loading="isLoading">
    <div class="personalized">
      <div class="title">
        <span>热门歌单</span>
        <el-icon>
          <ArrowRight />
        </el-icon>
      </div>
      <Playlist :playlists="playlists" />
    </div>
  </div>
  <div class="recommend" v-loading="isLoading">
    <div class="personalized">
      <div class="title">
        <span>热门歌曲</span>
        <el-icon>
          <ArrowRight />
        </el-icon>
      </div>
      <div class="subscribedPlaylist">
        <CSonglist :songlist="songlists" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from 'vue'
import { getHotPlayLists, getHotSongs } from '@/api/discovery'
import Playlist from '@/components/common/CPlaylist.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
let isLoading = ref(true)
let playlists = ref()
let songlists = ref()
async function getData() {
  isLoading.value = true
  const res1: any = await getHotPlayLists()
  const res2: any = await getHotSongs()
  songlists.value = res2.data
  playlists.value = res1.data
  isLoading.value = false
}

onBeforeMount(() => {
  getData()
})

</script>

<style lang="less" scoped>
.recommend {
  padding: 0 1rem;

  .banner {
    width: 100%;

    .el-carousel__item {
      border-radius: 10px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .personalized {
    width: 100%;

    .title {
      margin-bottom: 0.5rem;
      cursor: default;
      line-height: 24px;
      font-size: 24px;
      font-weight: bold;

      .el-icon {
        position: relative;
        top: 0.2rem;
      }
    }
  }
}
</style>
