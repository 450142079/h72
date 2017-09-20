<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Console h7</title>
		<link rel="icon" type="image/x-icon" href="./favicon.ico"/>
		<link rel="stylesheet" type="text/css" href="./index_css.css" />
	</head>
	<body>
<h1>Console h7</h1>
<? if(!file_exists('./p.php')){exit('H7 pass not exist');} ?>

<form action="" method="post">
<div class="input_bl">
p (Password)<input name="p"  type="password" maxlength="1000" value="<? echo $_POST['p']; ?>" required><br/>
p0	<input name="p0" type="text" value="<? echo $_POST['p0']; ?>"><br/>
The path to the file: * 
<select size="1" name="wherephp">
    <option selected value="all">all</option>
    <option value="see.php">see.php</option>

    <option value="create_file.php">create_file.php</option>
    <option value="create_directory.php">create_directory.php</option>
    <option value="delete.php">delete.php</option>
    <option value="rename.php">rename.php</option>
    <option value="copy.php">copy.php</option>
 
    <option value="file_read.php">file_read.php</option>
    <option value="file_write.php">file_write.php</option>

	<option value="weight.php">weight.php</option>
    <option value="time.php">time.php</option>

   </select><br/>
all <input name="wherephpall" type="text" value="<? 
if($_POST['wherephp']=='all')
	{
		echo $_POST['wherephpall'];
	}else{
		echo $_POST['wherephp'];
	} 
?>" autofocus><br/><br/>
r0	<input name="r0" type="text" value="<? echo $_POST['r0']; ?>"><br/>
r1	<input name="r1" type="text" value="<? echo $_POST['r1']; ?>"><br/>
r2	<input name="r2" type="text" value="<? echo $_POST['r2']; ?>"><br/>
r3	<input name="r3" type="text" value="<? echo $_POST['r3']; ?>"><br/>
r4	<input name="r4" type="text" value="<? echo $_POST['r4']; ?>"><br/>
r5	<textarea name="r5"></textarea><br/>
r6	<input name="r6" type="text" value="<? echo $_POST['r6']; ?>"><br/>
r7	<input name="r7" type="text" value="<? echo $_POST['r7']; ?>"><br/>
r8	<input name="r8" type="text" value="<? echo $_POST['r8']; ?>"><br/>
r9	<input name="r9" type="text" value="<? echo $_POST['r9']; ?>"><br/>
<input name="exit" type="submit" value="Exit">
<input name="clear" type="submit" value="Clear log">
<input name="request" type="submit" value="Request">

<a href="../help/console/index.html" target="_blank">Help</a>
</div>

	<textarea class="log" name="log"><? 
	if('<? /*'.md5($_POST['p']).'*/ ?>'!=file_get_contents('./p.php')){exit('H7 pass no');} 

	if($_POST['wherephp']=='all')
		{
			$_POST['wherephp']=$_POST['wherephpall'];
		}
	if(!file_exists($_POST['wherephp'])){
		exit('Work file not exists.');
	}else{
		if(isset($_POST['request']))
		{
			require($_POST['wherephp']);
		}
		if(isset($_POST['clear']))
		{
			$_POST['log']='';
		}
		if(isset($_POST['request']))
		{
			//require($_POST['wherephp']);
		}
	}
	echo "\n".$_POST['log']; 
	?>

	</textarea>



</form>

<pre>123
create_file.php
r0 - address file 
r5 - content 


</pre>




	</body>
</html>