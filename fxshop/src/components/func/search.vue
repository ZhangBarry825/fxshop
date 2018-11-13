<template>
    <div class="gray-back">
        <div class="search-box">
            <img src="../../../static/images/back_top.png" alt="" @click="pr('/index')">
            <input type="text" placeholder="请输入关键字进行搜索">
            <button type="button">搜索</button>
        </div>
        <dl class="search-list">
            <dt><h4>搜索历史</h4><h5>清空</h5></dt>
            <dd><h4>哈哈</h4><h5>&times;</h5></dd>
            <dd><h4>哈哈</h4><h5>&times;</h5></dd>
            <dd><h4>哈哈</h4><h5>&times;</h5></dd>
            <dd><h4>哈哈</h4><h5>&times;</h5></dd>
            <dd><h4>哈哈</h4><h5>&times;</h5></dd>
        </dl>
    </div>
</template>

<style type="text/scss" lang="scss" scped>
@import "../../scss/variable.scss";
.search-list{
    margin-top:.6rem;
    background-color:#fff;
    padding:0 1.2rem;
    dt,dd{
        display:flex;
        justify-content:space-between;
        align-items:center;
        h4{
            font-size:1.4rem;
            line-height:4rem;
            color:#333;
        }
    }
    dt h4{
        
        font-weight:bold;
    }
    dt h5{
        font-size:1.2rem;
        color:#999;
    }
    dd{
        border-bottom:1px solid #e8e8e8;
        h5{
            font-size:2.2rem;
            color:#999;
        }
    }
}
.search-box{
    display:flex;
    justify-content:center;
    align-items:center;
    padding:.6rem 1rem;
    background-color:#fff;
    img{
        width:1.8rem;
        box-sizing:border-box;
        margin-right:1rem;
    }
    input{
        flex:auto;
        height:3rem;
        white-space:nowrap;
        font-size:1.4rem;
        padding-left:1rem;
        // border-radius:4px;
        @include borderradius;
        border:none;
        background-color:#ededed;
        &::-webkit-input-placeholder{
            color:#999;
        }
    }
    button{
        font-size:1.4rem;
        color:$mc;
        padding:1rem;
        background-color:#fff;
    }
}
</style>

