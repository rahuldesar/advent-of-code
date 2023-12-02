const input = Bun.file("input.txt");
const data = await input.text();

const dataArray = parseStringInput(data);


type Tobject = {
  [key: string]: number;
};

const numberStringObject: Tobject = {
  "zero": 0,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
}


let sum = 0;
dataArray.forEach(item => {
  const firstNumber = getFirstNumber(item);
  const lastNumber = getLastNumber(item);

  if (firstNumber && lastNumber) {
    const sumItem = 10 * firstNumber + lastNumber
    sum = sum + sumItem;
  }
});

console.log("RESULT: Sum is : ", sum);



function parseStringInput(input: string) {
  const inputArray = data.split("\n");
  inputArray.pop(); // removing last ""

  return inputArray;
}

function getFirstNumber(input: string) {
  let numberMap = [];

  for (const key in numberStringObject) {
    if (input.indexOf(key) >= 0) {
      numberMap.push({ index: input.indexOf(key), number: numberStringObject[key] });
    }
  }

  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    if (!isNaN(Number(element))) {
      numberMap.push({ index: i, number: Number(element) })
    }
  }

  const minIndex = Math.min(...numberMap.map(item => item.index))
  const minimunValue = numberMap.find(item => item.index == minIndex)?.number;

  return minimunValue;
}

function getLastNumber(input: string) {
  let numberMap = [];

  for (const key in numberStringObject) {
    if (input.lastIndexOf(key) >= 0) {
      numberMap.push({ index: input.lastIndexOf(key), number: numberStringObject[key] });
    }
  }

  for (let i = input.length; i >= 0; i--) {
    const element = input[i];
    if (!isNaN(Number(element))) {
      numberMap.push({ index: i, number: Number(element) })
    }
  }

  const maxIndex = Math.max(...numberMap.map(item => item.index))
  const maximumValue = numberMap.find(item => item.index == maxIndex)?.number;

  return maximumValue;
}
