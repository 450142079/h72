<?php /*17.09.16 
h papka
f file
new.php?s=pass~url~type~prav 

*/
if(!file_exists('./../p.php')){exit('H7 PASS Not Exist');}
$r=explode('*',file_get_contents('./../p.php'));
if(md5($_POST['p'])!=$r[1]){exit('[X] PASS');}
$r=explode('~',$_POST['r']);


$arResult = glob('./'."*".'.tag');
$strResult='';
for($i=0;$i<count($arResult);$i++){

  	if(!is_dir($arResult[$i])){
  		$strResult.=$arResult[$i].'<h7>'.file_get_contents($arResult[$i]) . '<#h7#>';
	}
}

echo $strResult;

?>