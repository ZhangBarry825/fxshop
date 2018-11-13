import Vue from 'vue';
export default {
    vueUtil: function () {
        // 路由跳转
        Vue.prototype.pr = function (path) {
            this.$router.push(path);
        }
        //   数据接口变量
        Vue.prototype.API = process.env.API_HOST;
        // post请求
        Vue.prototype.post = function (api, param, callback, errback) {
            this.$http.post(this.API + api, param, { emulateJSON: true }).then(function (res) {
                callback.call(this, res);
                // callback(res);
            }, function (err) {
                if (errback) {
                    errback.call(this, err);
                }
            })
        }
        // get请求
        Vue.prototype.get = function (api, param, callback) {
            this.$http.get(this.API + api, {
                params: param
            }).then(function (res) {
                callback.call(this, res);
            }, function (err) {

            })
        },
            // jsonp
            Vue.prototype.jsonp = function (api, param, callback) {
                this.$http.jsonp(api, {
                    params: param
                }).then(function (res) {
                    callback.call(this, res);
                }, function (err) {

                })
            },
            Vue.prototype.golocation1 = function (callback) {
                var _this = this;
                var phone = this.isphone();
                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };
                function err(error) {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            alert('用户不允许地理定位!');
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert('无法获取当前位置!请确认打开GPS');
                            break;
                        case error.TIMEOUT:
                            alert('操作超时!请确认打开GPS');
                            break;
                        case error.UNKNOWN_ERROR:
                            alert('未知错误！');
                            break;
                    }
                }
                if (phone.isIos) {
                    window.locationCallback = function (err, pos) {
                        if (err) {
                            showError(err);
                            return;
                        }
                        showPosition(pos);
                    }
                    window.showPosition = function (pos) {
                        var log = pos.coords.longitude;
                        var lat = pos.coords.latitude;
                        _this.changeCoords(log, lat, function (res) {
                            callback.call(_this, res);
                        })
                    }
                    window.showError = err;
                    var str = '<iframe  src="javascript:(function(){ '
                        + 'window.navigator.geolocation.getCurrentPosition('
                        + 'function(position){parent && parent.locationCallback && parent.locationCallback(null,position);}, '
                        + 'function(err){parent && parent.locationCallback && parent.locationCallback(err);}, '
                        + '{enableHighAccuracy : ' + options.enableHighAccuracy + ', maximumAge : ' + options.maximumAge + ', timeout :' + options.timeout + '})'
                        + ';})()" style="display:none;"></iframe>';
                    // $(str).appendTo('body')
                    // document.body.appendChild(str)
                    var divBox = document.createElement('div');
                    divBox.id = 'getCoords'
                    divBox.innerHTML = str;
                    document.body.appendChild(divBox);
                } else if (phone.isAndroid) {
                    function success(pos) {
                        var coor = pos.coords;
                        var lat = coor.latitude;
                        var log = coor.longitude;
                        // alert(lat)

                        _this.changeCoords(log, lat, function (res) {

                            callback.call(_this, res);
                        });
                    }
                    window.navigator.geolocation.getCurrentPosition(success, err, options)
                }
            },
            Vue.prototype.isphone = function () {
                var isIos = navigator.userAgent.match('iPad') || navigator.userAgent.match('iPhone') || navigator.userAgent.match('iPod'),
                    isAndroid = navigator.userAgent.match('Android');
                return {
                    isIos: isIos,
                    isAndroid: isAndroid
                }
            },
            Vue.prototype.changeCoords = function (log, lat, callback) {
                this.jsonp("http://api.map.baidu.com/geoconv/v1/", {
                    coords: log + "," + lat,
                    from: 1,
                    to: 5,
                    ak: "O1bvQ9wk5VG7WVerj9UYte6HcfWtOcWy"
                }, function (res) {
                    var coord={};
                    // console.log(res)
                    coord.lng=res.data.result[0].x;
                    coord.lat=res.data.result[0].y;
                    callback.call(this,coord);
                })
            },
            Vue.prototype.golocation2 = function (callback) {
                var _this = this;
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        callback.call(_this, r.point);
                    } else {
                        alert('failed' + this.getStatus());
                    }
                }, { enableHighAccuracy: true })
            },
            Vue.prototype.golocation = function (callback) {
                var _this = this;
                this.post('/weixin/getSignJsp', {
                    url: window.location.href.split("#")[0]
                }, function (res) {
                    wx.config({
                        debug: false,
                        appId: "wx483e5f4d681b51fb",
                        timestamp: res.data.timeStamp,
                        nonceStr: res.data.nonceStr,
                        signature: res.data.signature,
                        jsApiList: ["getLocation"]
                    });
                    wx.ready(function () {
                        wx.getLocation({
                            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                            success: function (res) {
                                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                                var speed = res.speed; // 速度，以米/每秒计
                                var accuracy = res.accuracy; // 位置精度
                                _this.changeCoords(longitude,latitude,callback);
                            }
                        });
                    });
                    wx.error(function (res) {
                        console.log(res);
                    });
                })
            }
    }
    // POST:function(api,params,callback){
    //     Vue.prototype.
    // }
}