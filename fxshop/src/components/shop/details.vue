<template>
    <div class="gray-back onescreen">
        <swiper loop auto :list="banner" :aspect-ratio="460/750"></swiper>
        <div class="details-top">
            <h4>{{productList.name}}</h4>
            <div class="details-num">
                <span>￥{{productList.money}}</span>
                <b> </b>
                <em>库存{{productList.amount}}</em>
            </div>
        </div>
        <div class="details-getnum">
            <group gutter="10px">
                <x-number title="选择购买数量" v-model="getNum" :min="1" :max="productList.amount"></x-number>
            </group>
        </div>
        <div class="details-goods">
            <h4>商品介绍</h4>
        </div>
        <div class="details-img">
            <img :src="productList.imgs" alt="">
        </div>
        <div class="details-buy">
            <button type="button" @click="buypro">立即购买</button>
        </div>
    </div>
</template>

<script>
import { Swiper, Group, XNumber } from "vux";
export default {
  activated: function() {
    let that=this;
    if (this.$store.state.productC !== this.$route.params.id) {
      this.getNum=1;
      this.post(
        "/fxuser/cxproduct",
        {
          id: this.$route.params.id
        },
        function(res) {
          // console.log(res);
          if (res.data.result == 1) {
            this.productList = res.data.data;
            this.banner[0].img = res.data.data.img;
            this.$store.commit('setproductc',this.$route.params.id)
          } else {
            alert(res.data.msg);
          }
        }
      );
    }
    this.post(
      "/weixin/getSignJsp",
      {
        url: window.location.href.split("#")[0]
      },
      function(res) {
        wx.config({
          debug: false,
          appId: "wx483e5f4d681b51fb",
          timestamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"]
        });
        wx.ready(function() {
          // alert(window.location.href);
          //            分享朋友
          wx.onMenuShareAppMessage({
            title: that.productList.danwei, // 分享标题
            desc:that.productList.content, // 分享描述
            link:window.location.origin+window.location.pathname+'?from=singlemessage&isappinstalled=0'+window.location.hash,// 分享链接，该链接域名必须与当前企业的可信域名一致
            imgUrl:
              "http://www.dpjys.com.cn/resources/dists/static/images/ercode.jpg", // 分享图标
            type: "link", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
          //            分享朋友圈
          wx.onMenuShareTimeline({
            title:that.productList.danwei+that.productList.content,
            // 分享标题
            link:window.location.origin+window.location.pathname+'?from=singlemessage&isappinstalled=0'+window.location.hash, // 分享链接，该链接域名必须与当前企业的可信域名一致
            imgUrl:
              "http://www.dpjys.com.cn/resources/dists/static/images/ercode.jpg", // 分享图标
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
        });
        wx.error(function(res) {
        });
      }
    );
  },
  data: function() {
    return {
      getNum: 1,
      productList: {},
      banner: [{ img: "" }]
    };
  },
  methods: {
    buypro() {

      this.post(
        "/fxuser/buy_cp",
        {
          userid: window.sessionStorage.getItem("qqq"),
          products: this.$route.params.id,
          geshu: this.getNum
        },
        function(res) {
          // console.log(res)
          var total=(this.getNum*this.productList.money).toFixed(2);
          if (res.data.result == 1) {
            // return;
            this.post(
              "/weixin/getSign",
              {
                out_trade_no: res.data.data,
                total_amount: total,
                userid: window.sessionStorage.getItem("qqq")
              },
              function(res) {
                function onBridgeReady() {
                  var data = res.data;
                  WeixinJSBridge.invoke(
                    "getBrandWCPayRequest",
                    {
                      appId: data.appId, //公众号名称，由商户传入
                      timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
                      nonceStr: data.nonceStr, //随机串
                      package: data.package,
                      signType: data.signType, //微信签名方式：
                      paySign: data.paySign //微信签名
                    },
                    function(res) {
                      if (res.err_msg == "get_brand_wcpay_request:ok") {
                        alert("购买成功");
                        // _this.$router.push("/follow/no");
                        // _this.$router.push("/card");
                      } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    }
                  );
                }
                if (typeof WeixinJSBridge == "undefined") {
                  if (document.addEventListener) {
                    document.addEventListener(
                      "WeixinJSBridgeReady",
                      onBridgeReady,
                      false
                    );
                  } else if (document.attachEvent) {
                    document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
                    document.attachEvent(
                      "onWeixinJSBridgeReady",
                      onBridgeReady
                    );
                  }
                } else {
                  onBridgeReady();
                }
              }
            );
          } else if (res.data.result == 2) {
            this.$router.push("/address_add");
          } else {
            alert(res.data.msg);
          }
        }
      );
    }
  },
  components: {
    Swiper,
    XNumber,
    Group
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
@import "../../scss/variable.scss";
.details-buy {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  button {
    width: 100%;
    // height:100%;
    line-height: 4rem;
    text-align: center;
    font-size: 1.4rem;
    color: #fff;
    background-color: $mc;
  }
}
.onescreen {
  width: 100%;
  height: 100vh;
  overflow: auto;
  // position:relative;
}
.details-img {
  padding-bottom: 5rem;
  img {
    width: 100%;
  }
}
.details-goods {
  margin-top: 1rem;
  background-color: #fff;
  padding: 2rem 1.6rem;
  h4 {
    font-size: 1.5rem;
    color: #333;
  }
  @at-root.details-param {
    padding-top: 0.6rem;
    font-size: 1rem;
    color: #717171;
    h6 {
      font-size: 1.2rem;
      line-height: 3rem;
      // color:#717171;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 46%;
        line-height: 1.8rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &:nth-of-type(2n) {
          padding-left: 2%;
        }
        &:nth-of-type(2n-1) {
          padding-right: 2%;
        }
      }
    }
    img {
      width: 100%;
    }
  }
}
.details-top {
  background-color: #fff;
  padding: 2rem 1.6rem 0.5rem;
  h4 {
    font-size: 1.4rem;
    color: #333;
    line-height: 2rem;
    // font-weight:bold;
  }
  @at-root.details-num {
    display: flex;
    height: 4rem;
    line-height: 4rem;
    // padding-top:1.2rem;
    span {
      font-size: 1.6rem;
      color: $moneyc;
      font-weight: bold;
    }
    b {
      flex: auto;
      font-size: 1.2rem;
      color: #999;
      font-weight: normal;
      padding-left: 1rem;
    }
    em {
      font-size: 1.2rem;
      color: #999;
    }
  }
}
</style>

<style>
.details-getnum .vux-number-selector svg {
  fill: #d82e2f;
}
</style>

