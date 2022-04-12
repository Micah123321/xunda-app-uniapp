<template>
  <view :class="layout" class="record ">
    <slot name="default" v-bind:isstart="isstart" v-bind:isopen="isopen" v-bind:isrecing="isrecing" v-bind:isec="isec">
      <view
        v-show="!isstart"
        class="ldx"
        :class="{ 'ldx-damage1': isstart, 'cuIcon-voicefill': !isstart, 'cuIcon-all': isstart, 'bg-red': isstart, 'bg-green': !isstart }"
        @click="togglerec"
      ></view>
      <view v-show="isstart" class="bg-red ldx ldx-damage1 text-right" @click="endrec">{{ (isec / 1000).toFixed(2) }}s</view>
      <view v-show="minms>0||maxms>0">{{[minms,maxms].filter(f=>f>-1).map(a=>(a/1000).toFixed(1)+'s').join('-')}}</view>
    </slot>
  </view>
</template>

<script>
//             开始录音      倒计时3秒    正式录音  停止录音
// h5
//   isrecing      1                                   0
//   isopen                1                         0
//   isstart                             1         0
// 微信
//   isrecing      1                                   0
//   isopen         1                                0
//   isstart                             1         0
// #ifdef H5
import Recorder from '@/static/js/recorder.mp3.min.js';
// #endif
export default {
  props: {
    waitms: { type: Number, default: 0 },
    minms: { type: Number, default: 0 },
    maxms: { type: Number, default: 3000 },
    layout: { type: String, default: 'flex flex-direction' },
    uploadurl: { type: String, default: '' }
  },
  data() {
    return {
      isrecing: 0,
      isopen: 0,
      isstart: 0,
      isec: 0,
      starttime: 0
    };
  },
  mounted() {
    // #ifdef H5
    this.rec = Recorder({
      type: 'mp3',
      sampleRate: 32000,
      bitRate: 16 //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
      //onProcess: function(buffers, powerLevel, bufferDuration, bufferSampleRate, newBufferIdx, asyncEnd) {
      //录音实时回调，大约1秒调用12次本回调
      //可利用extensions/waveview.js扩展实时绘制波形
      //可利用extensions/sonic.js扩展实时变速变调，此扩展计算量巨大，onProcess需要返回true开启异步模式
      //}
    });
    // #endif

    // #ifndef H5
    this.rec = uni.getRecorderManager();
    // #endif
  },
  destroyed() {
    if (this.rec && this.isrecing) {
      this.rec.close && this.rec.close();
      this.rec.stop();
    }
  },
  methods: {
    onend() {
      if (this.isrecing) {
        this.endrec();
        return;
      }
    },
    togglerec() {
      if (this.isrecing) this.endrec();
      else this.startrec();
    },
    async endrec_end(url,time) {
      this.rec.close && this.rec.close();
      this.isstart = 0;
      this.isopen = 0;
      this.isrecing = 0;
      let r = '';
      if (this.uploadurl) {
        r = await this.$http.upload(this.uploadurl, {
          // #ifdef MP-ALIPAY
          fileType: 'audio', // 仅支付宝小程序，且必填。
          // #endif
          filePath: url, // 要上传文件资源的路径。
          name: 'file'
        });
        console.log(r);
      }
      this.$emit('end', { url, url2: r && r.data && r.data.url,time});
    },
    endrec() {
      if (this.isrecing) {
        if (this.isstart && this.isec < this.minms) return;
        // console.log(this.isstart , this.isec , this.minms)
        // #ifdef H5
        this.rec.stop(async (blob, duration) => {
          const url = (window.URL || webkitURL).createObjectURL(blob);
          this.endrec_end(url,duration);
        });
        // #endif
        // #ifndef H5
        this.rec.onStop(e => {
          this.endrec_end(e.tempFilePath);
        });
        this.rec.stop();
        // #endif
      } else {
      }
    },
    startrec_open() {
      // #ifndef H5
      this.isopen = 1;
      // #endif
      // #ifdef H5
      this.rec.open(
        () => {
          console.log('rec open', this.rec);
          setTimeout(() => {
            this.isopen = 1;
          }, 50);
        },
        (msg, isUserNotAllow) => {
          //用户拒绝未授权或不支持
          console.log((isUserNotAllow ? 'UserNotAllow，' : '') + '无法录音:' + msg);
        }
      );
      // #endif
      const opentime = new Date().getTime();
      const timer = setInterval(() => {
        this.isec = this.waitms + opentime - new Date().getTime();

        if (this.isopen && this.isec < 10) {
          clearInterval(timer);
          this.startrec_start();
        }
      }, 9);
    },
    startrec_start() {
      // #ifdef H5
      this.rec.start();
      this.isstart = 1;
      this.startrec_start_ms();
      // #endif
      // #ifndef H5
      this.rec.onStart(e => {
        this.isstart = 1;
        this.startrec_start_ms();
      });
      this.rec.start({});
      // #endif
    },
    startrec_start_ms() {
      const starttime = new Date().getTime();
      const starttimer = setInterval(() => {
        this.isec = new Date().getTime() - starttime;

        if (this.maxms > 0 && this.isec > this.maxms) this.endrec();
        if (!this.isstart) {
          clearInterval(starttimer);
        }
      }, 9);
    },
    startrec() {
      if (this.isrecing) {
      } else {
        this.isrecing = 1;
        this.ms = '';
        this.startrec_open();
      }
    }
  }
};
</script>

<style lang="scss">
.record {
  justify-content: center;
  align-items: center;
}
</style>
