// ==UserScript==
// @name         Bot for Google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       Kapitanova Anna
// @match        https://www.google.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = ["10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress", "Вывод произвольных типов записей и полей в WordPress"];
let keyword = keywords[getRandom(0, keywords.length)];
let links = document.links;
let googleInput = document.getElementsByName("q")[0];
let btnK = document.getElementsByName("btnK")[0];

if(btnK != undefined) {
  googleInput.value = keyword;
  btnK.click();
} else {
  for(let i = 0; i < links.length; i++) {
    if(links[i].href.indexOf("napli.ru") != -1) {
      let link = links[i];
      console.log("Нашел строку " + link);
      link.click();
    }
  }
}
function getRandom(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}
