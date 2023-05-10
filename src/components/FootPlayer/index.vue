<template>
  <div class="player">
    <div class="left" @click="store.showSongDetails=!store.showSongDetails">
      <div class="img">
        <el-image :src="store.curSongInfo.al.picUrl">
          <template #placeholder>
            <div class="image-slot">加载中<span class="dot">...</span></div>
          </template>
        </el-image>
      </div>
      <div class="name">
        {{store.curSongInfo.name}}
      </div>
      <el-drawer v-model="store.showSongDetails" :with-header="false" direction="btt" :append-to-body="true"
        :size="'100%'">
        <song-details />
      </el-drawer>
    </div>
    <div class="center">
      <div class="control">
        <div class="cycleMode" @click="switchLoopMode">
          <i class="iconfont icon-xunhuanbofang" v-if="loopMode=='loop'"></i>
          <i class="iconfont icon-suijibofang" v-if="loopMode=='random'"></i>
          <i class="iconfont icon-danquxunhuan" v-if="loopMode=='cycle'"></i>
        </div>
        <div class="prev" @click="prevSong">
          <i class="iconfont icon-shangyishoushangyige"></i>
        </div>
        <div class="isPlay" id="isPlay" @click="handlePlay">
          <i v-if="!store.isPlaying" class="iconfont icon-bofang"></i>
          <i v-else class="iconfont icon-zanting"></i>
        </div>
        <div class="next" @click="nextSong">
          <i class="iconfont icon-xiayigexiayishou"></i>
        </div>
        <div class="love">
          <i class="iconfont icon-shoucang"></i>
        </div>
      </div>
      <div class="progressBar">
        <div class="curTime">{{ curTime }}</div>
        <el-slider v-model="store.curDuration" :max="duration" @change="changeDuration" :show-tooltip="false" />
        <div class="endTime">{{ endTime }}</div>
      </div>
    </div>
    <div class="right">
      <div class="volume">
        <div class="mute" @click="isMute=!isMute">
          <i v-if="!isMute" class="iconfont icon-shengyin"></i>
          <i v-else class="iconfont icon-shengyinjingyin"></i>
        </div>
        <el-slider v-model="curVolume" @change="changeVolume" :show-tooltip="false" :max="100">
        </el-slider>
      </div>
      <div class="playlist" @click="store.showPlaylist=!store.showPlaylist">
        <el-badge :value="store.playlist.length">
          <i class="iconfont icon-24gf-playlistMusic4"></i>
        </el-badge>
        <el-drawer v-model="store.showPlaylist" :with-header="false" :append-to-body="true" :size="320">
          <song-table />
        </el-drawer>
      </div>
    </div>
    <audio ref="audioPlayer" :src="store.curSongUrl" @timeupdate="timeupdate" :autoplay="store.isPlaying"></audio>
  </div>
</template>


<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { computed, ref, watch } from 'vue';
import { msToMinSeconed } from '@/utils/time'
import { ElMessage } from 'element-plus';
import SongTable from './SongTable.vue'
import SongDetails from './SongDetails.vue'

const store = usePlayerStore()

let audioPlayer = ref()

let loopMode = ref('loop')

let curTime = computed(() => {
  return msToMinSeconed(store.curDuration)
})

let duration = computed(() => {
  return store.curSongInfo.dt || 0
})

let endTime = computed(() => {
  return msToMinSeconed(duration.value)
})

function switchLoopMode() {
  if (loopMode.value == 'loop') {
    loopMode.value = 'random'
    ElMessage.success('切换为随机播放模式')
  } else if (loopMode.value == 'random') {
    loopMode.value = 'cycle'
    ElMessage.success('切换为单曲循环播放模式')
  } else {
    loopMode.value = 'loop'
    ElMessage.success('切换为顺序循环播放模式')
  }
}

function handlePlay() {
  if(store.curSongUrl == ''){
    ElMessage.warning('当前无音乐播放')
    return
  }
  store.isPlaying = !store.isPlaying
  if (store.isPlaying) {
    audioPlayer.value.play()
  } else {
    audioPlayer.value.pause()
  }
}

function changeDuration(val: number) {
  if (store.curSongUrl) {
    store.curDuration = val
    audioPlayer.value.currentTime = val / 1000
  } else {
    store.curDuration = 0
    ElMessage.warning('无可播放歌曲，无法进行操作')
  }
}

function prevSong() {
  if (loopMode.value == 'loop' || loopMode.value == 'cycle') {
    store.index = store.index == 0 ? store.playlist.length - 1 : store.index - 1
  } else if (loopMode.value == 'random') {
    store.index = Math.floor(Math.random() * store.playlist.value.length)
  }
  store.updateCurSong()
}

function nextSong() {
  if (loopMode.value == 'loop' || loopMode.value == 'cycle') {
    store.index = store.index == store.playlist.length - 1 ? 0 : store.index + 1
  } else if (loopMode.value == 'random') {
    store.index = Math.floor(Math.random() * store.playlist.length)
  }
  store.updateCurSong()
}

watch(
  () => store.curSongUrl, (val, oldVal) => {
    if (val != oldVal) {
      store.curDuration = 0
      store.isPlaying = true
    }
  },
)

let isMute = ref(false)

let curVolume = ref(100)

function changeVolume(val: number) {
  curVolume.value = val
  audioPlayer.value.volume = val / 100
}

watch(
  () => isMute.value, () => {
    if (isMute.value) {
      audioPlayer.value.volume = 0
    } else {
      audioPlayer.value.volume = curVolume.value / 100
    }
  }
)

function timeupdate(e: any) {
  store.curDuration = e.target.currentTime * 1000

  if (e.target.ended && curTime.value < endTime.value) {
    ElMessage.warning('VIP歌曲,试听结束！！！')
    store.isPlaying = false
  }

  if (e.target.ended && curTime.value == endTime.value) {
    store.isPlaying = false
    if (loopMode.value == 'cycle') {
      e.target.currentTime = 0
      store.curDuration = 0
    } else {
      nextSong()
    }
  }
}
</script>

<style lang="less">
.player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 60px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #eee;
  background-color: #fff;
  z-index: 9999 !important;
  padding: 0 1rem;
  cursor: default;

  .left {
    width: 25%;
    display: flex;
    align-items: center;
    cursor: pointer;

    .el-image {
      height: 3rem;
      width: 3rem;
      border-radius: 0.5rem;
      margin-right: 1rem;
    }

    .name {
      font-size: 14px;
    }
  }

  .center {
    width: 50%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .control {
      width: 60%;
      height: 60%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      div {
        cursor: pointer;

        i {
          font-size: 20px;
        }
      }

      #isPlay i {
        font-size: 34px;
      }
    }

    .progressBar {
      width: 90%;
      height: 40%;
      display: flex;
      align-items: center;

      .curTime,
      .endTime {
        font-size: 13px;
        margin: 0 10px;
        color: #888;
      }
    }
  }


  .right {
    width: 25%;
    display: flex;
    align-items: center;
    padding-left: 6rem;

    .volume {
      display: flex;
      align-items: center;
      cursor: pointer;
      width: 7rem;

      i {
        font-size: 24px;
        margin-right: 1rem;
      }
    }

    .playlist {
      cursor: pointer;
      position: absolute;
      right: 2.5rem;

      .el-badge i {
        font-size: 20px;
      }
    }
  }
}
</style>
