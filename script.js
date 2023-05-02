/* Last updated: 5/2/2023   */

/* ROAD MAP
  1. COMPARE keysArray[] AGAINST Obj.numbers{}, AND ENTER CORRECT INPUT
  2. SWITCH(?) STATEMENT FOR NON-NUMBER KEYS (OPERATORS, DECIMALS, CLEAR)
  3. HIGHLIGHT OPERATOR KEY ON PRESS/RELEASE
  4. SHOW RESULT, RELEASE OPERATOR HIGHLIGHT ON EQUAL (IF VALID)
  5. TEST TEST TEST
  6. STYLE CALCULATOR
*/

/*--------------*/
/* KEY EVENTS   */
/*--------------*/
const calculator = () => {
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
    addition: "&plus;",
    clear: "clear",
    decimal: ".",
    divide: "&divide;",
    equal: "&equals;",
    minus: "&minus;",
    multiply: "&times;",
    percent: "&percnt;",
    squroot: "&radic;",
  };
  const equals = document.getElementById("equal");
  const frame = document.getElementById("display-frame").offsetWidth - 30; //426px
  const display = document.getElementById("display");

  let input = "";
  let keys = document.getElementsByClassName("button");
  let keysArray = new Array();
  let temp;
  let x;

  //SET CALCULATOR DISPLAY
  display.style.fontSize = "92px";
  display.innerHTML = "";

  //GATHER BUTTONS BY CLASS NAME
  for (x = 0; x < keys.length; x++) {
    //STRIP .button FROM CLASS NAME;INSERT KEY IDENTIFIER INTO ARRAY
    keysArray.push(keys[x].className.replace("button ", ""));
  }

  //  numsLength = Object.keys(numbers).length;
  //  console.log(numsLength);

  /*
  for (const value in numbers) {
    if (numbers.hasOwnProperty(value)) {
      console.log(`${value}: ${numbers[value]}`);
    }
  }
  */

  //MOUSE EVENTS
  document.addEventListener("click", function (event) {
    let elemId = event.target.id; //CAPTURE BUTTON ID
    inputDisplay(elemId);
    resizeDisplay();
  });

  // KEYBOARD EVENTS
  document.addEventListener("keydown", function (event) {
    temp = event.key;
    temp = +temp;

    if (isNaN(temp) == false) {
      input = input += temp;
    }
    document.addEventListener("keypress", function (event) {
      //SHRINK USER INPUT TO FIT CALCULATOR
      resizeDisplay();
    });
    display.innerHTML = input;
  });

  //OPERATOR EVENTS
  equals.addEventListener("mouseup", function (event) {
    console.log("equals");
  });

  /*---------------------*/
  /* INTERIOR FUNCTIONS  */
  /*---------------------*/
  //CONVERT BUTTON CLICK TO INPUT
  let inputDisplay = (elemId) => {
    //console.log(button[elemId]);
    input = input += button[elemId];
    display.innerHTML = input;
  };

  //RESIZE FONT TO FIT DISPLAY
  let resizeDisplay = () => {
    if (display.offsetWidth >= frame) {
      let fontSize = parseInt(display.style.fontSize); //DELETE 'px'
      let ratioW = (frame / display.offsetWidth).toFixed(2);
      let ratioH = Math.round(fontSize * ratioW);

      display.style.fontSize = ratioH + "px";
    }
  };
  /* END INTERIOR FUNCTIONS --*/
};

window.onload = () => {
  calculator();
};
