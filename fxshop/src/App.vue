<template>
  <div id="app" class="h100">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<style>
html,body{
    height: 100%;
}
.h100{
  height: 100%;
}
.heightBox{
height:100%;
overflow:hidden;
}
.gray-back{
  background-color:#eeeeee;
}
</style>
<script>
export default {
  name: 'App'
}
</script>

<style src="./css/normalize.css"></style>
<style src="./css/reset.css"></style>

