<template>
    <div>
        <keep-alive v-if="$route.name=='bespeakInd' || $route.name=='consultInd' || $route.name=='complainInd'">
          <div class="banner-box">
              <!-- <swiper v-if="banner" loop auto :aspect-ratio="400/800">
                  <swiper-item class="swiper-demo-img" v-for="(item, index) in banner" :key="index">
                      <img :src="item.img" class="bannerImg">
                  </swiper-item>
              </swiper> -->
              <swiper loop auto :list="banner" :aspect-ratio="380/800"></swiper>
          </div>
        </keep-alive>
        <router-view></router-view>
        <ul class="tabBar-box">
            <router-link tag="li" class="routerLink" active-class="active" to="/bespeakInd"><em>预约</em></router-link>
            <router-link tag="li" class="routerLink" active-class="active" to="/consultInd"><em>咨询</em></router-link>
            <router-link tag="li" class="routerLink" active-class="active" to="/integral"><em>我的</em></router-link>
            <router-link tag="li" class="routerLink" active-class="active" to="/complainInd"><em>投诉</em></router-link>
            <router-link tag="li" class="routerLink" active-class="active" to="/position1"><em>定位签到</em></router-link>
        </ul>
    </div>
</template>

<style lang="scss" type="text/scss" scoped>
@import "../scss/variable.scss";
.banner-box {
  width: 100%;
  height: 48vw;
}
.bannerImg {
  width: 100%;
  height: 100%;
}
.tabBar-box {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #dedede;
  background-color: #fff;
  li.routerLink {
    flex: auto;
    width: 20%;
    padding-bottom: 0.4rem;
    padding-top: 3rem;
    font-size: 1.2rem;
    text-align: center;
    color: #888888;
    background-position: center 0.6rem;
    background-repeat: no-repeat;
    background-size: 2rem;
    &:nth-of-type(1) {
      background-image: url("../../static/images/icon_yuyue_normal@2x.png");
    }
    &:nth-of-type(2) {
      background-image: url("../../static/images/icon_zixun_normal@2x.png");
    }
    &:nth-of-type(3) {
      background-image: url("../../static/images/icon_jifen_normal@2x.png");
    }
    &:nth-of-type(4) {
      background-image: url("../../static/images/icon_tousu_normal@2x.png");
    }
    &:nth-of-type(5) {
      background-size: 1.6rem;
      background-image: url("../../static/images/useposition.png");
    }
    &.active:nth-of-type(1) {
      color: #009fe8;
      background-image: url("../../static/images/icon_yuyue_selected@2x.png");
    }
    &.active:nth-of-type(2) {
      color: #d4237a;
      background-image: url("../../static/images/icon_zixun_selected@2x.png");
    }
    &.active:nth-of-type(3) {
      color: #a129ed;
      background-image: url("../../static/images/icon_jifen_selected@2x.png");
    }
    &.active:nth-of-type(4) {
      color: #009944;
      background-image: url("../../static/images/icon_tousu_selected@2x.png");
    }
    &.active:nth-of-type(5) {
      color: #a129ed;
      background-size: 1.6rem;
      background-image: url("../../static/images/address.png");
    }
  }
}
</style>

<script>
import { Swiper, SwiperItem } from "vux";
export default {
  created: function() {
    
  },
  data: function() {
    return {
      banner: [
        {
          url: "http://weizhicheng.shangdu.com/newwofortg/mobile/app/s/s.html?page=ho&token=0371_3&ms=15638588961",
          img: require('../../static/images/da1.jpg'),
          // title: "送你一朵fua"
        },
        {
          url: "http://weizhicheng.shangdu.com/newwofortg/mobile/app/s/s.html?page=ho&token=0371_4&ms=15638588961",
          img: require('../../static/images/da2.jpg'),
          // title: "送你一朵fua"
        },{
          url: "http://weizhicheng.shangdu.com/newwofortg/mobile/app/s/s.html?page=ho&token=0371_7&ms=15638588961",
          img: require('../../static/images/da3.jpg'),
          // title: "送你一朵fua"
        },
      ],
      // 加载次数
      isBanner: true
    };
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>