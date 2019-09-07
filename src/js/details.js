! function ($) {

	$('header .detail_top').load('../html/index.html header .toper');
	$('header .detail_home').load('../html/index.html header .home_top');
	$('header .detail_search').load('../html/index.html header .shop_research', function () {
		let attr = ["套购得好礼", "三星S10", "华为P30", "荣耀20vivo", "X27荣耀9X"]; //  得加在回调函数里面
		let $strhtml = ''
		$.each(attr, function (index) {
			$strhtml += `<a href=javascript:;>${attr[index]}</a>`
		})
		$('.shop_research .some_products').html($strhtml);
		//  看开始有没有cookie   ,写在回调函数里面出现0的概率更小
		let numarr = [];
		let sumnum=0;
		let name=null;
		if (searchcookie('numarr')) {
			numarr = searchcookie('numarr').split(',');
			$.each(numarr, function (index, value) {
				sumnum += parseInt(value);
			})

			$('.cart_show i').html(sumnum);
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
	});






	//设置二维码的上下移动     写得有点复杂，可能有简单的


	$('footer').load('../html/index.html footer');
	//  引入底部
}(jQuery)


$(document).ready(function () {
	//数据传送
	let mainurl = 'http://10.31.157.66/Html-1907/Day33/src/php/';

	let $sid = location.search.substring(1).split('=')[1];
	let str = ''

	$.ajax({
		data: {
			sid: $sid
		},
		url: mainurl + 'sid_data.php',
		dataType: 'json',
		success: function (s) {
			let $strhtml = '';
			let $str = $('.details .container').clone(true);

			let $urls = s.suburls.split(',');

			// 填入数据后更改
			$str.find('.spic').attr('src', $urls[0]);

			$str.find('.bpic').attr('src', $urls[0]);

			$.each($urls, function (index, value) {
				$strhtml += `<li><img src="${value}" alt=""></li>` // 补充一下图片
			})
			$str.find('.piclist_mid ul').html($strhtml); //下面的几张图
			$str.find('.phone_text h3').html(s.subtitle); // 添加标题
			$str.find('.price_num').html(s.price); //价格
			$str.css('display', 'block');
			// $str.attr('sid',s.sid);
			$str.find('.choice>i').attr('sid', s.sid);
			$('.details').append($str);
			//  点击加减出现加减
			$('.shop_num .reduce').css({
				cursor: 'not-allowed'
			});
			// 设置标准值 
			let isnum = 0
			$('.shop_num input').focus(function () {
				isnum = $(this).val();
			})

			$('.shop_num input').blur(function () {

				var num = $(this).val();
				if (num < 1 || num > 99) {
					alert('不在范围');
					$(this).val(isnum)
				} else if (num == 1) {
					$(this).val(num);
					$('.shop_num .reduce').css({
						color: '#afafaf',
						cursor: 'not-allowed'
					});
				} else {
					$(this).val(num);
					$('.shop_num .reduce').css({
						color: '#333',
						cursor: 'pointer'
					});
				}
			})


			$('.shop_num .add').click(function () {

				// var num = $('.shop_num input').val();
				var num = $(this).siblings('input').val();
				num++;
				$('.shop_num .reduce').css({
					color: '#333',
					cursor: 'pointer'
				});
				$('.shop_num input').val(num);
			})
			$('.shop_num .reduce').click(function () {
				var num = $(this).siblings('input').val();
				num--;
				if (num <= 1) {
					$('.shop_num .reduce').css({
						color: '#afafaf',
						cursor: 'not-allowed'
					});
					num = 1;
				}
				$('.shop_num input').val(num);
			})
			//  下面图片鼠标移入的时候，大方和小方的图片都会改变

			$('.piclist_mid li img:visible').first().css('border-color', '#fe0e34');
			$('.piclist_mid li').on('mouseover', function () {
				//不能直接委托给img 需要给li 还有就是取src得注意，得用attr
				$(this).children('img').css('border-color', '#fe0e34');
				$(this).siblings().children('img').css('border-color', '#ffffff');
				$('.spic').attr('src', $(this).children('img').attr('src'));
				$('.bpic').attr('src', $(this).children('img').attr('src'));
			})

			// 下面的左右移动
			if ($('.piclist_mid li').length > 5) {
				$('.right').css('color', '#333');
			}
			let len = $('.piclist_mid li').length;
			let wid = $('.piclist_mid li').eq(0).outerWidth();
			$('.piclist_mid ul').css('width', len * wid + 'px');

			let movenum = 0;
			$('.right').click(function () {
				movenum++;
				if (len > 5) {
					$('.left').css('color', '#333');
				}
				if (movenum >= len - 5) {
					movenum = len - 5;
					$('.right').css('color', '#afafaf');
				}
				$('.piclist_mid ul').animate({
					left: -movenum * wid
				});
			})
			$('.left').click(function () {
				movenum--;
				if (len > 5) {
					$('.right').css('color', '#333');
				}
				if (movenum <= 0) {
					movenum = 0;
					$('.left').css('color', '#afafaf');
				}
				$('.piclist_mid ul').animate({
					left: -movenum * wid
				});
			})

			// 渲染大方小方
			// 小方的宽高和图片大小有关
			$('.s_box').hover(function (e) {
				// 显示
				$('.sf').css({
					visibility: 'visible',

				});
				$('.bf').show();

				$('.sf').css({
					width: $('.bf').innerWidth() * $('.s_box').innerWidth() / $('.o_box:visible').find('.bpic').width(),
					height: $('.bf').innerHeight() * $('.s_box').innerHeight() / $('.o_box:visible').find('.bpic').height()
				})

				let wid = $('.o_box:visible').offset().left + 1;
				let ht = $('.o_box:visible').offset().top + 1;


				$(document).on('mousemove', function (e) {
					let w = e.pageX - wid - $('.sf').width() / 2;
					let h = e.pageY - ht - $('.sf').height() / 2;
					let bili = $('.o_box:visible').find('.bf').width() / $('.sf').width();

					if (w <= 0) {
						w = 0
					} else if (w >= $('.s_box:visible').innerWidth() - $('.sf').width()) {
						w = $('.s_box:visible').innerWidth() - $('.sf').width()
					}
					if (h <= 0) {
						h = 0
					} else if (h >= $('.s_box:visible').innerHeight() - $('.sf').height()) {
						h = $('.s_box:visible').innerHeight() - $('.sf').height()
					}
					$('.sf').css({
						left: w,
						top: h,
					})
					$('.bpic').css({
						left: -w * bili,
						top: -h * bili,
					})
				})
			}, function () {
				$('.sf').css({
					visibility: 'hidden',
				});
				$('.bf').hide();
			})

			//对数据库进行操作
			let sidarr = [];
			let numarr = [];
			let statusarr = [];
			let sumnum = 0;
			let newsid=0;
			//当前的sid
			newsid = $('.choice:visible').find('i').attr('sid');

			if (searchcookie('sidarr') && searchcookie('numarr')) {
				sidarr = searchcookie('sidarr').split(',');
				numarr = searchcookie('numarr').split(',');
				statusarr = searchcookie('statusarr').split(',');
			}

			$('.choice:visible').find('i').click(function () {
				// $('.cart_show i').html(sumnum);
				 alert('加入了购物车');
				$('.shop_num input:visible').val(1);
				$('.shop_num .reduce').css({
					color: '#afafaf',
					cursor: 'not-allowed'
				}); //得到元素后恢复初始状态
				if (sidarr.indexOf(newsid) === -1) {
					sidarr.push(newsid);
					numarr.push($('.shop_num input').val());
					statusarr.push(1); //状态码是1
				} else {
					let op = sidarr.indexOf(newsid);
					numarr[op] = parseInt(numarr[op]) + parseInt($('.shop_num input').val());
				}
				addcookie('sidarr', sidarr, 15);
				addcookie('numarr', numarr, 15);
				addcookie('statusarr', statusarr, 15);
				sumnum=0;
				$.each(numarr, function (index, value) {
					sumnum += parseInt(value);
				})

				$('.cart_show i').html(sumnum);

			})

		

			//必须写在下面 ，写在上面找不到元素
			//还得是可见 不能是看不见的
			$('.tel_buy:visible').hover(function () {
				if ($('.tel_buy:visible p').offset().top + $('.tel_buy:visible p').outerHeight() + $('.tel_buy:visible div').height() > $(document).scrollTop() + document.documentElement.clientHeight) {
					$('.tel_buy:visible div').show();
					$('.tel_buy:visible div').css({
						top: -$('.tel_buy:visible div').outerHeight() + 1,
						borderTop: '1px solid #afafaf',
						borderBottom: 0
					});
				} else {
					$('.tel_buy:visible div').show();
					$('.tel_buy:visible div').css({
						top: $('.tel_buy:visible p').outerHeight() - 1,
						borderTop: 0,
						borderBottom: '1px solid #afafaf'
					});
				}
			}, function () {

			})


		}


	})




})