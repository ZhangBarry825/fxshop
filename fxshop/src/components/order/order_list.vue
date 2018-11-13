<template>
    <div class=" gray-back height100">
        <x-header :left-options="{backText: ''}">我的订单</x-header>
        <sticky  :offset="0" :check-sticky-support="false"
        :disabled="disabled">
          <tab :line-width="2"  class="tab_list">
              <tab-item :selected="list_show_type == index" v-for="(item, index) in list_tabs" @on-item-click="change_list_type(index)" :key="index">{{item}}</tab-item>
          </tab>
        </sticky>
        <div class="vux-sticky-fill" style="height:44px;"></div>
            <div class="list_no" v-show="order_list.length == 0">
                <img src="../../../static/images/none2_img.png" class="list_ico" alt="">
                <p>暂无订单</p>
            </div>
            <ul class="order_list" v-show="order_list.length > 0">
                <li v-for="(item,index) in order_list" :key="index">
                    <p class="numbers">
                        <span class="status">{{item.loanstate | filter_orderStatus(item.loanstate)}}</span><em>订单编号：{{item.loanid}}</em>
                    </p>
                    <div class="goods">
                        <div class="imgs"><img :src="item.img" alt=""></div>
                        <div class="cons">
                            <p class="name">{{item.thingname}}</p>
                            <!-- <p class="des"><span>颜色：{{item.goods.att_color}}</span><span>尺寸：{{item.goods.att_size}}</span></p> -->
                            <p class="prices"><span class="num">X{{item.thingnum}}</span><em>￥ {{item.money}}</em></p>
                        </div>
                    </div>
                    <div class="price_total">共{{item.thingnum}}件商品 实付:￥{{item.thingnum*item.money}}</div>
                    <div class="acts">
                        <x-button v-if="item.loanstate == 2" type="warn" mini plain @click.native="order_confirm(item.loanid,index)">确认收货</x-button>
                        <x-button v-if="item.loanstate == 2" type="warn" mini plain @click.native="order_kan(item.kdnumber,index)">查看物流</x-button>
                        <!-- <x-button v-if="item.opened == true" mini plain :link="'/order/'+item.ids">申请退款</x-button>
                        <x-button v-if="item.opened == false || item.status == 3" mini plain @click.native="order_del(item.ids)">删除订单</x-button> -->
                    </div>
                </li>
            </ul>

    </div>
</template>

<script>
import { Group, XHeader,Sticky ,Tab,
TabItem,
XButton } from 'vux'
// status  1 待发货,2 待收货,3 已完成
import { setTimeout } from 'timers';
    //let order_list = []
export default {
    
    data:function(){
        return{
            disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
            order_list: [],
            loading:false,      //加载状态
            list_show_type:0,
            list_tabs:['全部','待发货','待收货','已完成'],
        }
    },
    created() {
        this.list_show_type = this.$route.params.id;
        this.get_list();    //初始化加载
    },
    filters:{
      filter_orderStatus(status,opend){
        //   console.log
          if(status == 1){
              return "待发货"
          }else if(status == 2){
              return "待收货"
          }else if(status == 3){
              return "已完成"
          }
      }
    },
    methods:{
        change_list_type: function (type) {
            console.log(type);
            this.list_show_type = type;
            this.get_list();

        },
        get_list: function(is_true) {
            // console.log(2)
            if(this.loading){
                return ;
            }
            this.loading = true;
            let _this = this;
            this.post('/fxuser/sjproductLoan',{
                state:this.list_show_type,
                userid:window.sessionStorage.getItem('qqq'),
                num:1,
                numsize:50
            },function(res){
                if(res.data.result==1){
                    _this.loading = false;
                    _this.order_list=res.data.data;
                }else{
                    alert(res.data.msg);
                }
                // _this.loading = false;
                // console.log(res);
            })
            // console.log("此处发请求 拿列表数据"+this.list_show_type)

            // // 模拟加载结束
            // setTimeout(() => {
            //     _this.loading = false;
            // }, 1000);


        },
        order_confirm(id,index){
            // console.log("确认收货操作")
            // conosle.log(id)
            // return;
            let _this = this;
            this.post('/fxuser/shShopLoansign',{
                productid:id
            },function(res){
                // debugger;
                if(res.data.result==1){
                    _this.order_list.splice(index,1);
                }else{
                    alert(res.data.msg);
                }
            })
        },
        order_kan(id,index){
            var _this = this;
            window.location.href="https://www.baidu.com/s?wd="+id;
        }
    },
    watch:{
        list_show_type:function(){
            // console.log(1)
            this.get_list();
        }
    },
    components:{
        Group,
        XHeader,Sticky ,Tab,
        TabItem,
        XButton
    }
}
</script>

<style type="text/scss" lang="scss">

    @import "../../scss/extend.scss";
    .height100{
        min-height:100vh;
    }
    .order_list{
        font-size: 1.3rem;
        color: #000;
        line-height: 1.5;
        overflow: hidden;
        li{
            background: #fff;
            margin-bottom: 1rem;
        }
        .numbers{
            height: 4rem;
            line-height: 4rem;
            padding: 0 1rem;
        }
        .status{
            float: right;
            color: #3130ff;
        }
        .goods{
            background: #f5f6f8;
            padding: 0.5rem 1rem;
            @include clearfix;
        }
        .imgs{
            width: 7rem;
            height: 7rem;
            float: left;
            position: relative;
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        .cons{
            margin-left: 8rem;
        }
        .name{
            line-height: 2rem;
        }
        .des{
            color: #999;
            font-size: 1.1rem;
            height: 2.5rem;
        }
        .prices{
            color: $moneyc;
        }
        .num{
            float: right;
            color: #666;
            font-size: 1rem;
        }
        .price_total{
            text-align: right;
            height: 4rem;
            line-height: 4rem;
            padding: 0 1rem;
            span{
                color: #666;
                font-size: 1rem;
            }
        }
        .acts{
            border-top: 1px solid $bordercolor;
            padding: 0.75rem 1rem;
            @include clearfix;
            .weui-btn{
                margin-top: 0;
                float: right;
                margin-left: 1rem;
            }
        }
    }
</style>
