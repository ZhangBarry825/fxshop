<template>
    <div class="upimage">
        <label class="upimageBox">
            <div class="imgBox" v-show="imgShow">
                <img v-bind:src="imgUrl" >
            </div>
            <em v-show="!imgShow">+</em>
            <input type="file" name="upfile" v-on:change="upImg($event)">
        </label>
    </div>
</template>

<style scoped>
.upimage{
    box-sizing:border-box;
    width:100%;
    height:100%;
    border:1px solid #ccc;
    border-radius:4px;
    background-color:#fff;
}
.upimageBox{
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
}
.upimageBox img{
    max-width:100%;
    max-height:100%;
}
.imgBox{
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
}
.upimageBox em{
    display:inline-block;
    font-size:8rem;
    color:#ccc;
    text-align:center;
    vertical-align:middle;
}
.upimageBox input{
    display:none;
}
</style>

<script>
export default{
    props:{
        // 区分同一
        ind:{
            type:Number
        },
        img:{
            // type:String
        }
    },
    created:function(){
        if(this.img){
            this.imgShow=true;
            this.imgUrl=this.img;
        }
    },
    data:function(){
        return{
            imgShow:false,
            imgUrl:''
        }
    },
    methods:{
        upImg:function(event){
            var self=this;
            var img=event.target.files[0];
            var fileRead=new FileReader();
            fileRead.readAsDataURL(img);
            fileRead.onload=function(){
                self.imgShow=true;
                self.imgUrl=fileRead.result;
                self.$emit('getImg',img,self.ind)
            }
        }
    }
}
</script>
