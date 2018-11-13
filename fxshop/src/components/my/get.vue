<template>
    <div>
        <group>
            <x-input title="提现金额" v-model="money"></x-input>
        </group>
        <div class="okButton">
            <x-button type="warn" @click.native="ok">确定</x-button>
        </div>
    </div>
</template>


<script>
import { Group, XInput, XButton } from "vux";
export default {
  data: function() {
    return {
      money: "",
      moneyRg: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    };
  },
  methods: {
    ok() {
      var test = this.moneyRg.test(this.money.trim());
      if (!test) {
        alert("请输入正确金额");
        return;
      }
      this.post(
        "/fxuser/sqtxwx",
        {
          userid: window.sessionStorage.getItem("qqq"),
          money: this.money
        },
        function(res) {
          if(res.data.msg==1){
            alert('提现成功，请到微信查收');
            this.money='';
          }else if(res.data.msg==2){
            alert('提现金额不能大于余额');
          }else if(res.data.msg==4){
            alert('一个月只能提现三次')
          }else if(res.data.msg==5){
            alert('你未绑定微信，不能提现')
          }else if(res.data.msg==6){
            alert('提现不成功，异常')
          }else{
            alert(res.data.msg)
          }
        }
      );
    }
  },
  components: {
    Group,
    XInput,
    XButton
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.okButton {
  width: 90%;
  margin: 2rem auto;
}
</style>