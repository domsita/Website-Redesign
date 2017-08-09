/*
  A Javascript/jQuery/HTML program designed to resemble a calculator.
  Completed 3/26/17
*/
var $display = $(  "#display"  );
var $result = $(  "#result"  );

// evaluates the expression in #display and places it into #result. displays an error message if the equation is invalid.
function equals() {
  var equation = $display.text();
  try {
    if (eval(equation)) {
      var output = '<p class="output"><strong>' + eval(equation) + '</strong><br><span class="indent"><span class="indent">' + equation +' = '+eval(equation)+'</span></span></p>';
      if ($(  ".output"  ).length) {
        $(  ".output:first"  ).before(output);
      } else {
        $result.append(output);
      }
      clearAll();
    } else {
      throw "err";
    };
  } catch(err) {
    $result.append("<p class="+'output'+">Something's wrong with " + equation + "</p>");
  };
};

// adds input to the equation. if it's an operator, adds appropriate spacing
function push(x) {
  if (charCheck(x)) {
    x = ' ' + x + ' ';
  };
  $display.append(x);
};

// checks to see if x is a char
function charCheck(x) {
  var chars = ["/", "*", "+", "-"];
  for (i = 0; i < chars.length; i++) {
      if (x === chars[i]) {
        return true;
      };
  };
  return false;
};

// allows the user to remove the last item
function removeLast() {
  var temp = $display.text();
  if (temp[temp.length-1] === " " && temp.length >= 3) {
    temp = temp.slice(0, (temp.length-3));
  } else {
    temp = temp.slice(0, (temp.length-1));
  };
  clearAll();
  $display.append(temp);
};

// clears whatever is inside the display div
function clearAll() {
  $display.empty();
};
