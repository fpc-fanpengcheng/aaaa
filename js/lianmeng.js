


(function () {
  var body = document.documentElement;
  //顶部搜索点击效果
  let searchHoverWrap = document.querySelector(".search-hover-wrap");
  body.onclick = function (e) {
    if (e.target.className.includes("eject")) {
      searchHoverWrap.classList.add("show");
    }
    if (e.target.className.includes("icon-xx-1")) {
      searchHoverWrap.classList.remove("show");
    }
  }

  //轮播图
  // let mySwiper = new Swiper('.swiper', {
  //   initialSlide :0,
  //   loop: true, // 循环模式选项
  //   autoplay :{
  //     delay:2000,
  //   },
  // })



  let JPromoBox = document.getElementById("leftoneA");
  let PromoImgList = document.getElementById("CarouselList");//要移动的容器
  // console.log(PromoImgList);
  let w = JPromoBox.offsetWidth;//每张图片的宽度
  let step = 0;//步长
  let count = 6;//图片的个数
  let timer = null;//定时器

  let titleList = document.querySelectorAll(".title")
  function autoPlay() {//自动轮播
    step++;
    if (step > count - 1) {
      PromoImgList.style.transitionDuration = "0s";
      PromoImgList.style.left = "0";
      PromoImgList.offsetWidth;//更新队列--->设置不会更新队列，输出元素属性会更新队列
      PromoImgList.style.transitionDuration = "0.3s";//重新开启动画
      step = 1;
    }

    PromoImgList.style.left = `-${w * step}px`;
    criclefocus()
  }
  timer = setInterval(autoPlay, 3000)

  JPromoBox.onmouseenter = function () {
    clearInterval(timer)
    timer = null;
  }
  JPromoBox.onmouseleave = function () {
    timer = setInterval(autoPlay, 3000)
  }


  //小圆点获取焦点
  function criclefocus() {
    let temp = step;//0,1,2,3
    if (temp == count - 1) {
      temp = 0;//0，1，2，0
    }
    titleList.forEach((item, index) => {//index 0,1,2
      if (index == temp) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    })
  }
  // 点击事件委托：将绑定事件的方法委托给祖先元素，减少时间的绑定，提升性能
  JPromoBox.onmousemove = function (e) {
    //目标元素的标签名 大写
    if (e.target.tagName === "SPAN") {
      // console.log("小圆点");
      let index = e.target.getAttribute("index");
      if (step == index || (step == count - 1 && index == 0)) return;
      step = index;
      PromoImgList.style.left = `-${step * w}px`;
      criclefocus()
    }
  }




  // 选项卡1内容 
  let partTabTitle = document.querySelector(".part-tab-title");
  let partTabTitleLiList = partTabTitle.querySelectorAll(".part-tab-title-li");

  let newTabContent = document.querySelector(".new-tab-content");
  let newTabContentUlList = newTabContent.querySelectorAll("ul");

  const changeTab = function changeTab(index) {
    for (let i = 0; i < partTabTitleLiList.length; i++) {
      partTabTitleLiList[i].classList.remove('selected');
      newTabContentUlList[i].classList.remove('selected');
    }
    partTabTitleLiList[index].classList.add('selected');
    newTabContentUlList[index].classList.add('selected');
  }

  for (let i = 0; i < newTabContentUlList.length; i++) {
    let item = partTabTitleLiList[i];
    item.index = i;
    item.onmouseenter = function () {
      changeTab(this.index);
    }
  }





  // 选项卡二
  let partTabTitleLiList2 = document.querySelectorAll(".m-actpart-tab-title-li");
  let mActListUlList = document.querySelectorAll(".m-act-list-ul");
  const changeTab2 = function changeTab2(index) {
    for (let i = 0; i < partTabTitleLiList2.length; i++) {
      partTabTitleLiList2[i].classList.remove("selected")
      mActListUlList[i].classList.remove('selected');
    }
    partTabTitleLiList2[index].classList.add('selected');
    mActListUlList[index].classList.add('selected');
  }
  for (let i = 0; i < mActListUlList.length; i++) {
    let item = partTabTitleLiList2[i];
    item.index = i;
    // 当鼠标在页面上移入时，会触发 onmouseenter 事件
    item.onmouseenter = function () {
      changeTab2(this.index)
    }
  }


  //  小图标动画效果
  let iconKh = document.querySelector(".icon-kh");
  let iconFhcx = document.querySelector(".icon-fhcx");
  let iconYxzl = document.querySelector(".icon-yxzl");
  let iconXgzd = document.querySelector(".icon-xgzd");
  let iconTft = document.querySelector(".icon-tft");
  let icon101 = document.querySelector(".icon-101");
  let iconYz = document.querySelector(".icon-yz");
  let iconWxbd = document.querySelector(".icon-wxbd");
  // 父盒子
  let mGamefuncNav = document.querySelector(".m-gamefunc-nav");
  console.log(iconKh, iconFhcx, iconYxzl, iconXgzd, iconTft, icon101, iconYz, iconWxbd);

  // 事件委托
  mGamefuncNav.onmouseover = function (e) {
    function heartBeat(tapClass, tapNav) {
      if (e.target.className.includes(tapClass)) {
        tapNav.classList.add('animate__animated', 'animate__heartBeat');
      }
    }
    heartBeat("herfType11", iconKh);
    heartBeat("herfType12", iconFhcx);
    heartBeat("herfType13", iconYxzl);
    heartBeat("herfType14", iconXgzd);
    heartBeat("herfType15", iconTft);
    heartBeat("herfType16", icon101);
    heartBeat("herfType17", iconYz);
    heartBeat("herfType18", iconWxbd);
  }
  mGamefuncNav.onmouseout = function (e) {
    function heartBeatRemove(tapClass, tapNav) {
      if (e.target.className.includes(tapClass)) {
        tapNav.classList.remove('animate__animated', 'animate__heartBeat');
      }
    }
    heartBeatRemove("herfType11", iconKh);
    heartBeatRemove("herfType12", iconFhcx);
    heartBeatRemove("herfType13", iconYxzl);
    heartBeatRemove("herfType14", iconXgzd);
    heartBeatRemove("herfType15", iconTft);
    heartBeatRemove("herfType16", icon101);
    heartBeatRemove("herfType17", iconYz);
    heartBeatRemove("herfType18", iconWxbd);
  }




  // 移入出视频效果
  let mNewSkinOne = document.querySelector(".m-new-skin-one");
  let mMoreSkin = document.querySelector(".m-more-skin");
  let innerhoverOut = document.querySelector(".innerhover-out");
  mMoreSkin.onmouseover = function () {
    mMoreSkin.classList.add("show");
    innerhoverOut.classList.add("showout");
  }
  innerhoverOut.onmouseover = function () {
    mMoreSkin.classList.add("show");
  }
  mMoreSkin.onmouseleave = function () {
    mMoreSkin.classList.remove("show");
    innerhoverOut.classList.remove("showout");
  }
  innerhoverOut.onmouseleave = function () {
    mMoreSkin.classList.remove("show");
  }

  mNewSkinOne.onmouseover = function () {
    innerhoverOut.classList.add("showout");
  }
  mNewSkinOne.onmouseout = function () {
    innerhoverOut.classList.remove("showout");
  }



  // 视屏区
  let partTabTitleLiList3 = document.querySelectorAll(".video-part-tab-title");
  // console.log(partTabTitleLiList3);


  let freshVideoContent = document.querySelectorAll(".fresh-video-content");
  // console.log(freshVideoContent);

  const changeTab3 = function changeTab3(index) {
    for (let i = 0; i < partTabTitleLiList3.length; i++) {
      partTabTitleLiList3[i].classList.remove('selected');
      freshVideoContent[i].classList.remove('selected');
    }
    partTabTitleLiList3[index].classList.add('selected');
    freshVideoContent[index].classList.add('selected');
  }
  for (let i = 0; i < freshVideoContent.length; i++) {
    let item = partTabTitleLiList3[i];
    item.index = i;
    item.onmousemove = function () {
      changeTab3(this.index);
    }
  }


  let heroList = document.getElementById("heroList");
  let heroPartTabTitleLi = document.querySelectorAll(".hero-part-tab-title-li");
  axios.get('./data.json')
    .then((response) => {
      return response.data
    })
    .then((value) => {
      console.log(value);
      render(value);
    })
    .catch((err) => {
      console.log(err)
    });
  function render(data) {
    // for(let i=0;i<heroPartTabTitleLi.length;i++){
    //   heroPartTabTitleLi[i].onclick=function(){

    //   }
    // }
    let dataTank = [];
    data[0].hero.forEach(ele => {

      dataTank.push(ele);
      let strHero = "";
      dataTank.forEach(item => {
        let { dataTags, img, alt, a } = item;
        strHero += `<li class="champion-item" data-tags=${dataTags} >
      <img src=${img} width="66" height="66" alt=${alt}>
      <i class="hover-icon"></i>
      <p>${alt}</p>
      <a target="_blank"
        href=${a}
        class="herf-mask" title="${alt}"></a>
        </li>`;
      });
      heroList.innerHTML = strHero;

    });
  }

})()     
