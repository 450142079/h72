/**
 * Функции для взаимодействия с php
 *
 * Объект php 
 * запрос к файлам
 *
 * Создать файл
 * Создать дирректорию
 * Удалить 
 * Переименовать
 * Перенести
 * Копировать
 *
 * @author EON
 * @version 04.10.2017
 */



/**
 * Объект php с запросом к файлам
 * 
 * @param {json} j объект
 * включающий 
 * where путь к файлу от пользователя
 * request то что запросит у файла
 * returnf функция в которую всё вернётся
 * argument дополнительные аргументы 
 * reportnom номер отчёта, в который должен вернуться
 * main да нет, да если к пути добавить доп путь
 */
h7.php = { "pass":"1" };


/**
 * Объект php с запросом к файлам
 * 
 * @param {json} j объект
 * включающий 
 * where путь к файлу от пользователя
 * request то что запросит у файла
 * returnf функция в которую всё вернётся
 * argument дополнительные аргументы 
 * reportnom номер отчёта, в который должен вернуться
 * main да нет, да если к пути добавить доп путь
 */
h7.php.ajax = function(j) {

  if ( !j.request ) {
    return false;
  }
  if ( !j.argument ) {
    j.argument = {};
  }

  //формирование запроса
  var TextReqest='';
  for (var key in j.request) {
    TextReqest += key + '=' + j.request[key] + '&';
  }
  TextReqest += 'p=' + h7.php.pass;

  //Путь к файлу
  if (j.main) {
    j.where = './main/php/' + j.where;
  }

  //запрос
  var h7w = new XMLHttpRequest();
  h7w.open('POST', j.where, true);
  h7w.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  h7w.send(TextReqest);

  //получение ответа
  h7w.onreadystatechange = function() {
    if ( h7w.readyState != 4 ) {
      return false; 
    }

    if ( h7w.status != 200 ) {
      console.log('h7.php.ajax: ' + h7w.status + ': ' + h7w.statusText);
      alert(h7w.status + ': ' + h7w.statusText);
    } else {
      j.argument.answer = h7w.responseText;
      
      if ( j.reportnom ) {
      	h7.report.add({"type":"answer","le":j.reportnom,"text":j.argument.answer});
      }else{
      	j.returnf(j.argument);
      }

    }

  }

}

h7.php.test = function() {
	setTimeout(function(){ h7.create.directory({"where":"", "name":"h7test"}); } ,1000);
	setTimeout(function(){ h7.create.directory({"where":"h7test", "name":"a1"}); } ,2000);
	setTimeout(function(){ h7.create.directory({"where":"h7test", "name":"b1"}); } ,3000);
	setTimeout(function(){ h7.create.directory({"where":"h7test", "name":"c1"}); } ,4000);

	setTimeout(function(){ h7.create.file({"where":"h7test", "name":"info.txt", "text":"info text"}); } ,5000);
	setTimeout(function(){ h7.create.file({"where":"h7test/a1", "name":"1.txt", "text":"555"}); } ,6000);


	setTimeout(function(){ h7.delete('h7test'); } ,9000);
	h7.report.console();
}






//Создаем
h7.create={};

//where, name, text
//h7.create.file({"where":"", "name":"123.txt", "text":"hi"});

h7.create.file = function(j) {
  if ( !j.name ) {
    j.name = h7.rand(100, 999) + '.txt';
  }
  if ( !j.text ) {
    j.text = ' ';
  }else{
    j.text = encodeURIComponent(j.text);
  }

  var address = j.where + '/' + j.name;
  var reportnom = h7.report.add({"type":"request","text":"New file " + address});
  h7.php.ajax({"where":"create_file.php","main":true,"request":{"address":address,"text":j.text},"reportnom":reportnom});
};


//where, name, access
//h7.create.directory({"where":"h7", "name":"555"});

h7.create.directory = function(j) {

	if(!j.name){ j.name = h7.rand(100, 999); }
	if(!j.access){ 
		if (!h7.options.create_directory_access) {
			j.access=0777; 
		}else{
			j.access=h7.options.create_directory_access; 
		}
	}
	
	var address = j.where + '/' + j.name;

	var reportnom = h7.report.add({"type":"request","text":"New directory " + address});
  	h7.php.ajax({"where":"create_directory.php","main":true,"request":{"address":address,"access":j.access},"reportnom":reportnom});

};





//Удалить
//confirmation - подтверждение 
h7.delete=function(address){
	if(!address){return false;}

	var reportnom = h7.report.add({"type":"request","text":"Delete " + address});
  	h7.php.ajax({"where":"delete.php","main":true,"request":{"address":address},"reportnom":reportnom});
}









//address name_new
//переименовать
h7.rename=function(j){
	if(!url){ return false; }
	var arr4=j.address.split('/');
	if(!name_new){ return false; }

	var url_new='';
	for(i9=0;i9<arr4.length-1;i9++){url_new+=arr4[i9] + '/';}
	url_new+=name_new;

	var h7id = h7.report.add(h7.lang('Rename ') + url + h7.lang(' to ') + url_new, 1);
	h7.ajax('h7_rename.php', [h7id, url, url_new], h7.report.add, 2);
}







//Переместить
h7.move=function(url, url_new){
	if(!url){ return false; }
	if(!url_new){ return false; }

	var h7id = h7.report.add(h7.lang('Move ') + url + h7.lang(' to ') + url_new, 1);
	h7.ajax('h7_rename.php', [h7id, url, url_new], h7.report.add, 2);
}





h7.copy=function(url, url_new){
	if(!url){ return false; }
	if(!url_new){ return false; }

	var h7id = h7.report.add(h7.lang('Copy ') + url + h7.lang(' to ') + url_new, 1);
	h7.ajax('h7_copy.php', [h7id, url, url_new], h7.report.add, 2);
}















