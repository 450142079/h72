h7={"version":"20.06.2017 Золотая менюха"};
/* File Manager Hamster7

HAMSTER7 - файл менеджер для WEB программистов. Скорость! Удобство! Защита! 
h7api.js - JavaScript с обьектом h7, который содержит в себе структурированные методы с инструкциями, данные, и массивы, получился удобный коструктор для файл менеджера.


Что нового:
Более чистый код, из-за которого появился h7API
дало возможность легко расширять функции.

Новая возможность выбрать язык!

Полная адаптация под телефон.

Новый встроенный html визуальный редактор.

Более чистые отчёты.



В этом обновлении большое внимание уделено развитию и роста проекта
за счёт открытого апи, и дополнением неограниченного количества модулей






p - пароль
p0 - ид для ответа













V@Настройки
V@Подключение модулей
V@запрос главный

V@основные команды
создать, удалить, изменить

V@отчёты
V@меню
V@Язык

ИНТЕРФЕЙСЫ

V@Отмеченные
V@появление запросов 
да не, для текста и проч

V@интерфейс рабочая область



V@вход

 */




//Временная отладка
h7.pass='123';










/*Настройки ========================================================*/
h7.options={
	"core":"./main/",
	"language":"ru",
	"timeout":500,
	"phone":false,
	"theme":"default"
};


//Живые настройки
if(document.documentElement.clientWidth<700 && confirm('Phone?'))
{
	h7.options.phone=true;
}
/*//Настройки ======================================================*/







/*Подключение модулей==================== золото***/
h7.include=function(url)
{
    var s=document.createElement('script');s.src=url;
    document.getElementsByTagName('head')[0].appendChild(s);
}
/*//Подключение модулей====================*/











/*Запросы ========================================================= золото***/
//1 путь к php
//2 массив данных
//3 функция, в которую попадёт ответ 0 аргументом
//4 дополнительный второй аргумент функции куда попадёт ответ
//5 p0 - дополнение в качестве ид для возврата отчёта
h7.ajax=function(WherePhp, ArrRequest , FunctionRetrn, FRArgument1, p0)
{
	if(!WherePhp){return false;}
	var TextReqest='';
	for(len=ArrRequest.length,i7=0;i7<len;i7++){
		TextReqest+='r' + i7 + '=' + ArrRequest[i7] + '&';
	}
  var h7w = new XMLHttpRequest();
  h7w.open('POST', h7.options.core + WherePhp, true);
  h7w.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  h7w.send(TextReqest + 'p=' + h7.pass + '&p0=' + p0);
    h7w.onreadystatechange = function(){
        if(h7w.readyState != 4){ return false; }
        if(h7w.status != 200){
        	h7.cl('h7.ajax: ' + h7w.status + ': ' + h7w.statusText);
         	alert(h7w.status + ': ' + h7w.statusText);
        } else {
          FunctionRetrn(h7w.responseText, FRArgument1);
        }
    }
}
/*//запросы ======================================================*/

























/*Стандартные функции =============================================*/

/*
h7['see']=function(url, idin, cash1){
	if(idin==undefined){return false;}
	if(url==undefined||url==null){url='..';}
	if(cash1==undefined||cash1==null){cash1=0;}
	
	document.getElementById(idin).innerHTML=h7.lang('Load..');
	h7.report(h7.lang('see url ') + url);
	
	if(cash1==1){
		if(h7['see']['cash'][idin]!=undefined){
			h7see_treatment(h7['see']['cash'][idin], idin)
			return true;
		}
	}
	h7.ajax('see~' + url, h7.see.treatment, idin);
}
h7['see']['i']='Смотреть \n\
1 url того пути, который нобходимо получить\n\
2 куда выводить результат\n\
3 требуется ли кешь? ';


h7['see']['cash']={};//h7['see']['cash'][idin]='h..'; //для сохранения кэша просмотренного


h7['see']['treatment']=function(str3, idin){
	h7m['see']['cash'][idin]=str3; //сохраняем результат в кэшь
if(str3.length>1){//если строка нормальная недоработка
    var arr3=[];arr3=str3.split('~');
	var h7folder=''; var h7file=''; var css_marked=''; //память выделений 
        for(i3=0;i3<arr3.length;i3++){//гоним по всем полученным данным
		    if(h7.marked.exist(arr3[i3])){//необходимость создать класс памяти выделений
                css_marked='marked';
                  }else{
                css_marked='';
            }
            if(h7.str.s1(arr3[i3])=='h'){
				h7folder+='<div class="el color_dir" oncontextmenu="b_m(\'h\', \'' + s4(m[0][i]) + '\', ' + n + ', event);return false;"><button onClick="b_folder(' + n + ', \'' + s4(m[0][i]) + '\', event)"><i class="ico img_dir"></i>' + s2(m[0][i]) + '</button><i class="bt ico ico-menu2" onClick="b_m(\'h\', \'' + s4(m[0][i]) + '\', ' + n + ', event)"></i><i class="bt ico ' + pam_class + ' ico-pam2 " onClick="pam_add(\'' + m[0][i] + '\');b_f5_cash(' + n + ');"></i></div>';
			}else{
				h7file+='<div class="el color_' + s3(m[0][i]) + '" oncontextmenu="b_m(\'h\', \'' + s4(m[0][i]) + '\', ' + n + ', event);return false;"><button onClick="b_file(\'' + s4(m[0][i]) + '\', event, ' + n + ')"><i class="ico img_' + s3(m[0][i]) + '"></i>' + s2(m[0][i]) + '</button><i class="bt ico ico-menu2" onClick="b_m(\'f\', \'' + s4(m[0][i]) + '\', ' + n + ', event)"></i><i class="bt ico ' + pam_class + ' ico-pam2" onClick="pam_add(\'' + m[0][i] + '\');b_f5_cash(' + n + ');"></i></div>';
			}
		}
}else{str=h7lang('Bad address..');}
document.getElementById(idin).innerHTML=str;
}
h7['see']['treatment']['i']='Обработка, из текста hurl1~furl2~ в готовый результат\n\
1 str принятая строка \n\
2 в какой idin выставлять';


*/






//мелкие Функции файл менеджера
h7.ftp={};
h7.ftp.back=function(n){
  var t=h7.window.list[n].input_text;
  t=t.substr(0,t.length-1);
  t=t.substr(0,t.lastIndexOf('/'));
  if(t==''){t='..';}
	h7.see(n, t);
}

//Обновить страницу
h7.ftp.f5=function(n){
	setTimeout(function(){
		h7.see(n, h7.window.list[n].input_text);
	}, h7.options.timeout);
	
}






















//Смотреть
h7.see=function(n, url, cash1){
	
	if(!url){url='..';}
	if(!cash1){cash1=false;}


h7.window.input_text(n, url);
h7.window.header_text(n, '[' + n + ']&emsp;' + h7.see.onecodetojson(url).name);

	if((cash1==true)&&(h7.see.storage[n])){
		h7.see.go(h7.see.storage[n], n, true);
	}else{
		h7.ajax('h7_see.php', [url], h7.see.go, n);
	}
}
h7.see.storage={};
h7.see.go=function(code, n, NoSaveCash){
	if(!code){return false;}
	if(!NoSaveCash){ h7.see.storage[n]=code; }
	h7.window.body(n, h7.see.codetohtml(n, code));
}
h7.see.codetohtml=function(n, code){
	var txt_h='<div class="el color_dir"><button onclick="h7.ftp.back(' + n + ')"><i class="ico ico-back"></i>' + h7.lang('back') + '</button></div>'; 
	var txt_f='';
	var arr=code.split('~');
	var arr2={}; var arr3=[];
	for(i8=0;i8<arr.length;i8++){
		
		if(arr[i8].length>1){
			arr2=h7.see.onecodetojson(arr[i8]);


			if(arr2.type=='h'){
				if(!((arr2.name=='.')||(arr2.name=='..'))){
					txt_h+='<div class="el color_dir" oncontextmenu=""><button onclick="h7.see(' + n + ', \'' + arr2.way + '\')"><i class="ico img_dir"></i>' + arr2.name + '</button><i class="bt ico ico-menu2" onclick=""></i><i class="bt ico  ico-pam2 " onclick=""></i></div>';
					//'<div class="el color_dir"><button onclick="b_back(2)"><i class="ico ico-back"></i>' + arr2.name + '</button></div>';
				
				}
			}
			if(arr2.type=='f'){
				txt_f+='<div class="el color_php" oncontextmenu="return false;"><button onclick=""><i class="ico img_php"></i>' + arr2.name + '</button><i class="bt ico ico-menu2" onclick=""></i><i class="bt ico  ico-pam2" onclick=""></i></div>';
			}



		}
	}
	return txt_h + txt_f;
}



h7.see.onecodetojson=function(t){
	var arr2={};
	arr2.type=t[0];
	arr2.way=t.substr(1);
		arr3=arr2.way.split('/');
	arr2.name=arr3[arr3.length-1];
		arr3=arr2.name.split('.');
	arr2.ftype=arr3[arr3.length-1];
	return arr2;
}














/*
//Функция возврата true or false
h7.confirm(t, func, arr, arr_el_replace){
	for(len = arr.lenght, i=0; i<len; i++){

	}
}

//text
h7.prompt(t, ready, funct, arr, arr_el_replace){

}
*/






//Создаем
h7.create={};
h7.create.file = function(where, name, content){
	if(!where)
	{ 
		h7.prompt('New file address', './../..', h7.create.file, ['#where#', name, content], '#where#');
		return false;
	}
	if(!name)
	{ 
		h7.prompt('New file address', './../..', h7.create.file, [where, '#name#', content], '#name#');
		return false;
	}
	if(!content){ content=' '; }

	content=encodeURIComponent(content);
	var address=where + '/' + name;
	var h7id=h7.report.add(h7.lang('New file ') + address,1);
	h7.ajax('h7_create_file.php', [h7id, address, content], h7.report.add, 2);
};
h7.create.file.settings={};
h7.create.file.settings.access=0755; 


h7.create.directory = function(where, name, access){
	if(!where){ where=prompt(h7.lang('Create directory! Where?'), '..'); }
	if(!where){ return false; }
	if(!name){ name=prompt(h7.lang('Create directory! How to name?'), 'mydirectory'); }
	if(!name){ return false; }
	if(!access){ access=h7.create.directory.settings.access; }
	
	var address=where + '/' + name;
	var h7id=h7.report.add(h7.lang('New directory ') + address, 1);
	h7.ajax('h7_create_directory.php', [h7id, address, access], h7.report.add, 2);
};
h7.create.directory.settings={};
h7.create.directory.settings.access=0777; 









//Удалить
//confirmation - подтверждение 
h7.delete=function(url, confirmation){
	if(!url){return false;}

	if(!confirmation){
		if(!confirm(h7.lang('Delete ') + url)){ return false; }
	}

	var h7id = h7.report.add('Delete ' + url, 1);
	h7.ajax('h7_delete.php', [h7id, url], h7.report.add, 2);
}







//переименовать
h7.rename=function(url, name_new){
	if(!url){ return false; }
	var arr4=url.split('/');
	name=arr4[arr4.length-1];
	if(!name_new){ name_new=prompt(h7.lang('Rename ') + url, name); }
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


h7.file={};


h7.file.open=function(url){

}

h7.file.save=function(url, content){

}




























/*Поиск текста по файлам*/

/*Архивация*/
/*ДеАрхивация*/



/*Запрос журнала история событий*/

/*Рабочий стол*/
/*Рабочий стол добавить ссылку*/



/*Скачать*/
function b_download(url){
  window.open('./download.php?s=' + m['pass'] + '~' + url, '_blank');
}






/*Загрузить с url
*/
function h7urlins7(n){
  var url=prompt('URL файла', '');
  otchet('[i] urlins7 ' + url);
  otchet(ajax('urlins7~' + url + '~' + document.getElementById('in_' + n).value + '/' + prompt('С URL в S7 с именем', s2(url))));
  b_f5(n);
}








//поиск
h7.search={};
h7.search.name=function(url){

}
h7.search.string=function(url){

}







/*//Стандартные функции ===========================================*/

























/*Отчётность ======================================================*/
h7.report={};
//Записываем время открытия
h7.report.list=[{"status":"i","text":"<br/>HAMSTER7 [" + h7['version'] + "]","time":"" + document.lastModified}]; //отчет

//Настройки
h7.report.options={};
//В какой ид постоянно выводить отчет
h7.report.options.idin='h7report';




//Добавление инфы в отчет
//1. сам текст,
//2. статус: ничего 0, запрос=1, ответ=2
//Ответ(статус 2) ожидается в формате status<h7>id<h7>text';
h7.report.add=function(t, n){
  
  var le=h7.report.list.length;
  var tt = new Date();
  var th='', tm='', ts='';
	if(tt.getHours()<10){th='0'}
	if(tt.getMinutes()<10){tm='0'}
	if(tt.getSeconds()<10){ts='0'}
	var ttime='' + th + tt.getHours() + ':' + tm + tt.getMinutes() + '.' + ts + tt.getSeconds();

	if(!n){
		h7.report.list[le]={}
		h7.report.list[le]['time']=ttime;//время
		h7.report.list[le]['text']=t;//текст
		h7.report.list[le]['status']='i';//статус	
		return le; //Вернет созданный ид
	}

	if(n==1){
		h7.report.list[le]={}
		h7.report.list[le]['time']=ttime;
		h7.report.list[le]['text']=t;
		h7.report.list[le]['status']='L';
		return le; //Вернет созданный ид
	}
	
	if(n==2){
		var arr = t.split('<h7>');
		if(arr[0]=='V'||arr[0]=='X'){
			h7.report.list[arr[1]]['status']=arr[0];
			h7.report.list[arr[1]]['answer']={};
			h7.report.list[arr[1]]['answer']['text']=arr[2];
			h7.report.list[arr[1]]['answer']['time']=ttime;
			return true;		
		}else{
			h7.report.list[le]={}
			h7.report.list[le]['time']=ttime;
			h7.report.list[le]['text']=t;
			h7.report.list[le]['status']='E';
			return le;
		}

	}
	
		
}





/*Показать отчёт*/
//Выводит отчет о проделанных действиях, idin- в какой id ,будем выводить';

h7.report.see=function(id_where, quantity){
    if(!id_where){ return false; }
	var le=h7.report.list.length;
	if(!quantity){ quantity=le; }

	var txt='';
	for(i3=le-1;i3>=le-quantity;i3--){
		txt+='<div class="h7report h7report_' + h7.report.list[i3]['status'] + '">';
		txt+='[' + h7.report.list[i3]['status'] + '] ' + h7.report.list[i3]['time'] + ' ' + h7.report.list[i3]['text'];
		if(h7.report.list[i3]['answer']!=undefined){
			txt+='<p>' + h7.report.list[i3]['answer']['time'] + ' ' + h7.report.list[i3]['answer']['text'] + '</p>';
		}
		txt+='</div>';
	}
	//return txt;
	document.getElementById(id_where).innerHTML=txt; 
}
	


/*//Отчётность ====================================================*/





















/*menu============================================================== ЗОЛОТО***/
//h7.menu={};
/*
h7.menu.NameMenu=[]
h7.menu(NameMenu);

text str
click function(arg){}
class str
extends true/false
list []
*/
h7.menu=function(NameMenu, n)
{
	var s='';
	//if(typeof (h7.menu[NameMenu]) === "array")
	//{
		for(len=h7.menu[NameMenu].length,i5=0;i5<len;i5++)
		{
			s+='<ul><i class="' + h7.menu[NameMenu][i5].class + '" ';
			if(h7.menu[NameMenu][i5].click)
			{
				s+='onClick="h7.menu[\'' + NameMenu + '\'][' + i5 + '].click(' + n + ');" ';
			}
			s+='></i>';
			if(h7.menu[NameMenu][i5].text!=undefined)
			{
				s+='<li><b>' + h7.lang(h7.menu[NameMenu][i5].text) + '</b>';
				if(h7.menu[NameMenu][i5].extends)
				{
					for(len2=h7.menu[NameMenu][i5].list.length,i6=0;i6<len2;i6++){
						s+='<button onClick="h7.menu[\"' + NameMenu + '\"][' + i5 + '].list[' + i6 + 
						'].click(' + n + ')">' + h7.lang(h7.menu[NameMenu][i5].list[i6].text) + '</button>';
					}
				}
				s+='</li>';
			}
			s+='</ul>';
		}
	//}
	return s;
	//document.getElementById(id_out).innerHTML=s; 
}

/*//menu============================================================*/




















  
/*Язык в h7=========================================================*/
//Функция возвращает перевод строки на выбранный в настройках h7[options][lang] язык

/*//Язык ===========================================================*/


















//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX









/*Память отмеченных ===============================================*/
h7.marked={}
h7.marked.touch=function(str){
	if(h7['marked']['exist'](str)){
		h7['marked']['del'](str);
	}else{
		h7['marked']['add'](str);
	}
}
h7['marked']['i']='Добавляет либо убирает в отмеченные файлы';



//Массив для отмеченных файлов
h7['marked']['m']=[];





h7['marked']['add']=function(str2){
	if(!h7['marked']['exist'](str2)){
		h7['marked']['m'][h7['marked']['m'].length]=str2;
	}
}
h7['marked']['add']['i']='Для добавления элемента в отмеченные';





h7['marked']['del']=function(str2){
	for(i2=0;i2<h7['marked']['m'].length;i2++){
		if(str2==h7['marked']['m'][i2]){
			h7['marked']['m'].splice(i2, 1);
		}
	}
}
h7['marked']['add']['i']='Для убирания элементов из отмеченных';




h7['marked']['exist']=function(str2){
	var mexist=false;
	for(i2=0;i2<h7['marked']['m'].length;i2++){
		if(str2==h7['marked']['m'][i2]){
			mexist=true;
		}
	}
	return mexist;
}
h7['marked']['exist']['i']='Отмечен ли данный элемент';





h7['marked']['see']=function(idin){
	var str='';
	for(i5=0;i5<h7['marked']['m'].length;i5++){
		str+='<div class="h7marked_' + h7.str.s1(h7['marked']['m'][i5]) + '">' + h7.str.s2(h7['marked']['m'][i5]) + '<button onClick="h7.marked.del(\'' + h7['marked']['m'][i5] + '\')">X</button>\
		<p>' + h7.str.s4(h7['marked']['m'][i5]) + '</p></div>';
	}
	if(idin==undefined){
		return str;
	}else{
		document.getElementById(idin).innerHTML=str;
	}
}
h7['marked']['see']['i']='Просматриваем всё что выделенно';




h7['marked']['clean']=function(idin){
	h7['marked']['m']=[];
	var str=h7.lang('marked clean');
	if(idin==undefined){
		return str;
	}else{
		document.getElementById(idin).innerHTML=str;
	}
}
h7['marked']['clean']['i']='Очищает все отмеченные';




/*//Память отмеченных =============================================*/


















/*Уведомления =====================================================*/
//Notifications

h7.cl=function(t){ console.log(t); }
h7.alert=function(t){ 
	alert(t);
}
//Функция возврата true or false
h7.confirm=function(t, func, arr, arr_el_replace){
	for(len = arr.lenght, i=0; i<len; i++){

	}
}

//text
h7.prompt=function(t, ready, funct, arr, arr_el_replace){

}







/*//Уведомления ===================================================*/











//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX









//ИНТЕРФЕЙС
/*Рабочий стол ==================================== золото***
выпадающее меню,уведомления,пуск,окна,фон

для запуска площадок
h7.desktop.start()
*/
h7.desktop={};
h7.desktop.arr=['face_menu','notice','start_button','start_box','windows','background'];
h7.desktop.add=function(id, n){
	if(!n){ n=h7.desktop.arr.length; }
	h7.desktop.arr.splice(n, 0, id);
}
h7.desktop.start=function(){
	var s='';
	for(len=h7.desktop.arr.length, i=0; i<len; i++){
		s+='<div id="h7_' + h7.desktop.arr[i] + '"></div>';
	}
	document.getElementsByTagName('body')[0].innerHTML=s;
}
/*//Рабочий стол ==================================*/




















/*Пуск ====================================*/

//button
h7.start={}
h7.start.open=false;

//open 1 или 0
h7.start.see=function(y)
{
	var ob='';
	switch(y){
		case 0:{
			ob='display:none';
			h7.start.open=false;break;
		}
		case 1:{
			ob=' ';
			h7.start.open=true;break;
		}
		default:{
			if(h7.start.open){
				ob='display:none';
				h7.start.open=false;
			}else{
				ob=' ';
				h7.start.open=true;
			}
		}
	}
	document.getElementById('h7_start_box').style.cssText = ob;
}


h7.start.box_clothes=function(){
	document.getElementById('h7_start_box').innerHTML='<div id="h7_start_box_menu"></div><div id="h7_start_box_box"></div>';
}
h7.start.menu_see=function(){
	document.getElementById('h7_start_box_menu').innerHTML=h7.menu('start');
}
h7.start.box_see=function(t){
	document.getElementById('h7_start_box_box').innerHTML=t;
}




h7.menu.start=[];
h7.menu.start[0]={"text":"Options","class":"i0 i0_options",};
h7.menu.start[0].click=function(){alert('Нажали настройки');}
h7.menu.start[1]={"text":"Files & folders","class":"i0 i0_home",};
h7.menu.start[1].click=function(){ h7.window.add('ftp'); }
h7.menu.start[2]={"text":"Apps","class":"i0 i0_apps",};
h7.menu.start[2].click=function(){ h7.start.box_see('<h1>Приложения</h1>'); }
h7.menu.start[3]={"text":"Report","class":"i0 i0_report",};
h7.menu.start[3].click=function(){ h7.start.box_see('<h1>Отчёты</h1>'); }
h7.menu.start[4]={"text":"Search","class":"i0 i0_search",};
h7.menu.start[4].click=function(){ h7.start.box_see('<h1>Search</h1>'); }
h7.menu.start[5]={"text":"Favorites","class":"i0 i0_favorites",};
h7.menu.start[5].click=function(){ h7.start.box_see('<h1>Favorites</h1>'); }

h7.menu.start[6]={"text":"Help","class":"i0 i0_help",};
h7.menu.start[6].click=function(){ h7.start.box_see('<h1>Favorites</h1>'); }




h7.start.button_see=function(t){
	document.getElementById('h7_start_button').innerHTML='<button class="start" onClick="h7.start.see()">H7</button>' + t;
}


/*
text str
click function(arg){}
class str
extends true/false
list []

('Options', 'h7.start.r.options();', 40);
('Files & folders', 'h7.window.add(\'ftp\' , \'..\')', 560, false);
('Apps & links', 'h7.start.r.apps(); h7.link.show(\'h7_desktop\')', 840);//h7_desktop
('Report', 'h7.report.see(\'h7_start_r\');', 120);
('Marked', 'alert(4)', 280);
*/



/*//Пуск ==================================*/



































/*приложения ========================================================*/


//приложения
h7.apps={};
//Список
h7.apps.list=[];


h7.apps.start={};

h7.apps.start.bd=function(){
	h7.report.add('Request a list of applications');
	h7.ajax('apps/see', h7.apps.start.text);
}
h7.apps.start.url=function(url_js){
    h7.ajax('file_open~' + url_js, h7.apps.start.text);
}
h7.apps.start.text=function(text_js){
    setTimeout(text_js,100);
}

//Показать и в какой id, без запроса XXXXXX
h7.apps.show=function(id_where){
	var str='';
	var str_a='';
	var t_onClick='';
	for(i7=0;i7<h7.apps.list.length;i7++){
		t_onClick='';
		if(!h7.apps.list[i7]['link_url']){ 
			str+='<button class="h7_apps" onClick="h7.apps.start.url(\'' + h7.apps.list[i7]['js_url'] + '\')" style="background-image:url(\'' + h7.apps.list[i7]['img_ico'] + '\')"><p>' + h7.apps.list[i7]['title'] + '</p></button>';
		}else{
			str_a+='<a class="h7_apps_a"  href="' + h7.apps.list[i7]['link_url'] + '" style="background-image:url(\'' + h7.apps.list[i7]['img_ico'] + '\')"><p>' + h7.apps.list[i7]['title'] + '</p></a>';
		}
	}
	document.getElementById(id_where).innerHTML=str + str_a;
};





//where_i чтобы знвть где я и сортировать
h7.apps.add=function(where_i, js_url, title, img_ico,  sorting, link_url){
    if(!where_i || !js_url){ return false; }
    if(!title){ title=where_i; }
    if(!img_ico){ img_ico='#'; }
    if(!sorting){ sorting=1000; }
    var ls=h7.apps.list.length;
    h7.apps.list[ls]={};
    h7.apps.list[ls]['where_i']=where_i;
    h7.apps.list[ls]['js_url']=js_url;
    h7.apps.list[ls]['title']=title;
    h7.apps.list[ls]['img_ico']=img_ico;
    h7.apps.list[ls]['sorting']=sorting;
 	h7.apps.list[ls]['link_url']=link_url;
       
}

h7.apps.menu=function(){
    
};


/*//приложения ========================================================*/


























































































































































/*window ===========================================*/




h7.window={};




//свернуть
h7.window.hide=function(n){}

//Растянуть
h7.window.stretch=function(n){}

//Закрыть
h7.window.close=function(n){
	h7.window.list[n].object.parentNode.removeChild(h7.window.list[n].object);
	h7.window.list[n].status='close';
}





















//Для дополнений к контенту
h7.window.f={};

//Кнопки закрыть, свернуть
h7.window.f.header_button=function(n,s)
{
	var t='<div class="button" id="window_' + n + '_header_button">';
	if(s!=1){
		t+='<button class="i1 i1_hide" onclick="h7.window.hide(' + n + ')"></button><button class="i1 i1_stretch" onclick="h7.window.stretch(' + n + ')"></button>';
	}
	return t + '<button class="i1 i1_close" onclick="h7.window.close(' + n + ')"></button></div>';
}







//Основные шаблоны (start - после первого открытия окна)
h7.window.content={};
/*
title Заголовок
header_button кнопки в заголовке
line=[] массив линий с блоками
меню
содержимое
что выполнять при старте
*/


h7.window.content.ftp={};
h7.window.content.ftp.title=function(n){ return 'FTP ' + n; }
h7.window.content.ftp.header_button=function(n){ return h7.window.f.header_button(n); }
h7.window.content.ftp.line=[];
h7.window.content.ftp.line[0]=function(n){
	return '<input class="input_search" type="text" />\
	<button class="i1 i1_back" onClick=""></button>\
	<div class="button">\
	<button class="i1 i1_go" onClick=""></button><button class="i1 i1_search" onClick=""></button><button class="i1 i1_menu" onClick=""></button>\
	</div>';
}
h7.window.content.ftp.menu=true;
h7.window.content.ftp.menu=function(n){ return h7.menu('ftp', n); }

h7.menu.ftp=[];
h7.menu.ftp[0]={"text":"Create","class":"i1 i1_create",};
h7.menu.ftp[0].click=function(){ alert('Нажали Создать');}

h7.menu.ftp[1]={"text":"download","class":"i1 i1_download",};
h7.menu.ftp[1].click=function(){ alert('Нажали Загрузить');}

h7.menu.ftp[2]={"text":"Marked","class":"i1 i1_marked",};
h7.menu.ftp[2].click=function(){ alert('Нажали Отмеченные');}

h7.menu.ftp[3]={"text":"Favorites","class":"i1 i1_favorites",};
h7.menu.ftp[3].click=function(){ alert('Нажали избранные');}



h7.window.content.ftp.content=function(){
	return 'Страница не может быть загружена';
}
h7.window.content.ftp.start=function(n){
	alert('Страницу заполнять пока что не буду.');
}
	
	
	
	
	

	
	
	
	
	
	
h7.window.content.form={};
h7.window.content.form.title=function(n){ return 'Form'; }	
h7.window.content.form.header_button=function(n){ return h7.window.f.header_button(n,1); }	











//Шаблоны 
h7.window.templates={};


//основной шаблон окон
h7.window.templates.window=function(n, template, ar0json, w, h){
	h7size=function(){
		if(h7.options.phone){
			return '';
		}else{
			return 'style="width:' + w + 'px;height:' + h + 'px;"';
		}
	}

	return '<div class="window_header" id="window_' + n + '_header" onmousedown="h7.window.move(' + n + ',event); return false;">\
<div class="window_header_button" id="window_' + n + '_header_button">' + h7.window.templates.header_bottom(n) + '</div>\
<div class="window_header_text" id="window_' + n + '_header_text">[' + n + ']&emsp;Window</div>\
</div>\
<div class="window_menu" id="window_' + n + '_menu"></div>\
<div class="window_input" id="window_' + n + '_input">\
	<input type="text" id="window_' + n + '_input_text" value="" />\
	<div class="window_input_button" id="window_' + n + '_input_button"><button onClick="h7.see(' + n + ', document.getElementById(\'window_' + n + '_input_text\').value)">V</button></div>\
</div>\
<div class="window_body wb_' + template + h7.window.thems[template] + '" id="window_' + n + '_body" ' + h7size() +'>' + h7.lang('Load..') + '</div>\
<div class="window_footer"><i class="ico ico-4" onmousedown="h7.window.size(' + n + ',event); return false;"></i></div>';
}

h7.window.templates.header_bottom=function(n){
	var t2='';
	if(!h7.options.phone){ t2='<button class="window_header_button_stretch" onClick="h7.window.stretch(' + n + ')"></button>'; }
	return '<button class="window_header_button_hide" onClick="h7.window.hide(' + n + ')"></button>' +
	 t2 + '<button class="window_header_button_close" onClick="h7.window.close(' + n + ')"></button>'; 
}





//Заполнение после создания
h7.window.setTitle=function(n,t){
	document.getElementById('window_' + n + '_title').innerHTML=t; 
}
h7.window.setMenu=function(n,t){
	document.getElementById('window_' + n + '_menu').innerHTML=t; 
}
h7.window.setInput=function(n,t){
	document.getElementById('window_' + n + '_input').innerHTML=t; 
}
h7.window.setInputText=function(n,t){
	document.getElementById('window_' + n + '_input_text').value=t; 
	h7.window.list[n].input_text=t;
}
h7.window.setBody=function(n,t){
	document.getElementById('window_' + n + '_body').innerHTML=t;  
}
h7.window.setContent=function(n,t){
	h7.cl(n);h7.cl(t);
	document.getElementById('window_' + n + '_content').innerHTML = t;  
}












//Список окон
h7.window.list=[];

//добавить
h7.window.add=function(content1 , x ,y ,w ,h, status)
{
	if(!h7.window.content[content1])
	{
		alert ('NOT h7.window.content.this');return false;
	}
	if(!x){x=500;}
	if(!y){y=200;}
	if(!w){w=600;}
	if(!h){h=500;}
  
	if(!status){ status='open'; }
	
	
	var ln = h7.window.list.length;
	h7.window.list[ln]={};
	h7.window.list[ln].id=ln;
	h7.window.list[ln].status=status;
	h7.window.list[ln].content=content1;
	h7.window.list[ln].object=document.createElement('div');

	h7.window.list[ln].location={};
	h7.window.list[ln].location.x=x;
	h7.window.list[ln].location.y=y;

	h7.window.list[ln].size={};
	h7.window.list[ln].size.w=w;
	h7.window.list[ln].size.h=h;
	h7.window.list[ln].size.big=false;


	h7.window.list[ln].object.className='h7_window';
	if(!h7.options.phone){
		h7.window.list[ln].object.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;';
	//	h7.window.list[ln].object.onmousedown=function(){ h7.window.light(ln); };
	}

	var t_out='<div class="header" id="window_' + ln + '_header" onmousedown="h7.window.move(' + ln + ',event); return false;">' +
	'<div class="title" id="window_' + ln + '_title">' + h7.window.content[content1].title(ln) + '</div>' + h7.window.content[content1].header_button(ln,1) + '</div>';
	
	if(typeof (h7.window.content[content1].line) === "array")
	{
		for(kol9=h7.window.content[content1].line.length,i9=0;i9<kol9;i9++)
		{
			t_out+='<div class="line" id="window_' + ln + '_line_' + i9 + '">' + h7.window.content[content1].line[i9](ln) + '</div>';
		}
	}

	
	t_out+='<div class="box">';
	if(h7.window.content[content1].menu)
	{
		t_out+=	'<div id="window_' + ln + '_menu" class="menu">' + h7.menu(content1,ln) + '</div>\
		<div id="window_' + ln + '_content" class="contentm"></div>';
	}else{
		t_out+=	'<div id="window_' + ln + '_content" class="content"></div>';
	}
	t_out+='</div>';


	h7.window.list[ln].object.innerHTML=t_out;

	
	/*Создаем*/ 
	document.getElementById('h7_windows').appendChild(h7.window.list[ln].object);

	if(typeof (h7.window.content[content1].start) === "function")
	{
		h7.window.content[content1].start(ln);
	}
	return ln;

}

















/*Двигаем окна*/
h7.window.move=function(n,e){
if(!h7.options.phone){

	var mX = document.body.scrollLeft + e.clientX;
	var mY = document.body.scrollTop + e.clientY;
	
	var wX = h7.window.list[n].object.style.left;
	var wY = h7.window.list[n].object.style.top;
	
	var stop=0;

	document.onmousemove=function(e){
		if(stop==0){ 
	
		var wXn= +h7.string.only_numbers(wX) +(document.body.scrollLeft + e.clientX - mX);
		var wYn= +h7.string.only_numbers(wY) +(document.body.scrollTop + e.clientY - mY);

		if(wXn<0){wXn=0;}
		if(wYn<0){wYn=0; }

		h7.window.list[n].object.style.left = wXn + 'px';
		h7.window.list[n].object.style.top = wYn + 'px';
		}
	}

	document.onmouseup=function(){	
		if(h7.string.only_numbers(h7.window.list[n].object.style.left)<=0){
			h7.window.list[n].object.style.top='1px';
		}

		if(h7.string.only_numbers(h7.window.list[n].object.style.top)<=0){

		}


	stop=1; 
	document.onmousemove='';
	document.onmouseup='';
	}
}}





//Изменяем размер
h7.window.size=function(n, e){

	h7.window.list[n].size.big=false;

	var mX = document.body.scrollLeft + e.clientX;
	var mY = document.body.scrollTop + e.clientY;
	
	var wX = document.getElementById('window_' + n + '_body').style.width;
	var wY = document.getElementById('window_' + n + '_body').style.height;


wX=Number(wX.substr(0, wX.length - 2));
wY=Number(wY.substr(0, wY.length - 2));

	var stop=0;

	document.onmousemove=function(e){
		if(stop==0){ 
		
		var wXn= wX+(document.body.scrollLeft + e.clientX - mX);
		var wYn= wY+(document.body.scrollTop + e.clientY - mY);

		if(wXn<h7.window.size.option.min.x){wXn=h7.window.size.option.min.x;}
		if(wYn<h7.window.size.option.min.y){wYn=h7.window.size.option.min.y;}

		document.getElementById('window_' + n + '_body').style.width = wXn + 'px';
		document.getElementById('window_' + n + '_body').style.height = wYn + 'px';
		}
	}
	document.onmouseup=function(){ 
		stop=1; document.onmousemove=''; document.onmouseup=''; 
	};
}
h7.window.size.option={};
h7.window.size.option.min={};
h7.window.size.option.min.x=250;
h7.window.size.option.min.y=270;

/*//window ===========================================*/













































































/*Дополнительные функции =====================================================================*/




/* использование Math.round() даст неравномерное распределение!*/
function h7_random_int(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



h7.string={};
h7.string.only_numbers=function(t){ return parseInt(t.replace(/\D+/g,"")); }










































/*Обработка строк ==================================================*/
h7['str']={};



h7['str']['s1']=function(t){return t[0];}
h7['str']['s1']['i']='Только первый символ 12345 => 1';



h7['str']['s2']=function(t){
	var arr2=[];arr2=t.split('/'); 
	return arr2[arr2.length-1];
} 
h7['str']['s2']['i']='Имя.формат ../tre/er.txt => er.txt';



h7['str']['s3']=function(t){
  var arr2=[];arr2=t.split('.'); 
  return arr2[arr2.length-1];	
} 
h7['str']['s3']['i']='Формат ../tre/er.txt => txt ';



h7['str']['s4']=function(t){
  return t.substr(1, t.length);	
} 
h7['str']['s4']['i']='Обрезает начало 12345 => 2345';



h7['str']['s5']=function(t){
  var arr5=[];arr5=t.split('/');var str5='';
  for(i=0;i<arr5.length-1;i++){str5+=arr5[i] + '/';}
  return str5;
} 
h7['str']['s5']['i']='Путь до папки ../tre/er.txt => ../tre/';



h7['str']['s6']=function(t){
  return parseInt(t.replace(/\D+/g,""));
} 
h7['str']['s6']['i']='Со строки только цифры ..1/tr5e/e7r.txt => 157';



h7['str']['s8']=function(t){
  var arr5=[];arr5=t.split('.');
  return arr5[0];
} 
h7['str']['s8']['i']='Тащим без формата er.txt => er';


/*//Обработка строк ================================================*/








































/*Всё с cookie =====================================================*/
if (!navigator.cookieEnabled) {
  alert(h7.lang('h7 not cookie'));
}
h7.cookie={};

//Показывает, что есть в данном куки
h7.cookie.get=function(cid) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + cid.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//Ставит в данный куки инфу
h7.cookie.set=function(cid, i){
  i=i.replace ("\n\n", ' ');
  i=i.replace ("\n", ' ');
  var d = new Date(2100, 11, 17, 17, 36, 45, 567);
  document.cookie = cid + "=" + i + "; path=/; expires=" + d.toUTCString();
}

//Удаляет инфу из данного куки
h7.cookie.delete=function(cid){
  var d = new Date(0);
  document.cookie = cid + "=; path=/; expires=" + d.toUTCString();
}

/*//Всё с cookie ===================================================*/


































/*Формы вид ============================================*/
h7.form={};

//h7.form.alert('Error','Ошибка класическая', 'Хорошо', 'alert(\'HI\');')
h7.form.alert=function(title, str_html, button_y_text, str_eval_y)
{
	var ln=h7.window.add('form', 500, 200, 550, 200);
	h7.window.setContent(ln, str_html + '<div class="form1"><button onClick="h7.window.close(' + ln + ');' + str_eval_y + '">' + button_y_text + '</button></div>');
	h7.window.setTitle(ln, title);
}
//h7.form.confirm('Опасно!', 'Форматировать всю систему?', 'полное форматирование', 'h7.form.alert(\'Успешно\',\'Удаление успешно\', \'пипец..\')', 'отменить удаление');
h7.form.confirm=function(title, str_html, button_y_text, str_eval_y, button_n_text, str_eval_n)
{
	var ln=h7.window.add('form', 500, 200, 550, 200);
	h7.window.setContent(ln, str_html + '<div class="form1"><button onClick="h7.window.close(' + ln + ');' + str_eval_n + '">' + button_n_text + '</button><button onClick="h7.window.close(' + ln + ');' + str_eval_y + '">' + button_y_text + '</button></div>');
	h7.window.setTitle(ln, title);
}
h7.form.prompt=function(title, str_html, button_y_text, str_eval_y)
{
	var ln=h7.window.add('form', 500, 200, 550, 200);
	h7.window.setContent(ln, str_html + '<div class="form1"><button onClick="h7.window.close(' + ln + ');' + str_eval_y + '">' + button_y_text + '</button></div>');
	h7.window.setTitle(ln, title);
}


/*//Формы вид ============================================*/
























/*вход =========================================================*/

h7.entrance=function(){
	var arpass=window.location.href.split('?');
	if(!arpass[1]){
		
	}else{

	}
}












//Выход с сайта
//Функция для выхода с сайта с подтверждением
h7.exit=function(){
  var thisWindow = window.open(" ",'_self');
  thisWindow.close();
}


/*//вход =========================================================*/













/*h7 старт =========================================================*/
h7.pass='1';//пароль
h7.desktop.start();//создать слои рабочего стола


h7.start.box_clothes();//добавить блоки в пуск
h7.start.menu_see();//Добавить меню в пуск
h7.start.box_see('welcome start');
h7.start.button_see();//Показать кнопку пуск
h7.start.see(0);//закрыть пуск 






/*//h7 старт =======================================================*/

















/*

h7.menu.see=function(msection, n){
	var tt='';
	//h7.cl(msection);
	//h7.cl(h7.menu[msection].length);
	for(i5=0;i5<h7.menu[msection].length;i5++){
		tt+='<ul><i class="' + h7.menu[msection][i5].class + '" ';
		if(h7.menu[msection][i5].click){
			tt+='onClick="h7.menu[' + msection + '][' + i5 + '].click(' + n + ');"';
		}
		tt+='></i>';
		if(h7.menu[msection][i5].extends){
			tt+='<li>' + h7.lang(h7.menu[msection][i5].text) + '<br/>';
			for(i6=0;i6<h7.menu[msection][i5].list.length;i6++){
				tt+='<button onClick="h7.menu[' + msection + '][' + n + '].list[' + i6 + 
				'].click(' + n + ')">' + h7.lang(h7.menu[msection][i5].list[i6].text) + '</button>';
			}
			tt+='</li>';
		}
		tt+='</ul>';
	}
	return tt;
}

*/

