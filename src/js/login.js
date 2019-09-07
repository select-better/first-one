! function ($) {

	let comurl = 'http://10.31.157.66/Html-1907/Day33/src/php/'; //设置一下共有的地址
	// 引入底部
	$('footer .middle').load('../html/index.html  .foot_mok');
	// 开始特效   点击最下面的按钮
	$('.inf_btn').click(function () {
		//   $('.inf_bot span').toggleClass('rot');
		//   $('.inf_bot span').css('transform','rotate(90deg)');
		$('.inf_bot').toggleClass('height_change');
		$('.inf_btn').toggleClass('rot'); //直接加转不动，只有结合hasClss一起
		if ($('.inf_btn').hasClass("rot")) {
			$('.inf_btn').css('transform', 'rotate(90deg)');
		} else {
			$('.inf_btn').css('transform', 'rotate(-90deg)');
		}
	})
	// 上面的点击出现颜色的变化
	$('.code_login a').click(function () {
		$(this).css('color', '#e3101e');
		$('.account_login a').css('color', '#5e5e5e');
		$('.first_login').show();
		$('.second_login').hide();
	})
	$('.account_login a').click(function () {
		$(this).css('color', '#e3101e');
		$('.code_login a').css('color', '#5e5e5e');
		$('.first_login').hide();
		$('.second_login').show();
	})
	//  中间二维码，会往右边移动
	$('.code').hover(function(){
		$('.code').stop(true).animate({
			 left :0 
		},function(){
			$('.smp_img').show();
		})
	},function(){
		$('.smp_img').hide();
		$('.code').stop(true).animate({
		      left:74 
		})
	})

	// 当自动登录选上，就将出现提醒
	$('.some_choice').click(function(){
		if($('#con').prop('checked')){
			$('.second_login .warn').show();
		}else{
			$('.second_login .warn').hide();
		}
	})

	// 开始准备连接数据库，进行账户的查看

	// 开始验证手机号码或账号
	 $('.txt input').blur(function(){
         if( $('.txt input').val()===''){
			$('.txt p').html('账号或手机号不能为空');
			$('.txt p').css('color', '#ff4c4c');
		 }else{
            $.ajax({
				type:'get',
				data:{
					checkname:$('.txt input').val()
				},
				url:comurl+'login_name.php',
				success:function(d){
                     if(d==1){
						$('.txt p').html('账号或手机号正确');
			            $('.txt p').css('color', 'green');
					 }
					 else{
						$('.txt p').html('账号或手机号不正确，请重新输入');
			            $('.txt p').css('color', '#ff4c4c');
					 }
				}
			})
		 }
	 })

	//  开始验证密码
	$('.pass input').blur(function(){
		if( $('.pass input').val()===''){
		   $('.pass p').html('密码不能为空');
		   $('.pass p').css('color', '#ff4c4c');
		}else{
		   $.ajax({
			   type:'post',
			   data:{
				   checkname:$('.txt input').val(),
				   pass:$('.pass input').val()
			   },
			   url:comurl+'login_check.php',
			   success:function(d){
				   console.log(d)
					if(d==1){
					   $('.pass p').html('密码输入正确');
					   $('.pass p').css('color', 'green');
					}
					else{
					   $('.pass p').html('密码不正确，请重新输入');
					   $('.pass p').css('color', '#ff4c4c');
					}
			   }
		   })
		}
	})

	// 最后判断 是不是正确，正确跳转页面
    $('.go_index').click(function(){
		if( $('.pass input').val()===''){
			$('.pass p').html('密码不能为空');
			$('.pass p').css('color', '#ff4c4c');
			$('.pass input')[0].focus();
		}
		if( $('.txt input').val()===''){
			$('.txt p').html('账号或手机号不能为空');
			$('.txt p').css('color', '#ff4c4c');
			$('.txt input')[0].focus();
		 }
		 
		if( $('.pass p').html()==='密码输入正确'&& $('.txt p').html()==='账号或手机号正确'){
			addcookie('username',$('.txt input').val(),15);
			location.href='../html/index.html';
		}
	})
	
}(jQuery)