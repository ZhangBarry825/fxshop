<template>
    <div class="gray-back">
        <div class="my-top">
            <div class="my-top-left">
                <div class="my-message">
                    <div class="my-img">
                        <img :src="myMessage.img" alt="">
                    </div>
                    <div class="my-mes">
                        <h4>{{myMessage.nickname}}</h4>
                        <h5>￥{{myMessage.money}}</h5>
                        <h6>{{myMessage.dmoney}}积分</h6>
                    </div>
                </div>
                <div class="my-vip">
                    <img src="../../../static/images/vip.png" alt="">
                    <h5>{{myMessage.type==0?'普通分销商':myMessage.type==1?'黄金分销商':myMessage.type==2?'VIP分销商':''}}</h5>
                </div>
            </div>
            <div class="my-top-right" @click="pr('/get')">
                提现
            </div>
        </div>
        <ul class="my-center">
            <li><router-link to="/orderList/0"><img src="../../../static/images/order_all.png" alt=""><span>全部订单</span></router-link></li>
            <li><router-link to="/orderList/1"><img src="../../../static/images/order_unfilled.png" alt=""><span>待发货</span></router-link></li>
            <li><router-link to="/orderList/2"><img src="../../../static/images/order_unreceived.png" alt=""><span>待收货</span></router-link></li>
            <li><router-link to="/orderList/3"><img src="../../../static/images/order_completed.png" alt=""><span>已完成</span></router-link></li>
        </ul>
        <group gutter="14px">
            <cell v-for="(item,index) in cell" v-bind:key="index" :title="item.title" v-bind:link="item.link">
                <img slot="icon" width="22" style="display:block;margin-right:5px;" v-bind:src="item.icon">
            </cell>
        </group>
        <!-- <group gutter="14px">
            <cell v-for="(item,index) in cell1" v-bind:key="index" :title="item.title" v-bind:link="item.link">
                <img slot="icon" width="22" style="display:block;margin-right:5px;" v-bind:src="item.icon">
            </cell>
        </group> -->
    </div>
</template>



<script>
import { Cell, Group } from 'vux'
export default {
    created:function(){
        this.post('/fxuser/grxq',{
            userid:window.sessionStorage.getItem('qqq')
        },function(res){
            if(res.data.result==1){
                this.myMessage=res.data.data;
            }else{
                alert(res.data.msg);
            }
        })
    },
    data:function(){
        return{
            myMessage:'',
            cell:[
                {
                    title:"常用地址",
                    icon:require('../../../static/images/address.png'),
                    link:'/address'
                }
                // {
                //     title:"退款售后",
                //     icon:require('../../../static/images/refund.png'),
                //     link:'/index'
                // },
                // {
                //     title:"账单记录",
                //     icon:require('../../../static/images/bill.png'),
                //     link:'/index'
                // },
                // {
                //     title:"分享收益规则",
                //     icon:require('../../../static/images/rule.png'),
                //     link:'/index'
                // }
            ],
            cell1:[
                {
                    title:"系统设置",
                    icon:require('../../../static/images/set.png'),
                    link:'/index'
                },
                {
                    title:"联系客服",
                    icon:require('../../../static/images/customer_service.png'),
                    link:'/index'
                }
            ]
        }
    },
    components:{
        Group,
        Cell
    }
}
</script>

<style type="text/scss" lang="scss" scoped>
@import "../../scss/variable.scss";
.my-top{
    width:100%;
    box-sizing:border-box;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background-color:$mc;
    padding:2rem 1.6rem;
    background-image:url('../../../static/images/king.png');
    background-repeat:no-repeat;
    background-position:right bottom;
    background-size:10rem;
    @at-root .my-top-right{
        width:7.2rem;
        height:3.4rem;
        font-size:1.5rem;
        color:#fff;
        text-align:center;
        line-height:3.4rem;
        border:1px solid #fff;
        border-radius:4px;
    }
    @at-root .my-top-left{
        display:flex;
        // min-width:10rem;
        align-items:flex-start;
        justify-content:center;
        flex-direction:column;
        @at-root.my-message{
            display:flex;
            align-items:center;
            justify-content:center;
            .my-img{
                width:8.5rem;
                height:8.5rem;
                border-radius:10rem;
                overflow:hidden;
                border:3px #fff solid;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .my-mes{
                height:100%;
                padding-left:1rem;
                color:#fff;
                h4{
                    font-size:1.6rem;
                    line-height:3rem;
                }
                h5,h6{
                    font-size:1.2rem;
                    line-height:2.5rem;
                }
                h6{
                    padding-left:1.6rem;
                    background:url('../../../static/images/integrals_2.png') no-repeat left center;
                    background-size:1.4rem;
                }
            } 
        }
        @at-root.my-vip{
            width:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            // padding:0 1rem 0 0;
            margin-top:1rem;
            // background:url('../../../static/images/triangle.png') no-repeat 92% center;
            // background-size:.9rem;
            img{
                position:relative;
                left:1rem;
                width:2.5rem;
                height:2.5rem;
            }
            h5{
                height:1.7rem;
                font-size:1rem;
                line-height:1.7rem;
                color:#fff;
                padding:0 1.4rem;
                background-color:#f26162;
                border-radius:3rem;
            }
        }
    }
}
.my-center{
    width:100%;
    box-sizing:border-box;
    display:flex;
    justify-content:space-around;
    align-items:center;
    padding:2rem 1rem;
    background-color:#fff;
    li{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        a{
            display: block;
        }
        img{
            width:2.5rem;
            height:2.5rem;
            display: block;
            margin: 0 auto;
        }
        span{
            font-size:1.4rem;
            color:#333;
            padding-top:.9rem;
            display: inline-block;
        }
    }

}
</style>
