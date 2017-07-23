﻿/* File Manager Hamster7

HAMSTER7 - файл менеджер для WEB программистов. Скорость! Удобство! Защита! 
h7api.js - JavaScript с обьектом h7, который содержит в себе структурированные методы с инструкциями, данные, и массивы, получился удобный коструктор для файл менеджера.


Что нового:
Более чистый код, из-за которого появился h7API
дало возможность легко расширять функции.

Новая возможность выбрать язык!

Полная адаптация под телефон.

Новый встроенный html визуальный редактор.

Более чистые отчёты.




 */
h7={};
h7.version='23.04.2017 1730 windows list button'; 
h7.pass='123';








/*Настройки ========================================================*/
h7.options={};
h7.options.core='./'; //Путь к файлам ядра для запросов
h7.options.lang='ru';
h7.options.timeout=500;//задержка некоторых обновлений 1000 - 1 сек


if(document.documentElement.clientWidth<700){
	h7.options.phone=true;
}else{
	h7.options.phone=false;
}

//быстрая консоль
h7.cl=function(t){ console.log(t); }

/*//Настройки ======================================================*/


























/*NEW menu==============================================================*/
h7.menu={};
/*

h7.menu - left menu

h7.menul - overlay menu

msection - string section in object h7.menu.
example h7.menu.ftp then msection == 'ftp'

 
*/
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


//h7.menu.see('ftp', 5)

/*ftp*/

h7.menu.ftp=[];

h7.menu.ftp[0]={"text":"","class":"cl1","extends":false};
h7.menu.ftp[0].click=function(n){}


h7.menu.ftp[1]={"text":"Create","class":"ico ico-new"};
h7.menu.ftp[1].text='';
h7.menu.ftp[1].class='ico ico-new';
h7.menu.ftp[1].click=function(n){
	h7.create.file(h7.window.list[n].input_text);h7.ftp.f5(n);
};

h7.menu.ftp[1].extends=true;
h7.menu.ftp[1].list=[];

h7.menu.ftp[1].list[0]={};
h7.menu.ftp[1].list[0].text='File';
h7.menu.ftp[1].list[0].click=function(n){
	h7.create.file(h7.window.list[n].input_text);h7.ftp.f5(n);
}

h7.menu.ftp[1].list[1]={};
h7.menu.ftp[1].list[1].text='Directory';
h7.menu.ftp[1].list[1].click=function(n){
	h7.create.directory(h7.window.list[n].input_text);h7.ftp.f5(n);
}

h7.menu.ftp[1].list[2]={};
h7.menu.ftp[1].list[2].text='Page';
h7.menu.ftp[1].list[2].click=function(n){
	h7.cl('no');
}







h7.menu.ftp[2]={};
h7.menu.ftp[2].text='Download';
h7.menu.ftp[2].click=function(n){
	h7.create.file(h7.window.list[n].input_text);h7.ftp.f5(n);
};
h7.menu.ftp[2].class='ico ico-download';
h7.menu.ftp[2].extends=true;
h7.menu.ftp[2].list=[];



/*//menu============================================================*/



















  
/*Язык в h7=========================================================*/
//Функция возвращает перевод строки на выбранный в настройках h7[options][lang] язык
h7.lang = function(str){
  if(h7.lang[h7.options.lang][str]){//Если в словаре есть
    return h7.lang[h7.options.lang][str];
  }else{
  	h7.cl('LANG[' + h7.options.lang + ']not:' + str);
    return str;
  }
}



/*Для хранения языка*/
//h7m['lang']={};
h7['lang']['ru']={
  'test':'Тест, функция h7lang работает!',
  'Pass not exist!':'Пароль на h7 не установлен!',
  'File exist!':'Данный файл уже существует!',
  'Print name':'Введите имя',
  'Del ':'Удалить ',
  'Options':'Настройки',
  'Files & folders':'Проводник',
  'Apps & links':'Приложения',
  'Report':'Отчёты',
  'Marked':'Отмеченные',
  'Create file! Where?':'Создать файл! Где?',
  'Create file! How to name?':'Как назвать новый файл?',
  'New file ':'Новый файл ',
  'New directory ':'Новая папка ',
  'Create directory! Where?':'Где создаём папку?',
  'Create directory! How to name?':'Как назвать новую папку?',
  'Rename ':'Переименовать ',
  ' to ':' в ',
  'Move ':'Переместить ',
  'Copy ':'Копировать ',
  'Marked':'Отмеченные',
  'Marked':'Отмеченные',
  'Marked':'Отмеченные',
  'Marked':'Отмеченные',
  'Marked':'Отмеченные',
  'Marked':'Отмеченные',
  'Pass incorrect!':'Неверный пароль!'};

  
/*//Язык ===========================================================*/























/*Запросы =========================================================*/

//1 путь к php
//2 массив данных
//3 функция, в которую попадёт ответ 0 аргументом
//4 дополнительный второй аргумент функции куда попадёт ответ \n\
h7.ajax=function(WherePhp, ArrRequest , FunctionRetrn, FRArgument1){
	if(!WherePhp){return false;}

	var TextReqest='';
	for(i7=0;i7<ArrRequest.length;i7++){
		TextReqest+='r' + i7 + '=' + ArrRequest[i7] + '&';
	}
  var h7w = new XMLHttpRequest();
  h7w.open('POST', h7.options.core + WherePhp, true);
  h7w.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  h7w.send('p=' + h7.pass + '&' + TextReqest);
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








/*
//0 
//1 сам запрос пример new~123.txt~f \n\
//2 Функция, куда попадёт ответ первым аргументом \n\
//3 дополнительный второй аргумент функции куда попадёт ответ \n\
//4 id для возврата запроса \n\
//5 массивный текст для сохранения в файл';
h7.ajax=function(request, function1, argument1, h7id, text){
  var arr = request.split('~'); 
  var h7w = new XMLHttpRequest();
  h7w.open('POST', h7.options.core + arr[0] + '.php', true);
  h7w.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  h7w.send('p=' + h7.pass + '&r=' + request + '&h7id=' + h7id + '&text=' + text);
    h7w.onreadystatechange = function(){
        if(h7w.readyState != 4){ return false; }
        if(h7w.status != 200){
          alert(h7w.status + ': ' + h7w.statusText);
        } else {
          function1(h7w.responseText, argument1);
        }
    }
}
*/




/*Загрузка файлов через ajax
//НЕ РАБОТАЕТ Функция для загрузки файлов
h7['ajax']['file']=function(n){
otchet('[i] загрузка файла ' + document.getElementById('file_' + n).files[0].name); 

var w = new XMLHttpRequest();
w.open('POST', './upload.php', false);
var formData = new FormData();
formData.append('s', m['pass'] + '~' + document.getElementById('in_' + n).value);
formData.append("myfile", document.getElementById('file_' + n).files[0], document.getElementById('file_' + n).files[0].name);
w.send(formData); 

otchet(w.responseText); 

b_f5(n);
}
*/

/*//запросы ======================================================*/

















/*Подключение модулей====================*/
h7.include=function(url){
    var script = document.createElement('script');script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
/*//Подключение модулей====================*/













/*Рабочий стол ====================================*/

h7.desktop={};

//Строка, которая будет в body при старте
h7.desktop.data='';
h7.desktop.add=function(str){
	h7.desktop.data+=str;
}
h7.desktop.start=function(){
	document.getElementsByTagName('body')[0].innerHTML=h7.desktop.data;
}


h7.desktop.add('<div id="h7_desktop">\
	</div>');

/*//Рабочий стол ==================================*/











/*Пуск ====================================*/

//button
h7.start={}
h7.start.open=false;

//open 1 или 0
h7.start.click=function(y){
	if(y==0){
		document.getElementById("h7_start_data").className='h7_start_close';
		h7.start.open=false;
		return true;
	}
	if(y==1){
		document.getElementById("h7_start_data").className='h7_start_open';
		h7.start.open=true;
		return true;
	}

	if(h7.start.open){
		document.getElementById("h7_start_data").className='h7_start_close';
		h7.start.open=false;
	}else{
		document.getElementById("h7_start_data").className='h7_start_open';
		h7.start.open=true;
	}
}
h7.start.l={};
h7.start.l.str='';
h7.start.l.quantity=0;
h7.start.l.add=function(name, click, img_position, light_click){ 
	h7.start.l.str+='<button onClick="h7.start.l.marked(' + h7.start.l.quantity + ');\
	 ' + click + '" style="background-position: 0px -' + img_position + 'px;">' + h7.lang(name) + '</button>'; 
	 h7.start.l.quantity++;
}
h7.start.l.start=function(){
	document.getElementById("h7_start_l").innerHTML=h7.start.l.str;
}
h7.start.l.marked=function(n){
	for(i6=0;i6<h7.start.l.quantity;i6++){
		if(i6==n){
			document.getElementById('h7_start_l').getElementsByTagName('button')[n].className='select';
		}else{
			document.getElementById('h7_start_l').getElementsByTagName('button')[i6].className=' ';
		}
	}
}

h7.desktop.add('<button id="h7_start_button" onClick="h7.start.click()"> </button>');

h7.desktop.add('<div id="h7_start_data" class="h7_start_close">\
	<div id="h7_start_l"></div>\
	<div id="h7_start_r"></div>\
	</div>');

h7.start.l.add('Options', 'h7.start.r.options();', 40);
h7.start.l.add('Files & folders', 'h7.window.add(\'ftp\' , \'..\')', 560, false);
h7.start.l.add('Apps & links', 'h7.start.r.apps(); h7.link.show(\'h7_desktop\')', 840);//h7_desktop
h7.start.l.add('Report', 'h7.report.see(\'h7_start_r\');', 120);
h7.start.l.add('Marked', 'alert(4)', 280);
























h7.start.r={};
h7.start.r.see=function(str){
	document.getElementById('h7_start_r').innerHTML=str;
}

h7.start.r.apps=function(){
	h7.start.r.see('<h1>Apps & links</h1>');
}

h7.start.r.options=function(){
	h7.start.r.see('<h1>Options H7</h1>\
		<h1>Hamster7</h1>\
		<h2>' + h7.version + '</h2>\
		adminer  https://www.adminer.org'		);

}







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















/*ссылки ========================================================*/


//ссылки
h7.link={};
//Список
h7.link.list=[];

h7.link.new=function(url, name, img, sorting){
    if(!url){ url=prompt('url', ''); }
    if(!name){ name=prompt('name', ''); }
    if(!img){ img=prompt('url img', 'scrin'); }
    
	if(!url){ return false; }
	

	
    if(!name){ 	var arr=url.split('/'); name=arr[2]; }
    if(!img){ img='/h7/link/default.png'; }
    if(!sorting){ sorting=1000; }
    
    
    
    
    //alert(url + name + img + sorting);
    
    var h7id= h7.report.add('New link', 1);
    h7.ajax('link/add~' + url + '~' + name + '~' + img + '~' + sorting, h7.report.add, 2, h7id);
    
    setTimeout(h7.link.show() , 4000);
}








h7.link.add=function(where_i, url, name, img, sorting){
    if(!url || !where_i){ return false; }
    if(!name){ name=url; }
    if(!img){ img='./link/default.png'; }
    if(!sorting){ sorting=1000; }
    var ls=h7.link.list.length;
    h7.link.list[ls]={};
    h7.link.list[ls]['where_i']=where_i;
    h7.link.list[ls]['url']=url;
    h7.link.list[ls]['name']=name;
    h7.link.list[ls]['img']=img;
    h7.link.list[ls]['sorting']=sorting;
}


//Делает запрос в базу ссылок
h7.link.show=function(id_where){
	if(!id_where){ return false; }

	var h7id=h7.report.add('Show link ', 0);
	h7.ajax('link/see', h7.link.see, id_where);
    
};

//Получает ответ и отображает базу ссылок
h7.link.see=function(strLi, id_where){
     if(!strLi){ return false; }
     if(!id_where){ return false; }
    var str_a='';
    var arr1=strLi.split('<#h7#>');
    var arr2=[];
	for(i9=0;i9<arr1.length;i9++){
		if(arr1[i9]){
			arr2=[];
			arr2=arr1[i9].split('<h7>');
			str_a+='<a class="h7_link_el h7inf_' + arr2[0] + '" href="' + arr2[1] + '" style="background-image:url(\'' + arr2[3] + '\')" target="_blank">\
			<p>' + arr2[2] + '</p>\
			</a>';			
		}
	}
	document.getElementById(id_where).innerHTML='<a onClick="h7.link.new();" class="h7_link_el" style="background-image:url(\'/h7/link/add.png\')" ><p>Add link</p></a>' + str_a;
}





/*//ссылки ========================================================*/


















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









//поиск
h7.search={};
h7.search.name=function(url){

}
h7.search.string=function(url){

}

















//Создаем
h7.create={};
h7.create.file = function(where, name, content, access){
	if(!where){ where=prompt(h7.lang('Create file! Where?'), '..'); }
	if(!where){ return false; }
	if(!name){ name=prompt(h7.lang('Create file! How to name?'), 'myfile.txt'); }
	if(!name){ return false; }
	if(!content){ content=' '; }
	if(!access){ access=h7.create.file.settings.access; }

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







/*//Стандартные функции ===========================================*/










































/*window ===========================================*/




h7.window={};



h7.window.hide=function(n){}
h7.window.stretch=function(n){}
h7.window.close=function(n){
	h7.window.list[n].object.parentNode.removeChild(h7.window.list[n].object);
	h7.window.list[n].status='close';
}










//Основные функции шаблонов (start - после первого открытия окна)
h7.window.f={};



h7.window.f.ftp={};
h7.window.f.ftp.start=function(n){
	h7.see(n , '..');



h7.window.menu(n, '<ul onclick="h7.ftp.back(' + n + ')"><i class="ico ico-back"></i></ul>\
    <ul><i class="ico ico-new"></i><li>Создать<br/>\
		<button onClick="h7.create.file(h7.window.list[' + n + '].input_text);h7.ftp.f5(' + n + ');">Файл</button>\
    	<button onClick="h7.create.directory(h7.window.list[' + n + '].input_text);h7.ftp.f5(' + n + ');">Папку</button>\
    	<button onClick="alert(7);">Страницу</button>\
	</li></ul>\
	<ul><i class="ico ico-download"></i><li>Загрузить<br/>\
		<input id="h7_цштвщfile_' + n + '" type="file" name="myfile" />\
		<button onclick="h7_file_' + n + '.click();">Выбрать файл</button>\
		<button onclick="b_upload(' + n + ')">Загрузить выбр</button>\
    <button onClick="b_urlins7(' + n + ');">Загрузить с URL</button>\
	</li></ul>\
	<ul><i class="ico ico-pam"></i><li>Выделенное<br/>\
    <button onClick="b_pusk_pam();pusk(1);">Смотреть</button>\
	<button onClick="pam_copypast(' + n + ');b_f5(' + n + ');">Копировать сюда</button>\
    <button onClick="pam_cutpast(' + n + ');b_f5(' + n + ');">Переместить сюда</button>\
	<button onClick="pam_clear();b_f5(' + n + ');">Отменить</button>\
	<button onClick="b_archive(' + n + ');">Архивировать</button>\
    <button onClick="pam_del();b_f5(' + n + ');">Удалить</button>\
    <button onClick="pam_mark(' + n + ', \'h\')">Выделить папки</button>\
	<button onClick="pam_mark(' + n + ', \'f\')">Выделить файлы</button>\
	<button onClick="pam_mark_all(' + n + ')">Выделить всё</button>\
	<button onClick="pam_mark_all_not(' + n + ')">Отменить в папке</button>\
    <button onClick="b_mail();"><img scr="./i/in.png" />Отправить на почту</button>\
	</li></ul>\
	<ul><i class="ico ico-all"></i><li>Прочее<br/>\
	<button onclick="b_search_str(' + n + ')">Искать строку</button>\
	<button onclick="b_desk_mark(' + n + ');">В закладки</button>\
    <button onClick="wind_add(\'ftp\', document.getElementById(\'in_' + n +'\').value, 444,494,600,400);b_m();"><img scr="" />Дублировать окно</button>\
	<button onClick="b_f5(' + n + ')">Обновить данные</button>\
	<button onclick="b_back(' + n + ')">Перейти обратно</button>\
	<button onclick="document.getElementById(\'see_' + n + '\').className=\'see_bg bg_2\'">Вид список</button>\
	<button onclick="document.getElementById(\'see_' + n + '\').className=\'see_bg bg_1\'">Вид блоки</button>\
	</li></ul>');



}










//Темы
h7.window.thems={};
h7.window.thems.ftp=1;



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
h7.window.header_text=function(n,t){
	document.getElementById('window_' + n + '_header_text').innerHTML=t; 
}
h7.window.menu=function(n,t){
	document.getElementById('window_' + n + '_menu').innerHTML=t; 
}
h7.window.input=function(n,t){
	document.getElementById('window_' + n + '_input').innerHTML=t; 
}
h7.window.input_text=function(n,t){
	document.getElementById('window_' + n + '_input_text').value=t; 
	h7.window.list[n].input_text=t;
}
h7.window.body=function(n,t){
	document.getElementById('window_' + n + '_body').innerHTML=t;  
}














/*


switch(mod){
   case 'ftp':{

if(txt=='Seven7'){txt='..';}
	wind[n]['name'] ='FM w' + n;
	
    wind[n]['obj'].innerHTML='<h6  style=" cursor: move; " onmousedown="wind_move(' + n + ',event); return false;" >' + wind[n]['name'] + '<i onClick="wind_del(' + n + ')" class="ico ico-3"></i><i onClick="wind_size_full(' + n + ');" class="ico ico-2"></i><i onclick="wind_hid(' + n + ');b_pusk_hid();" class="ico ico-1"></i></h6>\
<div class="see_bg_menu">\
	<ul onclick="b_back(' + n + ')"><i class="ico ico-back"></i></ul>\
    <ul><i class="ico ico-new"></i><li>Создать<br/>\
	<button onClick="h7_new(document.getElementById(\'in_' + n + '\').value, \'f\');b_f5(' + n + ');">Файл</button>\
    <button onClick="h7_new(document.getElementById(\'in_' + n + '\').value, \'h\');b_f5(' + n + ');">Папку</button>\
	</li></ul>\
	<ul><i class="ico ico-download"></i><li>Загрузить<br/>\
		<input id="file_' + n + '" type="file" name="myfile" />\
		<button onclick="b_upload(' + n + ')">Загрузить выбр</button>\
    <button onClick="b_urlins7(' + n + ');">Загрузить с URL</button>\
	</li></ul>\
	<ul><i class="ico ico-pam"></i><li>Выделенное<br/>\
    <button onClick="b_pusk_pam();pusk(1);">Смотреть</button>\
	<button onClick="pam_copypast(' + n + ');b_f5(' + n + ');">Копировать сюда</button>\
    <button onClick="pam_cutpast(' + n + ');b_f5(' + n + ');">Переместить сюда</button>\
	<button onClick="pam_clear();b_f5(' + n + ');">Отменить</button>\
	<button onClick="b_archive(' + n + ');">Архивировать</button>\
    <button onClick="pam_del();b_f5(' + n + ');">Удалить</button>\
    <button onClick="pam_mark(' + n + ', \'h\')">Выделить папки</button>\
	<button onClick="pam_mark(' + n + ', \'f\')">Выделить файлы</button>\
	<button onClick="pam_mark_all(' + n + ')">Выделить всё</button>\
	<button onClick="pam_mark_all_not(' + n + ')">Отменить в папке</button>\
    <button onClick="b_mail();"><img scr="./i/in.png" />Отправить на почту</button>\
	</li></ul>\
	<ul><i class="ico ico-all"></i><li>Прочее<br/>\
	<button onclick="b_search_str(' + n + ')">Искать строку</button>\
	<button onclick="b_desk_mark(' + n + ');">В закладки</button>\
    <button onClick="wind_add(\'ftp\', document.getElementById(\'in_' + n +'\').value, 444,494,600,400);b_m();"><img scr="" />Дублировать окно</button>\
	<button onClick="b_f5(' + n + ')">Обновить данные</button>\
	<button onclick="b_back(' + n + ')">Перейти обратно</button>\
	<button onclick="document.getElementById(\'see_' + n + '\').className=\'see_bg bg_2\'">Вид список</button>\
	<button onclick="document.getElementById(\'see_' + n + '\').className=\'see_bg bg_1\'">Вид блоки</button>\
	</li></ul>\
</div>\
<div class="bl_bg" id="bl_' + n + '" style="width:' + w + 'px;height:' + h + 'px;">\
<i class="ico ico-5" onclick="b_f5(' + n + ')"></i>\
<input id="in_' + n + '" type="text" value="' + txt + '" />\
<div  class="see_bg bg_1" id="see_' + n + '"></div>\
<i class="ico ico-4" onmousedown="wind_size(' + n + ',event); return false;"></i>\
</div>'; 
ajax_see(n,document.getElementById('in_' + n).value);




break;}

   case 'edit':{
	   wind[n]['name'] ='Edit w' + n + ' ' + s2(txt);
	   wind[n]['obj'].innerHTML='<h6  style=" cursor: move; " onmousedown="wind_move(' + n + ',event); return false;" >' + wind[n]['name'] + '<i onClick="wind_del(' + n + ')" class="ico ico-3"></i><i onClick="wind_size_full(' + n + ');" class="ico ico-2"></i><i onclick="wind_hid(' + n + ');b_pusk_hid();" class="ico ico-1"></i></h6>\
	   <div class="see_bg_menu">\
<ul><i class="ico ico-file"></i><li>Файл<br/>\
  <button onClick="b_file_save(' + n + ')">Сохранить</button>\
  <button onClick="b_file_save(' + n + ');wind_del(' + n + ');">Сохранить и выйти</button>\
  <button onclick="ajax(\'weight~\' + document.getElementById(\'in_' + n + '\').value);b_m();">Размер</button>\
</li></ul>\
<ul><i class="ico ico-git"></i><li>Откат<br/>\
	<button onClick="b_git_save(' + n + ')">Сохранить</button>\
	<button onClick="b_git_see(' + n + ')">Список версий</button>\
</li></ul>\
<ul><i class="ico ico-all"></i><li>Прочее<br/>\
<button onclick="b_desk_mark(' + n + ');">В закладки</button>\
</li></ul>\
</div>\
<div class="bl_bg" id="bl_' + n + '" style="width:' + w + 'px;height:' + h + 'px;">\
<input id="in_' + n + '" type="text" value="' + txt + '" />\
<textarea class="see_bg" id="see_' + n + '" style="background:#333;" > </textarea>\
<i class="ico ico-4" onmousedown="wind_size(' + n + ',event); return false;"></i>\
</div>';

break;}

   case 'edit2':{
	   wind[n]['name']='EDIT2 w' + n + ' ' + s2(txt);
	   wind[n]['obj'].innerHTML='<h6  style=" cursor: move; " onmousedown="wind_move(' + n + ',event); return false;" >' + wind[n]['name'] + '<i onClick="wind_del(' + n + ')" class="ico ico-3"></i><i onClick="wind_size_full(' + n + ');edit_mm[' + n + '].resize();" class="ico ico-2"></i><i onclick="wind_hid(' + n + ');b_pusk_hid();" class="ico ico-1"></i></h6>\
<div class="see_bg_menu">\
<ul><i class="ico ico-file"></i><li>Файл<br/>\
	<button onClick="b_file_save2(' + n + ')">Сохранить</button>\
	<button onClick="b_file_save2(' + n + ');wind_del(' + n + ');">Сохранить и выйти</button>\
	<button onclick="ajax(\'weight~\' + document.getElementById(\'in_' + n + '\').value);b_m();">Размер</button>\
</li></ul>\
<ul><i class="ico ico-git"></i><li>Откат<br/>\
	<button onClick="b_git_save(' + n + ',\'edit2\')">Сохранить</button>\
	<button onClick="b_git_see(' + n + ',\'edit2\')">Список версий</button>\
</li></ul>\
<ul><i class="ico ico-all"></i><li>Прочее<br/>\
	<button onclick="b_desk_mark(' + n + ');">В закладки</button>\
    <button onClick="edit_mm[' + n + '].resize();">Обновить размер</button>\
	<button onClick="b_m(\'edit2_them\',0,' + n + ', event);">Тема</button>\
	<button onClick="b_m(\'edit2_lang\',0,' + n + ', event);">Язык</button>\
	<button onClick="b_m(\'edit2_fontsize\',0,' + n + ', event);">Размер шрифта</button>\
</li></ul>\
</div>\
<div class="bl_bg" id="bl_' + n + '" style="width:' + w + 'px;height:' + h + 'px;">\
<input id="in_' + n + '" type="text" value="' + txt + '" disabled />\
<div id="see_' + n + '"  class="edit2_0" > </div>\
<i class="ico ico-4" onmousedown="wind_size(' + n + ',event); return false;" onmouseup="edit_mm[' + n + '].resize();"></i>\
</div>'; 

break;}

   case 'browser':{
	   wind[n]['name']='Browser w' + n + ' ' + s2(txt);
	   wind[n]['obj'].innerHTML='<h6  style=" cursor: move; " onmousedown="wind_move(' + n + ',event); return false;" >' + wind[n]['name'] + '<i onClick="wind_del(' + n + ')" class="ico ico-3"></i><i onClick="wind_size_full(' + n + ');" class="ico ico-2"></i><i onclick="wind_hid(' + n + ');b_pusk_hid();" class="ico ico-1"></i></h6>\
	   <input id="in_' + n + '" type="text" value="' + txt + '" />\
<button onClick="b_frame_go(' + n + ')"><img src="./i/gt.png" /></button>\
<br/>\
<iframe src="' + txt + '"; style="background:#eee;width:' + w + 'px;height:' + h + 'px;" id="see_' + n + '" class="see_bg" frameborder="0px" scrolling="yes">iframe</iframe>\
<i class="ico ico-4" onmousedown="wind_size(' + n + ',event); return false;" ></i>\
';


 break;}



case 'mp3':{
	wind[n]['name']='Music w' + n + ' ' + s2(txt);
	wind[n]['obj'].innerHTML='<h6  style=" cursor: move; " onmousedown="wind_move(' + n + ',event); return false;" >' + wind[n]['name'] + '<i onClick="wind_del(' + n + ')" class="ico ico-3"></i><i onClick="wind_size_full(' + n + ');" class="ico ico-2"></i><i onclick="wind_hid(' + n + ');b_pusk_hid();" class="ico ico-1"></i></h6>\
<audio controls="controls" autoplay="autoplay" loop="loop"><source src="' + txt + '" type="audio/mpeg"><a href="' + txt + '" target="_blanck">Скачать</a></audio><br/>';


 break;}


  
   case 'mail':{
     wind[n]['name'] ='Mail w' + n;
     wind[n]['obj'].innerHTML='<h6  style=" cursor: move; " onmousedown="wind_move(' + n + ',event); return false;" >' + wind[n]['name'] + '<i onClick="wind_del(' + n + ')" class="ico ico-3"></i><i onClick="wind_size_full(' + n + ');" class="ico ico-2"></i><i onclick="wind_hid(' + n + ');b_pusk_hid();" class="ico ico-1"></i></h6>\
<div class="see_bg_menu">\
<ul onclick="b_mail_go(' + n + ');"><i class="ico ico-mail"></i><li>Отправить</li></ul>\
<ul onclick="b_pusk_pam();"><i class="ico ico-file"></i><li>Просмотреть прикрепленные файлы</li></ul>\
</div>\
<div class="bl_bg" id="bl_' + n + '" style="width:' + w + 'px;height:' + h + 'px;">\
<input id="in_' + n + '" type="text" value="k5pr@ya.ru" />\
<input id="in0_' + n + '" type="text" value="Seven7@' + window.location.hostname + '" />\
<input id="in1_' + n + '" type="text" value="Тема" />\
<textarea class="see_bg" id="see_' + n + '" style="background:#333;" ><h1 style="background:#999;color:#fff;">HAMSTER7</h1></textarea>\
<i class="ico ico-4" onmousedown="wind_size(' + n + ',event); return false;"></i>\
</div>';

break;}



   default:{
    wind[n]['obj'].innerHTML='<h6 id="wind_' + n + '" style=" cursor: move; " onmousedown = "mouse_in(' + n + ');" onmouseup="mouse_out(' + n + ');" >Seven7<button onClick="wind_del(' + n + ')">x</button><button>o</button><button>-</button></h6>\
<div style="background:#eee;width:' + w + 'px;height:' + h + 'px;">' + txt + '</div>';
   }
}

b_pusk_hid();
*/




h7.window.list=[];
h7.window.light=function(){}

h7.window.add=function(template , ar0json , x ,y ,w ,h, status){
  if(!x){x=500;}
  if(!y){y=200;}
  if(!w){w=600;}
  if(!h){h=500;}
  
  
  if(!template){ mod='ftp'; }
  if(!ar0json){ ar0json={}; }
  if(!status){ status='open'; }

  var ln = h7.window.list.length;
  h7.window.list[ln]={};
  h7.window.list[ln].id=ln;
  h7.window.list[ln].status=status;
  h7.window.list[ln].template=template;
  h7.window.list[ln].object=document.createElement('div');
  h7.window.list[ln].input_text=ar0json.input_text;

  h7.window.list[ln].location={};
  h7.window.list[ln].location.x=x;
  h7.window.list[ln].location.y=y;

  h7.window.list[ln].size={};
  h7.window.list[ln].size.w=w;
  h7.window.list[ln].size.h=h;
  h7.window.list[ln].size.big=false;


h7.window.list[ln].object.className='h7_window';

if(!h7.options.phone){
	h7.window.list[ln].object.style.cssText = 'left:' + x + 'px;top:' + y + 'px;';
	h7.window.list[ln].object.onmousedown=function(){ h7.window.light(ln); };
}

h7.window.list[ln].object.innerHTML=h7.window.templates.window(ln, template, ar0json, w, h);
//document.getElementById('window_' + ln + '_body').style.cssText = 'width:' + w + 'px;height:' + h + 'px;';



 /*Создаем*/ 
 document.body.appendChild(h7.window.list[ln].object);
 h7.window.light(ln);
 h7.window.f[template].start(ln);
return ln;




//поле для списка окон
h7.desktop.add('<div id="h7_windows_list"></div>');
h7.window.show={};
h7.window.show.list=function(){
	var str='';
	for(i3=0;i3<h7.window.list.length;i3++){
		if(1){
			str+='';
		}
	}
}




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


h7.form.alert=function(function1, str_html, button_y){}
h7.form.confirm=function(function1, str_html, button_y, button_n){}
h7.form.prompt=function(function1, str_html, button_y, button_n, inpt){}


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
h7.desktop.start();
h7.start.l.start();
//h7.link.show('h7_desktop');








/*//h7 старт =======================================================*/





















