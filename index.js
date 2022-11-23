"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const { player1, player2 } = startUp();
});

// newPlayer factory function
const newPlayer = function (name, marker) {
  let wins = 0;

  function incrementWins() {
    wins += 1;
    return wins;
  }

  return { name, incrementWins, marker };
};

// gameBoard module
const gameBoardModule = (() => {
  const arr = [new Array(3), new Array(3), new Array(3)];
  // clear gameBoard function
  function clear() {
    // iterate over each row of the array and insert a new array
    for (item in arr) {
      arr[item] = new Array(3);
    }
  }

  function traverseHorizontally() {
    let winning;
    for (arrItems in arr) {
      let xCount = 0;
      let oCount = 0;

      // iterate over each value in the inner arrays
      // and record how many times you see x or O
      for (item in arrItems) {
        if (item === "X") {
          xCount++;
        } else {
          oCount++;
        }
      }

      // if you saw X/O 3 times, that's a three-in-a-row!
      // else you saw nothing
      winning = xCount == 3 ? "X" : oCount == 3 ? "O" : "None";
      // if you saw a three in a row/column, return immediately
      if (winning == "X" || winning == "O") {
        return winning;
      }
    }
    return winning;
  }

  function traverseVertically() {
    let winning;
    for (let i = 0; i < arr.length; i++) {
      let xCount = 0;
      let oCount = 0;

      // iterate over each value in the inner arrays
      // and record how many times you see x or O
      for (let j = 0; j < arr.length; j++) {
        // j changes all the time, useful for changing rows
        // i changes once in a while, useful for changing columns only at the end
        // so use j for row, while we use i for column
        if (arr[j][i] === "X") {
          xCount++;
        } else {
          oCount++;
        }
      }

      // if you saw X or O 3 times, that's a three-in-a-column!
      // else you saw nothing
      // if you saw a three in a row/column, return immediately
      if (winning == "X" || winning == "O") {
        return winning;
      }
    }
    return winning;
  }

  function traverseDiagonally() {
    let winning;
    for (let i = 0; i < arr.length; i++) {
      let xCount = 0;
      let oCount = 0;

      // iterate over each value in the inner arrays
      // and record how many times you see x or O
      for (let j = 0; j < arr.length; j++) {
        // j changes all the time, useful for changing rows
        // i changes once in a while, useful for changing columns only at the end
        // so use j for row, while we use i for column
        if (i == j) {
          if (arr[i][j] == "X") {
            xCount++;
          } else {
            oCount++;
          }
        }
      }

      // if you saw X or O 3 times, that's a three-in-a-column!
      // else you saw nothing
      // if you saw a three in a row/column, return immediately
      if (winning == "X" || winning == "O") {
        return winning;
      }
    }
    if (arr[0][2] == "X" && arr[1][1] == "X" && arr[2][0] == "X") {
      winning = "X";
    } else if (arr[0][2] == "O" && arr[1][1] == "O" && arr[2][0] == "O") {
      winning = "O";
    } else {
      winning = "None";
    }
    return winning;
  }

  function isTie() {
    let winning;
    for (arrItems in arr) {
      for (item in arrItems) {
        if (item == undefined) {
          return false;
        }
      }
    }
    return true;
  }

  // check for win/tie function, returns object (bool and results [win/tie]) if there is a win or tie, else false
  function checkGame() {
    let winning;
    // traverse over arr horizontally
    winning = traverseHorizontally();
    if (winning !== "None") {
      // this means we got a win
      // get winning marker and return it
      result = "win";
      return { result, winning };
    }

    winning = traverseVertically();
    if (winning !== "None") {
      result = "win";
      return { result, winning };
    }

    winning = traverseDiagonally();
    if (winning !== "None") {
      result = "win";
      return { result, winning };
    }

    winning = isTie();
    if (winning) {
      // we got a TIE!
      // return "tie"
      return "tie";
    }
  }
  // update gameBoard function(technically just update the array if possible [nothing is in the current array position])
  function update(row, col, val) {
    const posInArr = arr[row][col];
    let result;
    if (posInArr == undefined) {
      arr[row][col] = val;
      result = checkGame();
      // after we've checked game, check for any marker returned by checking result
      // if we get a result, look for player object with that marker
      // return marker
    }
    return result;
  }
  // call win/tie function
  // if win/tie, do something else

  return { clear, update };
})();

function startUp() {
  // Function that sets up game on reload or loading of website
  // deals with calling the relevant functions

  // request player names
  const player1Name = prompt("Input player 1's (X) name: ", "player1");
  const player2Name = prompt("Input player 2's (X) name: ", "player2");

  // create players
  const player1 = newPlayer(player1Name, "X");
  const player2 = newPlayer(player2Name, "O");

  return { player1, player2 };
}
