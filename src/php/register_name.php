<?php
	require 'conn.php';

	if(isset($_POST['name'])){
		$name=$_POST['name'];
		$result=$conn->query("select * from register where username='$name'");
		if($result->fetch_assoc()){
			echo false;
		}else{
			echo true;
		}
	}