<template>
    <div class="h100 gray-back">
        <x-header :left-options="{backText: ''}">订单详情</x-header>
        <div class="order_detail">
            <div class="order_address">
                <p class="names"><span class="phones">{{order_detail.address.phones}}</span>{{order_detail.address.names}}</p>
                <p class="address">
                    {{order_detail.address.area[0]}} {{order_detail.address.area[1]}} {{order_detail.address.area[2]}} {{order_detail.address.address}}
                </p>
            </div>
            <ul class="order_list">
                <li>
                    <p class="numbers">
                        状态：<span class="status">{{order_detail.status | filter_orderStatus(order_detail.opened)}}</span>
                    </p>
                    <div class="goods">
                        <div class="imgs"><img :src="order_detail.goods.img" alt=""></div>
                        <div class="cons">
                            <p class="name">{{order_detail.goods.name}}</p>
                            <p class="des"><span>颜色：{{order_detail.goods.att_color}}</span><span>尺寸：{{order_detail.goods.att_size}}</span></p>
                            <p class="prices"><span class="num">X{{order_detail.goods.num}}</span><em>￥ {{order_detail.goods.price}}</em></p>
                        </div>
                    </div>
                    <div class="price_total"><em>￥{{order_detail.goods.num*order_detail.goods.price+order_detail.freight_price}}</em>{{order_detail.pay_type | filter_payType}}支付</div>

                </li>
            </ul>

            <div class="order_price">
                <p><span class="vals">￥{{order_detail.goods.num*order_detail.goods.price}}</span>商品总价</p>
                <p><span class="vals">￥{{order_detail.freight_price}}</span>运费</p>
                <p v-if="order_detail.status == 2"><span class="vals">{{order_detail.send_company}}</span>货运公司</p>
                <p v-if="order_detail.status == 2"><span class="vals">{{order_detail.send_number}}</span>快递单号</p>
            </div>

            <div class="order_info">
                <p><em>订单编号：{{order_detail.ids}}</em> <x-button mini @click.native="order_Copy">复制</x-button><input ref="input_orderid" id='input_orderid' v-model='order_detail.ids' style='opacity: 0;position: absolute;' type="text"></p>
                <p>下单时间：{{order_detail.order_time}}</p>
                <p>发货时间：{{order_detail.send_time}}</p>
            </div>
             <div class="acts">
                <x-button v-if="order_detail.status == 2" type="warn" mini plain @click.native="order_confirm(order_detail.ids)">确认收货</x-button>
                <x-button mini plain>申请退款</x-button>
            </div>
        </div>

    </div>
</template>

<script>
import { Group, XHeader,
XButton } from 'vux'
// status  1 待发货,2 待收货,3 已完成
// pay_type 1微信2支付宝3网银
import { setTimeout } from 'timers';
    let order_detail = {
        ids:101,
        status:2,
        opened:true,
        goods:{
            id:1563254,
            name:"限量款儿童摇摇车",
            img:"http://xiaofeng.tipig.cn/ershou025.jpg",
            att_color:"8854215",
            att_size:"44mm*280mm",
            price:125.00,
            num:1
        },
        address:{
            id:101,
            names:"李晓艺",
            phones:"15617542121",
            area:['河南省','郑州市','经开区'],
            address:"航海路与经开第二大街交汇处向南100米兴华大厦",
            isdefault:1
        },
        freight_price:16,
        pay_type:1,
        order_time:"2018.03.09 12:55:55",
        send_time:"2018.03.12 12:55:55",
        send_company:"中通快递",
        send_number:452154876513248
    }

    //let order_detail = []
export default {
    data:function(){
        return{
            order_detail: order_detail,
            loading:false,      //加载状态
            list_show_type:0,
            list_tabs:['全部','待发货','待收货','已完成'],
        }
    },
    created() {
        this.list_show_type = this.$route.query.type - 1;

    },
    filters:{
      filter_orderStatus(status,opend){
          if(status == 1){
              return "待发货"
          }else if(status == 2){
              return "待收货"
          }else if(status == 3 && opend == true){
              return "已完成"
          }else if(status == 3 && opend == false){
              return "交易关闭"
          }
      },
      filter_payType(type){
          let pay_note = ['微信','支付宝','网银']
          return pay_note[type];
      }
    },
    methods:{
        order_confirm(id){
            console.log("确认收货操作")
        },
        order_del(id,index){
            console.log("删除订单操作")
            var _this = this;
            setTimeout(() => {
                _this.order_list.splice(index,1);
            }, 500);
        },
        order_Copy(){
            this.$refs.input_orderid.select();
            document.execCommand("Copy");
            console.log("已复制")
        }
    },
    components:{
        Group,
        XHeader,
        XButton
    }
}
</script>

<style type="text/scss" lang="scss">

    @import "../../scss/extend.scss";
    .order_detail{
        font-size: 1.3rem;
        color: #000;
        line-height: 1.5;
        .acts{
            background: #fff;
            padding: 0.75rem 1rem;
            @include clearfix;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            .weui-btn{
                margin-top: 0;
                float: right;
                margin-left: 1rem;
            }
        }
    }
    .order_address{

        margin-bottom: 1rem;
        padding: 1rem;
        padding-left: 3.5rem;
        background: url(/static/images/address2.png) 1.5rem center no-repeat #fff;
        background-size: 1rem;
        .phones{
            float:right;

        }
        .names{
            line-height: 2;
        }
        .address{
            font-size: 1.1rem;
        }
    }
    .order_price{
        background: #fff;
        margin-bottom: 1rem;
        padding: 1rem;
        line-height: 2;
        font-size: 1rem;
        .vals{
            float: right;
        }
    }
    .order_info{
        background: #fff;
        margin-bottom: 1rem;
        padding: 1rem;
        line-height: 2;
        font-size: 1rem;
        color: #666;
        .weui-btn{
            background: none;

        }
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

        .num{
            float: right;
            color: #666;
            font-size: 1rem;
        }
        .price_total{
            height: 4rem;
            line-height: 4rem;
            padding: 0 1rem;
            em{
                float: right;
                color: $moneyc;
            }
            span{
                color: #666;
                font-size: 1rem;
            }
        }

    }
</style>
