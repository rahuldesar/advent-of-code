const input = Bun.file("input.txt");
const data = await input.text();

let cardGames = data.split("\n");
cardGames.pop();

let { cardGameArray, cardGameGoals, currentCardNumbers, intersections } = getCardGames(cardGames);

// console.log({ cardGameArray, cardGameGoals, currentCardNumbers, intersections })

let points = 0;

intersections.forEach(intersection => {
  if (intersection.length > 0) {
    let currentGamePoint = Math.pow(2, intersection.length - 1)
    points += currentGamePoint;
  }
});

console.log(points);


function getCardGames(cardGames: string[]) {
  let cardGameArray: string[] = [];
  let cardGameGoals: string[][] = [];
  let currentCardNumbers: string[][] = [];
  let intersections: string[][] = [];

  cardGames.forEach(game => {
    let currentGame = game.slice(game.indexOf(":") + 1);
    let [currentCardGoalstr, currentCardNumbersStr] = currentGame.split(" |")
    cardGameArray.push(currentGame);

    let singleCardGameGoals = splitString(currentCardGoalstr, 3).sort((a, b) => Number(a) - Number(b));
    cardGameGoals.push(singleCardGameGoals);
    let singleCurrentCardNumbers = splitString(currentCardNumbersStr, 3).sort((a, b) => Number(a) - Number(b));
    currentCardNumbers.push(singleCurrentCardNumbers);

    const intersection = singleCardGameGoals.filter(element => singleCurrentCardNumbers.includes(element));
    intersections.push(intersection)

    // cardGameGoals.push(currentCardGoalstr.trim().split(" ").sort((a, b) => Number(a) - Number(b)));
    // currentCardNumbers.push(currentCardNumbersStr.trim().split(" ").sort((a, b) => Number(a) - Number(b)));
  });

  return { cardGameArray, cardGameGoals, currentCardNumbers, intersections };
}

function splitString(str, N) {
  const arr = [];

  for (let i = 0; i < str.length; i += N) {
    arr.push(str.substring(i, i + N));
  }

  return arr;
}
