let flag = false;
let carrentLeng;
window.addEventListener('load', carrentLeng);
saveLang(flag);

const keyboard = [
  ['`', 'ё'],
  ['1', '!'],
  ['2', '@'],
  ['3', '#'],
  ['4', '$'],
  ['5', '%'],
  ['6', '^'],
  ['7', '&'],
  ['8', '*'],
  ['9', '('],
  ['0', ')'],
  ['-', '_'],
  ['=', '+'],
  ['Backspase', 'Backspase'],
  ['Tab', 'Tab'],
  ['q', 'й'],
  ['w', 'ц'],
  ['e', 'у'],
  ['r', 'к'],
  ['t', 'е'],
  ['y', 'н'],
  ['u', 'г'],
  ['i', 'ш'],
  ['o', 'щ'],
  ['p', 'з'],
  ['[', 'х'],
  [']', 'ъ'],
  ['|', '/'],
  ['DEL', 'DEL'],
  ['Caps Lock', 'Caps Lock'],
  ['a', 'ф'],
  ['s', 'ы'],
  ['d', 'в'],
  ['f', 'а'],
  ['g', 'п'],
  ['h', 'р'],
  ['j', 'о'],
  ['k', 'л'],
  ['l', 'д'],
  [';', 'ж'],
  ["\'", 'э'],
  ['ENTER', 'ENTER'],
  ['Shift', 'Shift'],
  ['EN', 'RU'],
  ['z', 'я'],
  ['x', 'ч'],
  ['c', 'с'],
  ['v', 'м'],
  ['b', 'и'],
  ['n', 'т'],
  ['m', 'ь'],
  [',', 'б'],
  ['.', 'ю'],
  ['/', '.'],
  ['&#11165;', '&#11165;'],
  ['Shift', 'Shift'],
  ['Ctrl', 'Ctrl'],
  ['Win', 'Win'],
  ['Alt', 'Alt'],
  [' ', ' '],
  ['Alt', 'Alt'],
  ['Win', 'Win'],
  ['&#11164;', '&#11164;'],
  ['&#11167;', '&#11167;'],
  ['&#11166;', '&#11166;']
];

/*вспомогательный массив*/
let keys = [];
k = 0;
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < keyboard.length; j++) {
    keys[k] = keyboard[j][i];
    k++;
  }
}

let cols = [13, 14, 12, 13, 8];
let body = document.querySelector('body');
let wrapper = document.createElement('div');
let textarea = document.createElement('textarea');

/*Сохранение раскладки языка через localStorage*/
let lang = [];
if (localStorage.getItem('langs')) {
  lang = JSON.parse(localStorage.getItem('langs'));
  let l = lang[lang.length - 1];
}

function saveLang(lang) {
  let langs;
  if (localStorage.getItem('langs') === null) {
    langs = [];
  } else {
    langs = JSON.parse(localStorage.getItem('langs'));
  }
  langs.push(lang);
  localStorage.setItem('langs', JSON.stringify(langs));
}

let j;
carrentLeng = function getLang() {
  let langs = [];
  if (localStorage.getItem('langs')) {
    langs = JSON.parse(localStorage.getItem('langs'));
    j = langs[langs.length - 1];
    return j;
  }
};

/*добавлена клавиатура*/
body.prepend(wrapper);
wrapper.prepend(textarea);
wrapper.classList.add('wrapper');
textarea.classList.add('screen');

let table = document.createElement('table');
table.classList.add('table');

flag = carrentLeng();
k = 0;
let th = document.createElement('th');
th.classList.add('tr');
for (let j = 0; j <= cols[0]; j++) {
  let td = document.createElement('td');
  th.appendChild(td);
  td.classList.add('key');
  td.innerHTML = keyboard[k][0];
  td.dataset.en = String(keyboard[k][0]);
  td.dataset.ru = String(keyboard[k][1]);
  k++;
}
table.appendChild(th);

for (let i = 1; i <= 4; i++) {
  let tr = document.createElement('tr');
  tr.classList.add('tr');
  for (let j = 0; j <= cols[i]; j++) {
    td = document.createElement('td');
    tr.appendChild(td);
    td.classList.add('key');
    td.innerHTML = keyboard[k][+flag];
    td.dataset.en = String(keyboard[k][0]);
    td.dataset.ru = String(keyboard[k][1]);
    k++;
    //console.log(td.innerHTML.charCodeAt());
  }
  table.appendChild(tr);
}
wrapper.appendChild(table);

/*пояснение */
let explanation = document.createElement('div');
wrapper.appendChild(explanation);
explanation.innerHTML = 'Переключение между языками - клавиши "Сtrl" + левая "Alt", задание выполнено в среде Window 10';
explanation.classList.add('explanation');



/*ввод с витуальной клавиатуры */
table.addEventListener('click', function (event) {
  let lett = event.target.innerHTML;
  if (lett.length <= 1) {
    textarea.value = textarea.value + event.target.innerHTML;
  }
});

/*переключение языка*/
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey) {
    if (e.altKey && !e.repeat) {
      document.querySelector('[data-en="Ctrl"]').classList.add('active');
      document.querySelector('[data-en="Alt"]').classList.add('active');
      flag = !flag;
      saveLang(flag);
      document.querySelector('td').innerHTML = keyboard[0][+flag];
      k = cols[0] + 1;
      document.querySelectorAll('tr td').forEach(function (td) {
        td.innerHTML = keyboard[k][+flag];
        k++;
      });
    }
    e.preventDefault();
  }
  document.addEventListener('keyup', function (e) {
    if (e.altKey) {
      document.querySelector('[data-en="Ctrl"]').classList.remove('active');
      document.querySelector('[data-en="Alt"]').classList.remove('active');
    }
  });
});

/*Ввод символов с реальной клавиатуры*/
document.addEventListener('keydown', function (event) {
  if (event.key.length <= 1) {
    console.log(event.key);
    let num = keys.indexOf(event.key);
    if (num >= 65) {
      /* document.querySelectorAll('td').forEach(function (e) {
         e.classList.remove('active');
       });*/
      if (flag !== true) {
        flag = !flag;
        saveLang(flag);
      }
      document.querySelector('td').innerHTML = keyboard[0][+flag];
      k = cols[0] + 1;
      document.querySelectorAll('tr td').forEach(function (e) {
        e.innerHTML = keyboard[k][1];
        k++;
      });

      document.querySelector('[data-ru="' + event.key + '"]').classList.add('active');
      let ru = event.key;
      document.addEventListener('keyup', function () {
        document.querySelector('[data-ru="' + ru + '"]').classList.remove('active');
      });
    } else {
      /* document.querySelectorAll('td').forEach(function (e) {
         e.classList.remove('active');
       });*/

      if (flag !== false)  {
        flag = !flag;
        saveLang(flag);
      }
      document.querySelector('td').innerHTML = keyboard[0][+flag];
      k = cols[0] + 1;
      document.querySelectorAll('tr td').forEach(function (e) {
        k++;
      });
      document.querySelector('[data-en="' + event.key + '"]').classList.add('active');
      let en = event.key;
      document.addEventListener('keyup', function () {
        document.querySelector('[data-en="' + en + '"]').classList.remove('active');
      });
    }
  }

});
//  console.log(event.key);
/*ЕNTER*/
let enter = document.querySelector('[data-en="ENTER"]');
enter.addEventListener('click', function () {
  textarea.value = textarea.value + '\n';
});

/*tab*/
let tab = document.querySelector('[data-en="Tab"]');
tab.addEventListener('click', function () {
  textarea.value = textarea.value + '  ';
});

document.addEventListener('keydown', function (event) {
  if (event.code == 'Tab') {
    textarea.value = textarea.value + '  ';
    document.querySelector('[data-en="Tab"]').classList.add('active');
    event.preventDefault();
  }

  document.addEventListener('keyup', function (event) {
    if (event.code == 'Tab') {
      document.querySelector('[data-en="Tab"]').classList.remove('active');
    }
  });
});

/*Shift*/
let Shift = document.querySelector('[data-en="Shift"]');
Shift.addEventListener('click', function () {
  document.querySelector('[data-en="Shift"]').classList.add('active');
  k = 0;
  document.querySelectorAll('th td').forEach(function (e) {
    e.innerHTML = keyboard[k][1];
    k++;
  });
  document.querySelectorAll('tr td').forEach(function (e) {
    e.innerHTML = keyboard[k][+flag].toUpperCase();
    k++;
  });


  
  Shift.addEventListener('click', function () {
    document.querySelector('[data-en="Shift"]').classList.remove('active');
    k = 0;
    document.querySelectorAll('td').forEach(function (e) {
      e.innerHTML = keyboard[k][+flag].toLowerCase();
      k++;
    });
  });
});

/*Caps Lock*/
let caps = document.querySelector('[data-en="Caps Lock"]');
caps.addEventListener('click', function () {
  document.querySelector('[data-en="Caps Lock"]').classList.add('active');
  k = 0;
  document.querySelectorAll('td').forEach(function (e) {
    e.innerHTML = keyboard[k][+flag].toUpperCase();
    k++;
  });

  /* */
  Shift.addEventListener('mousedown', function () {
    document.querySelector('[data-en="Shift"]').classList.add('active');
    k = 0;
    document.querySelectorAll('td').forEach(function (e) {
      e.innerHTML = keyboard[k][+flag].toLowerCase();
      k++;
    });
    Shift.addEventListener('mouseup', function () {
      document.querySelector('[data-en="Shift"]').classList.remove('active');
    });
  });

  /* */
  caps.addEventListener('click', function () {
    caps.querySelector('[data-en="Caps Lock"]').classList.remove('active');
  });
});