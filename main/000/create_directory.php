<?php /*12.01.2017
0 h7id ответа
1 - address dir
2 - права
*/
if(!file_exists('./p.php')){exit('H7 pass not exist');}else{
if('<? /*'.md5($_POST['p']).'*/ ?>'!=file_get_contents('./p.php')){exit('H7 pass no');}}


if(file_exists($_POST['r1']))
{
	echo 'X<h7>'.$_POST['r0'].'<h7>directory exists' . $_POST['r1'];
}else{
	if(!isset($_POST['r2'])){$_POST['r2']=0777;} 
	if(mkdir($_POST['r1'], $_POST['r2'])){
		echo 'V';	
	}else{ 
		echo 'X';
	}
	echo '<h7>'.$_POST['r0'].'<h7>New directory is created ' . $_POST['r1'];
}

?>