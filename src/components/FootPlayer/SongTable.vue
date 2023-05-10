<template>
  <div class="songTable">
    <div class="amount">总{{ store.playlist.length || 0 }}首</div>
    <el-table :data="store.playlist" stripe :row-class-name="addIndex" @row-dblclick="playSong" empty-text="暂无歌曲">
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="音乐标题">
        <template #default="scope">
          <span>{{scope.row.name.slice(0,10)}}</span>
          <span v-if="scope.row.name.length > 10">...</span>
        </template>
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手">
        <template #default="scope">
          <span>{{scope.row.ar[0].name.slice(0,8)}}</span>
          <span v-if="scope.row.ar[1] || scope.row.ar[0].length > 8">...</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
const store = usePlayerStore()


function addIndex({ row, rowIndex }: { row: any, rowIndex: number }) {

  row.index = rowIndex

  if (rowIndex == store.index) {
    return 'active'
  }
}
function playSong(row: any) {
  store.isPlaying = false
  store.index = row.index
  store.updateCurSong()
}

</script>

<style lang="less">
.songTable {
  .amount {
    font-size: 13px;
    color: #aaa;
    padding: 1rem;
  }

  .el-table {
    width: 100%;
    cursor: pointer;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .active {
    color: #ec4141;
  }
}
</style>
