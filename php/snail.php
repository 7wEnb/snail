<?php

// CORS 解决跨域
//因为有了这两句话才解决了跨域问题
include "conn.php";
header('Access-Control-Allow-Origin:*');//跨域访问的域名，*表示所有
header('Access-Control-Allow-Method:POST,GET');//跨域支持的请求方式。

$res = $conn->query("select * from snail");

$arr = Array();
for($i=0;$i<$res->num_rows;$i++){
  $arr[$i]=$res->fetch_assoc();
}
echo json_encode($arr);
//http://192.168.13.43/Snail/php/snail.php
