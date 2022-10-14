'use strict';


//city class
function City(name, hourOpen, openMeridiem, hourClose, closeMeridiem, min, max, avg) {
  this.name = name;
  this.hourOpen = hourOpen;
  this.openMeridiem = openMeridiem;
  this.hourClose = hourClose;
  this.closeMeridiem = closeMeridiem;
  this.min = min;
  this.max = max;
  this.avg = avg;
}

let seattle = new City('Seattle', 6, 'a.m.', 7, 'p.m.', 23, 65, 6.3);
let tokyo = new City('Tokyo', 5, 'a.m.', 7, 'p.m.', 3, 24, 1.2);
let dubai = new City('Dubai', 6, 'a.m.', 7, 'p.m.', 23, 65, 6.3);
let paris = new City('Paris', 6, 'a.m.', 7, 'p.m.', 11, 38, 3.7);
let lima = new City('Lima', 6, 'a.m.', 7, 'p.m.', 2, 16, 4.6);

//table title and initialization
let titleNum = ['1 a.m.', '2 a.m.', '3 a.m.', '4 a.m.', '5 a.m.', '6 a.m.', '7 a.m.', '8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.', '12 a.m.', '1 p.m.', '2 p.m.', '3 p.m.', '4 p.m.', '5 p.m.', '6 p.m.', '7 p.m.', '8 p.m.', '9 p.m.', '10 p.m.', '11 p.m.'];
// const cookieCharts = document.getElementById('cookieCharts');

function printHeader() {
  let table = document.querySelector('thead');

  let title = document.createElement('tr');
  table.appendChild(title);

  let titleBlank = document.createElement('td');
  titleBlank.textContent = '';
  title.appendChild(titleBlank);

  for (let i = 0; i < titleNum.length; i++) {
    let listItem = document.createElement('td');
    listItem.textContent = `${titleNum[i]}`;
    title.appendChild(listItem);
  }

  let titleTotal = document.createElement('td');
  titleTotal.textContent = 'Total';
  title.appendChild(titleTotal);
}

//adds all items in an array together
function mathArray(idArr, opp) {
  if (opp === '+') {
    let totalSum = 0;
    for (let i = 0; i < idArr.length; i++) {
      totalSum = totalSum + idArr[i];
    }
    return totalSum;
  } else if (opp === '*') {
    let totalSum = 1;
    for (let i = 0; i < idArr.length; i++) {
      totalSum = totalSum * idArr[i];
    }
    return totalSum;
  } else {
    return;
  }
}

//prints footer
function printFooter() {
  let totalTempArray = [];
  let table = document.querySelector('tFoot');
  let tr = document.createElement('tr');
  tr.setAttribute('id', 'tChild');
  let total = 0;
  table.appendChild(tr);
  //creates title in DOM
  let rowStart = document.createElement('td');
  rowStart.textContent = 'Total';
  tr.appendChild(rowStart);

  for (let i = 0; i < titleNum.length; i++) {
    let listClass = document.getElementsByClassName(`${titleNum[i]}`);
    for (let l = 0; l < listClass.length; l++) {
      totalTempArray[l] = parseInt(listClass[l].innerHTML) || 0;
      total = mathArray(totalTempArray, '+');
    }
    if (Number.isFinite(total)) {
      let listItem = document.createElement('td');
      listItem.textContent = total;
      tr.appendChild(listItem);
    } else {
      let listItem = document.createElement('td');
      listItem.textContent = '';
      tr.appendChild(listItem);
    }
  }
  let listItem = document.createElement('td');
  listItem.textContent = '';
  tr.appendChild(listItem);
}

//makes an array with the open and close times of given city
City.prototype.makeTimeArray = function (city) {
  //var initialization
  let time = city.hourOpen;
  let meridiem = city.openMeridiem;
  let timeArray = [];
  let i = 0;

  while (meridiem !== city.closeMeridiem || time !== city.hourClose + 1) {

    timeArray[i] = `${time} ${meridiem}`;
    i++;

    if (meridiem === 'a.m.' && time === 12) {
      meridiem = 'p.m.';
      time = 1;
    } else if (meridiem === 'p.m.' && time === 12) {
      meridiem = 'a.m.';
      time = 1;
    } else {
      time++;
    }
  }

  return timeArray;
};

//print list.
City.prototype.printList = function (city) {
  //crates table in DOM
  let table = document.querySelector('tbody');
  let tr = document.createElement('tr');
  table.appendChild(tr);
  //creates title in DOM
  let rowStart = document.createElement('td');
  rowStart.textContent = this.name;
  tr.appendChild(rowStart);
  //var initialization
  let hours = city.makeTimeArray(city);
  let dailyTotal = 0;
  let CPH = [];
  let blankCheck = 0;

  //gives cph random values and multiply the value by the average cookies bought
  for (let i = 0; i < hours.length; i++) {
    CPH[i] = Math.round(Math.floor(Math.random() * (city.max - city.min + 1) + city.min) * city.avg);
  }
  //creates list items
  for (let i = 0; i < titleNum.length; i++) {
    if (hours[blankCheck] === titleNum[i]) {
      let listItem = document.createElement('td');
      listItem.textContent = `${CPH[blankCheck]}`;
      listItem.setAttribute('class', titleNum[i]);
      tr.appendChild(listItem);
      blankCheck++;
    } else {
      let listItem = document.createElement('td');
      listItem.setAttribute('class', titleNum[i]);
      listItem.textContent = '';
      tr.appendChild(listItem);
    }
  }

  //adding total cookies to end of list
  dailyTotal = mathArray(CPH, '+');
  let listItem = document.createElement('td');
  listItem.textContent = dailyTotal;
  listItem.setAttribute('class', 'dailyTotal');
  tr.appendChild(listItem);
  let tFoot = document.getElementById('tFoot');
  let tChild = document.getElementById('tChild');
  tFoot.removeChild(tChild);
  printFooter();
};

function makeCity(event) {
  let cityName = event.target.name.value;
  let hourOpen = parseInt(event.target.hourOpen.value);
  let openMeridiem = event.target.meridOpen.value;
  let hourClose = parseInt(event.target.hourClose.value);
  let closeMeridiem = event.target.meridClose.value;
  let min = parseInt(event.target.minCust.value);
  let max = parseInt(event.target.maxCust.value);
  let avg = parseInt(event.target.avgCookie.value);
  cityName = new City(cityName, hourOpen, openMeridiem, hourClose, closeMeridiem, min, max, avg);
  cityName.printList(cityName);
  event.preventDefault();
}


//call functions
printHeader();
printFooter();
seattle.printList(seattle);
tokyo.printList(tokyo);
dubai.printList(dubai);
paris.printList(paris);
lima.printList(lima);

let newCity = document.getElementById('makeCity');
newCity.addEventListener('submit', makeCity);
