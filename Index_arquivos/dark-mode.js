/*1709569600000*/

var altoContrasteChecked = getCookie('altoContrasteChecked') === 'true';
$(document).ready(function () {
  //checar no cookie se ja foi ativado
  $('#toggleAltoContraste').prop('checked', altoContrasteChecked);
  if (altoContrasteChecked) {
    $('body').addClass('dark-mode');
  }
});

$(document).on("change", '#toggleAltoContraste', function () {
  var isChecked = $(this).prop("checked");

  if (isChecked) {
    $('body').addClass('dark-mode');
    setCookie('altoContrasteChecked', 'true', 30);
  } else {
    $('body').removeClass('dark-mode');
    setCookie('altoContrasteChecked', 'false', 30);
  }
});

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}