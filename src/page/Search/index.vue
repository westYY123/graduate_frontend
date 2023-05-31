<template>
  <div class="search">
    <!-- 搜索结果 -->
    <div class="title">
      <span class="keywords">{{route.params.keywords}}</span>
      <span class="tag">搜索结果</span>
    </div>
    <!-- 选择 -->
    <Tabs :tabs="tabs" />
    <router-view class="router-view" v-slot="{ Component }" :key="route.fullPath">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Tabs from "@/components/Tabs/index.vue";

import { useRoute } from 'vue-router'
const route = useRoute()


const tabs = [
  { label: '单曲', name: 'searchSongs', path: 'search/songs' },
  { label: '歌手', name: 'searchSinger', path: 'search/singer' },
]
</script>

<style lang="less">
.search {
  .title {
    cursor: default;
    width: 50%;
    padding: 0.5rem 0;
    margin: 0 auto;
    margin-bottom: 1rem;
    font-size: 20px;
    text-align: center;
    border: 2px solid rgb(235, 66, 66);
    border-radius: 1rem;

    .keywords {
      margin-right: 1rem;
      color: #e33737;
      font-weight: 700;
    }

    .tag {
      color: #444;
    }
  }
}
</style>
