/*
A two-player version of Connect 4 using HTML, jQuery, and Javascript.
Started 3/20/17 and completed 4/4/17.
*/
var $board = $(  "#board"  );
var $connectdisplay = $(  "#topDisplay"  );
var $container = $(  "#container-connect"  );
var board = new Array();
var ct = 1;
var win1 = "1,1,1,1";
var win2 = "2,2,2,2";
var lastspot;



// - - - - - - - MAIN - - - - - -
// Starts the game when button is pressed
function start() {
  $connectdisplay.empty();
  $board.html("");
  $(  ".winheader"  ).remove();
  $(  "#newButton"  ).remove();
  setBoard();
  printBoard();
}

// allows players to reset to an empty board
function reset() {
  start();
}

// initializes an empty board
function setBoard() {
  ct = 1;
  board[0] = new Array("0", "0", "0", "0", "0", "0", "0");
  board[1] = new Array("0", "0", "0", "0", "0", "0", "0");
  board[2] = new Array("0", "0", "0", "0", "0", "0", "0");
  board[3] = new Array("0", "0", "0", "0", "0", "0", "0");
  board[4] = new Array("0", "0", "0", "0", "0", "0", "0");
  board[5] = new Array("0", "0", "0", "0", "0", "0", "0");
}

//locks the board at the current position if someone wins - buttons are no longer clickable.
function lockBoard() {
  $(  "button.gray"  ).replaceWith('<div class="gray"></div>');
  $(  "#resetButton"  ).replaceWith('<button id="againButton" onclick="reset()">AGAIN?</button>');
}

// - - - - - - - UPDATING THE BOARD - - - - - - -
// Updates the array based on button that was pressed.
// First, checks to see if the move was valid, records the spot and changes players.
// Then we print a new board with the move and check if the last spot was a winner.
function updateBoard(btnpressed) {
  lastspot = validMove(btnpressed[0], btnpressed[1]);
  board[lastspot[0]][lastspot[1]] = ct;
  togglePlayer();
  $board.html("");
  printBoard();
  checkWin(lastspot);
}

/* checks to see that the spot selected by the player is at the bottom of the board.
If not, returns the value at the bottom of the column selected.
Essentially, I'm trying to recreate the gravity that happens when a chip is placed into top of the board*/
function validMove(btn0, btn1) {
  var lowest = new Array();
  for (var i = 0; i <= 5; i+=1) {
    if (board[i][btn1] == "0") {
      lowest[0] = i;
      lowest[1] = btn1;
      break;
    }
  }
  return lowest;
}

// changes the active player with each turn
function togglePlayer() {
  if (ct == 1) {
    ct = 2;
  } else if (ct == 2) {
    ct = 1;
  }
}

// Loops through the board array and outputs the html table
function printBoard() {
  var playerUp = ct;
  if (playerUp == 1) {
    playerUp = ("red");
  } else {
    playerUp = ("blue");
  }
  $connectdisplay.html("");
  $connectdisplay.append('<h3 id="'+playerUp+'header">PLAYER '+ct+'</h3>');

  for (i = 5; i >= 0; i = i-1 ) {
      printRow(i);
      $board.append('</tr>');
  }
  $board.append('<br>');
  $board.append('<button id="resetButton" onclick="reset()">RESET</button>');
}

function printRow(y) {
  $board.append('<tr>');
  for (x = 0; x <= 6; x++) {
    var block = getBlock(y, x);
    $board.append('<td>' + block + '</td>');
  }
  $board.append('</tr>');
}

// prints out the correct color for each position on the board based on the 2d board array.
function getBlock(y, x) {
  var value = checkValue(board[y][x]);
  switch (value) {
    case "red":
      value = ('<div id="'+y+x+'" class="red"></div>');
      break;
    case "blue":
      value = ('<div id="'+y+x+'" class="blue"></div>');
      break;
    case "gray":
      value = ('<button id="'+y+x+'" class="gray" onclick="updateBoard(this.id)"></button>');
      break;
    default:
      value = ('<p>X</p>');
  }
  return value;
}

// checks for color for each button based on the 2d board array
function checkValue(n) {
  if (n == 1) {
    return ("red");
  } else if (n == 2) {
    return ("blue");
  }
  return ("gray");
}

// - - - - - - CHECKING FOR WIN - - - - - - -
// checks to see if a win condition has been met using the coordinates of the last move.
function checkWin(lastspot){
  var y = lastspot[0];
  var x = lastspot[1];
  hor(y);
  vert(y, x);
  diag(y, x);
}

// Provides a message if a winner is found and locks out any future moves.
function wehaveawinner(n) {
  $connectdisplay.html('<h1 class="winheader">PLAYER '+n+' WINS</h1>');
  $board.append('<h3 class="winheader">Pretty sneaky <span style="color:'+checkValue(n)+';">player '+n+'...</span></h3>');
  lockBoard();
}

// Checks the last-played row for a horizontal win.
function hor(y) {
  var testrow = board[y];
  testrow = testrow.join(",");
  if (testrow.indexOf(win1) != -1) {
    wehaveawinner(1);
  } else if (testrow.indexOf(win2) != -1) {
    wehaveawinner(2);
  }
}

// checks the last-played column for a vertical win.
function vert(y, x) {
  var testcol = new Array();
  if (y >= 3) {
    testcol.push(board[y][x]);
    for (i = 1; i <= 3; i += 1) {
      testcol.push(board[y-i][x]);
    }
    testcol = testcol.join(",");
    if (testcol.indexOf(win1) != -1) {
      wehaveawinner(1);
    } else if (testcol.indexOf(win2) != -1) {
      wehaveawinner(2);
    }
  }
}

// - - - -
// Loops through each possible diagonal array checking for a winning sequence.
// Before looping it checks first that at least one player has picked a spot in the fourth row.
// Logically there has to be at least one piece in the fourth row for a diagonal win to trigger, so this saves processing time early on.
function diag(y, x) {
  var highEnough = board[3];
  highEnough = highEnough.join(",");
  if (highEnough != "0,0,0,0,0,0,0") {
    if (urdl(y, x) == 1) {
      wehaveawinner(1);
    } else if (urdl(y, x) == 2) {
      wehaveawinner(2);
    } else if (uldr(y, x) == 1) {
      wehaveawinner(1);
    } else if (uldr(y, x) == 2) {
      wehaveawinner(2);
    }
  }
}

// checks Up Right, Down Left diagonally = /
function urdl(y, x) {
  var addval = board[y][x];
  var testdiag = new Array();
  var ytemp = y;
  var xtemp = x;
  // "winds" down to lowest possible value diagonally
  while (ytemp > 0 && xtemp > 0) {
    ytemp -= 1;
    xtemp -= 1;
  }
  // goes through elements diagonally to populate an array
  while (ytemp <= 5 && xtemp <= 6) {
    testdiag.push(board[ytemp][xtemp]);
    ytemp += 1;
    xtemp += 1;
  }
  testdiag = testdiag.join(",");
  if (testdiag.indexOf(win1) != -1) {
    return 1;
  } else if (testdiag.indexOf(win2) != -1) {
    return 2;
  }
  return 0;
}

// checks Up Left, Down Right diagonally = \
function uldr(y, x) {
  var addval = board[y][x];
  var testdiag = new Array();
  var ytemp = y;
  var xtemp = x;
  // "winds" down to lowest possible value diagonally
  while (ytemp < 5 && xtemp > 0) {
    ytemp += 1;
    xtemp -= 1;
  }
  // goes through elements diagonally to populate an array
  while (ytemp >= 0 && xtemp <= 6) {
    testdiag.push(board[ytemp][xtemp]);
    ytemp -= 1;
    xtemp += 1;
  }
  testdiag = testdiag.join(",");
  if (testdiag.indexOf(win1) != -1) {
    return 1;
  } else if (testdiag.indexOf(win2) != -1) {
    return 2;
  }
  return 0;
}
