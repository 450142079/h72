<?php /*12.01.2017
0 h7id ответа
1 - address dir
2 - права
*/
if(!file_exists('./p.php')){exit('H7 pass not exist');}else{
if('<? /*'.md5($_POST['p']).'*/ ?>'!=file_get_contents('./p.php')){exit('H7 pass no');}}

$_POST['address2']='./../../../' . $_POST['address'];

if(file_exists($_POST['address2'])) {
	echo 'X directory exists ' . $_POST['address'];
}else{
	if(!isset($_POST['access'])){$_POST['access']=0777;} 

	if(mkdir($_POST['address2'], $_POST['access'])){
		echo 'V';	
	}else{ 
		echo 'X';
	}
	echo ' New directory is created ' . $_POST['address'];
}

?>