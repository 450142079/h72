<? //error_reporting(E_ALL & ~E_NOTICE);
?><html><head><title>Сканирование размеров папок</title></head><body><?
define('START_PATH', dirname(__FILE__)); // стартовая папка для поиска
$file = '/tmp/mydisk' . str_replace('/','-',START_PATH);

if ($_REQUEST['scan'] || !file_exists($file))
{
	define('START_TIME', time()); // засекаем время старта
	if ($_REQUEST['break_point']) 
	{
		$method = 'ab';
		define('SKIP_PATH',$_REQUEST['break_point']); // промежуточный путь
		$arTmpOldSize = unserialize($_REQUEST['break_size']);
	}
	else
		$method = 'wb';

	if (!$rs = fopen($file, $method))
		die('<div style="color:red">Не удается открыть файл на запись: '.$file.'</div>');
	Search(START_PATH);
	fclose($rs);


	if (defined('BREAK_POINT'))
	{
		?><form method=post id=postform>
			<input type=hidden name=scan value=y>
			<input type=hidden name=break_point value="<?=htmlspecialchars(BREAK_POINT)?>">
			<input type=hidden name=break_size value="<?=htmlspecialchars(serialize($arTmpNewSize))?>">
		</form>
		<div style="border:1px solid green;padding:10px;color:green">
		<b>Идёт сканирование...</b><br>
		Текущий путь: <?=htmlspecialchars(substr(BREAK_POINT,strlen(START_PATH)))?>
		</div>
		<script>window.setTimeout("document.getElementById('postform').submit()",100);</script><? // таймаут чтобы браузер показал текст
		die();
	}
}
?>
<h1>Сканирование размеров папок</h1>
Текущая папка: <b><?=dirname(__FILE__)?></b><br>
<?
if (file_exists($file))
	echo 'Временный файл с размерами: <b>'.$file.'</b>, изменен: <i>'.date('d.m.Y H:i:s',filemtime($file)).'</i>';
?>
<form method=post>
	<input type=submit name=scan value="Пересчитать размеры папок">
</form>
<?
$min = intval($_REQUEST['min']);
if (!$min)
	$min = 10;
?>
<form method=get>
	Показать папки более
	<input name=min size=3 value="<?=$min?>">%
	<input type=submit value="Ok">
</form>
<style>
	div { 
		padding:2;
		font-family: Verdana,Tahoma,Arial;
	}
</style>
<?
$rs = fopen($file, 'rb');
fseek($rs, filesize($file)-100);
$str = fread($rs, 100);
preg_match('/^([0-9]+)	\.$/m', $str, $regs);
$total = $regs[1];
fseek($rs, 0);

$arLines = array();
$arColors = array('#D66', '#6D6', '#66D', '#DD6', '#D6D', '#6DD', '#ccc', '#bbb', '#aaa', '#999', '#888', '#777', '#666');
while($l = fgets($rs))
{
	list($size, $path) = explode('	', $l);
	if (($p = round($size*100/$total, 2)) > $min)
	{
		$c = substr_count($path, '/');
		$color = $arColors[($c + count($arColors)) % count($arColors)];
		$padding = intval(20 * $c);
		$visual = '<div style="margin-left:'.$padding.';height:20;background-color:'.$color.';width:' . intval($p * 10) . '"></div>';
		if (trim($path) == '.')
			$path = START_PATH;
		$file = '<div style="margin-left:'.$padding.';color:'.$color.'">' . $p . '% '. htmlspecialchars($path) . ' (' . round($size/1024/1024, 2) . 'M)' . '</div>';

		$arLines[] = $visual;
		$arLines[] = $file;
	}
}
echo '<div style="background-color:#333">'.implode("\n", array_reverse($arLines)).'</div>';

function Search($path)
{
	global $arTmpOldSize, $arTmpNewSize, $rs;
	if (time() - START_TIME > 1)
	{
		if (!defined('BREAK_POINT'))
			define('BREAK_POINT', $path);
		return false;
	}

	if (defined('SKIP_PATH') && !defined('FOUND')) // проверим, годится ли текущий путь
	{
		# /bitrix/components/bitrix/forum/message
		# /bitrix/components/alpha - годится
		# /bitrix/components/alpha/beta - не годится
		if (0!==strpos(SKIP_PATH, dirname($path))) // отбрасываем имя или идём ниже 
			return 0;

		if (SKIP_PATH==$path) // путь найден, продолжаем сканировать
			define('FOUND',true);
	}

	$size = 0;
	if (is_dir($path)) // dir
	{
		$dir = opendir($path);
		while(false !== ($item = readdir($dir)))
		{
			if ($item == '.' || $item == '..' || is_link($path . '/' . $item))
				continue;

			if (false === ($res = Search($path.'/'.$item)))
			{
				$arTmpNewSize[$path] = $arTmpOldSize[$path] + $size;
				return false;
			}

			$size += $res;
		}
		closedir($dir);
	}

	$size += intval($arTmpOldSize[$path]) + filesize($path);
	if (!defined('SKIP_PATH') || defined('FOUND'))
	{
		fwrite($rs, $size . "	.".substr($path,strlen(START_PATH))."\n");
		return $size;
	}
	return 0;
}
