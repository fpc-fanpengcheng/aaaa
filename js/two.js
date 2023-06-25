(function getData() {
  let bgImg = document.querySelector(".container_1 .bg .swiper-wrapper");// 第一个轮播图背景图容器
  let conImg = document.querySelector(".container_1 .sw_bg .swiper-wrapper"); // 第一个轮播图图片容器
  let hotbox = document.getElementById("hotbox");// 热门推荐八个图片渲染容器
  let mySwiperTwoBox = document.querySelector(".mySwiperTwo .swiper-wrapper") // 第二个轮播图(十张)容器
  let upsongBox = document.querySelector("#upsong");
  let newsongBox = document.querySelector("#newsong");
  let originsongBox = document.querySelector("#originsong");

  console.log(upsongBox);
  console.log(newsongBox);
  console.log(originsongBox);

  // 封装
  function songlist(songbox, data) {
    let str = "";
    data.forEach((item, index) => {
      str += `<li>
      <span>${index + 1}</span>
      <a href="">${item.music}</a>
      <div class="oper">
        <a class="oper_1" href=""></a>
        <a class="oper_2" href=""></a>
        <a class="oper_3" href=""></a>
      </div>
    </li>`
    })
    songbox.innerHTML = str;
  }

  //1.获取数据
  axios.get("./data.json").then(Response => {
    return Response.data
  }).then(value => {
    console.log(value);
    render(value)
  }).catch(err => {
    console.log(err);
  })

  function render(data) {
    console.log(data);
    let strbg = "";
    let strCon = "";
    data[0].swiper1.forEach(item => {
      strbg += `<div class="swiper-slide">
      <img src="${item.background}" alt="">
  </div>`
      strCon += `<div class="swiper-slide">
      <img src="${item.pic}" alt="">
  </div>`
    });
    bgImg.innerHTML = strbg;
    conImg.innerHTML = strCon;

    //轮播图功能
    var mySwiperOnebg = new Swiper(".mySwiperOnebg", {
      effect: 'fade', //淡入淡出
      loop: true, // 循环模式选项
    })
    var mySwiperOne = new Swiper(".mySwiperOne", {
      autoplay: {
        disableOnInteraction: false,
        delay: 2000,
      }, // 自动轮播
      controller: { //双向控制
        control: mySwiperOnebg,
      },
      loop: true, // 循环模式选项
      effect: 'fade', //淡入淡出

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        clickable: true, //点击小圆点切换
        bulletClass: 'my-bullet',//非激活状态的class
        bulletActiveClass: 'my-bullet-active'//激活状态的class

      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })

    //热门推荐
    let hotstr = "";
    data[2].recommend.forEach((item) => {
      let { id, pic, nb, tit, i } = item;
      hotstr += `<li>
      <div class="img">
        <img src="${pic}" alt="">
        <a class="eff" href=""></a>
        <div class="btm">
          <a href=""></a>
          <span class="icon-headset"></span>
          <span class="nb">${nb}</span>
        </div>
      </div>
      <p>${i ? '<i></i>' : ''}<a href="">${tit}</a></p>
    </li>`
    })
    hotbox.innerHTML = hotstr;


    //新碟上架
    let strSwiperTwo = "";
    data[1].swiper2.forEach((item) => {
      let { id, pic, title, creator } = item;
      strSwiperTwo += `<div class="swiper-slide" data-id=${id}>
      <img src="${pic}"
        alt="">
      <a class="ply" href=""></a>
      <a class="msk" href=""></a>
      <p class="tit1"><a href="">${title}</a></p>
      <p class="tit2"><a href="">${creator}</a></p>
    </div>`
    })
    mySwiperTwoBox.innerHTML = strSwiperTwo;

    var mySwiperTwo = new Swiper('.mySwiperTwo', {
      slidesPerView: 5,
      slidesPerGroup: 5,
      loop: true, // 循环模式选项
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    })

    //飙升榜
    songlist(upsongBox, data[3])
    songlist(newsongBox, data[4])
    songlist(originsongBox, data[5])
  }


  let back=document.querySelector(".back");
  let html=document.documentElement||document.body;
  window.onscroll=function(){
    if(html.scrollTop>100){
      back.style.opacity=1;
      back.style.zIndex=999;
    }else{
      back.style.opacity=0;
      back.style.zIndex=-999;
    }
  }
})();

(function () {
  let play = document.getElementById("play");
  // console.log(play);
  let audioBox = document.getElementById("audioBox");
  // console.log(audioBox);
  let cur = document.getElementById("cur");//进度条   
  let timer = null;
  let timeEm = document.querySelector("#mus_time em");
  let timeSpan = document.querySelector("#mus_time span");
  let myplayer = document.getElementById("myplayer");
  let vol = document.querySelector(".vol");
  let loop_tip = document.querySelector(".loop_tip");
  let icn_list = document.querySelector(".icn_list");
  let musicPic=document.getElementById("musicPic");
  console.log(musicPic);
  
  let tit_mus=document.querySelector(".tit_mus");
  let tit_aur=document.querySelector(".tit_aur");


  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.ceil(time - minutes * 60);
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    return `${minutes}:${seconds}`
  }

  let musicMethod = {
    songs: [],
    index: 0,
    add(url,pic,name,author) {
      this.songs.push({url,pic,name,author});
      icn_list.innerHTML=this.songs.length;
    },
    chang(){
      musicPic.src=this.songs[this.index]["pic"];
      audioBox.src=this.songs[this.index]["url"];
      tit_mus.innerHTML=this.songs[this.index]["name"];
      tit_aur.innerHTML=this.songs[this.index]["author"];
      audioBox.play();
    },
    showPlay(){
      if (audioBox.paused) {
        audioBox.play();
        play.classList.add("pas");
        timer = setInterval(() => {
          this.showProgress()
        }, 1000)
      } else {
        audioBox.pause();
        play.classList.remove("pas");
        clearInterval(timer);
        timer = null;
      }
    },
    showProgress() {
      let allTime = audioBox.duration;//总时间 直接求不出来，必须缓存后再求
      let curTime = audioBox.currentTime;//播放时间
      if (isNaN(allTime) || isNaN(curTime)) {
        return
      }
      timeEm.innerHTML = formatTime(curTime);
      timeSpan.innerHTML = "/" + formatTime(allTime);
      let result=parseFloat(curTime/allTime*100).toFixed(3);
      if(result>100){
        result=100
      }
      if(curTime>=allTime||result==100||audioBox.ended){
        this.next();
      }
      cur.style.width = result + "%";
    },
    next(){
      this.index++;
      if(this.index>this.songs.length-1){
        this.index=0;
      }
      this.chang()
    },
    prev(){
      this.index--;
      if(this.index<0){
        this.index=this.songs.length-1
      }
      this.chang()
    },
  }
  musicMethod.add("./media/1晴天.m4a", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Ff20bd3fe-4c34-4367-a5e2-7dd5d7eb391c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683774872&t=74702a6e436ec9fb0dc753b11c894c17", "晴天", "周杰伦");
  musicMethod.add("./media/精卫.m4a", "https://p3.music.126.net/jSH_ikeooxveWl0BTc3Xkg==/109951166786983190.jpg?param=34y34", "精卫", "30年前,50年后");
  musicMethod.add("./media/若把你.m4a", "https://p4.music.126.net/M877M2-VhWZiLPVFORf9iQ==/109951163401482434.jpg?param=34y34", "若把你", "Kirsty刘瑾睿");
  musicMethod.add("./media/我记得.m4a", "https://p4.music.126.net/FCWD6ibS2JK2B3QAnXuzwQ==/109951167805892385.jpg?param=34y34", "我记得", "赵雷");



  myplayer.onclick = function (e) {
    if (e.target.tagName == "A" && e.target.className.includes("pre")) {
      console.log('上一首');
      musicMethod.prev();
    }
    if (e.target.tagName == "A" && e.target.className.includes("nex")) {
      console.log('下一首');
      musicMethod.next();
    }
    //点击中间的播放
    if(e.target.tagName=="A"&&e.target.className.includes("play")){
      musicMethod.showPlay();
   }
    if (e.target.tagName == "A" && e.target.className.includes("icn_vol")) {
      console.log('声音');
      if (vol.style.display == "block") {
        vol.style.display = "none";
      } else {
        vol.style.display = "block";
      }
      return;
    }


    if (e.target.tagName == "A" && e.target.className.includes("icn_c")) {
      console.log('播放模式');
      loop_tip.style.display = "block";
      setTimeout(() => {
        loop_tip.style.display = "none"
      }, 1000);
      if (e.target.className.includes("icn_loop")) {
        e.target.classList.remove("icn_loop");
        e.target.classList.add("icn_shuff");
        loop_tip.innerHTML = "随机";
        return;
      }
      if (e.target.className.includes("icn_shuff")) {
        e.target.classList.remove("icn_shuff");
        e.target.classList.add("icn_one");
        loop_tip.innerHTML = "单曲循环";
        return;
      }
      if (e.target.className.includes("icn_one")) {
        e.target.classList.remove("icn_one");
        e.target.classList.add("icn_loop");
        loop_tip.innerHTML = "随机";
        return;
      }
    }
  } 
  audioBox.onloadedmetadata = musicMethod.showProgress;

  //拖拽
  let criclebox=document.getElementById("criclebox");
  let rdy=document.querySelector(".rdy");
  let rdyW=rdy.offsetWidth;
  let startX=0,left=0,endX=0,resultX=0;
  criclebox.onmousedown=function(e){
  startX=e.clientX;
     left=this.offsetLeft;
    window.addEventListener("mousemove",move);
    window.addEventListener("mouseup",up);
  }

  //移动
  function move(e){
    e.preventDefault();
    endX=e.clientX;
    resultX=endX-startX+left
    let res=resultX/rdyW*100;
    if(res>100){
      res=100;
    }
    cur.style.width=res+"%";

  }

  function up(){
    window.removeEventListener("mousemove",move);
    window.removeEventListener("mouseup",up);

    let dargTime=resultX/rdyW*audioBox.duration;
    audioBox.currentTime=dargTime;
    musicMethod.showPlay();
    audioBox.pause();
  }
})();
let gettime = new Date();
console.log(gettime);