<template>
  <div class="discover">
    <Tabs :tabs="tabs" />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/components/Tabs/index.vue'
const tabs = [
  {
    label: '热门',
    name: 'recommend',
    path: '/discover/recommend',
  },
  {
    label: '专辑',
    name: 'songList',
    path: '/discover/songList',
  },
  {
    label: '排行榜',
    name: 'rank',
    path: '/discover/rank',
  },
  {
    label: '歌手',
    name: 'singer',
    path: '/discover/singer',
  },
]
</script>

