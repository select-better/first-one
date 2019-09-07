<?php

require 'conn.php';

// 验证一下手机号码有没有存在

if(isset($_POST['tel'])){
	$tel=$_POST['tel'];
	$result=$conn->query("select * from register where tel='$tel'");
    if($result->fetch_assoc()){
		echo  false;
	}else{
		echo  true;
	}
}
