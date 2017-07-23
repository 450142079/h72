<?php


if(!file_exists('./../p.php')){exit('H7 PASS Not Exist');}
$r=explode('*',file_get_contents('./../p.php'));
if(md5($_POST['p'])!=$r[1]){exit('[X] PASS');}
$r=explode('~',$_POST['r']);


$where_i='a_' . time();




//elnsk.ru<h7>elnsk_<h7>/h7/link/default.png<h7>100


if($r[3]=='scrin'){
	copy('http://mini.s-shot.ru/1024/160/jpeg/?'.$r[1], './'. $where_i .'.jpg');
	$r[3]='/h7/link/'. $where_i .'.jpg';
}


$text=$r[1].'<h7>'.$r[2].'<h7>'.$r[3].'<h7>'.$r[4];


		$fp = fopen($where_i.'.tag', "w");
		fwrite($fp, $text);
		fclose($fp);



		if(file_exists($where_i.'.tag')){
			echo 'V';			
		}else{
			echo 'X';
		}
		echo '<h7>'.$_POST['h7id'].'<h7>link established';

?>