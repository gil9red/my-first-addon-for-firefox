// Импортирование модулей
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");


// При запуске плагина открываем сайт
tabs.open("http://torrent.mgn.ru/viewtopic.php?t=73051")


// Кнопка для открытия сайта
var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.open("http://www.mozilla.org/");
}


// Кнопка для вывода списка вкладок
buttons.ActionButton({
  id: "list-tabs",
  label: "List Tabs",
  icon: "./icon-16.png",
  onClick: listTabs
});

function listTabs() {
  for (let tab of tabs)
    console.log(tab.url);
}



// Кнопка клика кнопки скачивания раздачи и кнопки "спасибо" сайта http://torrent.mgn.ru
buttons.ActionButton({
  id: "download-torrent-mgn-ru",
  label: "Download and thank torrent from torrent.mgn.ru",
  icon: "./tor_icon.jpg",
  onClick: download_and_thank
});

function download_and_thank() {
    var url_torrent = 'http://torrent.mgn.ru/';
    var tab = tabs.activeTab;

    // Проверяем что текущая вкладка относится к сайту torrent.mgn.ru
    if (tab.url.startsWith(url_torrent) == false) {
        return;
    }

    tab.attach({
        //contentScript: script
        contentScriptFile: "./download_and_thank.js"
    });

    // Кликаем Спасибо: 
    // <span id="VB194836">&nbsp; <img src="images/sps.gif" onclick="this.disabled=true;ajax_do('thanks.php?mode=thank&amp;a=194836');" alt="Спасибо" style="cursor:pointer"></span>
    // id для "спасибо", можно взять из ссылки для скачивания раздачи id=, а можно искать элемент с 
    // alt="Спасибо" 
    // Кликаем Скачать раздачу: a.genmed / //a[@class="genmed"]
}




// Удаление первой при запуске страницы -- about:blank
var about_blank_tab = null;

for (let tab of tabs) {
    if (tab.url == "about:blank") {
        about_blank_tab = tab;
        break;
    }
}
if (about_blank_tab != null) {
    about_blank_tab.close();
}


// Обработчик событий: при окончании открытии вкладки, выполняем скрипт
tabs.on("ready", runScript);
 
function runScript(tab) {
  tab.attach({
    contentScript: "if (document.body) document.body.style.border = '5px solid red';"
  });
}