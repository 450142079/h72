<?php /*21.06.16
file_open.php?r=pass~url
$file = 'k_chat.txt'; 
$tt = file_get_contents($file); 
file_put_contents($file, $tt); 
*/

if(!file_exists('./p.php')){exit('H7 PASS Not Exist');}
$r=explode('*',file_get_contents('./p.php'));
if(md5($_POST['p'])!=$r[1]){exit('[X] PASS');}
$r=explode('~',$_POST['r']);


if(!file_exists($r[1])){exit('[X] file_open: not exist ('.$r[1].')');}
if(is_dir($r[1])){exit('[X] file_open: is dir ('.$r[1].')');}

echo file_get_contents($r[1]);

?>
