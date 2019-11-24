// ==UserScript==
// @name         xivanalysis Link on FF Logs
// @description  Create Links to xivanalysis on FF Logs Reports
// @version      1.0.5
// @author       xPumaa
// @license      GPL-3.0; http://www.gnu.org/licenses/gpl-3.0.txt
// @namespace    https://github.com/xPumaa/xivanalysis-link-on-fflogs
// @updateURL    https://github.com/xPumaa/xivanalysis-link-on-fflogs/raw/master/fflogs.user.js
// @icon         https://xivanalysis.com/logo.png
// @match        https://*.fflogs.com/reports/*
// ==/UserScript==

(function() {
  "use strict";
  (new MutationObserver(check)).observe(document, {childList: true, subtree: true});

  function check(changes, observer) {
    if(document.querySelector('#fight-details--2-0')) {
      observer.disconnect();
      var logCode, s1, s2, img, d1, d2;
      var pageURL = window.location.href;
      var baseURL = 'https://xivanalysis.com/find/';
      var slashCount = pageURL.match(/\//g).length;
      var slashIndex = pageURL.lastIndexOf('/');
      var hashtagIndex = pageURL.lastIndexOf('#');
      var a1 = document.createElement('a');
      var a2 = document.createElement('a');
      s1 = document.createElement('span');
      s2 = document.createElement('span');
      img = document.createElement('img');
      d1 = document.getElementById('fight-details--2-0');
      d2 = document.getElementById('top-level-view-tabs');

      if (slashCount == 4) {
        if (hashtagIndex == -1) {
          logCode = pageURL.substr(slashIndex + 1);
        } else {
          logCode = pageURL.substr(slashIndex + 1, hashtagIndex - slashIndex - 1);
        }
      } else if (slashCount >= 5) {
        slashIndex = pageURL.split('/', 4).join('/').length;
        if (hashtagIndex == -1) {
          logCode = pageURL.substr(slashIndex + 1);
        } else {
          logCode = pageURL.substr(slashIndex + 1, hashtagIndex - slashIndex - 1);
        }
        logCode = logCode.replace(/\//g, '');
      }

      a1.classList.add('all-fights-entry');
      a1.href = baseURL + logCode;
      a1.innerText = 'xivanalysis.com';
      a1.target = '_blank';

      a2.href = baseURL + logCode;
      a2.classList.add('big-tab', 'view-type-tab');
      a2.id = 'analysis-tab';
      a2.target = '_blank';

      s1.classList.add('zmdi');
        img.src = 'https://xivanalysis.com/logo.png';
        img.setAttribute('height', '22px');
      s1.appendChild(img);
      s2.classList.add('big-tab-text');
      s2.innerHTML = '<br>xivanalysis';

      a2.appendChild(s1);
      a2.appendChild(s2);
      if (d1 !== null) { d1.appendChild(a1); }
      if (d2 !== null) { d2.insertBefore(a2, d2.childNodes[0]); }
    }
  }
})();
