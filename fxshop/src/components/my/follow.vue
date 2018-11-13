<template>
    <div class="follow">
        <msg title="成功" :description="descript" :buttons="buttons" :icon="icon"></msg>
    </div>
</template>

<script>
import { Msg, Divider, XButton } from "vux";
export default {
  data() {
    return {
      descript: "恭喜您成为会员",
      icon:'',
      buttons: [
        {
          type: "warn",
          text: "进入商城",
          link: "/index"
        }
      ]
    };
  },
  components: {
    Msg,
    Divider,
    XButton
  }
};
</script>

<style>
.follow .weui-icon-success{
    color:#E64340;
}
</style>


