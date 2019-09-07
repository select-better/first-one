<?php
require 'conn.php';

if(isset($_GET['checkname'])){
	$check=$_GET['checkname'];
	$result=$conn->query("select * from register where username='$check' or tel='$check'");

	if($result->fetch_assoc()){
		echo true;
	}else{
		echo false;
	}
}