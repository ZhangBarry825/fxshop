<template>
    <div class="h100 gray-back">
        <x-header :left-options="{backText: ''}">收货地址<a slot="right" style="color:#d82e2f" @click="pr('address_add')">新增地址</a></x-header>
        <div class="list_no" v-show="address_list.length == 0">
            <img src="../../../static/images/none2_img.png" class="list_ico" alt="">
            <p>您没有收货地址</p>
        </div>
        <ul class="address_list" v-show="address_list.length > 0">
            <li v-for="(item,index) in address_list" :key="index">
                <p class="names"><span class="phones">{{item.phone}}</span>{{item.people}}</p>
                <p class="address">
                    {{item.allcontent}}
                </p>
                <p class="acts">
                    <span class="act_del btn_act" @click="del_address(item.id,index)">
                        <img src="../../../static/images/del.png" alt="">删除
                    </span>
                    <!-- <span class="act_edit btn_act">
                        <img src="../../../static/images/edit.png" alt="">编辑
                    </span> -->
                    <checker v-model="addressdata" default-item-class="check-item" selected-item-class="check-item-selected"  radio-required>
                      <checker-item :value="item.id" @on-item-click="set_defaultAddress(item.id,index)">
                          <span v-if="addressdata==item.id"><img src="../../../static/images/single_box_selected.png" alt="">默认地址</span>
                          <span v-if="addressdata!=item.id" ><img src="../../../static/images/single_box_default.png" alt="">设置默认地址</span>
                      </checker-item>
                    </checker>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import { Group, XHeader, Checker, CheckerItem } from "vux";
let address_list = [
  {
    id: 101,
    names: "李晓艺",
    phones: "15617542121",
    area: "河南省郑州市经开区",
    address: "航海路与经开第二大街交汇处向南100米兴华大厦",
    isdefault: 1
  },
  {
    id: 102,
    names: "李小二",
    phones: "15617542121",
    area: "河南省郑州市经开区",
    address: "航海路与经开第二大街交汇处向南100米兴华大厦",
    isdefault: 0
  },
  {
    id: 103,
    names: "李三",
    phones: "15617542121",
    area: "河南省郑州市经开区",
    address: "航海路与经开第二大街交汇处向南100米兴华大厦",
    isdefault: 0
  }
];
//let address_list = []
export default {
  created: function() {
    this.post(
      "/fxuser/listsite",
      {
        userid: window.sessionStorage.getItem("qqq"),
        num: 1,
        numsize: 50
      },
      function(res) {
        // console.log(res);
        let that = this;
        if (res.data.result == 1) {
          this.address_list = res.data.data;
          res.data.data.forEach(function(item, index) {
            if (item.iscy == 1) {
              that.addressdata = item.id;
            }
          });
        } else {
          alert(res.data.msg);
        }
      }
    );
  },
  data: function() {
    return {
      address_list: address_list,
      addressdata: ""
    };
  },
  methods: {
    set_defaultAddress(id, type) {
      this.post(
        "/fxuser/shezhidz",
        {
          siteid: id
        },
        function(res) {
          alert(res.data.msg);
        }
      );
      // if (type == 1) {
      //     this.address_list.forEach(function(item,index){
      //         if(item.id !== id){
      //             item.isdefault = ""
      //         }
      //     })
      //     console.log("请求设置："+id+"的")
      // }else{
      //     console.log("请求取消："+id+"的")
      // }
    },
    del_address(id, index) {
      if (this.addressdata == id) {
        alert("当前地址为默认地址，不可删除");
        return;
      }
      this.post(
        "/fxuser/outsite",
        {
          siteid: id
        },
        function(res) {
          if (res.data.result == 1) {
            this.address_list.splice(index,1);
            alert('删除成功');
          } else {
            alert(res.data.msg);
          }
        }
      );
    }
  },
  watch: {
    // addressdata:function(){
    // }
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
