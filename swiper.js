!function (t,e){
	 "object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("swiper",[],e):t.swiper=e()
}(this,function(){
	//工具类函数
	 'use strict' //严格模式 ES5提出
			  //模块代码的公用工具类
			  function isObj(obj){
			  	return typeof obj==='object' && obj!==null
			  }
			  function isArray(arr){
			  	return arr.constructor===Array;
			  }
	
	return function(obj){
			
				  	if(!isObj(obj)|| isArray(obj)){
				  		//console.log('数据类型错误')
				  		throw new Error('数据类型错误')
				  	}
					//保存传入参数
					var el=obj.el;//包裹div
					var picInfo=obj.data.picInfo;//如果还有添加别的数据就可直接在html的data对象中添加即可
					var height=obj.data.height;//轮播图高度
					var picindex=0;//显示的图片索引
					//创建dom节点
					//1.把要创建的dom节点放这方便看着创建
					/*  <div class="js-swiper">
					    <div class="js-swiper-item" :style="`height:${height}px`">
					      <img :src="pics[picindex]" :style="`height:${height}px`"/>
					      <ul class="dots">
					        <li class="dots-item" v-for="(item,index) in pics" :key="item" @click="dotClick(index)">
					          <div class="dots-item-content" :class="{selected:index===picindex}"></div>
					        </li>
					      </ul>
					      <div class="left-right">
					        <div class="right" @click="rightClick">
					          <img src="../../../assets/img/detail/right.svg">
					        </div>
					        <div class="left" @click="leftClick">
					          <img src="../../../assets/img/detail/back_gray.svg">
					        </div>
					      </div>
					
					    </div>
					  </div> */
					  //2.开始创建
					  var parentNode=document.querySelector(el);//获取最外部包裹div
					  var jsSwiper=document.createElement('div');//创建最外层的 <div class="js-swiper">
					  jsSwiper.className="js-swiper";//绑定class
					  parentNode.appendChild(jsSwiper);//把新创建的节点添加入包裹div中
					  var jsSwiperItem=document.createElement('div');//创建 <div class="js-swiper-item" :style="`height:${height}px`">
					  jsSwiperItem.className="js-swiper-item";
					  jsSwiperItem.style.height=height+'px';//给节点添加样式
					  jsSwiper.appendChild(jsSwiperItem);
					  var picimg=document.createElement('img');//创建<img :src="pics[picindex]" :style="`height:${height}px`"/>
					  picimg.setAttribute('src',picInfo[picindex].image_800);
					  picimg.style.height=height+'px';//给节点添加样式
					  jsSwiperItem.appendChild(picimg);
					  var dots=document.createElement('ul');//创建 <ul class="dots">
					  dots.className="dots";
					  jsSwiperItem.appendChild(dots);
					  picInfo.forEach((item,index)=>{//遍历所有要展示的图片生成小圆点列表
					  
					  var dotsItem=document.createElement('li');  // <li class="dots-item" v-for="(item,index) in pics" :key="item" @click="dotClick(index)">
					  dotsItem.className="dots-item";
					  dotsItem.onclick=function(){//给节点绑定click事件
						  dotClick(index);
					  }
					  dots.appendChild(dotsItem);
					  var dotsItemContent=document.createElement('div');  //创建<div class="dots-item-content" :class="{selected:index===picindex}"></div>
					  index===picindex?dotsItemContent.className="dots-item-content selected":dotsItemContent.className="dots-item-content";//给节点动态赋class
					  dotsItem.appendChild(dotsItemContent);
					  })
					  var leftRight=document.createElement('div'); // <div class="left-right">
					  leftRight.className="left-right";
					  jsSwiperItem.appendChild(leftRight);		
					  
					  var Left=document.createElement('div'); //<div class="left" @click="leftClick">
					  Left.className="left";
					  Left.onclick=function(){
					  						  leftClick();
					  }
					  leftRight.appendChild(Left);
					  var leftImg=document.createElement('img'); // <img src="./back_gray.svg">
					  leftImg.setAttribute('src',"./back_gray.svg");
					  Left.appendChild(leftImg);
					  
					 var Right=document.createElement('div'); //<div class="right" @click="rightClick">
					 Right.className="right";
					 Right.onclick=function(){
					 						  rightClick();
					 }
					 leftRight.appendChild(Right);
					 var rightImg=document.createElement('img'); // <img src="./right.svg">
					 rightImg.setAttribute('src',"./right.svg");
					 Right.appendChild(rightImg);
					  
					  //所有涉及改参的函数一律写在所有逻辑的最底部，不用改参数的函数一律写在return函数外面的工具类函数中
					  function dotClick(index){
					                  picindex=index;//此处改动了传入的参数
					                  console.log(picindex);
									  updateCss();//每个事件发生后都有调用一次样式刷新函数
					              };
						function rightClick(){
										console.log('right');
										if(picindex===picInfo.length-1){
											return false;
										}else{
											picindex++;
										}
										updateCss();//每个事件发生后都有调用一次样式刷新函数
									};
						function  leftClick(){
										console.log('left');
										if(picindex===0){
											return false;
										}else{
											picindex--;
										}
										updateCss();//每个事件发生后都有调用一次样式刷新函数

									};
					//刷新样式函数，这个必须有，否则点击后样式不会发生改变
					//把上面创建节点时涉及变化的参数重新赋值一遍
					function updateCss(){
						 picimg.setAttribute('src',picInfo[picindex].image_800);//展示图片的src要改变
						 
					}
							
					  
		
	}
})