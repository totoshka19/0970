// ==UserScript==
// @name         Bot for Google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       Kapitanova Anna
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = ["10 самых популярных шрифтов от Google", "VS Code", "как использовать DevTools браузера", "Отключение редакций и ревизий в WordPress", "Вывод произвольных типов записей и полей в WordPress"];
let keyword = keywords[getRandom(0, keywords.length)];
let links = document.links;
let googleInput = document.getElementsByName("q")[0];
let btnK = document.getElementsByName("btnK")[0];
let pnnext = document.getElementById("pnnext");

if (btnK != undefined) {
  let i = 0;
  let timerId = setInterval(() => {
    googleInput.value += keyword[i];
    i++;
    if (i === keyword.length) {
      clearInterval(timerId);
      btnK.click();
    }
  }, 100);

} else if (location.hostname == "napli.ru") {
  console.log("Мы на целевом сайте");
  setInterval(() => {
    let index = getRandom(0, links.length);

    if (getRandom(0, 101) >= 70) {
      location.href = "https://www.google.com/";
    }

    if (links.length == 0) {
      location.href = "https://napli.ru/";
    }

    if (links[index].href.indexOf("napli.ru") != -1) {
      console.log("Кликаем по ссылкам");
      links[index].click();
    }

  }, getRandom(2000, 5000));
} else {
  let nextGooglePage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("napli.ru") != -1) {
      let link = links[i];
      nextGooglePage = false;
      console.log("Нашел строку " + link);
      setTimeout(() => {
        link.click();
      }, getRandom(2500, 4000));
      break;
    }
  }
  let elementExist = setInterval(() => {
    let element = document.querySelector(".YyVfkd");
    if (element != null) {
      if (element.innerText == "5") {
        nextGooglePage = false;
        location.href = "https://www.google.com/";
      }
      clearInterval(elementExist);
    }
  }, 100);

  if (nextGooglePage) {
    setTimeout(() => pnnext.click(), getRandom(2000, 4000));
  }
}

function getRandom(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}
