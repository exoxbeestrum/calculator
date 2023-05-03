/* Last updated: 5/3/2023 --*/

/* ROAD MAP
  1. REVIEW LINE #164
  2. HIGHLIGHT OPERATOR KEY ON PRESS/RELEASE
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

  const equals = document.getElementById("equal");
  const frame = document.getElementById("display-frame").offsetWidth - 30; //426px
  const display = document.getElementById("display");

  let a; //HOLD FOR FIRST NUMBER EXPRESSION
  let b; //HOLD FOR SECOND NUMBER EXPRESSION
  let input = "";
  let keys = document.getElementsByClassName("button");
  let keysArray = new Array();
  /* END DECLARE VARIABLES --*/

  //SET CALCULATOR DISPLAY
  display.style.fontSize = "92px";
  display.innerHTML = "";

  //GATHER BUTTONS BY CLASS NAME
  for (let x = 0; x < keys.length; x++) {
    //STRIP .button FROM CLASS NAME; INSERT KEY IDENTIFIER INTO ARRAY
    keysArray.push(keys[x].className.replace("button ", ""));
  }

  /*----------------*/
  /* MOUSE EVENTS   */
  /*----------------*/
  document.addEventListener("mouseup", function (event) {
    let elemId = event.target.id; //CAPTURE BUTTON ID
    //IF = BUTTON IS PUSHED
    if (elemId == "equal") {
      doTheMath(operator, a, b);
    }
    inputDisplay(elemId);
    resizeDisplay();
  });
  /* END MOUSE EVENTS  */

  /*-------------------*/
  /* KEYBOARD EVENTS   */
  /*-------------------*
  document.addEventListener("keydown", function (event) {
    //IF NOT THE SPACEBAR (B/C SPACEBAR RETURNS "0")
    if (event.key == " " || event.code == "Space" || event.keyCode == 32) {
      console.log("SPACE " + event.key);
    }
    temp = event.key;
    temp = +temp;

    //IF NOT A NUMBER
    if (isNaN(temp) == false) {
      input = input += temp;
    }
    document.addEventListener("keypress", function (event) {
      //SHRINK USER INPUT TO FIT CALCULATOR
      resizeDisplay();
    });
    display.innerHTML = input;
    console.log(input);
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
        //console.log("OPERATOR: " + elemId);
        //console.log(input);
        //console.log(button[elemId]);

        a = input; //REASSIGN FIRST INPUT
        input = ""; //CLEAR INPUT
        //1. SCRIPT: CLEAR, PERCENTAGE, SQUARE-ROOT, EQUAL
        //2. HIGHLIGHT OPERATOR ON SELECTION
        //3. DISABLE OTHER BUTTONS(?)
        //4. WRITE FUNCTION FOR EQUAL, PERCENTAGE, SQUARE-ROOT MOUSEDOWN
      }
    }
  };

  //SOLVE MATH PROBLEM
  let doTheMath = (operator, numbers, moreNumbers) => {
    console.log("LET A = " + a);
  };

  //RESIZE FONT TO FIT DISPLAY
  let resizeDisplay = () => {
    if (display.offsetWidth >= frame) {
      let fontSize = parseInt(display.style.fontSize); //DELETE 'px'
      let ratioW = (frame / display.offsetWidth).toFixed(2);
      let ratioH = Math.round(fontSize * ratioW);
      //SET DISPLAY
      display.style.fontSize = ratioH + "px";
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
/* END LEFTOVER CODE --*/
