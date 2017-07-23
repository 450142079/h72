<?php /*12.01.2017
0 h7id ответа
1 - url
2 - urlnew
*/
if(!file_exists('./p.php')){exit('H7 pass not exist');}else{
if('<? /*'.md5($_POST['p']).'*/ ?>'!=file_get_contents('./p.php')){exit('H7 pass no');}}


if(!isset($_POST['r1'])){exit('X<h7>'.$_POST['r0'].'<h7>Riname not url' . $_POST['r2']);}
if(!isset($_POST['r2'])){exit('X<h7>'.$_POST['r0'].'<h7>Riname no new name' . $_POST['r2']);}
if(!file_exists($_POST['r1'])){exit('X<h7>'.$_POST['r0'].'<h7>Riname url not exist '.$_POST['r1']);}
if(file_exists($_POST['r2'])){exit('X<h7>'.$_POST['r0'].'<h7>Riname url in exist '.$_POST['r2']);}

if(rename($_POST['r1'],$_POST['r2'])){
	echo 'V';
}else{
	echo 'X';
}
echo '<h7>'.$_POST['r0'].'<h7>Rename';

?>