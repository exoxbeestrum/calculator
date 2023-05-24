/* Last updated: 5/24/2023 --*/

/* ROAD MAP
  1. ADD LISTENER EVENT FOR KEYBOARD OPERATORS(?)
  2. HIGHLIGHT OPERATOR KEY ON PRESS/RELEASE (buttonState(), LINE ~174)
  3. SHOW RESULT, RELEASE OPERATOR HIGHLIGHT ON EQUAL (IF VALID)
  4. TEST TEST TEST
  5. STYLE CALCULATOR
*/

/*---------------------*/
/* DECLARE VARIABLES   */
/*---------------------*/
// CALCULATOR FUNCTION
const calculator = () => {
  //SET VARIABLES
  const button = {
    //INPUT BUTTONS
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    addition: "+",
    clear: "C",
    decimal: ".",
    divide: "/",
    equal: "=",
    minus: "-",
    multiply: "*",
    percent: "%",
    squroot: "√",
  };

  const equals = document.getElementById("equal");
  const frame = document.getElementById("display-frame").offsetWidth - 30; //426px
  const display = document.getElementById("display");

  let a; //HOLD FOR FIRST NUMBER EXPRESSION
  let b; //HOLD FOR SECOND NUMBER EXPRESSION
  let defaultFontSz = "92px";
  let defaultHTML = "&#128522;";
  let elemId;
  let input = "";
  let keys = document.getElementsByClassName("button");
  let keysArray = new Array();
  let result = undefined; //HOLD FOR MATH RESULT. DUH.
  let str; //HOLD FOR MATH EXPRESSION
  let temp = "";
  /* END DECLARE VARIABLES --*/

  //SET CALCULATOR DISPLAY
  display.style.fontSize = defaultFontSz;
  display.innerHTML = defaultHTML;

  //GATHER BUTTONS BY CLASS NAME
  for (let x = 0; x < keys.length; x++) {
    //STRIP .button FROM CLASS NAME; INSERT KEY IDENTIFIER INTO ARRAY
    keysArray.push(keys[x].className.replace("button ", ""));
  }

  /*----------------*/
  /* MOUSE EVENTS   */
  /*----------------*/
  document.addEventListener("mouseup", function (event) {
    elemId = event.target.id; //CAPTURE BUTTON ID
    //ASSIGN TEMP VALUE FOR % FUNCTION
    if (temp == undefined) {
      temp = a;
    }
    if (elemId == "squroot") {
    }
    //IF % BUTTON IS SELECTED
    if (elemId == "percent") {
      calcPercentage(temp, b);
    }
    //IF = BUTTON IS PUSHED
    if (elemId == "equal") {
      b = input;
      doTheMath(mathOperator, a, b);
    }
    inputDisplay(elemId);
    resizeDisplay();
  });
  /* END MOUSE EVENTS  */

  /*-------------------*/
  /* KEYBOARD EVENTS   */
  /*-------------------*/
  document.addEventListener("keydown", function (event) {
    //IF A NUMBER IS PRESSED
    if (isNaN(event.key) == false) {
      input = input + event.key;
      display.innerHTML = input;
    }
    //IF AN OPERATOR IS PRESSED
    else {
      Object.keys(button).forEach(function (key) {
        if (button[key] == event.key) {
          elemId = button[key];
          console.log(elemId);

          /* ---------------------------------------------- */
          /* ADD ALL THE CONDITIONAL CHECKS                 */
          /* (SQ ROOT, DECIMAL, EQUALS, ETC) IN THIS SPACE  */
          /* -----------------------------------------------*/

          inputDisplay(elemId);
        }
      });
    }
  });

  document.addEventListener("keypress", function (event) {
    resizeDisplay();
  });
  /* END KEYBOARD EVENTS --*/

  /*----------------------*/
  /* INTERIOR FUNCTIONS   */
  /*----------------------*/
  //CONVERT BUTTON CLICK TO INPUT
  let inputDisplay = (elemId) => {
    //IF PROPERTY EXISTS IN obj.buttons
    if (button[elemId] !== undefined) {
      //IF A NUMBER WAS PRESSED (0-9)
      if (numRange(button[elemId], 0, 9) === true) {
        input = input += button[elemId];
        display.innerHTML = input;
      }
      //IF AN OPERATOR WAS PRESSED
      else {
        operatorCheck(elemId);
      }
    }
  };

  //NUMBER CHECK
  let numRange = (x, min, max) => {
    return (x - min) * (x - max) <= 0;
  };

  //OPERATOR CHECK
  let operatorCheck = (elemId) => {
    //ITERATE OVER OBJECT, LOCATE CALLED OPERATOR
    for (const property in button) {
      if (property == elemId) {
        //CLEAR
        if (button[elemId] == "C") {
          a = b = input = "";
          result = undefined;
          display.innerHTML = defaultHTML;
        }
        //DECIMAL
        else if (button[elemId] == ".") {
          input = input += ".";
          buttonState(elemId);
        }
        //SQUARE ROOT
        else if (button[elemId] == "√") {
          mathOperator = button[elemId];
          doTheMath(mathOperator, a, b);
        } else {
          mathOperator = button[elemId];
          if (result !== undefined) {
            a = result;
            input = "";
          } else {
            a = input; //REASSIGN FIRST INPUT
            input = ""; //CLEAR INPUT
          }
        }
      }
    }
  };

  //BUTTON INDICATOR
  let buttonState = (elem, state) => {
    console.log("BUTTONSTTE: " + elem);
  };

  //CALCULATE PERCENTAGE
  let calcPercentage = (a, b) => {
    str = (a / b) * 100;
    result = new Function("return " + str)();
    result = result.toFixed(2) + "%";
    a = b = temp = "";
    display.innerHTML = result;
  };

  //SOLVE MATH PROBLEM
  let doTheMath = (operator, numbers, moreNumbers) => {
    //SQUARE ROOT
    if (mathOperator == "√") {
      if (result) {
        result = Math.sqrt(result);
      } else if (a || input) {
        if (a) {
          result = Math.sqrt(a).toFixed(5);
        } else {
          result = Math.sqrt(input);
        }
      } else {
        result = "error";
        return;
      }

      //REDUCE THE RESULT
      let n = result.toString().length;
      if (n >= 6) {
        result = result.toFixed(5);
      }
      a = b = input = "";
    }
    //EQUALS
    else {
      str = a + mathOperator + b; //CONCATENATE THE STRING
      console.log("231: str = " + str);
      result = new Function("return " + str)();
    }
    display.innerHTML = result; //DISPLAY THE RESULT
  };

  //RESIZE FONT TO FIT DISPLAY
  let resizeDisplay = () => {
    if (display.offsetWidth >= frame) {
      let fontSize = parseInt(display.style.fontSize); //DELETE 'px'
      let ratioW = (frame / display.offsetWidth).toFixed(2);
      let ratioH = Math.round(fontSize * ratioW);
      //SET DISPLAY
      display.style.fontSize = ratioH + "px";
    } else {
      display.style.fontSize = defaultFontSz;
    }
  };
  /* END INTERIOR FUNCTIONS --*/
};

/*---------------------------*/
/* RELEASE THE CALCULATOR!   */
/*---------------------------*/
window.onload = () => {
  calculator();
};

/*-----------------*/
/* LEFTOVER CODE   */
/*-----------------*
    //ITERATE OVER obj.button, DISPLAY PROPERTIES
    for (const property in button) {
      console.log(`${property}: ${button[property]}`);
    }

  /*
  const operator = {
    "+": function (a, b) {
      return a + b;
    },
    C: function (a, b) {
      a == "";
      b == "";
      return a, b;
    },
    "/": function (a, b) {
      return a / b;
    },
    "-": function (a, b) {
      return a - b;
    },
    "*": function (a, b) {
      return a * b;
    },
    "%": function (a, b) {
      return (a / b) * 100;
    },
    "√": function (a) {
      let num = a;
      num = Math.sqrt(num);
      if (Number.isInteger(num) == true) {
        return num;
      }
      if (Number.isInteger(num) == false) {
        return num.toFixed(2);
      }
    },
  };
  */

/* END LEFTOVER CODE --*/
