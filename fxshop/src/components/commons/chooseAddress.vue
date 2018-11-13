<template>
  <div v-if="addressObj">
    <div class="chooseBoxBck" v-on:click="closeAddressBox"></div>
    <div class="chooseAddressBox" >
    <ul class="chooseAddressBtn">
      <li v-on:click="closeAddressBox">取消</li>
      <li v-on:click="getAddress">确定</li>
    </ul>
    <div class="chooseAddressBck"></div>
    <div class="chooseAddress">
      <dl v-on:touchstart="touchStatData($event,1)" v-on:touchmove="touchMoveData($event,1)" v-on:touchend="touchEndData($event,1)">
        <dd v-for="(item,index) in addressObj" v-bind:class="{current:index===0}" :key="index">{{item.areaName}}</dd>
      </dl>
      <dl v-on:touchstart="touchStatData($event,2)" v-on:touchmove="touchMoveData($event,2)" v-on:touchend="touchEndData($event,2)">
        <dd v-for="(item,index) in addressObj[currentInd1].cities" v-bind:class="{current:index===0}" v-bind:key="index">{{item.areaName}}</dd>
      </dl>
      <dl v-on:touchstart="touchStatData($event,3)" v-on:touchmove="touchMoveData($event,3)" v-on:touchend="touchEndData($event,3)">
        <dd v-for="(item,index) in addressObj[currentInd1].cities[currentInd2].counties" v-bind:class="{current:index===0}" v-bind:key="index">{{item.areaName}}</dd>
      </dl>
    </div>
  </div>
  </div>
</template>
<style scoped>
.chooseAddressBox {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 120;
}
.chooseAddressBck {
  position: absolute;
  width: 100%;
  height: 36px;
  background-color: rgba(253, 97, 12, 0.1);
  top: 118px;
  z-index: 10;
}
.chooseAddressBtn {
  width: 100%;
  height: 46px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ececec;
}
.chooseAddressBtn li {
  flex: auto;
  text-align: center;
  font-size: 1.8rem;
  height: 46px;
  line-height: 48px;
  color: #919191;
}
.chooseAddressBtn li + li {
  color: #fd6210;
}
.chooseAddress {
  position: relative;
  z-index: 11;
  width: 100%;
  height: 180px;
  background-color: transparent;
  overflow: hidden;
}
.chooseAddressBox dl {
  float: left;
  width: 33.3333%;
  -webkit-overflow-scrolling: touch;
  transform: translateY(72px) translateZ(0);
}
.chooseAddressBox dl dd {
  height: 36px;
  width: 100%;
  line-height: 36px;
  font-size: 16px;
  text-align: center;
  color: #353535;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.chooseAddressBox dl .current {
  color: #ff6117;
}
.chooseBoxBck{
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,.5);
}
</style>
<script>
export default {
  props: ["message"],
  created: function() {
    var _this = this;
    var ajax = new XMLHttpRequest();
    // console.log(process.env.API_HOST);
    if (process.env.API_HOST == "/api/") {
      ajax.open("GET", "../../static/json/city.json");
    } else {
      ajax.open(
        "GET",
        "http://www.dpjys.com.cn/resources/dists/static/json/city.json"
      );
    }
    ajax.send(null);
    ajax.onreadystatechange = function() {
      if (ajax.readyState === 4) {
        if ((ajax.status >= 200 && ajax.status <= 300) || ajax.status === 304) {
          var addressText = JSON.parse(ajax.responseText);
          // _this.$store.commit("setAddressBox", addressText);
          _this.addressObj = addressText;
          _this.getJsonSuccess = true;
        }
      }
    };
  },
  data: function() {
    return {
      // 修改样式记忆当前项
      currentEle1: null,
      currentEle2: null,
      currentEle3: null,
      // 初始触摸点
      touchStart1: "",
      touchStart2: "",
      touchStart3: "",
      // 记忆触摸后偏移的位置
      touchPosition1: 72,
      touchPosition2: 72,
      touchPosition3: 72,
      // 记忆触摸移动的位置
      touchMove1: "",
      touchMove2: "",
      touchMove3: "",
      // 记忆当前的序列数
      currentInd1: 0,
      currentInd2: 0,
      currentInd3: 0,
      getJsonSuccess: false,
      addressObj: ""
    };
  },
  methods: {
    getAddress: function() {
      var bigProvince = this.addressObj[this.currentInd1];
      var bigCity = bigProvince.cities[this.currentInd2];
      var province = bigProvince.areaName;
      var city = bigCity.areaName;
      var area = bigCity.counties[this.currentInd3].areaName;
      this.$emit("setAddress", province + " " + city + " " + area);
    },
    closeAddressBox: function() {
      this.$emit("setAddress");
    },
    touchStatData: function(e, i) {
      e.preventDefault();
      this["touchStart" + i] = e.touches[0].clientY;
    },
    touchMoveData: function(e, i) {
      var touchMove = e.touches[0].clientY;
      var touchDis = touchMove - this["touchStart" + i];
      var eTarget = e.target;
      var memoryInd1 = this.currentInd1;
      var memoryInd2 = this.currentInd2;
      eTarget.parentNode.style.transform =
        "translateY(" + (this["touchPosition" + i] + touchDis) + "px)";
      var currentPosition = eTarget.parentNode.style.transform;
      var currentDistance =
        (currentPosition.slice(11, currentPosition.length - 3) - 90) * -1;
      var currentIndex = parseInt(currentDistance / 36);
      var eTargetLen = eTarget.parentNode.children.length;
      if (currentIndex >= eTargetLen) {
        currentIndex = eTargetLen - 1;
      } else if (currentIndex <= 0) {
        currentIndex = 0;
      }
      if ((i === 1 || i === 2) && currentIndex !== eval("memoryInd" + i)) {
        this["currentInd" + (i - 0 + 1)] = 0;
      }
      var currentEle = eTarget.parentNode.children[currentIndex];
      if (this["currentEle" + i]) {
        this["currentEle" + i].classList.remove("current");
      }
      currentEle.classList.add("current");
      this["currentEle" + i] = currentEle;
      this["touchMove" + i] = touchDis;
      this["currentInd" + i] = currentIndex;
    },
    touchEndData: function(e, i) {
      var targetParent = e.target.parentNode;
      var targetSib = targetParent.children;
      var targetParSib = targetParent.nextElementSibling;
      targetParent.style.transform =
        "translateY(" + (this["currentInd" + i] - 2) * -36 + "px)";
      targetSib[this["currentInd" + i]].classList.add("current");
      this["touchPosition" + i] = (this["currentInd" + i] - 2) * -36;
      if (i === 1) {
        this.touchPosition2 = 72;
        this.touchPosition3 = 72;
        this.currentInd2 = 0;
        this.currentInd3 = 0;
        if (this.currentEle2 && this.currentEle3) {
          this.currentEle2.classList.remove("current");
          this.currentEle3.classList.remove("current");
        } else if (this.currentEle2) {
          this.currentEle2.classList.remove("current");
        }
        targetParSib.style.transform = "translateY(72px)";
        targetParSib.children[0].classList.add("current");
        targetParSib.nextElementSibling.style.transform = "translateY(72px)";
        targetParSib.nextElementSibling.children[0].classList.add("current");
      } else if (i === 2) {
        this.currentInd3 = 0;
        this.touchPosition3 = 72;
        if (this.currentEle3) {
          this.currentEle3.classList.remove("current");
        }
        targetParSib.style.transform = "translateY(72px)";
        targetParSib.children[0].classList.add("current");
      }
    }
  },
  watch: {
    message: function() {
      // if(!this.$store.state.addressBox){
      //   var _this=this;
      //   var ajax=new XMLHttpRequest();
      //   console.log();
      //   if(process.env.API_HOST=='/api/'){
      //     ajax.open('GET','../../static/json/city.json');
      //   }else{
      //     ajax.open('GET','http://www.drdkd.net/resources/dists/static/json/city.json ');
      //   }
      //   ajax.send(null);
      //   ajax.onreadystatechange=function(){
      //     if(ajax.readyState===4){
      //       if(ajax.status>=200 && ajax.status<=300 || ajax.status===304){
      //         var addressText=JSON.parse(ajax.responseText);
      //         _this.$store.commit('setAddressBox',addressText);
      //         _this.addressObj=addressText;
      //         _this.getJsonSuccess=true;
      //       }
      //     }
      //   }
      // }else{
      //   this.addressObj=this.$store.state.addressBox;
      // }
    }
  }
};
</script>
