<template>
    <div>
        <label class="switch-label">
            <input type="checkbox" class="hidden" v-model="choose" v-on:change="changeChoose">
            <span class="switch-box" v-bind:style="{backgroundColor:choose?config.color:''}"></span>
        </label>
    </div>
</template>

<style scoped>
.switch-label {
  display: block;
  width: 5rem;
  height: 3rem;
  background-color: #fff;
}
.switch-box {
  display: block;
  width: 5rem;
  height: 3rem;
  box-sizing:border-box;
  background-color: #fff;
  border:2px solid #e5e5e5;
  border-radius: 4rem;
}
.switch-box::before {
  content: "";
  display: block;
  box-sizing:border-box;
  width: 3rem;
  height: 3rem;
  background-color: #fff;
  border-radius: 3rem;
  border:2px solid #e5e5e5;
  /* transform:translateY(3px); */
  transform: translateX(-2px) translateY(-2px) translateZ(0);
  transition:transform .2s ease-in-out 0s;
}
/* input.hidden:checked + span {
  background-color: #09bb07;
} */
input.hidden:checked + span::before {
  transform: translateX(calc(3rem - 13px)) translateY(-2px) translateZ(0);
  transition:transform .2s ease-in-out 0s;
}
.hidden {
  display: none;
}
</style>

<script>
export default {
  props: {
    config: {
        type:Object,
        default:function(){
            return{
                color:'#09bb07',
                choose:false
            }
        }
    }
  },
  data: function() {
    return {
      choose: this.config.choose
    };
  },
  methods:{
      changeChoose:function(){
          this.$emit('sendChoose',this.choose)
      }
  }
};
</script>
