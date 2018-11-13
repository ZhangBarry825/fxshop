<template>
  <div class="code-box">
      <button class="code-button" type="button" v-on:click="getCode" v-bind:disabled="btnEnable">{{btnText}}</button>
      <div class="code-test" v-show="iscodeshow" v-on:click.self="hideCode">
          <div class="code-test-box">
              <div class="code-test-content">
                <img v-bind:src="codeImg" alt="看不清，点击刷新" v-on:click="getCode">
                <input type="number" placeholder="请输入计算得到的值" v-model="codeVal">
              </div>
              <button v-on:click="submitCode">确定</button>
          </div>
      </div>
  </div>
</template>

<style lang="scss" type="text/scss" scoped>
@import "../../scss/variable.scss";
.code-button {
  width: 5rem;
  height: 3rem;
    transform: translateX(-14vw);
    @media screen and (max-width:320px){
      transform: translateX(0vw);
    }
  @extend %boxsizing;
  font-size: 1.4rem;
  color: $maincolor;
  text-align: center;
  line-height: 3rem;
  border: 1px solid $maincolor;
  background-color: #fff;
  @extend %borderradius;
}
.code-test {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  @at-root .code-test-box {
    width: 80vw;
    height: 40vw;
    @extend %boxsizing;
    padding: 2rem;
    background-color: #fff;
    @extend %borderradius;
    @at-root .code-test-content {
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        @extend %boxsizing;
        flex: auto;
        height: 4rem;
        padding-left: 0.4rem;
        margin-left: 0.4rem;
        @extend %borderradius;
        border: 1px solid #d4d4d4;
        &::-webkit-input-placeholder {
          font-size: 1.2rem;
          white-space: nowrap;
        }
      }
      img {
        width: 10rem;
        height: 4rem;
      }
    }
    button {
      width: 100%;
      height: 4rem;
      @extend %borderradius;
      font-size: 1.3rem;
      color: #fff;
      background-color: $maincolor;
      margin-top: 1rem;
    }
  }
}
</style>

<script>
import util from "../../util/util.js";
export default {
  props: {
    telnumber: {
      type: [String, Number],
      required: true
    },
    codeType: {
      type: [Number],
      required: true
    }
  },
  data: function() {
    return {
      // 验证码页面是否显示
      iscodeshow: false,
      // 验证码ind次数
      codeInd: 0,
      // 验证码图片地址
      codeImg: "",
      // 验证码值
      codeVal: "",
      // 倒计时
      time: "",
      // 按钮字
      btnText: "发送",
      // 按钮是否可用
      btnEnable: false
    };
  },
  methods: {
    // 获取验证码
    getCode: function() {
        var _this=this;
        // debugger;
      var load = util.testSubmit({
        phone: {
          val: _this.telnumber,
          errmsg: "手机号错误，请填写正确的手机号",
          rquired: true,
          name: "手机"
        }
      });
      if (load.length === 1) {
        this.$emit("showToastBox", "手机号码不正确");
        return;
      }
      this.$http
        .get(this.API + "/cic/code", {
          params: {
            name: "usercode"
          }
        })
        .then(
          function(res) {
            this.codeInd++;
            this.codeImg = this.API + "/cic/code?name=usercode#" + this.codeInd;
            if (!this.iscodeshow) {
              this.iscodeshow = true;
            }
          },
          function(err) {}
        );
    },
    // 隐藏验证码框
    hideCode: function() {
      this.iscodeshow = !this.iscodeshow;
    },
    // 提交code
    submitCode: function() {
      if (this.codeVal === "") {
        this.$emit("showToastBox", "数字验证码不能为空");
        return;
      }
      this.$http
        .post(
          this.API + "/tybuser/sendcnm",
          {
            type: this.codeType,
            phone: this.telnumber,
            erCodeInp: this.codeVal
          },
          { emulateJSON: true }
        )
        .then(
          function(res) {
            if (res.data.result === 1) {
              this.hideCode();
              this.btnEnable = true;
              this.codeVal = "";
              this.$emit("showToastBox", res.data.data);
              var _this = this;
              var time = 60;
              var timer = setInterval(function() {
                _this.btnText = (--time > 9 ? time : "0" + time) + "S";
                if (parseInt(time) === 0) {
                  clearInterval(timer);
                  _this.btnEnable = false;
                  _this.btnText = "发送";
                }
              }, 1000);
            } else if (res.data.result === 2) {
              this.hideCode();
              this.$emit("showToastBox", res.data.msg);
            } else {
              this.$emit("showToastBox", res.data.msg);
            }
          },
          function(err) {}
        );
    }
  }
};
</script>
