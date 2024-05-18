/*1709569600000*/
/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

/*
 * This function gets loaded when all the HTML, not including the portlets, is
 * loaded.
 */
AUI().ready(function () {


});

/*
 * This function gets loaded after each and every portlet on the page.
 *
 * portletId: the current portlet's id
 * node: the Alloy Node object of the current portlet
 */

Liferay.Portlet.ready(function () {

});

/*
 * This function gets loaded when everything, including the portlets, is on
 * the page.
 */

Liferay.on("allPortletsReady", function () {
  if ($(".lfr-pagination").length > 0) {
    $(".lfr-pagination").each(function () {
      var insertSeletor = $(this).find("ul.pagination .page-item:nth-child(2)");
      var pages = $(this).find(".lfr-menu-list").detach();

      $("<li class='page-item pages'></li>").insertAfter(insertSeletor);
      $(this).find(".page-item.pages").append(pages);
      $(this).find(".page-item a:contains('Anterior')").html("<i class='fas fa-chevron-left'></i>");
      $(this).find(".page-item a:contains('Próximo')").html("<i class='fas fa-chevron-right'></i>");
      
      if (Liferay.currentURL.toString().indexOf("_cur=") > -1) {
        $(this).find(".page-item .lfr-menu-list a").each(function () {
          let currentURL = Liferay.currentURL.toString().split("_cur=")[1];
          let href = $(this).attr("href").toString().split("_cur=")[1];
          if (href == currentURL) {
            $(this).addClass("active");
          }
        });
      } else {
        $(this).find(".page-item .lfr-menu-list a").first().addClass("active");
      }
    });
  }
});


/* Disable SPA */
Liferay.on('beforeNavigate', function (event) {
  if (event.path.indexOf("control_panel") !== -1 ||
      (document.location.href.indexOf("control_panel") !== -1 &&
          event.path.indexOf("control_panel") === -1)) {
    document.location.href = event.path;
  }
  Liferay.lastModifiedDate = null;
});

window.onload = function() {
  $('.br-sign-in').removeClass('d-none');
  var url = window.location.href;
  if (url.indexOf("com_liferay_login_web_portlet_LoginPortlet_INSTANCE_ebLoginPortlet") != -1 &&
      url.indexOf("mvcRenderCommandName") == -1) {
    $('#modal-login').modal('show');
  }

  function addModalOpenClass() {
    $('html').addClass('modal-open');
  }

  function removeModalOpenClass() {
    $('html').removeClass('modal-open');
  }

// Check if the href exists

// Find the <a> element with the specified href
  var passowordTag = $('#modal-login a[href*="LoginPortlet_INSTANCE_ebLoginPortlet_mvcRenderCommandName=%2Flogin%2Fforgot_password"]');
  if (passowordTag.length > 0) {
    // Find the .taglib-text within the parent of the <a> element and change its text
    passowordTag.parent().find('.taglib-text').text('Esqueci a Senha ou Primeiro Login');
  }




  var observerConfig = {
    attributes: true,
    attributeFilter: ['class'],
    childList: false,
    subtree: false
  };

  function classChangeCallback(mutationsList, observer) {
    mutationsList.forEach(function (mutation) {
      if (mutation.target === document.body && mutation.attributeName === 'class') {
        var bodyClasses = $(document.body).attr('class');
        if (bodyClasses.includes('modal-open')) {
          addModalOpenClass();
        } else {
          removeModalOpenClass();
        }
      }
    });
  }

  var observer = new MutationObserver(classChangeCallback);
  observer.observe(document.body, observerConfig);



};

var modals = $('.modal');

modals.on('show.bs.modal', function () {
  modals.not(this).modal('hide');
  $(this).css('z-index', 9999);
});

modals.on('hidden.bs.modal', function () {
  $(this).css('z-index', '');
});



/* fix scroll header */
window.addEventListener('scroll', function() {
  var headerTopHeight = document.querySelector('.header-top').offsetHeight;
  var header = document.querySelector('.br-header');
  var content = document.querySelector('#content');

  if (window.scrollY > headerTopHeight) {
    header.classList.add('compact');
    content.style.marginTop = '144px';
  } else {
    header.classList.remove('compact');
    content.style.marginTop = '0px';
  }
});