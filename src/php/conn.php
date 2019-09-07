<?php
header('content-type:text/html;charset=utf-8');

define('HOST','localhost');
define('NAME','root');
define('PASSWORD','');
define('DBNAME','gm');
// mysql_query('SET NAMES UTF8');

$conn=@new mysqli(HOST,NAME,PASSWORD,DBNAME);
if($conn->connect_error){
	die('数据库连接有问题'.$conn->connect_error);
}

$conn->query("set names utf8"); //设置中文集