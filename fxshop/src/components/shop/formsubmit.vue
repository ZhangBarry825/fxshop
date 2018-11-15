<template>
  <div class="content-formsubmit">
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">联系人</label></div>
        <div class="weui-cell__bd"><input class="weui-input" type="text" required="" pattern="" maxlength=""
                                          placeholder="请输入联系人" emptytips="请输入联系人" notmatchtips="请输入正确的联系人"></div>
        <div class="weui-cell__ft"><i class="weui-icon-warn"></i></div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
        <div class="weui-cell__bd"><input class="weui-input" type="tel" required="" pattern="^\d{11}$" maxlength="11"
                                          placeholder="请输入手机号" emptytips="请输入手机号" notmatchtips="请输入正确的手机号"></div>
        <div class="weui-cell__ft"><i class="weui-icon-warn"></i></div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">身份证号码</label></div>
        <div class="weui-cell__bd"><input class="weui-input" type="text" required="" pattern="REG_IDNUM" maxlength="18"
                                          placeholder="请输入身份证号码" emptytips="请输入身份证号码" notmatchtips="请输入正确的身份证号码"></div>
        <div class="weui-cell__ft"><i class="weui-icon-warn"></i></div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">电子信箱</label></div>
        <div class="weui-cell__bd"><input class="weui-input" type="text" required="" pattern="" maxlength=""
                                          placeholder="请输入电子信箱" emptytips="请输入电子信箱" notmatchtips="请输入正确的电子信箱"></div>
        <div class="weui-cell__ft"><i class="weui-icon-warn"></i></div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">收款方式</label></div>
        <div class="weui-cell__bd">
          <label class="single"style="margin-right: 1rem" ><input type="radio" checked name="receiveStyle" style="height: 1.7rem;width: 1.7rem" value=""/>微信</label>
          <label class="single"><input type="radio" name="receiveStyle"  style="height: 1.7rem;width: 1.7rem" value=""/>支付宝</label>
        </div>
      </div>
    </div>
    <div class="weui-cell weui-cell1">
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <p class="weui-uploader__title">身份证正面</p>
            <div class="weui-uploader__info">
              <!--<span id="uploadCount">0</span>/5-->
            </div>
          </div>
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
              <li class="weui-uploader__file " v-if="picOne" data-id="1" @click="selectPic(1)"
                  :style="'background-image: url('+picOne+')'">
              </li>
            </ul>
            <div class="weui-uploader__input-box" @click="selectPic(1)" v-show="!picOne">
              <input id="uploaderInputOne" class="weui-uploader__input" @change="changePic(1)" type="file"
                     accept="image/*" capture="camera" multiple="">
            </div>
          </div>
        </div>
      </div>
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <p class="weui-uploader__title">身份证反面</p>
            <div class="weui-uploader__info">
            </div>
          </div>
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
              <li class="weui-uploader__file " v-if="picTwo" data-id="2" @click="selectPic(2)"
                  :style="'background-image: url('+picTwo+')'">
              </li>
            </ul>
            <div class="weui-uploader__input-box" @click="selectPic(2)" v-show="!picTwo">
              <input id="uploaderInputTwo" class="weui-uploader__input" @change="changePic(2)" type="file"
                     accept="image/*" capture="camera" multiple="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <p class="weui-uploader__title">营业执照</p>
            <div class="weui-uploader__info">
            </div>
          </div>
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
              <li class="weui-uploader__file " v-if="picThree" data-id="3" @click="selectPic(3)"
                  :style="'background-image: url('+picThree+')'">
              </li>
            </ul>
            <div class="weui-uploader__input-box" @click="selectPic(3)" v-show="!picThree">
              <input id="uploaderInputThree" class="weui-uploader__input" @change="changePic(3)" type="file"
                     accept="image/*" capture="camera" multiple="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area" @click="warnTip"><a id="formSubmitBtn" href="javascript:" class="weui-btn weui-btn_primary">提交</a></div>
  </div>
</template>

<script>
  import 'weui'
  import weui from 'weui.js'

  export default {
    name: "formsubmit",
    data() {
      return {
        picOne: '',
        picTwo: '',
        picThree: '',
        picFour: '',
      }
    },
    methods: {
      getEle(num) {
        var r;
        switch (num) {
          case 1:
            r = document.getElementById('uploaderInputOne')
            break;
          case 2:
            r = document.getElementById('uploaderInputTwo')
            break;
          case 3:
            r = document.getElementById('uploaderInputThree')
            break;
          case 4:
            r = document.getElementById('uploaderInputFour')
            break;
        }
        return r;
      },
      selectPic(num) {
        this.getEle(num).click()

      },
      changePic(num) {
        const elInput = this.getEle(num)
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target.result;
          switch (num) {
            case 1:
              this.picOne = src;
              break;
            case 2:
              this.picTwo = src;
              break;
            case 3:
              this.picThree = src;
              break;
            case 4:
              this.picFour = src;
              break;
          }
        };
        if (elInput.files && elInput.files[0]) {
          reader.readAsDataURL(elInput.files[0]);
        }
      },
      warnTip(){
        weui.topTips('请填写正确的字段');
      }
    },
    mounted() {

    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .content-formsubmit {
    background-color: white;
    margin-top: 1rem;
    padding-bottom: 5rem;
    input {
      height: 2rem;
    }
    .weui-uploader__file {
      /*border: 1px solid gainsboro;*/
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
    .weui-cell1::before{
      display: none;
    }
  }
</style>
