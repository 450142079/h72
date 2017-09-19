/**
 * Настройки работы программ
 *
 * @author EON
 * @version 19.09.2017
 */
 
 
h7.options={
  "core":"./main/",
  "language":"ru",
  "timeout":500,
  "phone":false,
  "theme":"default"
};


if (document.documentElement.clientWidth < 700 && confirm('Phone?')) {
  h7.options.phone=true;
}


