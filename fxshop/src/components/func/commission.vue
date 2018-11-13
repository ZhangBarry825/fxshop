<template>
    <div class="gray-back">
        <div class="yj-top">
            <h4>我的佣金</h4>
            <h5>￥{{money}}</h5>
            <button type="button" @click="pr('/get')">提现</button>
        </div>
        <group gutter="14px">
            <div v-if="isji" style="text-align:center;padding:4rem 0;">暂无交易明细</div>
            <cell v-if="!isji" v-for="(item,index) in cell" v-bind:key="index" :title="'￥'+item.money" :value="item.type" :inline-desc='item.time'></cell>
        </group>
    </div>
</template>

<script>
import { Cell, Group } from 'vux'
export default {
    created:function(){
        this.post('/fxuser/myqbmoney',{
            userid:window.sessionStorage.getItem('qqq')
        },function(res){
            console.log(res)
            if(res.data.result==1){
                this.money=res.data.data;
            }else{
                alert(res.data.msg);
            }
        })
        this.post('/fxuser/yjmx',{
            uid:window.sessionStorage.getItem('qqq'),
            num:1,
            numsize:50
        },function(res){
            console.log(res)
            if(res.data.result==0){
                this.isji=true;
            }else if(res.data.result==1){
                this.cell=res.data.data;
            }else{
                alert(res.data.msg);
            }
        })
    },
    data:function(){
        return{
            isji:false,
            money:'',
            cell:[]
        }
    },
    components:{
        Group,
        Cell
    }
}
</script>


<style scoped type="text/scss" lang="scss">
@import "../../scss/variable.scss";
.yj-top{
    margin-bottom:1.2rem;
    background-color:#fff;
    padding:3rem 0;
    text-align:center;
    h4{
        font-size:1.5rem;
        text-align:left;
        color:#999;
        padding-left:1.2rem;
        
    }
    h5{
        font-size:2.4rem;
        color:$moneyc;
        // text-align:center;
        padding:1.8rem 0 1.5rem;
    }
    button{
        width:7rem;
        height:3rem;
        font-size:1.4rem;
        color:#333;
        background-color:#fff;
        border:1px solid #333;
        border-radius:4px;
    }
}
</style>

