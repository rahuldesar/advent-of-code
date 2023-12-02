type ColorData = {
  color: string;
  count: number;
};

type RoundDataType = ColorData[];

type RoundDataFinal = {
  green: number;
  blue: number;
  red: number;
};

type BallsRequirement = {
  "game": number;
  "required": RoundDataFinal;
}

type GameLogType = {
  game: number;
  possible: boolean;
};

const input = Bun.file("input.txt");
const data = await input.text();

const RED_CUBES_COUNT = 12;
const GREEN_CUBES_COUNT = 13;
const BLUE_CUBES_COUNT = 14;

main();

function main() {
  let sumOfIndex = 0;
  let powerOfSets = 0;
  const gameLog: GameLogType[] = [];
  const minimunBallsRequiredLog: BallsRequirement[] = [];

  const games = data.split("\n");
  games.pop();

  games.forEach((game) => {
    let gameData = parseGame(game);
    let gameRounds = gameData.rounds;
    let isPossible = checkPossibility(gameRounds);
    gameLog.push({ game: gameData.game, possible: isPossible });

    const minBallsRequiredForGame = getMinBallsRequiredForRound(gameRounds);
    minimunBallsRequiredLog.push({ game: gameData.game, required: minBallsRequiredForGame })
  });

  gameLog.map((game) => (game.possible == true ? (sumOfIndex += game.game) : ""));

  console.log("Solution 1: Sum of indexes =", sumOfIndex);

  minimunBallsRequiredLog.map(gameData => {
    const { green, blue, red } = gameData.required;
    const powerOfCurrentSet = green * blue * red;
    powerOfSets += powerOfCurrentSet;
  })

  console.log("Solution 2: Power of Sets =", powerOfSets);
}

function getMinBallsRequiredForRound(gameRounds: RoundDataFinal[]) {
  const minGreenBall = Math.max(...gameRounds.map(round => round.green));
  const minBlueBall = Math.max(...gameRounds.map(round => round.blue));
  const minRedBall = Math.max(...gameRounds.map(round => round.red));
  return ({ green: minGreenBall, blue: minBlueBall, red: minRedBall, });
}

function checkPossibility(roundData: RoundDataFinal[]) {
  let possibility = true;

  roundData.forEach((round) => {
    if (round.blue > BLUE_CUBES_COUNT) possibility = false;
    if (round.red > RED_CUBES_COUNT) possibility = false;
    if (round.green > GREEN_CUBES_COUNT) possibility = false;
  });
  return possibility;
}

function parseGame(game: string) {
  let roundData: RoundDataFinal[] = [];
  let gameData = game.substring(game.indexOf(":") + 1);
  let gameNumber = extractNumbers(game.substring(0, game.indexOf(":")));

  let gameRounds = gameData.split(";");
  gameRounds.forEach((gameRound) => {
    roundData.push(parseRounds(gameRound));
  });

  return { game: gameNumber, rounds: roundData };
}

function parseRounds(round: string) {
  let roundData: RoundDataType = [];
  let greenBallCount = 0;
  let blueBallCount = 0;
  let redBallCount = 0;
  const ballCollections = round.split(",");

  ballCollections.forEach((element) => {
    let { strings: color, numbers: count } = extractNumbersAndStrings(element);
    if (color === "green") greenBallCount = count;
    if (color === "red") redBallCount = count;
    if (color === "blue") blueBallCount = count;
    roundData.push({ color, count });
  });

  return { green: greenBallCount, blue: blueBallCount, red: redBallCount };
}

function extractNumbers(inputString: string) {
  const matches = inputString.match(/\b\d+\b/g);
  if (matches === null) {
    throw new Error("No numbers found in the input string");
  }

  return Number(matches.join(""));
}

function extractStrings(inputString: string) {
  const matches = inputString.match(/\b[a-zA-Z]+\b/g);
  if (matches === null) {
    throw new Error("No numbers found in the input string");
  }

  return matches.join("");
}

function extractNumbersAndStrings(inputString: string) {
  const numbers = extractNumbers(inputString);
  const strings = extractStrings(inputString);

  return { numbers, strings };
}

