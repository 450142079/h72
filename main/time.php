<?php /*24.08.16
	time.php?s=pass~url
*/
if(!file_exists('./p.php')){exit('[X] PASS Not Exist');}
$s=explode('*',file_get_contents('./p.php'));
if(md5($_POST['p'])!=$s[1]){exit('[X] PASS');}
$s=explode('~',$_POST['s']);

if(!isset($s[1])){exit('[X] time_change: not url');}
if(!file_exists($s[1])){exit('[X] time_change: not exist');}

echo ' Time creature: '. date("d.m.Y H:i:s", filectime($s[1]));

?>
