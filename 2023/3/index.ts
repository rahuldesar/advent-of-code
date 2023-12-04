const input = Bun.file("input.txt");
// const input = Bun.file("practice.txt");
const data = await input.text();

const numberLines = data.split("\n");
numberLines.pop();

const duplicateNumberLines = [...numberLines];



const SYMBOL_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/g;

let sum = 0;
let validNumbersArray: any = [];
let starArray: number[][] = [];

function extractNumbers(inputString: string) {
  const matches = inputString.match(/\b\d+\b/g);
  return matches;
}

numberLines.forEach((numberLine, index) => {
  let starArrayLine = [];

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

  for (let index = 0; index < numberLine.length; index++) {
    if (numberLine[index] === '*') {
      starArrayLine.push(index);
    }
  }

  starArray.push(starArrayLine);
})

// getGear(starArray);

function getGear(starArray: number[][]) {
  let totalGearValue = 0;

  starArray.forEach((starLine, index) => {
    if (starLine.length != 0) {
      starLine.forEach(starIndex => {
        const rowIndex = index;
        const colIndex = starIndex;


        let minRowIndex = rowIndex == 0 ? 0 : rowIndex - 1;
        let maxRowIndex = rowIndex == starArray.length - 1 ? rowIndex : rowIndex + 1;

        let minColIndex = colIndex == 0 ? 0 : colIndex - 1;
        let maxColIndex = colIndex == numberLines[rowIndex].length - 1 ? colIndex : colIndex + 1;

        let gearValues = [];

        // console.log(minRowIndex, maxRowIndex)
        // console.log(rowIndex, colIndex)
        // console.log(maxRowIndex, maxColIndex)

        for (let x = minRowIndex; x <= maxRowIndex; x++) {
          for (let y = minColIndex; y <= maxColIndex; y++) {
            // console.log(numberLines[x][y], !isNaN(Number(numberLines[x][y])))
            if (!isNaN(Number(numberLines[x][y]))) {

              let filteredArr = validNumbersArray.filter(item => item.rowIndex == x)
              // console.log(filteredArr);
              if (filteredArr.length) {
                filteredArr.forEach(item => {

                  if (item.colIndex <= y && y <= item.maxColIndex) {
                    gearValues.push(item.num);
                    validNumbersArray = validNumbersArray.filter(validNumber => !(validNumber.rowIndex == x && validNumber.colIndex == item.colIndex));

                  }
                }
                );
              }
            }
          }
        }
        if (gearValues.length == 2) {
          totalGearValue += gearValues[1] * gearValues[0];
        }
      });
    }
  });
  return totalGearValue;
}

console.log(sum);
console.log(getGear(starArray));


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
          validNumbersArray.push({ rowIndex: yIndex, num: num, colIndex: xIndexNum, maxColIndex: xIndexNum + num.length });
          isValid = true;
          break;
        }
      }
    }

    return isValid;
  }
}



// console.log(validNumbersMap);
