<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <ul class="tabBar-box">
            <router-link tag="li" class="routerLink" active-class="active" to="/index"><em>表单</em></router-link>
            <router-link tag="li" class="routerLink" active-class="active" to="/my"><em>我的</em></router-link>
        </ul>
    </div>
</template>

<style lang="scss" type="text/scss" scoped>
@import "../scss/variable.scss";
.tabBar-box{
  z-index: 1000;
    position:fixed;
    bottom:0;
    left:0;
    display:flex;
    width:100%;
    height:4.6rem;
    justify-content:center;
    align-items:center;
    border-top:1px solid #dedede;
    background-color:#fff;
    li.routerLink{
        flex:auto;
        width:20%;
        padding-bottom:.4rem;
        padding-top:3rem;
        font-size:1.2rem;
        text-align:center;
        color:#888888;
        background-position:center .6rem;
        background-repeat:no-repeat;
        background-size:2rem;
        // filter: saturate(0%) brightness(80%) contrast(0%);
        &:nth-of-type(1){
            background-image:url("../../static/images/home_default.png");
        }
        &:nth-of-type(2){
            background-image:url("../../static/images/my_default.png");
            // background-size:1.6rem;
        }
        
        &.active:nth-of-type(1){
            background-image:url("../../static/images/home_selected.png");
            color:#d82e2f;
        }
        &.active:nth-of-type(2){
            background-image:url("../../static/images/my_selected.png");
            color:#d82e2f;
        }
    
    }
}
</style>
