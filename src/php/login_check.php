<?php

require 'conn.php';

if(isset($_POST['pass'])&&isset($_POST['checkname'])){
	$pass=$_POST['pass'];
	$name=$_POST['checkname'];
	$result=$conn->query("select * from register where (username='$name' or tel='$name') and password='$pass'");
	if($result->fetch_assoc()){
		echo true;
	}else{
		echo false;
	}
}