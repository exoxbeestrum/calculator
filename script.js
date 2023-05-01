/* Last updated: 5/1/2023   */

/* ROAD MAP
  1. CAPTURE KEY w/ event.key
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
  const frame = document.getElementById("display-frame").offsetWidth - 30; //426px
  const display = document.getElementById("display");
  let input = "";
  let temp;

  //SET DISPLAY
  display.style.fontSize = "92px";
  display.innerHTML = "";

  document.addEventListener("keydown", function (event) {
    temp = event.key;
    temp = +temp;

    if (isNaN(temp) == false) {
      input = input += temp;
    }
    document.addEventListener("keypress", function (event) {
      //SHRINK USER INPUT TO FIT CALCULATOR
      if (display.offsetWidth >= frame) {
        let fontSize = parseInt(display.style.fontSize); //DELETE 'px'
        let ratioW = (frame / display.offsetWidth).toFixed(2);
        let ratioH = Math.round(fontSize * ratioW);

        display.style.fontSize = ratioH + "px";
      }
    });
    display.innerHTML = input;
  });
};

window.onload = () => {
  calculator();
};
