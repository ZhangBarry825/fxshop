// 该工具接受参数为对象，
// 在需要正则验证时对象的一级key值必须和规则中的一级key值相同
// util({
//     phone:{
//         val:_this.phone,  //为验证的值
//         errmsg:'手机号错误，请填写正确的手机号', //正则验证不通过的错误提示,当该项没有，并且require为true时只判断必填
//         rquired:true,   //是否必填
//         name:'手机' //固定错误提示的name
//     }
// })

var rules={
    phone:{
        reg:/^1[0-9]{10}$/
    },
    password:{
        reg:/^[a-zA-Z0-9]{6,16}$/,
    },
    code:{
        reg:/^[0-9]+$/
    },
    car:{
        reg:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    },
    money:{
        reg:/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    },
    score:{
        reg:/^[0-9]+$/
    },
    timelong:{
        reg:/^[0-9]+$/
    }
}

var util={
    // 表单验证
    testSubmit:function(data){
        if(!this.testParams(data,'Object')){
            return;
        }
        var arr=[];
        var password=data.password;
        var slot;
        // 必填为空，提示不能为空
        // 必填不为空，验证
        // 非必填为空时 不管就行
        // 非必填不为空时 验证
        for(var key in data){
            // 必填项验证
            // alert(data[key].val)
            if(data[key].rquired){
                // console.log(data[key].val)
                if(data[key].val===''){
                    var msg={};
                    msg.errmsg=`${data[key].name}不能为空，为必填项`;
                    msg.name=key;
                    arr.push(msg);
                    return arr;
                }
                if(!data[key].errmsg){
                    continue;
                }
            }else{
                if(data[key].val===''){
                    continue;
                }
            }
            // passwordAgain为二次密码验证
            if(key!=='passwordAgain'){
                if(rules[key]){
                    slot=this.testRegExp(rules[key].reg,data[key].val);
                }else{
                    slot=false;
                }
                
            }else if(key==='passwordAgain'){
                slot=(data.passwordAgain.val===password.val);
            }
            if(!slot){
                var msg={};
                msg.errmsg=data[key].errmsg;
                msg.name=key;
                arr.push(msg);
                break;
            }
        }
        return arr;
    },
    // 验证传入的数据类型是否符合要求
    testParams:function(data,line){
        if(Object.prototype.toString.call(data)!=='[object '+line+']'){
            throw '必须传'+line+'类型数据'
            return false;
        }
        return true;
    },
    // 正则验证
    testRegExp:function(reg,data){
        if(reg.test(data)){
            return true;
        }else{
            return false;
        }
    }
}
export default util;
export var m='aaaaa'