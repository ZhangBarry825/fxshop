<template>
    <div class="content-formsubmit">
      <input type="tel" required pattern="[0-9]{11}" placeholder="输入你现在的手机号" emptyTips="请输入手机号" notMatchTips="请输入正确的手机号">
      <input type="text" required pattern="REG_IDNUM" placeholder="输入你的身份证号码" emptyTips="请输入身份证号码" notMatchTips="请输入正确的身份证号码">
    </div>
</template>

<script>
  import 'weui'
  import weui from 'weui.js'
    export default {
      name: "formsubmit",
      mounted(){

      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
.content-formsubmit{
  background-color: white;
  margin-top: 1rem;
  padding: 0.5rem 0;
  input{
    height: 2rem;
  }
}
</style>
