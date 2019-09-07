! function ($) {

	$('.protocol_btn .agree_us').on('click', function () {
		$('.flow_box').css('display', 'none');
	})
	/*引入底部 */

	$('footer .container').load('../html/index.html  .foot_mok');

	/*手机号验证*/
	! function ($) {
		/*第一个验证 */
		let comurl = 'http://10.31.157.66/Html-1907/Day33/src/php/'; //设置一下共有的地址
		// 手机号码的验证---------------------------------
		$('.get_tel').focus(function () {
			$('.about_tel p').html('请输入正确的手机号码');
			$('.about_tel p').css('color', '#888');
		})
		$('.get_tel').blur(function () {
			let numcheck = /^1[3,5,7,8]\d{9}$/g;
			if ($('.get_tel').val() === '') {
				$('.about_tel p').html('手机号码不能为空');
				$('.about_tel p').css('color', '#ff4c4c');
			} else if (numcheck.test($('.get_tel').val())) {
				$.ajax({
					type: 'post',
					data: {
						tel: $('.get_tel').val()
					},
					url: comurl + 'register_tel.php',
					success: function (d) { //传送过来 1的话就是没有
						if (d==1) {
							$('.about_tel p').html('手机号码正确');
							$('.about_tel p').css('color', 'green');
						} else {
							$('.about_tel p').html('手机号码已经被注册，请重新输入');
							$('.about_tel p').css('color', '#ff4c4c');
						}
					}
				})
			} else if (numcheck.test($('.get_tel').val()) == false) {
				$('.about_tel p').html('手机号码输入有误');
				$('.about_tel p').css('color', '#ff4c4c');
			}
		})
		// 验证码验证-------------------------
		$('.yzm input').focus(function () {
			$('.yzm p').html('请输入下方验证码');
			$('.yzm p').css('color', '#888');
		})
		$('.yzm input').blur(function () {
			if ($('.yzm input').val() === '') {
				$('.yzm p').html('验证码不能为空');
				$('.yzm p').css('color', '#ff4c4c');
			} else if ($('.yzm input').val().toLowerCase() === $('.create_yzm span').html().toLowerCase()) {
				$('.yzm p').html('验证码正确');
				$('.yzm p').css('color', 'green');
			} else if ($('.yzm input').val().toLowerCase() !== $('.create_yzm span').html().toLowerCase()) {
				$('.yzm p').html('验证码输入有误');
				$('.yzm p').css('color', '#ff4c4c');
			}
		})
		//验证码 的生成
		$('.create_yzm span').html(createyzm());
		$('.create_yzm i').on('click', function () {
			$('.create_yzm span').html(createyzm());
			$('.yzm input')[0].focus();
			$('.yzm input').val(''); //重置验证码
		})

		function createyzm() {
			let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			for (var i = 65; i <= 90; i++) {
				arr.push(String.fromCharCode(i));
			}
			let str = '';
			let len = arr.length;
			for (var i = 1; i <= 4; i++) {
				var k = arr[Math.round(Math.random() * len - 1)];
				if (/\d/g.test(k)) {
					str += k
				} else {
					str += Math.random() >= 0.5 ? k : k.toLowerCase()
				}
			}
			return str
		}
		// 第一次按钮验证，看手机号码和验证是不是都正确---------------------------
		$('.next_step_one').on('click', function () {
			if ($('.yzm input').val() === '') {
				$('.yzm p').html('验证码不能为空');
				$('.yzm p').css('color', '#ff4c4c');
				$('.yzm input')[0].focus();
			}
			if ($('.get_tel').val() === '') {
				$('.about_tel p').html('手机号码不能为空');
				$('.about_tel p').css('color', '#ff4c4c');
				$('.get_tel')[0].focus();
			}

			if ($('.yzm p').text() === '验证码正确' && $('.about_tel p').text() === '手机号码正确') {
				$('.step_two').addClass('active');
				$('.step_two span').css('border-color', '#ff4c4c');
				$('.stepline_1').css('background', '#ff4c4c');
				$('.tel_register').hide();
				$('.name_register').show();
			}
		})
		// 第二个页面进行验证
		// 账号的验证---------------------------------
		$('.get_name input').focus(function () {
			$('.get_name p').html('请输入5-12位字母或数字或中文');
			$('.get_name p').css('color', '#888');
		})
		$('.get_name input').blur(function () {
			let namecheck = /^[\w\u4e00-\u9fa5]{5,12}$/;
			if ($('.get_name input').val() === '') {
				$('.get_name p').html('账号不能为空');
				$('.get_name p').css('color', '#ff4c4c');
			} else if (namecheck.test($('.get_name input').val())) {
				$.ajax({
					type: 'post',
					data: {
						name: $('.get_name input').val()
					},
					url: comurl + 'register_name.php',
					success: function (d) { //传送过来 1的话就是没有
						if (d==1) {
							$('.get_name p').html('账号可以使用');
							$('.get_name p').css('color', 'green');
						} else {
							$('.get_name p').html('账号已经被注册，请重新输入');
							$('.get_name p').css('color', '#ff4c4c');
						}
					}
				})
			} else if (namecheck.test($('.get_name input').val()) == false) {
				$('.get_name p').html('账号输入格式有误');
				$('.get_name p').css('color', '#ff4c4c');
			}
		})

		// 密码的验证---------------------------------
		function testpass(val) {
			let num = 0;
			if (/\d+/.test(val)) {
				num++;
			}
			if (/[a-z]+/.test(val)) {
				num++;
			}
			if (/[A-Z]+/.test(val)) {
				num++;
			}
			if (/[\W_]+/.test(val)) {
				num++
			}
			return num;
		}
		let testnum=0;
		//  输入过程中出现 显示
		$('.get_password  input').on('input',function(){
			testnum = testpass($('.get_password  input').val());
			//判断密码的强度
			$('.get_password b').show();
			if(testnum===1){
				 $('.get_password b i').css('background','#ff4c4c');
				 $('.get_password b em').html('弱')
			}
			else if(testnum===2 || testnum===3){	
				$('.get_password b i').css('background','yellow');
				$('.get_password b em').html('中')
			}
			else if(testnum===4){
				$('.get_password b i').css('background','green');
				$('.get_password b em').html('强')
			}
		})
		// 得到和失去焦点
		$('.get_password input').focus(function () {
			$('.get_password p').html('请输入5-12位字符');
			$('.get_password p').css('color', '#888');
		})
		$('.get_password  input').blur(function () {
			let passcheck = /^\S{5,12}$/;
			testnum = testpass($('.get_password  input').val());
			// 判断一下面
			if ($('.get_password  input').val() === '') {
				$('.get_password  p').html('密码不能为空');
				$('.get_password  p').css('color', '#ff4c4c');
			} else if (passcheck.test($('.get_password  input').val())) {
				if (testnum > 1) {
					$('.get_password  p').html('密码可以使用');
					$('.get_password  p').css('color', 'green');
				}else{
					$('.get_password  p').html('密码强度过低，请重新设置');
				    $('.get_password  p').css('color', '#ff4c4c');
				}			
			} else if (passcheck.test($('.get_password  input').val()) == false) {
				$('.get_password  p').html('密码输入格式有误');
				$('.get_password  p').css('color', '#ff4c4c');
			}
		})
	//  密码确认
	$('.sure_password input').focus(function () {
		$('.sure_password p').html('请输入再次确认');
		$('.sure_password p').css('color', '#888');
	})
	$('.sure_password  input').blur(function () {
		// 判断一下密码是不是
		if ($('.sure_password  input').val() === '') {
			$('.sure_password  p').html('密码确认不能为空');
			$('.sure_password  p').css('color', '#ff4c4c');
		} else if ($('.sure_password  input').val()===$('.get_password  input').val()) {		
				$('.sure_password  p').html('密码确认相同');
				$('.sure_password  p').css('color', 'green');	
		} else if ($('.sure_password  input').val()!==$('.get_password  input').val()) {
			$('.sure_password  p').html('密码确认有误，请重新输入');
			$('.sure_password  p').css('color', '#ff4c4c');
		}
	})
	// 结束最后的确认
	$('.next_step_two').on('click', function () {
		if ($('.get_name input').val() === '') {
			$('.get_name p').html('账号不能为空');
			$('.get_name p').css('color', '#ff4c4c');
			$('.get_name input')[0].focus();
		}
		if ($('.get_password input').val() === '') {
			$('.get_password p').html('密码不能为空');
			$('.get_password p').css('color', '#ff4c4c');
			$('.get_password input')[0].focus();
		}
		if ($('.sure_password input').val() === '') {
			$('.sure_password p').html('密码确认不能为空');
			$('.sure_password p').css('color', '#ff4c4c');
			$('.sure_password input')[0].focus();
		}


		if ($('.get_name p').text() === '账号可以使用' && $('.get_password p').text() === '密码可以使用' && $('.sure_password p').text() === '密码确认相同') {
			$('.step_three').addClass('active');
			$('.step_three span').css('border-color', '#ff4c4c');
			$('.stepline_2').css('background', '#ff4c4c');
			// 加一个cookie
			addcookie('username',$('.get_name input').val(),15);
			$('.name_register').hide();
			$('.ok').show();


			$.ajax({
				type:'post',
				url: comurl + 'register_get.php',
				data:{
					tel:$('.get_tel').val(),
					name:$('.get_name input').val(),
					pass:$('.get_password input').val(),
				}
			})

			var timer=null;
			timer=setInterval(function(){
				let num=parseInt($('.ok h4 span').html());
				num--;
                if(num===0){
					clearInterval(timer);
					location.href='../html/index.html';
				}
                $('.ok h4 span').html(num);
			},1000)	
		}	
	})

 

	}(jQuery)



}(jQuery)