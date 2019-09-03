!function ($) {
   $('.toper span').on('click', function () {
      $('.toper').hide();
   });

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
         this.timer=setInterval(function(){
             _this.up();
         },3000)
         // 上去之后停止计时器
         this.$nav.hover(function(){
            clearInterval(_this.timer);
         },function(){
            _this.timer=setInterval(function(){
               _this.up();
           },3000)
         })
      }
      up() {
         let _this = this;
         this.$index++;
         this.$ul.stop(true).animate(
            {
               top: -(this.$index + 1) * this.$height
            }, function () {
               _this.change();
            }
         )
      }
      down() {
         let _this = this;
         this.$index--;
         this.$ul.stop(true).animate(
            {
               top: -(this.$index + 1) * this.$height
            }, function () {
               _this.change();
            }
         )
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
   new UpLunBo().init();    //往上翻转的小轮播图

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
         this.timer=null;
      }
      init() {
         let _this = this;
 
         // 开始就显示
         this.$aLi.eq(this.index).css('background', '#f5004b');
         this.$picLi.each(function(index){
              $(this).css('background','rgb(' + _this.arr[index] + ')')
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
         this.timer=setInterval(function(){
               _this.rightmove();
         },3000)

         // 清除定时器和重开定时器
         this.$picLi.hover(function(){
            clearInterval(_this.timer)
         },function(){
            _this.timer=setInterval(function(){
               _this.rightmove();
         },3000)
         })
         // 因为左右的span不在li里面，所以需要重新加
         this.$right.hover(function(){
            clearInterval(_this.timer)
         },function(){
            _this.timer=setInterval(function(){
               _this.rightmove();
         },3000)
         })
         this.$left.hover(function(){
            clearInterval(_this.timer)
         },function(){
            _this.timer=setInterval(function(){
               _this.rightmove();
         },3000)
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
      leftmove(){
         this.index--;
         if (this.index < 0) {
            this.index = this.$aLi.length - 1
         }
         this.switch();
      }
      switch() {
         let _this=this;
         this.$picLi.eq(this.index).css({ zIndex: 1, }).stop(true).animate({ opacity: 1 }).siblings().css('z-index', 0).stop(true).animate({ opacity: 0 });
         this.$aLi.eq(this.index).css('background', '#f5004b').siblings().css('background', 'rgba(0, 0, 0, 0.6)');
      }
   }
   new BigLunBo().init();


   // 定时器
   class Timer{
        constructor(){
           this.ai=$('.time_box i' );

        }
        init(){
           console.log(1)
            this.d=new Date();
            this.d.setDate(this.d.getDate()+20);
            console.log(this.d)
        }

   }
   new Timer().init();
}(jQuery)