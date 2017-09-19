/**
 * Функции начала h7
 *
 * функция Проверка существования функции
 * функция Подключение файлов
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
function h7(f, j) {
	
  if (typeof h7[f] == 'function') {
    return h7[f](j);
  }
  
  console.log('h7: not function [' + func + ']');
  return 'NOT FUNCTION';
  
}


/**
 * Подключает javascript по url
 * 
 * @param {json} j обьект, который должен содержать параметр url
 */
h7.include = function(j) {
  var s = document.createElement('script'); 
  s.src = j.url;
  document.getElementsByTagName('head')[0].appendChild(s);
}


/**
 * Подключает все остальные функции
 */
h7.include({'url':'options.js'});


/**
 * Подключает остальных функций
 */
h7.include({'url':'./main/start.js'});

