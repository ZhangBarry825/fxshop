<template>
  <div class="gray-back">
    <!-- <swiper v-if="swiperShow" loop auto :list="banner" :aspect-ratio="310/750"></swiper> -->
    <ul class="shop-gn">
      <li><img src="../../../static/images/QR_code.png" v-on:click="pr('/myercode')"><span>专属二维码</span></li>
      <li><img src="../../../static/images/commission.png" @click="pr('/yongjin')"><span>我的佣金</span></li>
      <li><img src="../../../static/images/promotion.png" @click="pr('/spread')"><span>推广人数</span></li>
      <li><img src="../../../static/images/QR_code.png" @click="gotoOk"><span>关注公众号</span></li>
    </ul>
    <!-- <div class="shop-content">
      <div class="shop-search" @click="pr('/search')">搜索</div>
    </div> -->
    <div v-if="nopro" style="width:100%;padding:4rem 0;text-align:center;background-color:#fff;font-size:1.4rem;">暂无商品</div>
    <shoplist v-if="!nopro" v-bind:goods="shopList" style="margin-top:1rem;"></shoplist>
  </div>
</template>

<script>
import { Swiper } from "vux";
import shoplist from "./shoplist.vue";
export default {
  activated() {
    if (this.shopList.length == 0) {
      this.post(
        "/fxuser/productlist",
        {
          userid: window.sessionStorage.getItem("qqq")
        },
        function(res) {
          if (res.data.result == 1) {
            this.shopList = res.data.data;
            // console.log(this.shopList[0])
            if(this.shopList.length==0){
              this.nopro=true;
            }
          } else {
            alert(res.data.msg);
          }
        }
      );
    }
    this.swiperShow = true;
  },
  deactivated() {
    this.swiperShow = false;
  },
  data: function() {
    return {
      nopro:false,
      shopList: [],
      swiperShow: true,
      banner: [
        {
          url:
            "http://weizhicheng.shangdu.com/newwofortg/mobile/app/s/s.html?page=ho&token=0371_3&ms=15638588961",
          img: require("../../../static/images/banner.png")
        },
        {
          url:
            "http://weizhicheng.shangdu.com/newwofortg/mobile/app/s/s.html?page=ho&token=0371_3&ms=15638588961",
          img: require("../../../static/images/banner.png")
        }
      ]
    };
  },
  methods: {
    gotoOk(){
      window.location.href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5MzU1MzI4Mw==&scene=126#wechat_redirect"
    }
  },
  components: {
    Swiper,
    shoplist
  }
};
</script>


<style lang="scss" scoped type="text/scss">
@import "../../scss/variable.scss";
.shop-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 1rem 0.6rem 5rem;
  background-color: #fff;
  @at-root .shop-listB {
    width: 50%;
    box-sizing: border-box;
    padding: 1rem;
    img {
      display: block;
      width: 100%;
      height: 11rem;
    }
    h4 {
      font-size: 1.3rem;
      // font-weight:bold;
      color: #333;
      line-height: 2.6rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .shop-message {
      width: 100%;
      overflow: hidden;
      span {
        float: left;
        color: $moneyc;
        font-weight: bold;
        font-size: 1.3rem;
        &.shop-B {
          padding-left: 1.6rem;
          background: url("../../../static/images/integrals_1.png") no-repeat
            left center;
          background-size: 1.4rem;
        }
      }
      b {
        float: right;
        color: #999;
        font-size: 1.2rem;
        font-weight: normal;
      }
    }
  }
}
.banner-box {
  width: 100%;
  height: 22vw;
}
.bannerImg {
  width: 100%;
  height: 100%;
}
.shop-content {
  margin-top: 1.2rem;
  padding-top: 2rem;
  background-color: #fff;
  .shop-search {
    width: 90%;
    height: 3.6rem;
    background-color: #ededed;
    box-sizing: border-box;
    line-height: 3.6rem;
    font-size: 1.4rem;
    color: #999;
    margin: 0 auto;
    padding-left: 3rem;
    background-image: url("../../../static/images/search.png");
    background-repeat: no-repeat;
    background-position: 1rem center;
    background-size: 1.4rem;
  }
}
.shop-gn {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 3%;
  padding: 2.3rem 0;
  background-color: #fff;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    // padding-top:2.3rem;
    img {
      width: 5rem;
      margin-bottom: 0.7rem;
    }
    span {
      font-size: 1.3rem;
    }
  }
}
</style>
