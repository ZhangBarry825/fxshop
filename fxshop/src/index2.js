import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import Register from '@/components/register'
import MainList from '@/components/tabbar'
import BespeakInd from '@/components/bespeak/index'
import Information from '@/components/bespeak/information'
import ConsultInd from '@/components/consult/index'
import ComplainInd from '@/components/complain/index'
import BespeakSafe from '@/components/bespeak/safe'
import BespeakSafeCon from '@/components/bespeak/safecontent'
import moneyIndex from '@/components/bespeak/money'
import SetMoney from '@/components/bespeak/setmoney'
import GetMoney from '@/components/bespeak/getmoney'
import SearchTown from '@/components/bespeak/search'
import CarSafe from '@/components/bespeak/carsafe'
import Consult from '@/components/consult/consult'
import Ask from '@/components/ask'
import Integral from '@/components/integral/index'
import Card from '@/components/integral/card'
// 工作人员系统
import WorkerList from '@/components/tabbar1'
import PostmenInd from '@/components/worker/postman/index'
import AddShop from '@/components/worker/postman/postmes'
import ShopList from '@/components/worker/postman/shoplist'
import AddMsg from '@/components/worker/postman/addmsg'
import PositionInd from '@/components/worker/position/index'
import Manage from '@/components/worker/position/manage'
import PositionList from '@/components/worker/position/positionlist'
import CaseInd from '@/components/worker/case/index'
import ManageInd from '@/components/worker/case/manage'
import CaseContent from '@/components/worker/case/content'
import UpMessage from '@/components/worker/case/upmessage'
// 地图选点
import ChooseMap from '@/components/commons/chooseMap'

Vue.use(Router)

var router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      name: 'index',
      // component: Index,
      component:resolve=>require(['@/components/index'],resolve),
      meta: {
        keepAlive: true,
        title: '邮政客情系统'
      }
    }, {
      path: '/login',
      name: 'login',
      component: resolve=>require(['@/components/login'],resolve),
      meta: {
        title: '登录',
        requireAuth:true
      }
    }, {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: '注册',
        requireAuth:true
      }
    }, {
      path: '/forget',
      name: 'forget',
      component: Register,
      meta: {
        title: "找回密码",
        requireAuth:true
      }
    }, {
      path: '/mainlist',
      name: 'mainlist',
      component: MainList,
      children: [
        {
          path: '/bespeakInd',
          name: 'bespeakInd',
          component: BespeakInd,
          meta: {
            keepAlive: true,
            title: "预约"
          }
        }, {
          path: '/consultInd',
          name: 'consultInd',
          component: ConsultInd,
          meta: {
            keepAlive:true,
            title: '咨询'
          }
        },{
          path:'/complainInd',
          name:'complainInd',
          component:ComplainInd,
          meta: {
            keepAlive:true,
            title: '投诉'
          }
        },{
          path:'/integral',
          name:'integral',
          component:Integral,
          meta:{
            keepAlive:true,
            title:'积分'
          }
        }
      ]
    },{
      path:'/information/:order',
      name:'information',
      component:Information,
      meta:{
        title:"物流信息"
      }
    }, {
      path: '/bespeaksafe',
      name: 'bespeaksafe',
      component: BespeakSafe,
      meta: {
        title: "预约保险",
        stat:1,
        keepAlive:true
      },
      // beforeEnter:function(to,from,next){
      //   if(from.name==='bespeakInd'){
      //     // console.log(1)
      //     to.meta.keepAlive=false
      //   }else{
      //     // console.log(2)
      //     to.meta.keepAlive=true
      //   }
      //   next();
      // },
      // beforeLeave:function(){

      // }
    }, {
      path: '/safecontent/:id',
      name: 'safecontent',
      component: BespeakSafeCon,
      meta: {
        title: "保险详情"
      }
    }, {
      path: '/money',
      name: 'money',
      component: moneyIndex,
      meta: {
        title: "预约储蓄",
        keepAlive:true
      }
    }, {
      path: '/getmoney/:id',
      name: 'getmoney',
      component: GetMoney,
      meta: {
        title: "预约取款"
      }
    }, {
      path: '/setmoney/:id',
      name: 'setmoney',
      component: SetMoney,
      meta:{
        keepAlive:true
      },
      beforeEnter: function (to, from, next) {
        if (to.params.id == 1) {
          to.meta.title = "预约存款"
        } else if (to.params.id == 2) {
          to.meta.title = "预约取款"
        }
        next();
      }
    }, {
      path: '/carsafe',
      name: 'carsafe',
      component: CarSafe,
      meta: {
        title: "预约车险"
      }
    }, {
      path: '/searchtown',
      name: 'searchtown',
      component: SearchTown,
      meta: {
        title: "附近网点搜索"
      }
    }, {
      path: '/consult/:id',
      name: 'consult',
      component: Consult
      // meta:{
      //   title:"咨询"
      // }
    },{
      path:'/ask/:id',
      name:'ask',
      component:Ask,
      meta:{
        title:"信息发送"
      }
    },{
      path:'/card',
      name:'card',
      component:Card,
      meta:{
        title:"资料提交"
      }
    },{
      path:'/workerlist',
      name:'workerlist',
      component:WorkerList,
      children:[
        {
          path:'/postmenind',
          name:'postmenind',
          component:PostmenInd,
          meta:{
            title:"投递员"
          }
        },
        {
          path:'/addmsg',
          name:'addmsg',
          component:AddMsg,
          meta:{
            title:"信息发布"
          }
        },{
          path:'/position',
          name:'position',
          component:PositionInd,
          meta:{
            title:"定位签到"
          }
        },{
          path:'/case',
          name:'case',
          component:CaseInd,
          meta:{
            title:'明星案例'
          }
        }
      ]
    },{
      path:'/addshop',
      name:'addshop',
      component:AddShop,
      meta:{
        title:"新增商户"
      }
    },{
      path:'/manage',
      name:'manage',
      component:Manage,
      meta:{
        title:"活动管理"
      }
    },{
      path:'/positionlist/:id',
      name:'positionlist',
      component:PositionList,
      beforeEnter:function(to,from,next){
        if(to.params.id==="add"){
          to.meta.title="添加";
        }else{
          to.meta.title="修改";
        }
        next();
      },
      meta:{
        keepAlive:true
      }
    },{
      path:'/changeshop/:id',
      name:'changeshop',
      component:AddShop,
      meta:{
        title:"信息维护"
      }
    },{
      path:'/shoplist',
      name:'shoplist',
      component:ShopList,
      meta:{
        title:'附近商家'
      }
    },{
      path:'/manageind',
      name:'manageind',
      component:ManageInd,
      meta:{
        title:'案例管理'
      }
    },{
      path:'/casecontent/:id',
      name:'casecontent',
      component:CaseContent,
      meta:{
        title:"详细条款"
      }
    },{
      path:'/upmessage/:id',
      name:'upmessage',
      component:UpMessage,
      meta:{
        title:"编辑案例"
      }
    },{
      path:'/choosemap',
      name:'choosemap',
      component:ChooseMap,
      meta:{
        title:'地图选点'
      }
    }
  ]
})
router.afterEach((to, form, next) => {
  document.title = to.meta.title;
  // next();
})
router.beforeResolve((to,form,next)=>{
  if(!to.meta.requireAuth){
    if(window.sessionStorage.getItem('qqq') || to.name==='index'){
      next();
    }else{
      next({
        path:'/login',
      })
    }
  }else{
    next();
  }
})
export default router;
