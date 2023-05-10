<template>
  <div class="songDetails">
    <div class="details">
      <el-icon class="packUp" @click="store.showSongDetails=false">
        <ArrowDownBold />
      </el-icon>
      <div class="left">
        <div class="needle" :class="{needle:true, crush: store.isPlaying }">
          <img src="./img/needle.png" />
        </div>
        <div class="outer">
          <img src="./img/disc.png" :class="{ rotate_active: store.isPlaying, rotate_pause: !store.isPlaying }" />
        </div>
        <div class="inner">
          <img :src="store.curSongInfo.al.picUrl"
            :class="{ rotate_active: store.isPlaying, rotate_pause: !store.isPlaying }" />
        </div>
      </div>
      <div class="right">
        <div class="songInfo">
          <p class="name">{{store.curSongInfo.name}}</p>
          <p class="author"></p>
          <p v-for="ar in store.curSongInfo.ar">{{ar.name}}</p>

        </div>
        <div class="lyric" ref="lyric">
          <p v-for="(item, index) in store.lyric" :key="index">
            {{ item.lrc }}
          </p>
        </div>
      </div>
    </div>
    <div class="comment" v-show="store.curSongInfo.id">
      <CComments :type="'song'" :id="store.curSongInfo.id" :key="store.curSongInfo.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { onMounted, onUnmounted, ref } from 'vue'
import CComments from '@/components/common/CComments.vue'

const store = usePlayerStore()

let lyric = ref()

let timer: NodeJS.Timer

onMounted(() => {
  timer = setInterval(() => {
    let p: any = document.querySelector("p.active");
    if (p && p.offsetTop > 300) {
      lyric.value.scrollTop = p.offsetTop - 300;
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="less">
.songDetails {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to top, #f8e1ac 0%, rgb(255, 244, 196) 20%, #fbfcde 30%, #fff 100%);

  .details {
    width: 100%;
    height: 600px;
    display: flex;

    .el-icon {
      position: absolute;
      cursor: pointer;
      top: 1rem;
      left: 2rem;
      font-size: 24px;
      z-index: 1;
    }

    .left {
      width: 40%;
      height: 500px;
      position: relative;

      .needle {
        position: absolute;
        left: 16rem;
        top: 4rem;
        width: 8rem;
        transform: rotate(0deg);
        // 转动原点
        transform-origin: 0.5rem 0.5rem;
        transition: all 1s;
        z-index: 1;

        img {
          width: 100%;
        }
      }

      .crush {
        transform: rotateZ(20deg);
      }

      .outer {
        position: absolute;
        top: 10rem;
        left: 8rem;
        width: 18rem;
      }

      .inner {
        position: absolute;
        top: 12.7rem;
        left: 10.7rem;
        width: 12.5rem;
      }

      // 图片转动
      @keyframes rotate_360 {
        0% {
          transform: rotateZ(0deg);
        }

        100% {
          transform: rotateZ(360deg);
        }
      }

      .outer,
      .inner {
        .rotate_active {
          animation-play-state: running;
        }

        .rotate_pause {
          animation-play-state: paused;
        }

        img {
          animation: rotate_360 10s linear infinite;
          width: 100%;
          border-radius: 50%;
        }
      }

    }

    .right {
      width: 60%;
      height: 500px;
      padding-right: 10%;

      .songInfo {
        width: 100%;
        height: 100px;
        margin-top: 3rem;
        text-align: center;

        .name {
          font-weight: 600;
          font-size: 24px;
          margin-bottom: 0.5rem;
        }
      }

      .lyric {
        width: 100%;
        height: 400px;
        padding: 1rem 0;
        text-align: center;
        overflow-y: auto;

        p {
          margin-bottom: 1rem;
          font-size: 14px;
        }

        .active {
          color: #ec4141;
        }
      }
    }
  }

  .comment {
    padding: 0 1.5rem;
  }
}
</style>
