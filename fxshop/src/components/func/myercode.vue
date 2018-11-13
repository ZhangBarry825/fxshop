<template>
    <div class="ercodback">
        <img :src="ercode" alt="">
        <h4>长按二维码即可保存至本地</h4>
    </div>
</template>

<script>
export default {
  created() {
      let id=window.sessionStorage.getItem('qqq');
    this.get(
      "/cic/Loanimgkh_S",
      {
        id: id
      },
      function(res) {
        this.ercode = this.API + "/cic/Loanimgkh?id=" + id;
      }
    );
  },
  data: function() {
    return {
        ercode:''
    };
  }
};
</script>


<style type="text/scss" lang="scss" scoped>
.ercodback {
  width: 100%;
  min-height: 100vh;
  background-color: #eee;
  text-align: center;
  padding-top:8rem;
  img {
      display:block;
    width: 20rem;
    height: 20rem;
    margin:0 auto;
  }
  h4 {
    font-size: 1.4rem;
    color: #999;
    line-height: 5rem;
  }
}
</style>

