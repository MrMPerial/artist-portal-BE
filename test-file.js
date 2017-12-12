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

function addOne() {
  objectOne.number + 1;
}

console.log(sortArray());
console.log(addOne());

console.log(objectOne.number);
