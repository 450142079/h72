<?php /* 11.02.17 

0 - путь
1 - лимит отображения
2 - с чего начинать лимит
*/
if(!file_exists('./p.php')){exit('H7 pass not exist');}else{
if('<? /*'.md5($_POST['p']).'*/ ?>'!=file_get_contents('./p.php')){exit('H7 pass no');}}


$data = array_merge(glob($_POST['r0'].'/'.".*"), glob($_POST['r0'].'/'."*"));

//sort($ata);
$r=array();

if(in_array('r2', $_POST)){ 
	$r['start']=$_POST['r2'];
}else{
	$r['start']=0;
}

if(in_array('r1', $_POST)){
	if($r['start'] + $_POST['r1'] > count($data)){
		$r['finish']=count($data);
	}else{
		$r['finish']=$r['start'] + $_POST['r1'];
	}
}else{
	$r['finish']=count($data);
}

$str='';

for($i=$r['start'];$i<$r['finish'];$i++){
	$str.='~';
	if(is_dir($data[$i])){
		$str.='h';
	}else{
		$str.='f';
	}
	$str.=$data[$i];
}

echo $str;
?>