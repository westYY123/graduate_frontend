<template>
  <div class="songlist">
    <div class="category">
      <el-popover placement="bottom-start" :width="500" trigger="hover">
        <template #reference>
          <el-button class="currentSelect">
            <span>{{ currentSelectedName }}</span>
            <el-icon>
              <ArrowRight />
            </el-icon>
          </el-button>
        </template>
        <el-button v-for="(tag, index) in playlistTag" :key="index" @click="changeCategory(index)"
          style="margin: 0.2rem;" color='#ed5736' plain>
          <span>{{ tag.name }}</span>
        </el-button>
      </el-popover>
    </div>
    <div class="container" v-loading="loading">
      <Playlist :playlists="albums" :type="'playlist'"/>
      <div class="pagination">
        <el-pagination background v-model:currentPage="pageInfo.currentPage" layout="prev, pager, next"
          :total="pageInfo.total" :page-size="pageInfo.pageSize" @current-change="getHandpick" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue'
import {hotAlbumsApi, getHotPlayLists} from '@/api/discovery'
import Playlist from '../../components/common/CPlaylist.vue'

let loading = ref(true)
let playlistTag = ref()
let hotTag = ref()
let currentSelectedName = ref('华语')

const pageInfo = reactive({
  currentPage: 1,
  pageSize: 25,
  total: 0,
})

let albums = ref()

async function getHotAlbums() {
  loading.value = true
  const res: any = await hotAlbumsApi()
  albums.value = res.playlists
  loading.value = false
}

getHotAlbums()
</script>

<style lang="less" scoped>
.songlist {
  .category {
    display: flex;
    height: 2rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
    margin-bottom: 1rem;

    .currentSelect {
      height: 2rem;
      border-radius: 1rem;
      border: 1px solid #ddd;
      color: black;
      font-weight: 600;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;

    ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #f0230c; //修改后的背景图颜色
      color: #fff;
    }
  }
}
</style>
