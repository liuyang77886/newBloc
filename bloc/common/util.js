//遮罩层
export function showShade(path){
    var oDiv = document.createElement("div");

    oDiv.className = "dlog-shade";

    oDiv.style.position = "fixed";
    oDiv.style.top = "0";
    oDiv.style.width = "100%";
    oDiv.style.height = "100%";
    oDiv.style.background = "rgba(0,0,0,0.5)";
    oDiv.style.zIndex = "1000";
    oDiv.style.color = "#ffffff";

    oDiv.innerHTML = `<div style='position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:20px;'><img src='${path}'/></div>`;

    document.body.style.overflow = "hidden";

    document.body.append(oDiv);

    //关闭按钮
    var closeBtn = document.createElement("div");
    closeBtn.style.position = "fixed";
    closeBtn.style.top = "0px";
    closeBtn.style.right = "20px";
    closeBtn.style.fontSize = "50px";
    closeBtn.style.zIndex = "1001";
    closeBtn.style.color = "#ffffff";
    closeBtn.style.cursor = "pointer";

    closeBtn.innerHTML = "x";

    oDiv.append(closeBtn);

    closeBtn.onclick = function(){
        oDiv.remove();
    }
}

//关闭遮罩层
export function hideShade(){
    if(document.querySelector(".dlog-shade")){
        document.body.style.overflow = "visible";
        document.querySelector(".dlog-shade").remove();
    }  
}

/**
 * 
 * @param {Date|String} time  new Date()或者毫秒字符串
 * @param {String} formatter  "yyyy-MM-DD HH:mm:ss"
 */
export function formatDate(time,formatter){
    var format
    var date = new Date();

    if(formatter){
        format = formatter
    }else{
        format = "yyyy-MM-DD HH:mm:ss"
    }

    if(time instanceof Date){
        date = time
    }else if(typeof time == "string"){
        if(/^\d{1,}$/.test(time)){
            date = new Date(Number(time))
        }else{
            date = new Date(time)
        }
        
    }

    var timeEnum = {
        y:date.getFullYear(),
        M:date.getMonth()+1,
        D:date.getDate(),
        H:date.getHours(),
        m:date.getMinutes(),
        s:date.getSeconds()
    }

    return format.replace(/[yMDHms]{1,}/g,function(value){
        return timeEnum[value[0]]<10?"0"+timeEnum[value[0]]:timeEnum[value[0]]
    });
}

//数字，字符串按照三个分割
export function numberSplit(str){
    return String(str).replace(/\B(?=(\d{3})+(?!\d{1}))/g,",")
}

//去除前后空格
export function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g,"");
}

//去除左边空格
export function trimLeft(str){
    return str.replace(/(^\s*)/g,"");
}

//去除右边空格
export function trimRight(str){
    return str.replace(/(\s*$)/g,"");
}

//去除所有空格
export function trimAll(str){
    return str.replace(/\s*/g,"");
}

//首字母大写
export function firstUpCase(str){
    return str.toLowerCase().replace(/(^[a-z])|(\s+[a-z])/g,function(value){
        return value.toUpperCase();
    });
}


/**
 * 金额转成文字大小写格式金额
 * splitFour方法：处理数字转化为4个字符的数组
 * changeNumStyle方法：处理每四位数的格式
 * numToText方法：拼接changeNumStyle的处理结果；
*/
export function splitFour(num){
    var str = String(num).replace(/^0+/,"");
    console.log(str.replace(/\B(?=(\d{4})+(?!\d{1}))/g,",").split(",")); 
    return str.replace(/\B(?=(\d{4})+(?!\d{1}))/g,",").split(",");
}

export function changeNumStyle(num,type=false){
    var trans = {
        "0":"零",
        "1":"一",
        "2":"二",
        "3":"三",
        "4":"四",
        "5":"五",
        "6":"六",
        "7":"七",
        "8":"八",
        "9":"九"
    }

    var transB = {
        "0":"零",
        "1":"壹",
        "2":"贰",
        "3":"叁",
        "4":"肆",
        "5":"伍",
        "6":"陆",
        "7":"柒",
        "8":"捌",
        "9":"玖"
    }

    var change = ["","十","百","千"];

    var changeB = ["","拾","佰","仟"];

    var numArr = num.toString().split("");

    var newArr = numArr.reverse().map(function(value,index){
        if(type){
            return value+changeB[index%4]
        }else{
            return value+change[index%4]
        }
        
    });
    var newStr = newArr.reverse().join("").replace(/0+$/,"");

    var newStr2 = newStr.replace(/0.{1}/,"0");


    return newStr2.toString().replace(/\d/g,function(value){
        if(type){
            return transB[value]
        }else{
            return trans[value]
        }
        
    })
}

/**
 * 入口方法
 * @param {number} num 
 * @param {boolean} type true:转换成中文大写金额，false：中文小写金额，默认false
 */
export function numToText(num,type){
    var trans = splitFour(num)
    var result = "";

    var arr = [];

    if(type){
        arr = ["萬","億"]
    }else{
        arr = ["万","亿"]
    }

    trans.forEach((value,index)=>{
        //console.log(changeNumStyle(value))
        if(trans.length=="2"){
            if(index==0){
                result+=changeNumStyle(value,type)+arr[0];
            }else{
                result+=changeNumStyle(value,type)
            }
        }else if(trans.length=="3"){
            if(index==0){
                result+=changeNumStyle(value,type)+arr[1];
            }else if(index==1){
                result+=changeNumStyle(value,type)+arr[0]
            }else{
                result+=changeNumStyle(value,type)
            }
        }
        
    });
    if(type){
        return result.replace(/^零+.{1}/,"")+"圆";
    }else{
        return result.replace(/^零+.{1}/,"");
    }
    
}
