const input = Bun.file("input.txt");
const data = await input.text();

const numberLines = data.split("\n");
numberLines.pop();

const duplicateNumberLines = [...numberLines];



const SYMBOL_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/g;

let sum = 0;

function extractNumbers(inputString: string) {
  const matches = inputString.match(/\b\d+\b/g);
  return matches;
}

numberLines.forEach((numberLine, index) => {
  const numbersArray = extractNumbers(numberLine);

  if (numbersArray) {

    numbersArray.forEach(number => {
      if (number != null) {
        if (checkIsValid(number, index)) {
          sum += Number(number);
        }
      }
    })
  }
})

console.log(sum);


function checkIsValid(num: string, yIndex: number) {
  let isValid = false;
  let xIndexNum = duplicateNumberLines[yIndex].indexOf(num);
  let updatedLine = duplicateNumberLines[yIndex].replace(num, ".".repeat(num.length));
  duplicateNumberLines[yIndex] = updatedLine;

  if (xIndexNum == -1) {
    return false
  }

  if (num) {
    let startXIndex = 0 == yIndex ? yIndex : yIndex - 1;
    let endXIndex = numberLines.length - 1 == yIndex ? yIndex : yIndex + 1;

    for (let x = startXIndex; x <= endXIndex; x++) {
      let startYIndex = 0 == xIndexNum ? xIndexNum : xIndexNum - 1;
      let endYIndex = numberLines[yIndex].length <= startYIndex + num.length + 1 ? xIndexNum + num.length - 1 : xIndexNum + num.length;

      for (let y = startYIndex; y <= endYIndex; y++) {
        if (duplicateNumberLines[x][y].match(SYMBOL_REGEX)) {
          isValid = true;
          break;
        }
      }
    }

    return isValid;
  }
}


