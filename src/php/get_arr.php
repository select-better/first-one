<?php
require 'conn.php';

if(isset($_GET['mp'])){

	$arr=array();
for($i=0;$i<sizeOf($_GET['mp']);$i++){
	$num=$_GET['mp'][$i];
	$result=$conn->query("select * from goodlist where sid='$num'");
	$arr[$i]=$result->fetch_assoc();
}

echo json_encode($arr);

}