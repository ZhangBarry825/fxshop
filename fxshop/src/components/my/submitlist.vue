<template>
  <div class="h100 gray-back" style="position:fixed;width: 100%;overflow: scroll;">
    <x-header :left-options="{backText: ''}" style="position: fixed;width: 100%">提交记录</x-header>
    <div class="list_no" v-if="true" style="padding-top: 15rem;">
      <img src="../../../static/images/none2_img.png" class="list_ico" alt="">
      <p>您没有提交记录</p>
    </div>
    <div class="group"></div>
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
  .gray-back{
    .group{
      width: 100%;
      background-color: gold;
      height: 50rem;
    }
  }
</style>
