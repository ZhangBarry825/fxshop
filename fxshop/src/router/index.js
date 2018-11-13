import Vue from 'vue'
import store from '@/store'
import util from '@/util/vueutil'
import Router from 'vue-router'

/**
 * meta属性
 * title:html的title
 * keepAlive:是否缓存
 * oneScreen:一屏显示
 * nologin:不需要登录
 */

Vue.use(Router)

var router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/workerlist',
      name: 'workerlist',
      component: () => import('@/components/tabbar'),
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('@/components/shop/index'),
          meta: {
            title: '商城首页',
            keepAlive: true
          }
        }, {
          path: '/my',
          name: 'my',
          component: () => import('@/components/my/index'),
          meta: {
            title: '个人中心',
            keepAlive: true
          }
        },
      ]
    },
    {
      path:'/myercode',
      name:'myercode',
      component:()=>import('@/components/func/myercode'),
      meta:{
        title:"我的二维码",
        keepAlive:true
      }
    },{
      path:'/yongjin',
      name:'yongjin',
      component:()=>import('@/components/func/commission'),
      meta:{
        title:'我的佣金'
      }
    },{
      path:'/spread',
      name:'spread',
      component:()=>import('@/components/func/spread'),
      meta:{
        title:'推广人数'
      }
    },{
      path:'/search',
      name:'search',
      component:()=>import('@/components/func/search'),
      meta:{
        title:'搜索'
      }
    },{
      path:'/details/:id',
      name:'details',
      component:()=>import('@/components/shop/details'),
      meta:{
        title:'商品详情',
        keepAlive:true
      }
    },{
      path:'/orderList/:id',
      name:'order_list',
      component:()=>import('@/components/order/order_list'),
      meta:{
        title:'我的订单'
      }
    },{
      path:'/order/:id',
      name:'order_detail',
      component:()=>import('@/components/order/order_detail'),
      meta:{
        title:'订单详情'
      }
    },{
      path:'/address',
      name:'address',
      component:()=>import('@/components/address/address_list'),
      meta:{
        title:'常用地址'
      }
    },{
      path:'/address_add',
      name:'address_add',
      component:()=>import('@/components/address/address_add'),
      meta:{
        title:'添加地址'
      }
    },{
      path:'/get',
      name:'get',
      component:()=>import('@/components/my/get'),
      meta:{
        title:'提现'
      }
    },{
      path:'/follow/:id',
      name:'follow',
      component:()=>import('@/components/my/follow'),
      meta:{
        title:'成功'
      }
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})

// 添加title
router.afterEach((to, from) => {
  document.title = to.meta.title;
})


router.beforeResolve((to, from, next) => {


  /**
   * 手机登录路由上传code（手机登录和微信登录都需要）
   */
  if (store.state.codeInd == 0 && !window.sessionStorage.getItem('qqq')) {
    if (
      window.location.search &&
      window.location.search.slice(1, 5) == "code"
    ) {
      var code = window.location.search.split("&")[0].split("=")[1];
      var load = encodeURIComponent("#");
      var ajax = new XMLHttpRequest();
      // cosole.log()
      // var user = window.sessionStorage.getItem("qqq");
      if (to.name == 'follow') {
        // var ercodeId = to.params.id.split('_')[1] == 'no' ? '' : to.params.id.split('_')[1];
        var ercodeId = to.params.id;
      }else{
        var ercodeId = '';
      }
      
      ajax.open('POST', 'http://www.dpjys.com.cn//fxuser/wxLogin');
      ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      ajax.send('code=' + code + '&tgid=' + ercodeId);
      ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
          if ((ajax.status >= 200 && ajax.status <= 300) || ajax.status == 304) {
            var res = JSON.parse(ajax.responseText);
            if (res.result == 1) {
              window.sessionStorage.setItem('qqq', res.data.userrelationinfo.id);
              store.commit('setcodeInd', 1);
            }
          }
        }
      }
    }
  }


  // 全屏模式的处理
  if (to.meta.oneScreen) {
    document.body.className += ' heightBox';
  } else {
    document.body.className = '';
  }
// 开发环境
  if (process.env.API_HOST == "/api/") {
    window.sessionStorage.setItem('qqq', '7866')
    next();
    return;
  }

  // if(!to.meta.requireAuth){
// 生产环境登录权限
  if (window.sessionStorage.getItem('qqq') || to.meta.nologin) {
    next();
  } else if (!window.location.search || window.location.search.slice(1, 5) !== "code") {
    /** 
     * 手机注册登录部分（手机登录需要）
     */
    var load = encodeURIComponent("#");
    window.location.replace(
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx483e5f4d681b51fb&response_type=code&scope=snsapi_userinfo&state=STATE&redirect_uri=http://www.dpjys.com.cn/resources/fx/index.html" + load + to.path + "#wechat_redirect"
    );
    // var ajaxObj = new XMLHttpRequest();
    // ajaxObj.open('POST', 'http://www.dpjys.com.cn//tybuser/getByWxid');
    // ajaxObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // ajaxObj.send('wxid=1');
    // ajaxObj.onreadystatechange = function () {
    //   if (ajaxObj.readyState == 4) {
    //     if ((ajaxObj.status >= 200 && ajaxObj.status <= 300) || ajaxObj.status == 304) {
    //       var res = JSON.parse(ajaxObj.responseText);
    //       if (res.result == 1) {
    //         var appid = res.data.appid;
    //         var load = encodeURIComponent("#");
    //         if (to.name == 'proto' || to.name == 'ask' || to.name == 'message1' || to.name == "casecontent" || to.name == "openlist" || to.name == "details" || to.meta.nologin) {
              
    //         } else {
    //           window.location.replace(
    //             "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&response_type=code&scope=snsapi_userinfo&state=STATE&redirect_uri=http://www.dpjys.com.cn/resources/msgs/index.html" + load + to.path + "#wechat_redirect"
    //           );
    //         }
    //       }
    //     }
    //   }
    // }
  } else {
    next();
  }
  // }else{
  //   next();
  // }
})
export default router;
