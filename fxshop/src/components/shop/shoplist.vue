<template>
    <div class="shop-list">
      <div v-for="(item,index) in goods" v-bind:key="index" class="shop-listB" @click="pr('/details/'+item.id)" >
        <img :src="item.img" alt="">
        <h4>{{item.name}}</h4>
        <div class="shop-message">
          <span v-if="item.type==1" class="shop-money">￥{{item.money}}</span>
          <span v-if="item.type==2" class="shop-B">{{item.money}}积分</span>
          <b>库存{{item.kc}}</b>        
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props:{
        goods:{

        }
    },
    created:function(){
        // console.log(this.goods);
    }
}
</script>


<style type="text/scss" lang="scss" scoped>
@import "../../scss/variable.scss";
.shop-list{
  width:100%;
  display:flex;
  flex-wrap:wrap;
  box-sizing:border-box;
  padding:1rem .6rem 5rem;
  background-color:#fff;
  @at-root .shop-listB{
    width:50%;
    box-sizing:border-box;
    padding:1rem;
    img{
      display:block;
      width:100%;
      height:11rem;
    }
    h4{
      font-size:1.3rem;
      // font-weight:bold;
      color:#333;
      line-height:2.6rem;
      text-overflow:ellipsis;
      overflow:hidden;
      white-space:nowrap;
    }
    .shop-message{
      width:100%;
      overflow:hidden;
      span{
        float:left;
        color:$moneyc;
        font-weight:bold;
        font-size:1.3rem;
        &.shop-B{
          padding-left:1.6rem;
          background:url('../../../static/images/integrals_1.png') no-repeat left center;
          background-size:1.4rem;
        }
      }
      b{
        float:right;
        color:#999;
        font-size:1.2rem;
        font-weight:normal;
      }
    }
  }
}
</style>

