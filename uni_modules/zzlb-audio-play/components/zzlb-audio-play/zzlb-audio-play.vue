<template>
  <view @click="play">
    <slot name="default" v-bind:isplaying="isplaying"><text v-if="src" style="    font-size: 30px;
    line-height: 30px;" >{{isplaying?"||":"►"}}</text></slot>
 
  </view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isplaying: 0
    };
  },
  beforeDestroy() {
    if (this.mp3play) {
      this.mp3play.destroy();
    }
  },
  methods: { 
    play() {
      if (!this.src) return;
      let mp3play = 1;
      if (!this.mp3play) {
        this.mp3play = 1;
        mp3play = uni.createInnerAudioContext();
        mp3play.onError(e=>{
          console.log(e)
          this.isplaying=0
          this.$emit('isplaying',0);
        })
        mp3play.onPlay(() => {
          console.log('onPlay')
          this.$emit('onPlay');
          this.isplaying = 1;
          this.$emit('isplaying',1);
        });
        mp3play.onPause(() => {
          console.log('onPause')
          this.$emit('onPause');
          this.isplaying = 0;
          this.$emit('isplaying',0);
        });
        mp3play.onEnded(() => {
          console.log('onEnded')
          this.$emit('onEnded');
          this.isplaying = 0;
          this.$emit('isplaying',0);
        });
        this.mp3play = mp3play;
      } else mp3play = this.mp3play;

      if (!mp3play.paused) mp3play.pause();
      else {
        mp3play.src =  this.src;
        mp3play.play();
      }
    }
  }
};
</script>

<style>
  
</style>
