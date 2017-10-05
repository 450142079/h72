/**
 * Функции начала h7
 *
 * функция Проверка существования функции
 * функция Подключение файлов
 * язык 
 * подключение настроек
 * подключение последовательности запуска
 *
 * @author EON
 * @version 19.09.2017
 */

 
/**
 * Возвращает ответ от функции, которую запрашивает, если её нет, то сообщает об этом в консоли
 * 
 * @param {function} f Функция, которую будет запрашивать 
 * @param {json} j объект, который передаётся аргументом в запрашиваемой функции
 * @return {all}
 */
/*function h7(f, j) {
	
  if (typeof h7[f] == 'function') {
    return h7[f](j);
  }
  
  console.log('h7: not function [' + func + ']');
  return 'NOT FUNCTION';
  
}*/
h7={"version":"04.10.17"};


/**
 * Подключает javascript по url
 * 
 * @param {string} s строка с url
 */
h7.include = function(s) {
  var sc = document.createElement('script'); 
  sc.src = s;
  document.getElementsByTagName('head')[0].appendChild(sc);
}


/**
 * Подключает переводит текст если есть перевод
 * 
 * @param {string} s обьект, который должен содержать параметр url
 * @return {string}
 */
h7.lang = function(s) {
  if(h7.lang[h7.options.language] != undefined) {

    if(h7.lang[h7.options.language][s] != undefined) {
      return h7.lang[h7.options.language][s];
	}
	
	console.log('LANG[' + h7.options.lang + ']not:' + s);
    return s;
  }
}




/**
 * Стандартные функции java
 * 
 * @param {string} s обьект, который должен содержать параметр url
 * @return {string}
 */
h7.alert = function(t) {
  alert(t);
} 
h7.confirm = function(t) {
  return confirm(t);
} 
h7.prompt = function(t, s) {
  return prompt(t, s);
} 



/**
 * Подключает настройки
 */
h7.include('./options.js');


/**
 * Подключает остальных функций
 */
h7.include('./main/start.js');

