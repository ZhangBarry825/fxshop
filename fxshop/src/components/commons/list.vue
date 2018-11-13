<template>
  <div class="listBox">
      <h1 v-if="config.title">{{config.title}}</h1>
      <div class="list-overflow" v-if="isData">
        <div class="list-content" v-if="config.type==='type1'" v-for="(item,index) in config.data" v-bind:key="index" v-on:click="parentMethod(item[config.dataKey[3]],index)">
            <img :src="item[config.dataKey[0]]">
            <div class="list">
                <h2>{{item[config.dataKey[1]]}}</h2>
                <p>{{item[config.dataKey[2]]}}</p>
            </div>
        </div>
        <div class="list-content" v-if="config.type==='type2'" v-for="(item,index) in config.data" v-bind:key="index" v-on:click="parentMethod(item[config.dataKey[4]],index)">
            <img :src="item[config.dataKey[0]]">
            <div class="list">
                <h2>{{item[config.dataKey[1]]}}</h2>
                <h4>{{item[config.dataKey[2]]}}</h4>
                <h5>{{item[config.dataKey[3]]}}</h5>
            </div>
        </div>
        <div class="list-content" v-if="config.type==='type3'" v-for="(item,index) in config.data" v-bind:key="index" v-on:click="parentMethod(index)">
            <img :src="item[config.dataKey[0]]">
            <div class="list list1">
                <h2>{{item[config.dataKey[1]]}}</h2>
                <h3>{{item[config.dataKey[2]]}}</h3>
                <h3>{{item[config.dataKey[3]]}}</h3>  
            </div>
            <div class="btnBox">
              <button class="active" v-on:click.self="activeTo(index)">{{config.buttonText?config.buttonText:'记录变动'}}</button>
              <button class="active" v-on:click.self="activeTo1(index)">{{config.buttonText?config.buttonText:'到此一游'}}</button>
            </div>
        </div>
        <div class="list-content" v-if="config.type==='type4'" v-for="(item,index) in config.data" v-bind:key="index" v-on:click="parentMethod(item[config.dataKey[3]],index)">
            <img src="../../../static/images/ba1.png">
            <div class="list list1">
                <h2>{{item[config.dataKey[0]]}}<br><span class="timeDown">截止时间:{{item[config.dataKey[2]]}}</span></h2>
                <h3>{{item[config.dataKey[1]]}}</h3>
                <!-- <h3>{{item[config.dataKey[3]]}}</h3> -->
            </div>
            <button class="active" v-on:click.stop="activeTo(index)">签到</button>
        </div>
        <div class="list-content" v-if="config.type==='type5'" v-for="(item,index) in config.data" v-bind:key="index" v-on:click="parentMethod(index)">
            <img src="../../../static/images/ba1.png">
            <div class="list list1">
                <h2>{{item[config.dataKey[0]]}}<br><span class="timeDown">截止时间:{{item[config.dataKey[2]]}}</span></h2>
                <h3>{{item[config.dataKey[1]]}}</h3>
                <!-- <h3>{{item[config.dataKey[3]]}}</h3> -->
            </div>
            <input type="radio" name="type5" class="radioBox" v-on:click.self="activeTo(index)" v-bind:checked="isRadio">
        </div>
        <div class="list-content" v-if="config.type==='type6'" v-for="(item,index) in config.data" v-bind:key="index" v-on:click="activeTo(index)">
            <img src="../../../static/images/ba1.png">
            <div class="list">
                <h2>{{item[config.dataKey[0]]}}<br><span class="timeDown">上传时间:{{item[config.dataKey[1]]}}</span></h2>
                <h3>{{item[config.dataKey[2]]}}</h3>
                <h3>{{item[config.dataKey[3]]}}</h3>
            </div>
            <div class="listInd">
              <img class="imgIndex" v-if="index<=2" v-bind:src="'/static/images/list'+index+'.png'">
              <span class="indexBox" v-if="index>2">{{index+1}}</span>
            </div>
        </div>
        <div class="list-content" v-if="config.type==='type7'" v-for="(item,index) in config.data" v-bind:key="index" v-on:click="parentMethod(item[config.dataKey[0]],index)">
            <img src="../../../static/images/ba1.png">
            <div class="list lsit1">
                <h2>{{item[config.dataKey[1]]}}<br><span class="timeDown">上传时间:{{item[config.dataKey[2]]}}</span></h2>
                <h3>{{item[config.dataKey[3]]}}</h3>
                <h3>{{item[config.dataKey[4]]}}</h3>
            </div>
            <input type="radio" name="type7" class="radioBox" v-on:click.stop="activeTo(index)" v-bind:checked="isRadio">
        </div>
        <div class="list-more" v-if="config.more" v-bind:style="{color:config.color}" v-on:click="getmore">
          <span>查看更多</span>
          <em>&gt;</em>
        </div>
      </div>
      <div class="nodata" v-if="!isData">暂无数据</div>
  </div>
</template>
<style lang="scss" type="text/scss" scoped>
@import "../../scss/variable.scss";
.btnBox{
  display:flex;
  flex-direction:column;
  .active{
    font-size:1rem;
    height:2.4rem;
    &+.active{
      margin-top:1rem;
    }
  }
}
.radioBox {
  width: 2rem;
  height: 2rem;
}
.timeDown {
  color: #ff0000;
  font-size: 1rem;
}
.active {
  width: 5rem;
  height: 3rem;
  color: #fff;
  font-size: 1.4rem;
  background-color: $maincolor;
  border-radius: 4px;
}
.listBox {
  width: 100%;
  background-color: #fff;
  h1 {
    @extend %boxsizing;
    height: 5rem;
    margin: 0 1.3rem;
    font-size: 1.4rem;
    color: #a9a9a9;
    line-height: 5rem;
    border-bottom: 1px solid $bordercolor1;
  }
}
.list-overflow {
  // max-height: calc(100vh - 10rem);
  // padding-bottom:4rem;
  // overflow: auto;
  -webkit-overflow-scrolling: touch;
  .list-content {
    @extend %boxsizing;
    display: flex;
    align-items: center;
    padding: 1rem 0;
    margin: 0 2rem;
    border-bottom: 1px solid $bordercolor1;
    img {
      max-width: 6rem;
      min-width: 6rem;
      min-height: 6rem;
      max-height: 6rem;
      margin-right: 1rem;
    }
    &:nth-last-of-type(1) {
      border-bottom: none;
    }
    .list1{
      width:5rem;
    }
    .list {
      flex: auto;
      h2 {
        font-size: 1.4rem;
        padding-bottom: 0.8rem;
      }
      h4,
      h5 {
        // height:1.8rem;
        padding-left: 1.4rem;
        font-size: 1.3rem;
        color: #a9a9a9;
        line-height: 2.3rem;
        background-image: url("../../../static/images/wdcu_icon_phone.png");
        background-repeat: no-repeat;
        background-position: left center;
        background-size: 1.3rem;
      }
      h3 {
        font-size: 1.3rem;
        color: #a9a9a9;
        line-height: 2.1rem;
      }
      h5 {
        // white-space:nowrap;
        background-image: url("../../../static/images/wdcu_icon_place.png");
        background-size: 1.2rem;
        background-position: left 0.1rem;
      }
      p {
        height:2.8rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 1.3rem;
        line-height:1.4rem;
        color: #a9a9a9;
      }
    }
  }
}
.list-more {
  display: flex;
  justify-content: center;
  height: 4rem;
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 4rem;
  margin: 0 2rem;
}
.list-overflow .list-content .imgIndex {
  width: 5rem;
  height: 5rem;
  max-width: auto;
  min-width: auto;
  min-height: none;
  max-height: none;
}
.indexBox {
  display: block;
  width: 5rem;
  height: 5rem;
  text-align: center;
  color: #fff;
  font-size: 2rem;
  line-height: 5rem;
  border-radius: 5rem;
  background-color: #009944;
  margin-right: 1rem;
}
.nodata {
  width: 100%;
  height: 8rem;
  text-align: center;
  line-height: 8rem;
  font-size: 1.4rem;
  color: #a9a9a9;
}
</style>

<script>
import vueutil from "../../util/vueutil";
export default {
  props: {
    config: {
      type: Object,
      require: true
    },
    chageradio:{}
  },
  created: function() {
    if (this.config.data.length === 0) {
      this.isData = false;
    } else {
      this.isData = true;
    }
  },
  data: function() {
    return {
      // 是否显示有数据
      isData: false,
      // 选择radio是否选择
      isRadio:false
    };
  },
  methods: {
    //   响应父组件
    getmore: function() {
      this.$emit("getmore");
    },
    // 数据传到父组件
    outParent: function() {
      this.$emit("");
    },
    // 点击列表响应父组件
    parentMethod: function(id, ind) {
      // console.log(ind)
      // this.$emit("sendMethod", ind, 1);
      this.$emit("sendMethod", id, ind);
      // if (this.config.more) {

      // } else {
      //   this.$emit("sendMethod", ind, 1);
      // }
    },
    // 拜访点击相应父组件
    activeTo: function(ind) {
      this.$emit("activeTo", ind);
    },
    activeTo1:function(ind){
      this.$emit('activeTo1',ind);
    }
  },
  watch: {
    "config.data": {
      handler: function() {
        if (this.config.data.length === 0) {
          this.isData = false;
        } else {
          this.isData = true;
        }
      },
      deep: true
    }
  }
};
</script>

