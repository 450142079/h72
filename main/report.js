/**
 * Отчёты
 *
 * Функция возвращающая время
 * Объект отчёта
 * функция Подключение файлов
 * язык 
 * подключение настроек
 * подключение последовательности запуска
 *
 * @author EON
 * @version 04.10.2017
 */


h7.time = function() {

  var d = new Date();
  var th='', tm='', ts='';

  if(d.getHours()<10){th='0';}
  if(d.getMinutes()<10){tm='0';}
  if(d.getSeconds()<10){ts='0';}

  return '' + th + d.getHours() + ':' + tm + d.getMinutes() + '.' + ts + d.getSeconds();
}





h7.rand = function(min, max) {
  return Math.random() * (max - min) + min;
}













/*Отчётность ======================================================*/
h7.report={"list":[{"status":"T","text":"HAMSTER7 [" + h7['version'] + "]","time":"" + document.lastModified}]};





//Добавление инфы в отчет
//1. сам текст,
//2. статус: ничего 0, запрос=1, ответ=2
//Ответ(статус 2) ожидается в формате status<h7>id<h7>text';

//type text le
//статусы
//T текст
//L Ожидание
//E Ответ пришёл с ошибкой
//R ответ с удачей
h7.report.add = function(j) {

  var le=h7.report.list.length;
  
  switch(j.type){

    case 'request':{
      h7.report.list[le] = {};
      h7.report.list[le]['time'] = h7.time();
      h7.report.list[le]['text'] = j.text;
      h7.report.list[le]['status']='L';
      return le;
    }

    case 'answer':{
      le = j.le;	

      h7.report.list[le]['answer_time'] = h7.time();
      h7.report.list[le]['answer_text'] = j.text;
      var st='E';

      if (j.text[0]=='V' ) {
        st='R';
      }

      h7.report.list[le]['status']=st;
      break;
    }

    default:{
      h7.report.list[le] = {};
      h7.report.list[le]['time'] = h7.time();
      h7.report.list[le]['text'] = j.text;
      h7.report.list[le]['status']='T';
      return le;
    }

  }

}



h7.report.console = function() {

  le = h7.report.list.length - 1;
  for ( i=le; i >= 0; i-- ) {
    console.log('[' + h7.report.list[i]['status'] + i + '] ' +
     h7.report.list[i]['text'] + '|' + h7.report.list[i]['answer_text']);
  }
}

/*Показать отчёт
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
	*/


/*//Отчётность ====================================================*/



