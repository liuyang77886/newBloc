import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";

export default class Node extends Component{
    render(){
        return <div>
            <input ref={(input)=>{this.input = input}} type="file" name="f1"/>
            <button ref={(btn)=>{this.btn = btn}}>上传</button>
        </div>
    }
    componentDidMount(){
        var data = [];
        this.input.onchange = function(){
            //alert(1);
            data.push(this.files);
            console.log(data);
        }
        this.btn.onclick = function(){
            var formdata = new FormData();
            //console.log(formdata);
            //console.log(document.querySelector("input").files)
            //debugger;
            //var file = document.querySelector("input").files
            for(var i=0;i<data.length;i++){      
                formdata.append("testUpload"+i, data[i][0]);
            }
            console.log(formdata);
            var xmlhttp=new XMLHttpRequest();
            xmlhttp.open("post",window.ENVPATH+"upload",true);
            xmlhttp.send(formdata);

        }
    }
}