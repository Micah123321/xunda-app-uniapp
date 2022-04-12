# zzlb-audio-play

普通的音频播放组件，点击即可播放

## 调用方法
    ```html
        <zzlb-audio-play src="1.mp3"></zzlb-audio-play>
    ```

## 接受插槽修改内容

    ```html
        <zzlb-audio-play v-for="(mp3, mp3index) in recordlist.filter(f => f.page_id == currentitem.storypage_id)" :src="$httpurl(mp3.url)">
          <template #default="{isplaying}">
            <view class="text-center padding flex align-center">
              <button class="cu-btn shadow lg flex-direction" :class="{ 'bg-green': isplaying, 'bg-red': !isplaying }">
                <text :class="{ 'cuIcon-playfill': !isplaying, 'cuIcon-stopfill': isplaying }"></text>
                <view class=" text-sm">{{ (mp3.duration / 1000).toFixed(0) }}s语音</view>
                <view class=" text-sm">{{ mp3.create_time }}</view>
              </button>
              <view @click.stop="onremovemp3(mp3)" class=" text-xsl cuIcon-close" v-if="mp3.read_id == read.read_id"></view>
            </view>
          </template>
        </zzlb-audio-play>
    ```