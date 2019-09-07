! function ($) {
    //头上的图片
   $('.toper span').on('click', function () {
      $('.toper').hide();
   });
      
    // 看是不是存在cookie  存在名字不
    let numarr=[];
    let sumnum=0;
    let name=null;
    if(searchcookie('numarr')){
       numarr=searchcookie('numarr').split(',');
       $.each(numarr,function(i,e){
            sumnum+=+e;
      })
       $('.cart_show i').html(sumnum);
       $('.aside_shop_top i').html(sumnum);
    }
   if(searchcookie('username')){
      name=searchcookie('username');
      $('.after_login').hide();
      $('.after_register').hide();
      $('.go_out').show();
      $('.welcome').show();
      $('.welcome strong').html(name);
   }
   $('.go_out').click(function(){
      $('.after_login').show();
      $('.after_register').show();
      $('.go_out').hide();
      $('.welcome').hide();
      $('.welcome strong').html('');
      reducecookie('username');
   })
   //右侧hover的时候出现小三角和右侧出来

   //第一个轮播图
   class UpLunBo {
      constructor() {
         this.$nav = $('#nav_right');
         this.$up = $('#nav_right .go_up');
         this.$down = $('#nav_right .go_down');
         this.$ul = $('#nav_right .nav_roll');
         this.$ali = $('#nav_right .nav_roll li');
         this.$len = this.$ali.length;
         this.$height = this.$ali.eq(0).height();
         this.$index = 0;
         this.flag = true; //防止跑的太快，有空白

         this.timer = null; //设置定时器
      }
      init() {
         let _this = this;
         //先左右克隆一个li
         this.$left = this.$ali.eq(this.$len - 1).clone(true);
         this.$right = this.$ali.eq(0).clone(true);
         this.$ul.append(this.$right);
         this.$ul.prepend(this.$left);
         this.$ul.css('top', -this.$height);
         // 向上的按钮
         this.$up.on('click', function () {
            if (_this.flag) {
               _this.up();
               _this.flag = false;
            }
         })
         this.$down.on('click', function () {
            if (_this.flag) {
               _this.down();
               _this.flag = false;
            }
         })
         //开定时器       //先关了，用再开
         this.timer = setInterval(function () {
            _this.up();
         }, 3000)
         // 上去之后停止计时器
         this.$nav.hover(function () {
            clearInterval(_this.timer);
         }, function () {
            _this.timer = setInterval(function () {
               _this.up();
            }, 3000)
         })
      }
      up() {
         let _this = this;
         this.$index++;
         this.$ul.stop(true).animate({
            top: -(this.$index + 1) * this.$height
         }, function () {
            _this.change();
         })
      }
      down() {
         let _this = this;
         this.$index--;
         this.$ul.stop(true).animate({
            top: -(this.$index + 1) * this.$height
         }, function () {
            _this.change();
         })
      }
      change() {
         if (this.$index > this.$len - 1) {
            this.$index = 0;
            this.$ul.css('top', -this.$height);
         }
         if (this.$index < 0) {
            this.$index = this.$len - 1;
            this.$ul.css('top', -this.$height * this.$len);
         }
         this.flag = true;
      }

   }
   new UpLunBo().init(); //往上翻转的小轮播图

   // 大轮播图
   class BigLunBo {
      constructor() {
         this.$banner = $('.banner');
         this.$aLi = $('.move_banner ol li');
         this.$picLi = $('.move_banner ul li');
         this.$right = $('.banner .go_right');
         this.$left = $('.banner .go_left');

         this.len = this.$aLi.length;
         this.index = 0;
         this.arr = ['125, 185, 87', '96, 15, 47', '255, 45, 22', '64, 173, 204', '192, 229, 247', '2, 100, 255', '255, 236, 50', '0, 0, 0'];
         this.timer = null;
      }
      init() {
         let _this = this;

         // 开始就显示
         this.$aLi.eq(this.index).css('background', '#f5004b');
         this.$picLi.each(function (index) {
            $(this).css('background', 'rgb(' + _this.arr[index] + ')')
         })
         //鼠标在下面移动的时候
         this.$aLi.on('mouseover', function () {
            _this.index = $(this).index();
            _this.switch();
         })
         //右边点击
         this.$right.on('click', function () {
            _this.rightmove();
         })
         // 左边点击
         this.$left.on('click', function () {
            _this.leftmove();
         })
         // 设置定时器
         this.timer = setInterval(function () {
            _this.rightmove();
         }, 3000)

         // 清除定时器和重开定时器
         this.$picLi.hover(function () {
            clearInterval(_this.timer)
         }, function () {
            _this.timer = setInterval(function () {
               _this.rightmove();
            }, 3000)
         })
         // 因为左右的span不在li里面，所以需要重新加
         this.$right.hover(function () {
            clearInterval(_this.timer)
         }, function () {
            _this.timer = setInterval(function () {
               _this.rightmove();
            }, 3000)
         })
         this.$left.hover(function () {
            clearInterval(_this.timer)
         }, function () {
            _this.timer = setInterval(function () {
               _this.rightmove();
            }, 3000)
         })
         //因为span也不是
      }
      rightmove() {
         this.index++;
         if (this.index > this.$aLi.length - 1) {
            this.index = 0
         }
         this.switch();
      }
      leftmove() {
         this.index--;
         if (this.index < 0) {
            this.index = this.$aLi.length - 1
         }
         this.switch();
      }
      switch () {
         let _this = this;
         this.$picLi.eq(this.index).css({
            zIndex: 1,
         }).stop(true).animate({
            opacity: 1
         }).siblings().css('z-index', 0).stop(true).animate({
            opacity: 0
         });
         this.$aLi.eq(this.index).css('background', '#f5004b').siblings().css('background', 'rgba(0, 0, 0, 0.6)');
      }
   }
   new BigLunBo().init();


   // 倒计时定时器
   class Timer {
      constructor() {
         this.$aI = $('.time_box i');
         this.timer = null;
      }
      init() {
         let _this = this;
         this.timer = setInterval(function () {
            _this.reduce();
         }, 1000)
      }
      double(m) {
         return m >= 10 ? m : '0' + m;
      }
      reduce() {
         let d = new Date();
         let q = new Date('2019 9 10 14:20:00');

         let mh = parseInt((q - d) / 1000 / 3600);
         let mm = parseInt((q - d) / 1000 / 60 - mh * 60);
         let ms = parseInt((q - d) % 60000 / 1000);

         this.$aI.eq(0).html(this.double(mh));
         this.$aI.eq(1).html(this.double(mm));
         this.$aI.eq(2).html(this.double(ms));
         if (ms > 0) {
            $('.time_box').show(); //有数字才出现 一起出现
         }
         if (mh === 0 && mm === 0 & ms === 0) {
            clearInterval(this.timer);
            $('.time_box').hide();
         }
         if (ms < 0) {
            clearInterval(this.timer);
            $('.time_box').hide();
         }
      }
   }
   new Timer().init();

   // 淘抢购的小轮播

   class SmallLb {
      constructor() {
         this.$oUl = $('.rub_imgs ul');
         this.aLi = $('.rub_imgs ul li');
         this.$left = $('.rub_imgs .left');
         this.$right = $('.rub_imgs .right');
         this.index = 0;
         this.len = this.$oUl.width() / 2
      }
      init() {
         let _this = this;
         this.$right.on('click', function () {
            _this.index++;
            if (_this.index === 2) {
               _this.index = 0;
            };
            _this.$oUl.css('left', -_this.len * _this.index + 'px');
         })
         this.$left.on('click', function () {
            _this.index--;
            if (_this.index === -1) {
               _this.index = 1;
            };
            _this.$oUl.css('left', -_this.len * _this.index + 'px');
         })
      }
   }
   new SmallLb().init()

      // 搜索框的选择
      ! function ($) {
         $('.mid_search .theme ul li').click(function () {
            $('.mid_search  .show_search span').html($(this).html());
            $('.mid_search .theme ul').hide();
         })
         $('.mid_search .search_box .theme').hover(function () {
            $('.mid_search .theme ul').show();
         }, function () {
            $('.mid_search .theme ul').hide();
         })
      }(jQuery)

      // 右侧的边栏设置
      ! function ($) {
         // 需要取消冒泡  并且对于父级都得有选择
         $('.aside_shop').click(function () {
            if ($('.aside_shop_left').position().left === 0) {
               $('.aside_shop_left').animate({
                  left: -239
               });
               $('.aside_shop b').show();
            } else {
               $('.aside_shop_left').animate({
                  left: 0
               });
               $('.aside_shop b').hide();
            }
            return false;
         })

         $('.aside_shop_left em').click(function () {
            $('.aside_shop_left').animate({
               left: -0
            })
            $('.aside_shop b').hide();
         })
         $('.aside').click(function () { //点击下面的名品会消失
            $('.aside_register_left').animate({
               left: 0
            })
            $('.aside_register b').hide();
            return false;
         })
         // 对于下面的名片来说
         $('.aside_register').hover(function () {
            $('.aside_register_left').animate({
               left: -140
            }, 'fast')
            $('.aside_register b').show();
         }, function () {
            $('.aside_register_left').animate({
               left: -140
            })
            $('.aside_register b').show();
         })

         $('.aside_research').on('mouseover', function () {

            $('.aside_register_left').stop(true).animate({
               left: 0
            }, 100)
            $('.aside_register b').hide();
         })
         $('.aside_service').on('mouseover', function () {

            $('.aside_register_left').animate({
               left: 0
            }, 'fast')
            $('.aside_register b').hide();
         })
         $('.aside_gotop').on('mouseover', function () {

            $('.aside_register_left').animate({
               left: 0
            }, 'fast')
            $('.aside_register b').hide();
         })




         $('body').click(function () {
            $('.aside_shop_left').animate({
               left: 0
            })
            $('.aside_shop b').hide();

            $('.aside_register_left').animate({
               left: 0
            })
            $('.aside_register b').hide();
         })


         // 回到上面
         $(document).on('scroll', function () {

            if ($(this).scrollTop() >= 270) {
               $('.aside_gotop').show();
            } else {
               $('.aside_gotop').hide();
            }
         })
         $('.aside_gotop').on('click', function () {
            $('html').animate({
               scrollTop: 0
            });
         })
      }(jQuery)

      // 下来出现的搜索框       浮动的搜索框
      ! function () {
         let $srthtml = $('.nav_left').clone(true);
         $('.float_menu').html($srthtml);
         $('.float_menu .nav_box').css('display', 'none');


         $('.float_menu .nav_box').css('top', 40);
         let $srthtml2 = $('.search_box').clone(true);
         $('.float_search').html($srthtml2);
         $('.float_search .show_search').css('background', '#fff');
         $('.float_search .show_search span').css('margin-left', '10px');

         $('.float_search button').css({
            float: 'left',
         });
         //  时间,碰到后出现

         $('.float_window .nav_left').hover(
            function () {
               $('.float_window .nav_box').show();
            },
            function () {
               $('.float_window .nav_box').hide();
            })

         $('.float_search .theme').hover(function () {
            $('.float_search .theme ul').show();
         }, function () {
            $('.float_search .theme ul').hide();
         })
         $('.float_search .theme ul li').click(function () {
            $('.float_search  .show_search span').html($(this).html());
            $('.float_search .theme ul').hide();
         })
         // 到一定距离后，出现浮动菜单
         $(window).on('scroll', function () {
            if ($(this).scrollTop() > 680) {
               $('.float_window').stop(true).animate({
                  top: 0
               })
            } else {
               $('.float_window').stop(true).animate({
                  top: -50
               })
            }
         })
      }()

      // 侧边栏
      ! function () {
         // 第8层是去最上面
         $('.loucen_8').click(function () {
            $('html').stop(true).animate({
               scrollTop: 0
            });
         })
         // 第九层是去最下面
         $('.loucen_9').click(function () {
            $('html').stop(true).animate({
               scrollTop: $('footer').offset().top + $('footer').outerHeight(true) - document.documentElement.clientHeight
            });
         })
         //第一层按钮
         $('.loucen_1').click(function () {
            $('html').stop(true).animate({
               scrollTop: $('.mobile_connect').offset().top -50
            });
            $(this).css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
            $(this).siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
         })
         //第二层按钮
         $('.loucen_2').click(function () {
            $('html').stop(true).animate({
               scrollTop: $('.computer_digital').offset().top -80
            });
            $(this).css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
            $(this).siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
         })
         //第三层按钮
         $('.loucen_3').click(function () {
            $('html').stop(true).animate({
               scrollTop: $('.household').offset().top - 80
            });
            $(this).css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
            $(this).siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
         })
         //第四层按钮
         $('.loucen_4').click(function () {
            $('html').stop(true).animate({
               scrollTop: $('.bathroom').offset().top - 80
            });
            $(this).css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
            $(this).siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
         })
         //第五层按钮
         $('.loucen_5').click(function () {
            $('html').stop(true).animate({
               scrollTop: $('.gome_supermarket').offset().top - 80
            });
            $(this).css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
            $(this).siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
         })

         //第六层按钮
         $('.loucen_6').click(function () {
            $('html').stop(true).animate({
               scrollTop: $('.house_decoration').offset().top - 80
            });
            $(this).css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
            $(this).siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
         })


         //第7层按钮
         $('.loucen_7').click(function () {
            $('html').stop(true).animate({
               scrollTop: $('.car_accessories').offset().top - 80
            });
            $(this).css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
            $(this).siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
         })
         // 开始是看不见的
         $('.louti').hide();
         // 滚动时间
         let cht=document.documentElement.clientHeight;
         $(window).on('scroll',function(){
              if($(this).scrollTop()>$('.mobile_connect').offset().top-cht+50){
                   $('.louti').show();
                   $('.loucen_1').css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
                   $('.loucen_1').siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
                   if($(this).scrollTop()>$('.computer_digital').offset().top-cht+$('.computer_digital').height()/2){
                     $('.loucen_2').css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
                     $('.loucen_2').siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
                   }
                   if($(this).scrollTop()>$('.household').offset().top-cht+$('.household').height()/2){
                     $('.loucen_3').css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
                     $('.loucen_3').siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
                   }
                   if($(this).scrollTop()>$('.bathroom').offset().top-cht+$('.bathroom').height()/2){
                     $('.loucen_4').css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
                     $('.loucen_4').siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
                   }
                   if($(this).scrollTop()>$('.gome_supermarket').offset().top-cht+$('.gome_supermarket').height()/2){
                     $('.loucen_5').css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
                     $('.loucen_5').siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
                   }
                   if($(this).scrollTop()>$('.house_decoration').offset().top-cht+$('.house_decoration').height()/2){
                     $('.loucen_6').css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
                     $('.loucen_6').siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
                   }
                   if($(this).scrollTop()>$('.car_accessories').offset().top-cht+$('.car_accessories').height()/2){
                     $('.loucen_7').css('color', '#ff0027').children('i').css('border-bottom-color', '#ff0027');
                     $('.loucen_7').siblings().css('color', '#777').children('i').css('border-bottom-color', '#fff');
                   }
              }else{
                     $('.louti').hide();
              }
         })



      }()



}(jQuery)


$(document).ready(function () {
   let mainurl = 'http://10.31.157.66/Html-1907/Day33/src/php/';

   $.ajax({
      type: 'get',
      url: mainurl + 'getdata.php',
      dataType: 'json',
      success: function (d) {
         let allhtml = ''
         $.each(d, function (index, value) {
            allhtml += `
              <li >
						<a href=../html/details.html?sid=${value.sid} title=${value.title}><img src="${value.url}" alt="">
						<h4>${value.title}</h4>
						<p>￥<em>${value.price}</em></p>
						</a>
					</li>
           `
         })

         $('.main_inner').html(allhtml);

         // 渲染手机的动态图-----------------------------
         let movenum = 0;
         let $moveheight = $('.main_inner li').height() * 2;

         $('.mobile_right ol li').on('mouseover', function () {
            $(this).addClass('mobile_dif').siblings().removeClass('mobile_dif');
            movenum = $(this).index();
            $('.main_inner').css('top', -movenum * $moveheight + 'px');
         })

         $('.mobile_right span').on('click', function () {
            movenum++;
            if (movenum > 3) {
               movenum = 0;
            }
            $('.main_inner').css('top', -movenum * $moveheight + 'px');
            $('.mobile_right ol li').eq(movenum).addClass('mobile_dif').siblings().removeClass('mobile_dif');
         })
      }
   })

  


})

// 搜索框的出现  只能写外面 ，写里面会找不到



let m = 0;
let mo = document.querySelector('form input');

function suggest(d) {
   var strhtml = '<ul>';
   $.each(d, function (i, v) {
      strhtml += `<li><a href=' https://search.gome.com.cn/search?question=${v[0]}&searchType=goods&pos=4&sq=aa&search_mode=suggest&reWrite=true&instock=1'>${v[0]}</a></li>`
   })
   strhtml += '</ul>';
   $('#serch_details').html(strhtml);

   $('#serch_details a').click(function () { //点击后将a的值给input
      $('.search_box input').val($(this).html());
   })
   if (mo.value == '') {
      $('#serch_details').html(''); //没有值的时候也设为空，这样就不会留下东西了
   }
}

// input的时候调用 
mo.oninput = function () {
   m++;
   var scr = document.createElement('script');
   scr['src'] = 'https://apis.gome.com.cn/p/suggest?from=headSearch&module=searchSuggest&query=' + this.value + '&jp=true&user=81606078151&callback=suggest&_=1567773901294';
   if (m > 1) {
      $('body').children('script').last().remove(); // 删除先加的 
   }

   if (this.value !== '') { //当空值的时候，就取消
      $('body').append(scr);
   } else {
      $('#serch_details').html('');

   }



}