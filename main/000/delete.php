<?php /*12.01.2017
0 h7id ответа
1 - address
*/
if(!file_exists('./p.php')){exit('H7 pass not exist');}else{
if('<? /*'.md5($_POST['p']).'*/ ?>'!=file_get_contents('./p.php')){exit('H7 pass no');}}


if(!isset($_POST['r1'])){
  echo 'X<h7>'.$_POST['r0'].'<h7>Not url';
}else{
  if(!file_exists($_POST['r1']))
    {
      echo 'X<h7>'.$_POST['r0'].'<h7>h7 file/dir does not exist '.$_POST['r1'];
    }else{




if(is_dir($_POST['r1'])){
  rmdir1($_POST['r1']);rmdir($_POST['r1']);
  if(file_exists($_POST['r1'])){echo'X';}else{echo'V';}
}else{
  if(unlink($r[1])){echo'V';}else{echo'X';}
}

echo '<h7>'.$_POST['r0'].'<h7>Del file/dir '.$_POST['r1'];


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

