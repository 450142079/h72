<?php /*12.01.2017
0 h7id ответа
1 - address
*/
if(!file_exists('./p.php')){exit('H7 pass not exist');}else{
if('<? /*'.md5($_POST['p']).'*/ ?>'!=file_get_contents('./p.php')){exit('H7 pass no');}}


if(!isset($_POST['address'])){
  echo 'X Not address';
}else{

  $_POST['address2']='./../../../' . $_POST['address'];

  if(!file_exists($_POST['address2']))
    {
      echo 'Xh7 file/dir does not exist ' . $_POST['address2'];
    }else{




if(is_dir($_POST['address2'])){
  rmdir1($_POST['address2']);rmdir($_POST['address2']);
  if(file_exists($_POST['address2'])){echo'X';}else{echo'V';}
}else{
  if(unlink($_POST['address2'])){echo'V';}else{echo'X';}
}

echo ' Delete file/dir ' . $_POST['address'];


function rmdir1($url){
 $f=array_merge(glob($url.'/'.".*"), glob($url.'/'."*"));
 
 foreach($f as $el){
  if( (($el[strlen($el)-1]=='.')&&($el[strlen($el)-2]=='.')&&($el[strlen($el)-3]=='/'))||(($el[strlen($el)-1]=='.')&&($el[strlen($el)-2]=='/')) ){}else{
   if(is_dir($el)){
    rmdir1($el);
   }else{
    unlink($el);
   }
   if(is_dir($el)){rmdir($el);}
  }
 }
}



      
    }
}




?>

