import vue from 'vue';
import vuex from 'vuex';
import getAddress from './getAddress'

vue.use(vuex);
export default new vuex.Store({
    state:{
        provice:'河南省',
        city:'郑州市',
        area:'中原区',
        lat:34.72455669740096,
        lng:113.74859992721593,
        // 是否登录
        isload:'',
        // 保险列表Type
        safeType:1,
        // 保险详情
        safeDetail:'',
        // 登山证记忆
        climb:false,
        // 需要记录从哪里来
        isFrom:'',
        // 选择用户的信息
        options:{
            id:'',
            len:0
        },
        // 信息维护数据
        messageSet:'',
        // 记录一次传递code
        codeInd:0,
        // 记录选择的公众号Id
        wechatId:'',
        // 记录商品是否更改
        productC:'',
    },
    mutations:{
        setproductc(state,newState){
            state.productC=newState;
        },
        // 设置公众号ID
        setwechatId(state,newstate){
            state.wechatId=newstate;
        },
        // 设置传递code记录
        setcodeInd(state,newstate){
            state.codeInd=newstate;
        },
        // 获取地理位置
        setAddress(state,newstate){
            state.provice=newstate.provice;
            state.city=newstate.city;
            state.area=newstate.area;
            state.lat=newstate.lat;
            state.lng=newstate.lng;
        },
        // 保险种类选择
        setSafeType(state,newstate){
            state.safeType=newstate;
        },
        // 保险详情
        setSafeDetail(state,newstate){
            state.safeDetail=newstate;
        },
        // 设置登山状态
        setClimb(state,newstate){
            state.climb=newstate;
        },
        // 设置从哪里来
        setIsFrom(state,newState){
            state.isFrom=newState;
        },
        // 设置选择发送信息的用户
        setOptions(state,newState){
            state.options.id=newState.id;
            state.options.len=newState.len;
        },
        // 设置维护数据
        setMessage(state,newState){
            state.messageSet=newState;
        }
    }
})