<?php

require 'conn.php';

if(isset($_POST['tel'])){
	$tel=$_POST['tel'];
	$name=$_POST['name'];
	$pass=$_POST['pass'];
	$conn->query("insert register values(null,'$tel','$name','$pass',NOW())");
}