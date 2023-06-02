<template>
  <div class="songlist">
    <el-table :data="props.songlist" stripe style="width: 100%" @row-dblclick="playSong" :row-class-name="addIndex" >
      <el-table-column type="index" width="50" />
      <el-table-column width="80" prop="Id">
        <template #default="scope">
          <el-icon :size="18">
            <img src="/src/static/Download.png" width="18" height="18">
          </el-icon>
          <el-icon :size="18">
            <img src="/src/static/Like.png" width="18" height="18" @click="addLikeSong(scope.row.Id)">
          </el-icon>
          <el-icon :size="18">
            <img src="/src/static/Play.png" width="18" height="18">
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="SongName" label="音乐标题" min-width="70" />
      <el-table-column prop="Singer" label="歌手" min-width="120" />
      <el-table-column prop="ReleaseDate" label="发布日期" min-width="120" />
      <el-table-column prop="Album" label="专辑" min-width="120" />
      <el-table-column prop="Time" label="时长" min-width="60" align="center">
      </el-table-column>
      <el-table-column prop="SongId" label="网易云ID" min-width="120" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { msToMinSeconed } from '@/utils/time'
import {useRoute, useRouter} from 'vue-router'
import {defineProps, withDefaults, watch, computed, onBeforeMount} from 'vue'
import type { PropType } from 'vue'
import {userInfoApi} from "@/api/user";
import {likeSongApi} from "@/api/song";
import {ElMessage} from "element-plus";
const route = useRoute()
const router = useRouter()
const store = usePlayerStore()

const props = withDefaults(
  defineProps<{
    songlist:Array<any>
  }>(),
  {
    songlist:()=>{
      return [{Id:"",Singer:"",SongName:"",ReleaseDate:"", SongId:""}]
    }
  }
)

watch(
  ()=>props.songlist,
  (val, preval)=>{
  },
  {
    immediate:true,
    deep:true
  }
)
const id = computed(() => route.params.id)

function addIndex({ row, rowIndex }: { row: any, rowIndex: number }) {
  row.index = rowIndex
}

async function playSong(row: any) {
  if (props.songlist != store.playlist) {
    store.playlist = props.songlist
  }
  store.isPlaying = false
  store.index = row.index
  store.updateCurSong()
}

async function addLikeSong(id: string) {
  ElMessage.success("操作成功")
  const res: any = await likeSongApi(id)

}

function toSingerDetails(id: number) {
  router.push({
    name: 'singerDetails',
    params: { id },
  })
}

function toAlbumDetails(id: number) {
  router.push({
    name: 'albumDetails',
    params: { id },
  })
}
</script>

<style lang="less">
.songlist {
  cursor: pointer;

  .el-table {
    font-size: 13px;
  }

  .clikable {
    &:hover {
      color: #ec4141;
      border-bottom: 1px solid #ec4141;
    }
  }
}
</style>
