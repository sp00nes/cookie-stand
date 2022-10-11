'use strict';

//Basic city info
let seattle = {
  name: 'Seattle',
  hourOpen: 6,
  openMeridiem: 'am',
  hourClose: 7,
  closeMeridiem: 'pm',
  min: 23,
  max: 65,
  avg: 6.3,
};
let tokyo = {
  name: 'Tokyo',
  hourOpen: 6,
  openMeridiem: 'am',
  hourClose: 7,
  closeMeridiem: 'pm',
  min: 3,
  max: 24,
  avg: 1.2,
};
let dubai = {
  name: 'Dubai',
  hourOpen: 6,
  openMeridiem: 'am',
  hourClose: 7,
  closeMeridiem: 'pm',
  min: 23,
  max: 65,
  avg: 6.3,
};
let paris = {
  name: 'Paris',
  hourOpen: 6,
  openMeridiem: 'am',
  hourClose: 7,
  closeMeridiem: 'pm',
  min: 11,
  max: 38,
  avg: 3.7,
};
let lima = {
  name: 'Lima',
  hourOpen: 6,
  openMeridiem: 'am',
  hourClose: 7,
  closeMeridiem: 'pm',
  min: 2,
  max: 16,
  avg: 4.6,
};

//adds all items in an array together
function mathArray(idArr, opp) {
  if (opp === '+') {
    let totalSum = 0;
    for (let i = 0; i < idArr.length; i++) {
      totalSum = totalSum + idArr[i];
    }
    return totalSum;
  }else if (opp === '*') {
    let totalSum = 1;
    for (let i = 0; i < idArr.length; i++) {
      totalSum = totalSum * idArr[i];
    }
    return totalSum;
  }else{
    return;
  }
}


//makes an array with the open and close times of given city
function makeTimeArray(city) {
  //var initialization
  let time = city.hourOpen;
  let meridiem = city.openMeridiem;
  let timeArray = [];
  let i = 0;

  while (meridiem !== city.closeMeridiem || time !== city.hourClose + 1) {

    timeArray[i] = time + meridiem;
    i++;

    if (meridiem === 'am' && time === 12) {
      meridiem = 'pm';
      time = 1;
    } else if (meridiem === 'pm' && time === 12) {
      meridiem = 'am';
      time = 1;
    } else {
      time++;
    }
  }

  return timeArray;
}

//print list.
function printList(city) {
  //crates section in DOM
  const cookieCharts = document.getElementById('cookieCharts');
  let sect = document.createElement('section');
  cookieCharts.appendChild(sect);
  //creates title in DOM
  let title = document.createElement('h2');
  title.textContent = city.name;
  sect.appendChild(title);
  //creates a new unordered list in DOM
  let list = document.createElement('ul');
  sect.appendChild(list);

  //var initialization
  let hours = makeTimeArray(seattle);
  let dailyTotal = 0;
  let CPH = [];
  //gives cph random values and multipys the value by the average cookies bought
  for (let i = 0; i < hours.length; i++) {
    CPH[i] = Math.round(Math.floor(Math.random() * (city.max - city.min + 1) + city.min) * city.avg);
  }
  //creates list items
  for (let i = 0; i < hours.length; i++) {
    let listItem = document.createElement('li');
    listItem.textContent = `${hours[i]}: ${CPH[i]}`;
    list.appendChild(listItem);
  }
  //adding total cookies to end of list
  dailyTotal = mathArray(CPH, '+');
  let listItem = document.createElement('li');
  listItem.textContent = `Total : ${dailyTotal}`;
  list.appendChild(listItem);
}

//call functions
printList(seattle);
printList(tokyo);
printList(dubai);
printList(paris);
printList(lima);
