<template>
  <div class="showToastBoX" v-show="isShow" v-on:click="hideToast">
      <div class="showToast">
          <p>{{toastText}}</p>
      </div>
  </div>
</template>

<style lang="scss" type="text/scss">
.showToastBoX{
    position: fixed;
    top:0;
    left:0;
    z-index:9999;
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
   @at-root .showToast{
       max-width:14rem;
       height:auto;
       padding:2rem 1rem;
       text-align:center;
       color:#fff;
       font-size:1.4rem;
       background-color:rgba(0,0,0,.4);
       border-radius:4px;
   }
}
</style>

<script>
export default{
    props:{
        toastText:{
            type:[Object,String]
        }
    },
    data:function(){
        return{
            isShow:false,
        }
    },
    methods:{
        hideToast:function(){
            this.isShow=false;
            this.$emit('toast','')
        }
    },
    watch:{
        'toastText':function(){
            if(!this.toastText){
                this.isShow=false;
                return;
            }
            this.isShow=true;
        }
    }
}
</script>
