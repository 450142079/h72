<?php 

if(!file_exists('./p.php')){exit('H7 pass not exist');}
$r=explode('*',file_get_contents('./p.php'));
if(md5($_POST['p'])!=$r[1]){exit('H7 pass no');}
$r=explode('~',$_POST['r']);

echo 'V';

?>