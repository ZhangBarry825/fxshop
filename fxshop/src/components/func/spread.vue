<template>
    <div class="gray-back spread">
        <group :title="'推广人数共'+peopleNum+'人'">
            <cell v-for="(item,index) in cell.data" v-bind:key="index" :title="item[1]==null?'暂无昵称':item[1]" value="一级客户" :inline-desc='item[0]'></cell>
            <cell v-for="(item,index) in cell.data1" v-bind:key="index+'two'" :title="item[1]==null?'暂无昵称':item[1]" value="二级客户" :inline-desc='item[0]'></cell>
        </group>
    </div>
</template>

<script>
import { Cell, Group } from 'vux'
export default {
    created:function(){
        this.post('/fxuser/mykehu',{
            userid:window.sessionStorage.getItem('qqq')
        },function(res){
            if(res.data.result==1){
                this.peopleNum=res.data.data
            }
        })
        this.post('/fxuser/mykehulist',{
            userid:window.sessionStorage.getItem('qqq')
        },function(res){
            // console.log(res)
            if(res.data.result==1){
                this.cell=res.data;
            }else{
                alert(res.data.msg);
            }
        })
    },
  data() {
    return{
        cell:[],
        peopleNum:''
    };
  },
  components: {
    Group,
    Cell
  }
};
</script>

<style>
.spread .weui-cells__title{
    padding-top:.77em;
    margin-top:0;
}
</style>