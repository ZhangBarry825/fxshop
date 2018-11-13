<template>
    <div>
        <group class="g_formGroup">
            <x-input title="姓名" v-model="param.names" text-align="right" placeholder="请填写姓名"></x-input>
            <x-input title="电话" is-type="china-mobile" v-model="param.phones" text-align="right" placeholder="请填写电话"></x-input>
            <x-address title="省市县"  v-model="param.area" :list="addressData" :show.sync="showAddress"  placeholder="请选择地址" @on-shadow-change="changeBox"></x-address>
            <x-input title="详细地址" v-model="param.details" placeholder="请填写详细地址" text-align="right"></x-input>
        </group>
        <div class="okButton">
            <x-button type="warn" action-type="button" @click.native="to_submit">确定</x-button>
        </div>
    </div>
</template>

<script>
import { Group, XAddress,XInput, ChinaAddressV4Data, XButton, Value2nameFilter as value2name,Box  } from 'vux'
export default {
    beforeRouteEnter:function(to,from,next){
        next(vm=>{
            vm.fromName=from.path
        })
    },
    data:function(){
        return{
            param:{
                id:null,
                names:"",
                phones:"",
                address: [],
                details:""
            },
            page_type:0,   //0 : 添加    1 : 编辑
            addressData: ChinaAddressV4Data,
            showAddress: false,
            address:'',
            fromName:''
        }
    },
    methods:{
        changeBox(ids,names){
            this.address=names;
        },
        to_submit(){
            if(this.param.names=='' || this.param.phones=='' || this.param.details=='' || this.address==''){
                alert('所有信息均为必填');
                return;
            }
            this.post('/fxuser/addsite',{
                userid:window.sessionStorage.getItem('qqq'),
                people:this.param.names,
                phone:this.param.phones,
                province:this.address[0],
                city:this.address[1],
                area:this.address[2],
                context:this.param.details,
                zb1:'',
                zb2:''
            },function(res){
                if(res.data.result==1){
                    alert('增加成功');
                    this.$router.push(this.fromName);
                }else{
                    alert(res.data.msg);
                }
            })
        }
    },
    components:{
        Group,
        XAddress,
        XButton,
        XInput,
    }
}
</script>

<style type="text/scss" lang="scss">
    @import "../../scss/extend.scss";
</style>


