let objectOne = {
  id: 1,
  number: 84
}

let objectTwo = {
  id: 2,
  number:43
}

let objectThree = {
  id: 3,
  number: 61
}

let array = [];
console.log(array);

function sortArray() {
  array.push(objectOne.number);
  array.push(objectTwo.number);
  array.push(objectThree.number);

  console.log(array);
  console.log(array.sort().reverse());
}

console.log(sortArray());
