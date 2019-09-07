! function ($) {
	$('header').load('../html/index.html .home_top',function(){
		let name=null;    //前后的登录注册
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

	$('footer .middle').load('../html/index.html  footer .foot_mok');






}(jQuery)


$(document).ready(function () {
	let mainurl = 'http://10.31.157.66/Html-1907/Day33/src/php/';
	//若纯在cookie，应该显示
	let sidarr = [];
	let numarr = [];
	let statusarr = []; //记录状态
	if (searchcookie('sidarr')) {
		sidarr = searchcookie('sidarr').split(',');
		numarr = searchcookie('numarr').split(',');
		statusarr = searchcookie('statusarr').split(',');

		$('.no_deal').hide(); //页面的切换
		$('.cart').show();
	} else {
		$('.no_deal').show();
		$('.cart').hide();
	}

	$.ajax({
		data: {
			mp: sidarr
		},
		url: mainurl + 'get_arr.php',
		dataType: 'json',
		success: function (d) {
			function change(str, num) {
				str = str.substring(0, num);
				str += "...";
				return str
			}

			//得到数据后开始渲染
			$.each(d, function (index, value) {
				var $strhtml = $('.part_all:hidden').clone(true);
				$strhtml.css('display', 'block');
				$strhtml.attr('sid', value.sid);
				$strhtml.find('.part_img img').attr('src', value.url);
				$strhtml.find('.part_title p').attr('title', value.subtitle);
				$strhtml.find('.part_title a').html(change(value.subtitle, 30));
				$strhtml.find('.part_title a').attr('href', '../html/details.html?sid=' + value.sid);
				$strhtml.find('.part_price em').html(value.price);
				$strhtml.find('.number').val(numarr[index]);
				if (statusarr[index] == 1) {
					console.log(1)
					$strhtml.find('input[type=checkbox]').prop('checked', true);
					console.log($strhtml.find('input[type=checkbox]'))
					$strhtml.find('input[type=checkbox]').parent('b').addClass('want'); //判断是不是1，加上属性和颜色
				} else {
					$strhtml.find('input[type=checkbox]').attr('checked', false);
				}
				if (index !== 0) {
					$strhtml.css('border-top', '1px solid #afafaf'); //下面的会有上面的边框
				}
				//    $strhtml.find('.part_subsum em').html((numarr[index]*value.price).toFixed(2));
				$('.cart_mid').append($strhtml);
			})
			// 如果全部是是checked，那就全选也加上
			if ($('input[type=checkbox]:visible').not($('.all_select')).length === $('input[type=checkbox]:visible:checked').not($('.all_select')).length) {
				$('.all_select').prop('checked', true).parent('b').addClass('want');
			}

			// 底栏的数据计算总价格和总数量

			function sum() {
				var sum = 0;
				var sm = 0;
				var mp = 0; //计算右侧的中间值
				var initnum = 0; //初始值
				let $arr = $('input[type=checkbox]:visible:checked').not($('.all_select')); //计算的没有隐藏的

				$arr.each(function (index, e) {
					sum += +$(e).parents('.part_all').find('.number').val();
					//initnum 是每个商品的单价
					initnum = $(e).parents('.part_all').find('.part_price em').html();
					//mp 就是每种商品的总价格
					mp = initnum * $(e).parents('.part_all').find('.number').val();
					$(e).parents('.part_all').find('.part_subsum em').html(mp.toFixed(2));
					sm += +mp;
				})
				sm = sm.toFixed(2);
				$('.select_all_num').html(sum);
				$('.sum_money em').html(sm);

			}
			sum(); //计算总数量和总价格

			//中间盒子的点击
			function checkbox(obj) {
				var index = 0;
				if (obj.prop('checked')) {
					obj.parent('b').addClass('want');
					// 因为 前后两个是有两个的 所以需要对两个进行比较
					if ($('input[type=checkbox]:visible').not($('.all_select')).length === $('input[type=checkbox]:visible:checked').not($('.all_select')).length) {
						$('.all_select').prop('checked', true).parent('b').addClass('want');
					}
					$('.go_sum').css('background', '#e71f4e'); //颜色变化

					index = sidarr.indexOf(obj.parents('.part_all').attr('sid'))
					statusarr[index] = 1;
				} else {
					obj.parent('b').removeClass('want');
					$('.all_select').prop('checked', false).parent('b').removeClass('want');
					if ($('input[type=checkbox]:visible:checked').length === 0) {
						$('.go_sum').css('background', '#afafaf');
					}
					index = sidarr.indexOf(obj.parents('.part_all').attr('sid'))
					statusarr[index] = 0;
				}
				addcookie('statusarr', statusarr, 15); //还得储存  ,但还需要结合我们的sid 后面sid也应该储存
			}
			//点击后 第一个和最后一个的状态是一样的
			// 这算是其他的点击 ，但因为这个 和后面是有重叠的 所以判断比较简单
			$('input[type=checkbox]:visible').not($('.all_select')).click(function () {
				checkbox($(this));
				sum();
			})



			// 第一个点击 剩下的也会发生变化,最后一个点击 剩下的也会发生变化 和第一个一样
			// 最后一个点击 剩下的也会发生变化 和第一个一样
			$('.all_select').click(function () {
				if ($(this).prop('checked')) {
					$(this).parent('b').addClass('want');
					$('input[type=checkbox]:visible').not($(this)).prop('checked', true).parent('b').addClass('want');
					$('.go_sum').css('background', '#e71f4e');
					$.each(statusarr, function (i) {
						statusarr[i] = 1;
					})
				} else {
					$('input[type=checkbox]:visible').not($(this)).prop('checked', false).parent('b').removeClass('want');
					$(this).parent('b').removeClass('want');
					$('.go_sum').css('background', '#afafaf');
					//对于状态的切换
					$.each(statusarr, function (i) {
						statusarr[i] = 0;
					})
				}
				sum();
				addcookie('statusarr', statusarr, 15); //还得储存
			})


			// 加减左右鼠标的点击事件
			//   右边数据为1颜色会不一样
			$('.part_num:visible .number').each(function (i, e) {

				if ($(e).val() == 1) {
					$(e).siblings('.reduce').css({
						color: "#afafaf",
						cursor: 'auto'
					})
				} else {
					$(e).siblings('.reduce').css({
						color: "#333",
						cursor: 'pointer'
					})
				}
			})
			//   右边点击

			$('.part_num .add').click(function () {
				var num = $(this).siblings('.number').val();
				num++;
				// 将reduce也变一下
				$('.part_num .reduce').css({
					color: "#333",
					cursor: 'pointer'
				})
				if (num > 99) {
					alert('限购99台');
					num = 99
				}
				var index = sidarr.indexOf($(this).parents('.part_all').attr('sid'))
				// 点击就得是checked 不然sum不好计算
				if ($(this).parents('.part_all').find('input[type=checkbox]').prop('checked') === false && num != 99) {
					$(this).parents('.part_all').find('input[type=checkbox]').prop('checked', true).parent('b').addClass('want');
					// 还得判断全选是不是合适
					if ($('input[type=checkbox]:visible').not($('.all_select')).length === $('input[type=checkbox]:visible:checked').not($('.all_select')).length) {
						$('.all_select').prop('checked', true).parent('b').addClass('want');
					}

					// 状态改变了，所以 status也要加

					statusarr[index] = 1;
				}

				// 重新赋值
				$(this).siblings('.number').val(num);
				// 也得给cookie里面的numarr进行更新

				numarr[index] = num;
				addcookie('numarr', numarr, 15);
				addcookie('statusarr', statusarr, 15);
				sum();
			})
			// 左侧点击
			$('.part_num .reduce').click(function () {
				var num = $(this).siblings('.number').val();
				num--;
				// 将reduce也变一下
				if (num <= 1) {
					$('.part_num .reduce').css({
						color: "#afafaf",
						cursor: 'auto'
					});
					num = 1;
				}
				var index = sidarr.indexOf($(this).parents('.part_all').attr('sid'));
				// 点击就得是checked 不然sum不好计算
				if ($(this).parents('.part_all').find('input[type=checkbox]').prop('checked') === false && num !== 1) {
					$(this).parents('.part_all').find('input[type=checkbox]').prop('checked', true).parent('b').addClass('want');
					// 还得判断全选是不是合适
					if ($('input[type=checkbox]:visible').not($('.all_select')).length === $('input[type=checkbox]:visible:checked').not($('.all_select')).length) {
						$('.all_select').prop('checked', true).parent('b').addClass('want');
					}
					statusarr[index] = 1;
				}

				$(this).siblings('.number').val(num);
				// 也得存cookie里面的numarr


				numarr[index] = num;
				addcookie('numarr', numarr, 15);
				addcookie('statusarr', statusarr, 15);
				sum();
			})

			//  失去焦点也能计算
			let mpnum = 0;
			$('.part_num .number').focus(function () {
				mpnum = $(this).val();
			})
			$('.part_num .number').blur(function () {

				var num = $(this).val();

				// 将reduce也变一下
				if (num <= 0) {
					alert('数量不能小于0');
					num = mpnum;
				}
				if (num == 1) {
					$('.part_num .reduce').css({
						color: "#afafaf",
						cursor: 'auto'
					});
				}
				if (num > 1) {
					$(this).siblings('.reduce').css({
						color: "#333",
						cursor: 'pointer'
					});
				}
				if (num >= 100) {
					alert('限购99台');
					num = mpnum;
				}
				if (isNaN(num)) {
					alert('请输入数字');
					num = mpnum;
				}
				var index = sidarr.indexOf($(this).parents('.part_all').attr('sid'));
				// 点击就得是checked 不然sum不好计算
				if ($(this).parents('.part_all').find('input[type=checkbox]').prop('checked') === false && mpnum != num) {
					$(this).parents('.part_all').find('input[type=checkbox]').prop('checked', true).parent('b').addClass('want');
					// 还得判断全选是不是合适
					if ($('input[type=checkbox]:visible').not($('.all_select')).length === $('input[type=checkbox]:visible:checked').not($('.all_select')).length) {
						$('.all_select').prop('checked', true).parent('b').addClass('want');
					}
					statusarr[index] = 1;
				}

				$(this).val(num);
				// 也得存cookie里面的numarr
				numarr[index] = num;
				addcookie('numarr', numarr, 15);
				addcookie('statusarr', statusarr, 15);
				sum();
			})

			function position() {
				$('.screen').show();
				$('.screen_box').css({
					top: (document.documentElement.clientHeight - $('.screen_box').outerHeight()) / 2,
					left: (document.documentElement.clientWidth - $('.screen_box').outerWidth()) / 2,
				})

				$(window).on('resize', function () {
					$('.screen_box').css({
						top: (document.documentElement.clientHeight - $('.screen_box').outerHeight()) / 2,
						left: (document.documentElement.clientWidth - $('.screen_box').outerWidth()) / 2,
					})
				})
				$('.close_box').on('click', function () {
					$('.screen').hide();
				})
				$('.screen_select .cancel').on('click', function () {
					$('.screen').hide();
				})

			}

			//下面全选的点删除
			$('.checked_del').click(function () {

				if ($('input[type=checkbox]:visible:checked').length === 0) {
					position();
					$('.no_chice_select').show().siblings('div').hide();

				} else {
					position();
					$('.select_del').show().siblings('div').hide();

					$('.confirm_true').click(function () {
						let $arr = $('input[type=checkbox]:visible:checked').not($('.all_select'));
						$arr.each(function (index, value) {
							$(value).parents('.part_all').hide();
							var index = sidarr.indexOf($(value).parents('.part_all').attr('sid'));
							sidarr.splice(index, 1);
							numarr.splice(index, 1);
							statusarr.splice(index, 1);
						})
						addcookie('sidarr', sidarr, 15);
						addcookie('numarr', numarr, 15);
						addcookie('statusarr', statusarr, 15);
						$('.screen').hide();
						location.reload();
					})

				}


			})
			// 右侧的点击删除

			$('.part_del  strong').click(function () {
					position();
					$('.single_del').show().siblings('div').hide();
					var index = sidarr.indexOf($(this).parents('.part_all').attr('sid'));

					var $str = $(this).parents('.part_all')
					$('.del_true').click(function () {
						sidarr.splice(index, 1);
						numarr.splice(index, 1);
						statusarr.splice(index, 1);
						$str.hide();
						addcookie('sidarr', sidarr, 15);
						addcookie('numarr', numarr, 15);
						addcookie('statusarr', statusarr, 15);
						$('.screen').hide();
						location.reload();
					})

				})

				// 下拉的框
				// 对于购物的总结来说能随着窗口变化位置

				! function ($) {
					let m = $('.cart_bot').offset().top; //必须先存储起来
					// 也可以在外面判断
					if (m + $('.cart_bot').height() > document.documentElement.clientHeight + $(document).scrollTop()) {

						$('.cart_bot').css({
							position: 'fixed',
							bottom: 0,
							left: 0
						})
					} else {
						$('.cart_bot').css("position", "relative");
					}
					$(document).on('scroll', function () {
						if (m + $('.cart_bot').height() > document.documentElement.clientHeight + $(document).scrollTop()) {

							$('.cart_bot').css({
								position: 'fixed',
								bottom: 0,
								left: 0
							})
						} else {
							$('.cart_bot').css("position", "relative");
						}
					})
					$(window).on('resize', function () {
						if (m + $('.cart_bot').height() > document.documentElement.clientHeight + $(document).scrollTop()) {

							$('.cart_bot').css({
								position: 'fixed',
								bottom: 0,
								left: 0
							})
						} else {
							$('.cart_bot').css("position", "relative");
						}
					})
				}(jQuery)




		}
	})

})