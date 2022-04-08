<template>
  <view class="body">
    <!-- 顶部 -->
    <uni-nav-bar backgroundColor="transparent" leftWidth="100%" statusBar class="bar" fixed>
      <block slot="left">
        <view class="bar-left">
          <div class="back">
            <uni-icons @click="back" class="bar-back" size="60rpx" type="back"/>

          </div>
          <div class="badge">
            <uni-badge class="uni-badge-left-margin" text="2" type="info" :customStyle="customStyle"/>
          </div>
          <view class="name">东东</view>

        </view>
      </block>
      <block slot="right">
        <view class="bar-more">
          <uni-icons class="bar-phone" size="60rpx" type="phone"></uni-icons>
          <uni-icons class="bar-more" size="60rpx" type="list"></uni-icons>
        </view>
      </block>
    </uni-nav-bar>

    <!-- 消息列表 -->

    <scroll-view class="msg" scroll-with-animation scroll-y>
      <view class="msg-room">
        <view class="msg-item ">
          <view class="msg-item-time">
            21:22
          </view>
          <view class="msg-bottom msg-left">
            <view class="msg-item-img">
              <image class="user_pic" src="../../static/icon/logo.png"></image>
            </view>
            <view class="msg-item-msg">

              <view class="msg-text"> 摹客在原来原型设计的基础上，融入的团队协作和Design System功能，正当其时。.</view>

            </view>
          </view>
        </view><view class="msg-item ">
          <view class="msg-item-time">
            21:22
          </view>
          <view class="msg-bottom msg-right">
            <view class="msg-item-img">
              <image class="user_pic" src="../../static/icon/logo.png"></image>
            </view>
            <view class="msg-item-msg">

              <view class="msg-text"> 摹客在原来原型设计的基础上，融入的团队协作和Design System功能，正当其时。.</view>

            </view>
          </view>
        </view>

      </view>


    </scroll-view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      customStyle: {
        backgroundColor: '#f1f3f5',
        color: '#272832',
        fontSize: '40rpx',
        lineHeight: '60rpx',
        width: '60rpx',
        height: '60rpx',
        border: '2rpx solid black'
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss">
// 列表样式
.msg {
  height: 100%;

  .msg-room {
    margin: 50rpx $uni-spacing-col-base 120rpx $uni-spacing-col-base;
    display: flex;
    flex-direction: column;


    .msg-item {

      .msg-item-time {
        //display: flex;
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;

        line-height: 34rpx;
        text-align: center;
        padding: 20rpx 0;
      }

      .msg-bottom {
        flex: auto;
        display: flex;
        padding: 20rpx 0;

        .msg-item-img {

          .user_pic {
            flex: none;
            width: $uni-img-size-sm;
            height: $uni-img-size-sm;
            border-radius: $uni-border-radius-base;
          }

        }

        .msg-item-msg {
          max-width: 480rpx;
          flex: auto;
          .msg-text {

            font-size: $uni-font-size-lg;
            color: $uni-text-color;
            line-height: 88rpx;
            padding: 18rpx 24rpx;
          }
        }
      }

    }

    .msg-left {
      flex-direction: row;

      .msg-text {
        margin-left: 16rpx;
        background-color: #fff;
        border-radius: 0 20rpx 20rpx 20rpx;
      }
    }

    .msg-right {
      flex-direction: row-reverse;

      .msg-text {
        margin-right: 16rpx;
        background-color: $uni-color-primary;
        border-radius: 20rpx 0rpx 20rpx 20rpx;
        color: white!important;
      }
    }


  }
}
.body{
  background-color: $uni-bg-color-grey;
  width: 100%;
  height: 100%;
}
// 状态栏样式
/deep/ .uni-navbar__header-btns {
  overflow: initial !important;
}

/deep/ .uni-navbar__header {
  background: rgba(255, 255, 255, .7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.bar {
  .bar-phone {
    margin-right: 8px;
  }

  .bar-left {
    display: flex;

    .name {
      font-size: $uni-font-size-lg;
      color: $uni-text-color;
      line-height: 60rpx;
      text-align: center;
      vertical-align: middle;
      height: 60rpx;
      justify-content: center;
      margin-left: $uni-spacing-col-lg;

    }
  }
}
</style>
