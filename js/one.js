let SwiperOne=document.querySelector(".container_1 .mySwiperOne .swiper-wrapper");
let SwiperOne_bg = document.querySelector(".container_1 .mySwiperOnebg .swiper-wrapper");
let swiperTwo = document.querySelector(".container_1 .mySwiperTwo .swiper-wrapper");
let recommend = document.querySelector('.container_1 .main .main_left .l_hot_recommend .wrap');
let musicList = document.querySelectorAll('.container_1 .main .main_left .l_music_list_wrap ol');
let html=document.documentElement||document.body;
let back = document.querySelector('.bottom .back');
let audioBox=document.getElementById("audioBox");
let mus_timEm=document.querySelector(".mus_tim em");//播放时间
let mus_timSpan=document.querySelector(".mus_tim span");//总时间
let cur=document.querySelector(".cur");//播放进度条
let play=document.querySelector(".btns .play");//播放按钮
let audiobtns=document.querySelector(".assemble");//音乐有关的所有按钮
let vol=document.querySelector(".vol");//声音进度条
let loop_tip=document.querySelector(".loop_tip");//换播放方式
let ste=0;//音量
let cov_img=document.querySelector(".cov img");//播放音乐的图片

//封装一个播放音量的方法
let musicMethod={
	songs:[],
	index:0,
	//添加到音乐列表
	add(src, pic, song, author){
		this.songs.push({
			src,pic,song,author
		})
	},
	//播放
	play(){
		audioBox.src=this.songs[this.index]["src"];
		cov_img.src=this.songs[this.index]["pic"];
		document.querySelector('.tit_mus').innerHTML = this.songs[this.index]["song"];
		document.querySelector('.tit_aur').innerHTML = this.songs[this.index]["author"];
		audioBox.play()
	},
	//暂停
	pause: function () {
	   audioBox.pause();
	},
	next(){
		this.index++;
		if(this.index>this.songs.length-1){
			this.index=0;
		}
		console.log(this.index);
		this.play();
	},
	prev(){
		this.index--;
		if(this.index<0){
			this.index=this.songs.length-1;
		}
		console.log(this.index);
		this.play();
	}
}

function render(data){
	//console.log(data);
	
	//轮播图1
	let stra="",strb="";
	data[0].swiper1.forEach(item=>{
		let {pic,background}=item;
		stra+=`<div class="swiper-slide">
                <img src="${pic}" alt="">
              </div>`
	    strb+=`<div class="swiper-slide">
			      <img src="${background}"  alt="">
			  </div>`
	})
	SwiperOne.innerHTML=stra;
	SwiperOne_bg.innerHTML=strb;
	
	
	var Swiper1_bg = new Swiper('.mySwiperOnebg', {
	  effect: 'fade',
	  loop: true,
	});
	var swiper1 = new Swiper(".mySwiperOne", {
	  //双向控制
	  controller: {
	    control: Swiper1_bg,
	  },
	  autoplay: true,
	  loop: true,
	  effect: 'fade',
	  navigation: {
	    nextEl: ".next",
	    prevEl: ".prev",
	  },
	  pagination: {
	    el: ".pag",
	    clickable: true,
	    bulletClass: 'my-bullet',//需设置.my-bullet样式
	    bulletActiveClass: 'my-bullet-active',
	  },
	  // observer: true,//修改swiper自己或子元素时，自动初始化swiper
	  // observeParents: true,//修改swiper的父元素时，自动初始化swiper
	});
	
	//新碟上架
	let str_2 = ``;
	data[1].swiper2.forEach((item) => {
	  let { id, pic, title, creator } = item;
	  str_2 += `<div class="swiper-slide">
	  <img src="${pic}"
	    alt="">
	  <a class="msk" href=""></a>
	  <a class="ply" href=""></a>
	  <p class="tit1"><a href="">${title}</a></p>
	  <p class="tit2"><a href="">${creator}</a></p>
	</div>`;
	});
	swiperTwo.innerHTML = str_2;
	
	var swiper2 = new Swiper(".mySwiperTwo", {
	  slidesPerView: 5,
	  slidesPerGroup: 5,
	  loop: true,
	  loopFillGroupWithBlank: true,
	  navigation: {
	    nextEl: ".next1",
	    prevEl: ".prev1",
	  },
	  // observer: true,//修改swiper自己或子元素时，自动初始化swiper
	  // observeParents: true,//修改swiper的父元素时，自动初始化swiper
	});
	
	//热门推荐
	let str_3 = ``;
	data[2].recommend.forEach((item) => {
	  let { id, pic, nb, tit, i } = item;
	  str_3 += `<li>
                  <div class="img">
                    <img src="${pic}" alt="">
                    <a class="eff" href=""></a>
                    <div class="btm">
                      <a href=""></a>
                      <span class="icon-headset"></span>
                      <span class="nb">${nb}</span>
                    </div>
                  </div>
                  <p>${i}<a href="">${tit}</a></p>
                </li>`;
	});
	recommend.innerHTML = str_3;
	
	//榜单
	let str_4 = ``;
	data[3].forEach((item, index) => {
	  let { music } = item;
	  str_4 += ` <li>
	                  <span>${index + 1}</span>
	                  <a href="">${music}</a>
	                  <div class="oper">
	                    <a class="oper_1" href=""></a>
	                    <a class="oper_2" href=""></a>
	                    <a class="oper_3" href=""></a>
	                  </div>
	                </li>
	              `;
	
	});
	musicList[0].innerHTML = str_4;
	musicList[1].innerHTML = str_4;
	musicList[2].innerHTML = str_4;
	
	
}

function handle(){
	//返回顶部
   window.onscroll=function(){
	   //console.log(html.scrollTop)
	   if(html.scrollTop>100){
		   back.style.display="block";
	   }else{
		   back.style.display="none";
	   }
   }
   
   //音乐的点击功能
   audiobtns.onclick=function(e){
	   let tar=e.target;
	   //上一首
	   if(tar.className=="pre"){
		   musicMethod.prev()
	   }
	   //下一首
	   if(tar.className=="nex"){
	   	   musicMethod.next()
	   }
	   //显示隐藏音量
	   if(tar.className=="icn_vol"){
		   if(ste==0){
			   vol.style.display="block";
			   ste=1;
		   }else{
			   vol.style.display="none";
			   ste=0;
		   } 
		   return;
	   }
	   //点击切换播放方式
	   if(tar.className.includes("icn_c")){
		   loop_tip.style.display="block";
		   setTimeout(() => {
		     loop_tip.style.display = 'none';
		   }, 1000)
	   }
	   
	   if(tar.className.includes("icn_loop")){
	   		 tar.classList.remove('icn_loop');
	   		 tar.classList.add('icn_shuff');
	   		 loop_tip.style.display = 'block';
	   		 loop_tip.innerHTML = '随机';
	   		 return;
	   }
	   if(tar.className.includes("icn_shuff")){
	   		 tar.classList.remove('icn_shuff');
	   		 tar.classList.add('icn_one');
	   		 loop_tip.style.display = 'block';
	   		 loop_tip.innerHTML = '单曲循环';
	   		 return;
	   }
	   if(tar.className.includes("icn_one")){
	   		 tar.classList.remove('icn_one');
	   		 tar.classList.add('icn_loop');
	   		 loop_tip.style.display = 'block';
	   		 loop_tip.innerHTML = '循环';
	   }
   }
   
}
handle();

const getData= function getData() {
  return new Promise(resolve => {//返回一个成功的实例
    let xhr = new XMLHttpRequest;
    xhr.open('GET', './data.json');
    xhr.onreadystatechange = () => {
      let { readyState, status, responseText } = xhr;
      if (readyState === 4 && status === 200) {
        let data = JSON.parse(responseText);
        resolve(data);
      }
    };
    xhr.send();
  });
};

getData().then(data=>{
	render(data)
}).catch(err=>{
	console.log(err);
})

//添加播放列表
musicMethod.add("./media/合拍.m4a", "https://p1.music.126.net/Ethtz4VJFKtuuhpcd9WLzg==/109951168252754401.jpg?param=34y34", "合拍", "许嵩");
musicMethod.add("./media/精卫.m4a", "https://p3.music.126.net/jSH_ikeooxveWl0BTc3Xkg==/109951166786983190.jpg?param=34y34", "精卫", "30年前，50年后");
musicMethod.add("./media/若把你.m4a", "https://p4.music.126.net/M877M2-VhWZiLPVFORf9iQ==/109951163401482434.jpg?param=34y34", "若把你", "Kirsty刘瑾睿");
musicMethod.add("./media/我记得.m4a", "https://p4.music.126.net/FCWD6ibS2JK2B3QAnXuzwQ==/109951167805892385.jpg?param=34y34", "我记得", "赵雷");
document.querySelector('.add .icn_list').innerHTML=musicMethod.songs.length;

  
//时间处理
function format(num){
	let minutes=Math.floor(num/60);//分钟
	let senconds=Math.ceil(num-minutes*60);//秒
	if(minutes<10){
		minutes="0"+minutes;
	}
	if(senconds<10){
		senconds="0"+senconds;
	}
	return `${minutes}:${senconds}`
}

function handleTimePlay(){
	//currentTime 播放时长  
	//duration 总时长  183.639375  单位秒
	
	let {currentTime,duration}=audioBox;
	// console.log(currentTime,duration)
	if(isNaN(currentTime)||isNaN(duration)){return}
	mus_timEm.innerHTML=format(currentTime);//播放时间
	mus_timSpan.innerHTML="/ "+format(duration);//总时间
	//播放进度
	if(currentTime>=duration){
		musicMethod.next()
	}
	cur.style.width=`${currentTime/duration*100}%`;//播放进度
	
}
handleTimePlay();
audioBox.onloadedmetadata=handleTimePlay;

//点击按钮播放
var timer=null;
play.onclick=function(){
	if(audioBox.paused){
		musicMethod.play();
		play.classList.remove("pas");
		if(!timer){
			timer=setInterval(()=>{
				//$sub.emit("handleTimePlay")
				handleTimePlay()
			},1000)
		}
	}else{
		musicMethod.pause();
		play.classList.add("pas");
		if(timer){
			clearInterval(timer);
			timer=null;
		}
	}
}


//点击进度条 拖拽
let bar_music = document.querySelector('.cur span');
let line=document.querySelector(".line")
let allW=line.offsetWidth;
let startX=0,startW = cur.offsetWidth;
bar_music.onmousedown = function (e) {
    startX = e.clientX;//初始X坐标
	startW = cur.offsetWidth;
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
}
function move(e){
	let changeX=e.clientX-startX;
	let resX=changeX+startW;//移动的距离差
	let result=resX/allW;
	result=result>1?1:(result<0?0:result)
	cur.style.width = `${result*100}%`;
	console.log(cur.style.width)
}
function up(){
  	window.removeEventListener('mousemove', move);
  	window.removeEventListener('mouseup',up);
	
	let res = cur.style.width || '0';
	audioBox.currentTime = Math.ceil(audioBox.duration) * (parseFloat(res) / 100);
	handleTimePlay();
	audioBox.play();
}

