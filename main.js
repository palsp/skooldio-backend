const readline = require("readline");
const Player = require("./Pok-Deng");

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(function (resolve, reject) {
    rl.question(question, function (answer) {
      rl.close();
      resolve(answer.trim());
    });
  });
}
const p = new Player();
let ans = true;

async function turn() {
  let bet = await prompt("Please put your bet\n ");
  p.newTurn(+bet);
  let con = await prompt("Wanna play more (Yes/No)?\n");
  if (con === "Yes") {
    ans = true;
  } else if (con === "No") {
    ans = false;
    console.log(`You got total ${p.bets} chips`);
  }
}

(async function () {
  while (ans) {
    await turn();
  }
})();
