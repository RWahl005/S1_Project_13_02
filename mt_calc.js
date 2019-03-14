"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Ryan Wahl
   Date:   3.14.19
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/

// Call the init function when the window is loaded.
window.onload = init();

/**
 * The function that is called when the browser is loaded.
 */
function init() {
      // Grabs all of the calculator buttoons.
      var calcButtons = document.getElementsByClassName("calcButton");
      // Loops through the buttoons.
      for (var i = 0; i < calcButtons.length; i++) {
            // Add the buttonClick function to the button as an event when the click event is called.
            calcButtons[i].addEventListener("click", buttonClick);
      }
      // Adds an event listener for the keydown event on the calcWindow element. Calls the function calcKeys
      document.getElementById("calcWindow").addEventListener("keydown", calcKeys);
}

/**
 * When a button was click.
 * @param {Event} e This parameters is filled in by the browser when the function is called. 
 */
function buttonClick(e) {
      // Gets the value of the calWindow
      var calcValue = document.getElementById("calcWindow").value;
      // Gets the value of the decimal spinner box.
      var calcDecimal = document.getElementById("decimals").value;
      // Get the button value of the target button.
      var buttonValue = e.target.value;
      // Switch through the button value to se what it is.
      switch (buttonValue) {
            case "del":
                  // If "del" then set the calcValue to an empty string.
                  calcValue = "";
                  break;
            case "bksp":
                  // If "bksp" then set calcValue to the return value of eraseChar with the parameter calc value. (eraseChar is a premade function).
                  calcValue = eraseChar(calcValue);
                  break;
            case "enter":
                  // If "enter" then set calcvalue to " = " plus the return of evalEq with the parameters calcValue and calcDecimal.
                  calcValue += " = " + evalEq(calcValue, calcDecimal) + "\n";
                  break;
            case "prev":
                  // If "prev" then set the calcValue to the return of the lastEq with a parameter of calcValue.
                  calcValue = lastEq(calcValue);
                  break;
            default:
                  // If none of the above then set the calcValue equal to the buttonValue.
                  calcValue += buttonValue;
                  break;
      }
      // Set the calcWindow value to the calcValue
      document.getElementById("calcWindow").value = calcValue;
      // Focuses on the calcWindow.
      document.getElementById("calcWindow").focus();
}

/**
 * When a key is pressed.
 * @param {Event} e This parameters is filled in by the browser when the function is called. 
 */
function calcKeys(e) {
      // Grabs the calWindow value.
      var calcValue = document.getElementById("calcWindow").value;
      // Grabs the decimals value.
      var calcDecimal = document.getElementById("decimals").value;
      // Switches between the event key code.
      switch (e.code) {
            case "Delete":
                  // If delete, set calcValue equal to an empty string.
                  calcValue = "";
                  break;
            case "Enter":
                  // If enter, add the evalEq() return value to calcValue.
                  calcValue += " = " + evalEq(calcValue, calcDecimal);
                  break;
            case "ArrowUp":
                  // If ArrowUp, set the calcValue to the lastEq();
                  calcValue = lastEq(document.getElementById("calcWindow").value);
                  // Prevent the browser default action.
                  e.preventDefault();
                  break;
      }
      // Set the calcWindow value to the calcValue
      document.getElementById("calcWindow").value = calcValue;
}




/* ===================================================================== */

function eraseChar(textStr) {
      return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
      var lines = textStr.split(/\r?\n/);
      var lastLine = lines[lines.length - 1];
      var eqValue = eval(lastLine);
      return eqValue.toFixed(decimals);
}

function lastEq(textStr) {
      var lines = textStr.split(/\r?\n/);
      var lastExp = lines[lines.length - 2];
      return lastExp.substr(0, lastExp.indexOf("=")).trim();
}