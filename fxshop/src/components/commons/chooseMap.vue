<!--<template>
    <div>
        <div class="search-box">
            <input type="search" placeholder="请输入您要搜索的地点">
        </div>
        <div class="mapContent">
            <div class="mapTip">
                <img src="https://api.map.baidu.com/images/marker_red_sprite.png">
            </div>
            <baidu-map ak="O1bvQ9wk5VG7WVerj9UYte6HcfWtOcWy" class="mapBox" :center="city" :zoom="16" v-on:ready="geoLoca" v-on:dragend="dragEnd">
            </baidu-map>
        </div>
        
    </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/Map/Map.vue";
// import BmMarker from "vue-baidu-map/components/overlays/Marker.vue";
export default {
  created: function() {
    var _this = this;
    this.$http
      .jsonp("http://api.map.baidu.com/location/ip", {
        params: {
          ak: "O1bvQ9wk5VG7WVerj9UYte6HcfWtOcWy"
        }
      })
      .then(function(res) {
          var coord=res.data.content.point;
            this.city.lng=coord.x;
            this.city.lat=coord.y;
      }, function(err) {});
  },
  data: function() {
    return {
      city: { lng: 116.404, lat: 39.915 },
      coords:{
          lng:116.404,
          lat:39.915
      }
    };
  },
  methods: {
    geoLoca: function(BMap) {
      var that = this;
      var geolocation = new BMap.BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.BMap.Marker(r.point);
            //            r.point.lng=113.721267;
            //            r.point.lat=34.724514757104;
            that.startCoords = r.point;
            // BMap.map.addOverlay(mk);
            BMap.map.panTo(r.point);
            that.coords.lng = r.point.lng;
            that.coords.lat = r.point.lat;
            // that.postData(BMap.map, r.point.lng, r.point.lat, 0);
          } else {
            alert("failed" + this.getStatus());
          }
        },
        { enableHighAccuracy: true }
      );
    },
    dragEnd:function(BMap){
        var that=this;
        if(BMap.target.getDistance(that.startCoords,BMap.target.getCenter())>1000){
          that.startCoords=BMap.target.getCenter();
          that.postData(BMap.target,BMap.target.getCenter().lng,BMap.target.getCenter().lat,1);
          that.messageList='';
        }
        that.messageHide=false;
      },
  },
  components: {
    BaiduMap
  }
};
</script>

<style scoped>
.mapContent{
    position:relative;
    width:100%;
    height:50vh;
}
.mapBox{
    width:100%;
    height:100%;
}
.mapTip{
    position:absolute;
    top:-20px;
    left:0;
    bottom:0;
    right:0;
    width:20px;
    height:26px;
    overflow:hidden;
    margin:auto;
    z-index:9999;
}
.search-box{
    width:100%;
    height:3rem;
    background-color:#fff;
}
.search-box input{
    width:100%;
    height:3rem;
}
</style>-->
<template>
<div class="content">
    <iframe id="mapPage" width="100%" height="100%" frameborder=0
        src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">
    </iframe>
</div>
    
</template>
<script>
export default {
    beforeRouteEnter:function(to,from,next){
        if(from.name==null){
            next(vm=>{
                vm.$router.go(-1);
            })
        }else{
            next();
        }
    },
    beforeRouteLeave:function(to,from,next){
        to.meta.data=this.locationData;
        next();
    },
    mounted:function(){
        var _this=this;
    window.addEventListener('message', function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        //   console.log('location', loc);
          _this.locationData=loc;
        }
    }, false);
    },
    data:function(){
        return{
            locationData:''
        }
    },
    watch:{
        locationData:{
            handler:function(){
                this.$http.jsonp('http://api.map.baidu.com/geoconv/v1/',{
                    params:{
                        ak: "O1bvQ9wk5VG7WVerj9UYte6HcfWtOcWy",
                        coords:this.locationData.latlng.lng+','+this.locationData.latlng.lat,
                        from:3,
                        to:5
                    }}).then(function(res){
                        if(res.data.status===0){
                            this.locationData.latlng.lat=res.data.result[0].y
                            this.locationData.latlng.lng=res.data.result[0].x
                            this.$router.go(-1);
                        }else{
                            alert('未正确获取地理坐标，请重新选择');
                        }   
                    },function(err){
                         alert('未正确获取地理坐标，请重新选择');
                    })
                // this.$store.commit('')
                // this.$router.go(-1)
            },
            deep:false
        }
    }
}
</script>

<style>
.content{width:100%;height:100vh;}
</style>