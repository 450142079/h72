<?php /* 16.09.16 
git_see.php
*/
if(!file_exists('./p.php')){exit('[X] PASS Not Exist');}
$s=explode('*',file_get_contents('./p.php'));
if(md5($_POST['p'])!=$s[1]){exit('[X] PASS');}
$s=explode('~',$_POST['s']);

$url=$s[1];

if(substr($url, 0, 2)=='..'){

	$url = 'git'.substr($url, 2, strlen($url));
	
	$f=glob($url.'/'."*".'.json');
	$str='{';
	for($i=0;$i<count($f);$i++){
		if(!is_dir($f[$i])){
		$str.='"'.$i.'":'.file_get_contents($f[$i]);
			if($i+1<count($f)){$str.=',';}
		}
	}
	$str.='}';
	echo $str;
}else{ echo '[X] ERR GIT';}


?>