<template>
  <div class="h100 gray-back">
    <x-header :left-options="{backText: ''}">提交记录</x-header>
    <div class="list_no">
      <img src="../../../static/images/none2_img.png" class="list_ico" alt="">
      <p>您没有提交记录</p>
    </div>
  </div>
</template>

<script>
  import {Group, XHeader, Checker, CheckerItem} from "vux";

  export default {
    created:()=> {
      this.post("/fxuser/listsite", {},(res)=> {
          console.log(res)
        });
    },
    data: function () {
      return {

      };
    },
    methods: {

    },
    watch: {
    },
    components: {
      Group,
      XHeader,
      Checker,
      CheckerItem
    }
  };
</script>

<style type="text/scss" lang="scss">
  @import "../../scss/extend.scss";

  .address_list {
    font-size: 1.3rem;
    color: #000;
    line-height: 1.5;
    li {
      padding: 1rem 1rem 0;
      margin-bottom: 1rem;
      background: #fff;
    }
    .names {
      line-height: 2;
    }
    .phones {
      float: right;
    }
    .address {
      color: #666;
    }
    .acts {
      color: #999;
      border-top: 1px solid $bordercolor;
      margin-top: 1rem;
      padding: 1rem 0;
      img {
        width: 1.2rem;
        margin-right: 0.35rem;
        display: inline-block;
        vertical-align: -1px;
      }
    }
    .btn_act {
      float: right;
      // display: inline-block;
      margin-left: 2rem;
    }
    .check-item-selected {
      color: $mc;
    }
  }
</style>
