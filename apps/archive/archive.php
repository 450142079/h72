<?php /* 16.09.16 
1 url, 2 str
s[1] - ссылка на архив
s[2] - сколько строк обрезать(структура в самом архиве)
file через  ~
*/
if(!file_exists('./p.php')){exit('[X] PASS Not Exist');}
$s=explode('*',file_get_contents('./p.php'));
if(md5($_POST['p'])!=$s[1]){exit('[X] PASS');}
$s=explode('~',$_POST['s']);

$d=explode('~', $_POST['file']);
$zz=array();

set_time_limit (60*15);

/*Архивация папки*/
function wfold($url){

	global $zz;/*добавляем массивы в функцию*/

	$mm = glob($url ."*");/*в массив список, что в папке*/
	for($i=0;$i<count($mm);$i++){/*Идем по всему массиву*/

			if(is_dir($mm[$i])){/*Если это папка*/
				wfold($mm[$i] . '/');/*Рекурсивно запускаем эту же функцию*/
  			}else{/*это файл*/
				$zz[count($zz)]=$mm[$i];/*добавляем в массив*/
 			}
 	}
}


/*Запихиваем всё в ZZ*/
for($i=0;$i<count($d);$i++){/*Из массива в архив*/
	if(file_exists($d[$i])){
		if(is_dir($d[$i])){
			wfold($d[$i]);
		}else{
			$zz[count($zz)]=$d[$i];
		}
	}
}


$ZipName=$s[1];
$s[2]++;//Правим адрес

$zip=new ZipArchive();/*Подключаем библиотеку архива*/
if($zip->open($ZipName, ZipArchive::CREATE)!==TRUE){/*Удачное ли создание*/
	exit('CreateZIP[X]');
}

for($i=0;$i<count($zz);$i++){/*Из массива в архив*/
	$zip->addFile($zz[$i], substr($zz[$i], $s[2]));
	//echo '<br>' . $s[2] . substr($zz[$i], $s[2]);
}
/*Показ размерности и закрытие*/
echo $ZipName.'[FileKol=' . $zip->numFiles . ';FileSize=';
$zip->close(); 
echo (filesize($ZipName))/1000000 . 'mb;]';


?>
