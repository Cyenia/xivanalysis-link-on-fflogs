// ==UserScript==
// @name         xivanalysis Link on FF Logs
// @description  Create Links to xivanalysis on FF Logs Reports
// @version      1.1.0
// @author       Cyenia
// @license      GPL-3.0; http://www.gnu.org/licenses/gpl-3.0.txt
// @namespace    https://github.com/Cyeniia/xivanalysis-link-on-fflogs
// @updateURL    https://github.com/Cyeniia/xivanalysis-link-on-fflogs/raw/master/fflogs.user.js
// @downloadURL  https://github.com/Cyeniia/xivanalysis-link-on-fflogs/raw/master/fflogs.user.js
// @icon         https://xivanalysis.com/logo.png
// @match        https://*.fflogs.com/reports/*
// ==/UserScript==

(function() {
  "use strict";
  (new MutationObserver(check)).observe(document, {childList: true, subtree: true});

  function check(changes, observer) {
    if(document.querySelector('#fight-details--2-0')) {
      observer.disconnect();
      var pageURL = window.location.href;
      var baseURL = 'https://xivanalysis.com/fflogs/';
      var slashCount = pageURL.match(/\//g).length;
      var slashIndex = pageURL.lastIndexOf('/');
      var hashtagIndex = pageURL.lastIndexOf('#');
      var a1 = document.createElement('a');
      var a2 = document.createElement('a');
      var s1 = document.createElement('span');
      var s2 = document.createElement('span');
      var img = document.createElement('img');
      var d1 = document.getElementById('fight-details--2-0');
      var d2 = document.getElementById('top-level-view-tabs');
      var logCode = window.location.pathname.split('/')[2]

      var parameters, fight, source;
      if(window.location.search != "") {
        parameters = window.location.search.replace('?', '').split('&');
      }
      else if(window.location.hash != "") {
        parameters = window.location.hash.replace('#', '').split('&');
      }

      if (parameters != undefined) {
        parameters.forEach(function(parameter) {
          var keyvalue = parameter.split('=');
          if(keyvalue[0] == "fight") {
            fight = keyvalue[1];
          }
          else if (keyvalue[0] == "source") {
            source = keyvalue[1];
          }
        });
      }

      a1.classList.add('all-fights-entry');
      a1.href = baseURL + logCode;
      a1.innerText = 'xivanalysis.com';
      a1.id = 'analysis-entry';
      a1.target = '_blank';

      a2.href = baseURL + logCode;
      if (fight != undefined) {
        a2.href = baseURL + logCode + '/' + fight;
        if (source != undefined) {
          a2.href = baseURL + logCode + '/' + fight + '/' + source;
        }
      }
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
      if (d1 !== null) {
        if (document.getElementById('analysis-entry') !== null) {
          document.getElementById('analysis-entry').href = a1.href;
        }
        else {
          d1.appendChild(a1);
        }
      }
      if (d2 !== null) {
        if (document.getElementById('analysis-tab') !== null) {
          document.getElementById('analysis-tab').href = a2.href;
        }
        else {
          d2.insertBefore(a2, d2.childNodes[0]);
        }
      }
      observer.observe(document, {childList: true, subtree: true});
    }
  }
})();
