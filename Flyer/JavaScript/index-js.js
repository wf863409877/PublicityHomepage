window.onload=function(){
// 全局变量：
	var top=0,//滚动条高度
		index=0;//按钮序号

	var nav=document.getElementsByClassName("nav")[0];
	var aside=document.getElementsByClassName("aside")[0]
	var asideButns=document.getElementsByClassName("aside_butn");
	var navLists=document.getElementsByClassName("nav-list");
	var toTop=document.getElementById("toTop");               //最下方返回顶部的按钮
	var navTip=document.getElementsByClassName("nav_tip")[0]; //滑动门
	var animationScreen3=document.getElementsByClassName("animationScreen3");//第三屏需要添加关键帧动画的元素
// 跨浏览器事件处理
	function addHandler(element, type, handler) {
	    if (element.addEventListener) {
	        element.addEventListener(type, handler, true);
	    }
	    else if (element.attachEvent) {
	        element.attachEvent('on' + type, handler);
	    }
	    else {
	        element['on' + type] = handler;
	    }
	}

// 获取元素的样式
var getElem = function( selector ){
  return document.querySelector(selector);
}
var getAllElem = function( selector ){
  return document.querySelectorAll(selector);
}
// 设置需要加入动画的元素
var screenAnimateElements = {
  '.screen-1' : [
   '.screen-1_content > span:nth-child(1)',
   '.screen-1_content > span:nth-child(2)',
  ],
  '.screen-2' : [
    '.screen-2_content > span:nth-child(1)',
    '.screen-2_content > span:nth-child(2)',
    '.screen-2_content > span:nth-child(3)',
  	'.screen-2_content2 > span:nth-child(1)',
    '.screen-2_content2 > span:nth-child(2)',
  ],
  '.screen-3' : [
   '.pic',
    '.screen-3_content > span:nth-child(1)',
    '.screen-3_content > span:nth-child(2)',
    '.screen-3_content > span:nth-child(3)',
    '.screen-3_content2 > span:nth-child(1)',
    '.screen-3_content2 > span:nth-child(2)',
    '.screen-3_content2 > span:nth-child(3)',
    '.screen-3_content2 > span:nth-child(4)',
    '.screen-3_content2 > span:nth-child(5)',
  ],
  '.screen-4' : [
    '.screen-4_content > span:nth-child(1)',
    '.screen-4_content > span:nth-child(2)',
    '.screen-4_content > span:nth-child(3)',
    '.screen-4_content2 > span:nth-child(1)',
    '.screen-4_content2 > span:nth-child(2)',
    '.screen-4_content2 > span:nth-child(3)',
    '.screen-4_content2 > span:nth-child(4)',
  ],
  '.screen-5' : [
    '.screen-5_content > span:nth-child(1)',
    '.screen-5_content > span:nth-child(2)',
    '.screen-5_content > span:nth-child(3)',
  ]

};
// index定位滑动条
	// function myscrollTop(index){
	// 	switch(index){
	// 		case 1:
	// 			document.documentElement.scrollTop = 1;
	// 			break;
	// 		case 2:
	// 			document.documentElement.scrollTop = 500;
	// 			break;
	// 		case 3:
	// 			document.documentElement.scrollTop = 1200;    
	// 			break;	
	// 		case 4:
	// 			document.documentElement.scrollTop = 1800;
	// 			break;	
	// 		case 5:
	// 			document.documentElement.scrollTop = 2500;
	// 			break;		
	// 	}
	// }	

// 添加index属性
	for(var i=0;i<5;i++){
		asideButns[i].setAttribute("index",i);
		navLists[i].setAttribute("index",i)
	}
// 设置按钮状态
	function setActive(){
		for(var i=0;i<5;i++){
			asideButns[i].style.color="#000";
			navLists[i].style.color="#fff";
		}
			asideButns[index].style.color="#f00";
			navLists[index].style.color="#f00";
			navTip.style.left=index*109+"px";
	}
// document.documentElement.scrollTop和document.body.scrollTop 
// 兼容问题，....封装个兼容的设置高度方法
	function setTop(setTop){
		if(document.body.scrollTop){
			return document.body.scrollTop=setTop;
		}else{
			return document.documentElement.scrollTop=setTop;
		}
	}
//绑定点击事件 
	for(var i=0;i<5;i++){

		addHandler(asideButns[i],"click",function(event){
			index=event.target.getAttribute("index");
			// document.documentElement.scrollTop = index*600+50;
			// document.body.scrollTop=index*600+50;
			setTop(index*600+50); //使用兼容写法
			setActive();
			
		});
		addHandler(navLists[i],"click",function(event){
			index=event.target.getAttribute("index");
			// document.documentElement.scrollTop = index*600+50;
			 document.body.scrollTop=index*600+50;
			setTop(index*600+50); //使用兼容写法
			setActive();
		});
	}
	addHandler(toTop,"click",function(event){
		setTop(1);
	})
// 第三屏 关键帧动画的播放封装
	function StratAnimationScreen3(index){
		if(index==2){//到达第三屏时
			for(var i=0;i<5;i++){
				animationScreen3[i].style.animation="screen4Anima ease 1s 1 1.5s ";
			}
		}
	}
	function StopAnimationScreen3(index){
		if(index!=2){//到达第三屏时
			for(var i=0;i<5;i++){
				animationScreen3[i].style.animation="";
			}
		}
	}	
//  播放动画
	function AutoPlay(element){
		
		 var mylist= screenAnimateElements[element];//拿到一屏的元素的数组；
		 for(var i=0;i<mylist.length;i++){
			 var ele=getElem(mylist[i]);
			 ele.setAttribute("id","animation-init") ;//获取元素

		 }
	}
	
	// 移除动画
	function StopAutoPlay(element){
		var mylist= screenAnimateElements[element];
		 for(var i=0;i<mylist.length;i++){
		 	var ele=getElem(mylist[i]);
		 	 ele.removeAttribute("id") ; 
		 }
	}
	// 封装一个初始化函数  根据传入的当前屏数 播放停止动画 （1.2.3...）
	function myinit(index){
		AutoPlay(".screen-"+index);
		var list=[1,2,3,4,5];
		list.splice(list.indexOf(index),1);
		for(var i=0;i<list.length;i++){
			StopAutoPlay(".screen-"+list[i]);
		}	
	}
	// 动画函数  调用myint 播放/停止动画 同时设置index全局当前屏数
	function myPlay(top){
		if(0<top&&top<300*1){              //0-300
		 	myinit(1);
 			index=0;
		 }
		 if(top>=300&&top<1000) {  //300-1000
		 	myinit(2);
 			index=1;
		 }
		 if(top>=1000&&top<1600) {  //1000-1600
		 	myinit(3);
			index=2;
		 }
		 if(top>=1600&&top<2100) { //1600-2100
		 	myinit(4);
		 	index=3;
		 	}
		 if(top>=2100) {
		 	myinit(5); 
		 	index=4;	
		 }
		 if(top==0){nav.className="nav nav-done";}
		 if(top<50){
		 	nav.className="nav nav-done";
			nav.id="";
			aside.id="";
		 }
		 if(top>=50){
		 	nav.id="nav";
		 	aside.id="aside";
		 	}
		 
	
	}
	// 设置滚动条监听
	window.onscroll=function(){
		// top =document.body.scrollTop;//firefox
		// top= document.documentElement.scrollTop;//chrome
		top = document.documentElement.scrollTop|| document.body.scrollTop;//只好写个兼容
		 myPlay(top);					//播放动画
		 setActive();                  //设置按钮 active状态
		 StratAnimationScreen3(index);	//播放第三屏关键帧动画
		 StopAnimationScreen3(index);
	}
	// 滑动门
	for(var i=0;i<5;i++){
		addHandler(navLists[i],"mouseover",function(event){
			var n=event.target.getAttribute("index");
			navTip.style.left=109*n+"px";
		});
		addHandler(navLists[i],"mouseout",function(event){
			setActive();
		});
	}
	// 刷新页面自动播放第一屏   为了优化刚刚加载页面不滚动时 onscroll监听不触发，第一屏动画bug问题
	setTimeout(function(){
		AutoPlay(".screen-1");
		nav.className="nav nav-done";
	},100)
}
