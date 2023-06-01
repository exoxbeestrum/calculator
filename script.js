/* Last updated: 6/1/2023 --*/

/*---------------------*/
/* DECLARE VARIABLES   */
/*---------------------*/
// CALCULATOR FUNCTION
const calculator = () => {
  //SET VARIABLES
  const button = {
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

  const frame = document.getElementById("display-frame").offsetWidth - 30; //426px
  const display = document.getElementById("display");
  const keyOperators = [
    "Enter",
    ".",
    "/",
    "-",
    "=",
    "*",
    "%",
    "+",
    "c",
    "Backspace",
  ];

  let a; //HOLD FOR FIRST NUMBER EXPRESSION
  let b; //HOLD FOR SECOND NUMBER EXPRESSION
  let defaultFontSz = "92px";
  let defaultHTML = "&#128522;";
  let elemId;
  let input = "";
  let keys = document.getElementsByClassName("button");
  let keysArray = new Array();
  let operator; //MATH EXPRESSION/OPERATOR
  let result = undefined; //HOLD FOR MATH RESULT. DUH.
  let str; //HOLD FOR MATH EXPRESSION
  let temp;
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
    //IF % BUTTON IS SELECTED
    if (elemId == "percent") {
      calcPercentage(a, b);
    }
    //IF = BUTTON IS PUSHED
    if (elemId == "equal") {
      b = input;
      doTheMath(operator, a, b);
    }
    inputDisplay(elemId);
    resizeDisplay();
  });
  /* END MOUSE EVENTS --*/

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
    if (keyOperators.includes(event.key) == 1) {
      switch (event.key) {
        //DECIMAL
        case ".":
          //ADD ONLY ONE DECIMAL
          if (input.includes(".") == false) {
            input = input += ".";
          }
          break;
        //DIVIDE
        case "/":
          setEquation(input, event.key);
          input = "";
          break;
        //MINUS
        case "-":
          setEquation(input, event.key);
          input = "";
          break;
        //MULTIPLY
        case "*":
          setEquation(input, event.key);
          input = "";
          break;
        //ADDITION
        case "+":
          setEquation(input, event.key);
          input = "";
          break;
        //PERCENTAGE
        case "%":
          calcPercentage(a, b);
          break;
        //CLEAR
        case "c":
          clearButton();
          break;
        //DELETE
        case "Backspace":
          backspace();
          break;
      }
      //EQUALS
      if (event.key == "Enter" || event.key == "=") {
        b = input;
        doTheMath(operator, a, b);
      }
    }
  });

  document.addEventListener("keypress", function (event) {
    resizeDisplay();
  });
  /* END KEYBOARD EVENTS --*/

  /*----------------------*/
  /* INTERIOR FUNCTIONS   */
  /*----------------------*/
  /*-------------------------------------*/
  /* INPUT DISPLAY (FOR BUTTON CLICKS)   */
  /*-------------------------------------*/
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
  /* END INPUT DISPLAY (FOR BUTTON CLICKS) --*/

  /*----------------*/
  /* NUMBER CHECK   */
  /*----------------*/
  let numRange = (x, min, max) => {
    return (x - min) * (x - max) <= 0;
  };
  /* END NUMBER CHECK --*/

  /*----------------*/
  /* SET EQUATION   */
  /*----------------*/
  let setEquation = (num, expr) => {
    if (result !== undefined) {
      a = result;
      operator = expr;
    } else {
      a = num;
      operator = expr;
    }
  };
  /* END SET EQUATION --*/

  /*------------------*/
  /* OPERATOR CHECK   */
  /*------------------*/
  let operatorCheck = (elemId) => {
    //ITERATE OVER buttons OBJECT, LOCATE CALLED OPERATOR
    for (const property in button) {
      if (property == elemId) {
        //CLEAR
        if (button[elemId] == "C") {
          clearButton();
        }
        //DECIMAL
        else if (button[elemId] == ".") {
          //ADD ONLY ONE DECIMAL
          if (input.includes(".") == false) {
            input = input += ".";
          }
        }
        //SQUARE ROOT
        else if (button[elemId] == "√") {
          operator = button[elemId];
          doTheMath(operator, a, b);
        }
        //ENTER || RETURN KEYPRESS
        else if (button[elemId] == "Enter") {
          if (result !== undefined) {
            a = result;
            input = "";
          } else {
            a = input; //REASSIGN FIRST INPUT
            input = ""; //CLEAR INPUT
          }
        }

        //ASSIGN MATH OPERATOR
        else {
          operator = button[elemId];
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
  /* END OPERATOR CHECK --*/

  /*----------------*/
  /* CLEAR BUTTON   */
  /*----------------*/
  let clearButton = () => {
    a = b = input = "";
    result = undefined;
    display.innerHTML = defaultHTML;
  };
  /* END CLEAR BUTTON --*/

  /*-------------*/
  /* BACKSPACE   */
  /*-------------*/
  let backspace = () => {
    //BEFORE FIRST EQUATION
    if (result == undefined) {
      input = input.slice(0, -1);
      display.innerHTML = input;
    }
    //AFTER FIRST EQUATION
    if (result && input) {
      input = input.slice(0, -1);
      display.innerHTML = input;
    }
  };
  /* END BACKSPACE --*/

  /*-------------------------------------*/
  /* CALCULATE PERCENTAGE (VERY BUGGY)   */
  /*-------------------------------------*/
  let calcPercentage = (a, b) => {
    str = (a / b) * 100;
    result = new Function("return " + str)();

    if ((a = undefined || b == undefined)) {
      result = "ERROR";
    } else if ((result = "NaN")) {
      result = "ERROR";
    } else if (result == Infinity) {
      result = "ERROR";
    } else {
      result = result.toFixed(2) + "%";
    }
    a = b = input = str = temp = "";
    display.innerHTML = result;
    setTimeout(clearButton, 1000);
  };
  /* END CALCULATE PERCENTAGE --*/

  /*------------------------*/
  /* DO THE MATH FUNCTION   */
  /*------------------------*/
  let doTheMath = (operator, numbers, moreNumbers) => {
    //IF REQUISITE VARIABLES NOT PASSED...
    if (!operator || !numbers || !moreNumbers) {
      //...DO NOTHING
    } else {
      //SQUARE ROOT
      if (operator == "√") {
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
      //END SQUARE ROOT

      //EQUALS
      else {
        str = a + operator + b; //CONCATENATE THE STRING
        result = new Function("return " + str)();
      }
      display.innerHTML = result; //DISPLAY THE RESULT
      a = b = input = "";
    }
  };
  /* END DO THE MATH FUNCTION --*/

  /*------------------------------*/
  /* RESIZE FONT TO FIT DISPLAY   */
  /*------------------------------*/
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
  /* END RESIZE FONT TO FIT DISPLAY --*/
  /* END INTERIOR FUNCTIONS --*/
};

/*---------------------------*/
/* RELEASE THE CALCULATOR!   */
/*---------------------------*/
window.onload = () => {
  calculator();
};
