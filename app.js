//Getting the word
const template = document.querySelector(".template");
const content = template.content.cloneNode(true);
const wordSelectorInput = document.querySelector("#word-number-input");
const wordSelectorLabel = document.querySelector("#word-number-label");
let random = Math.floor(Math.random() * 2116);
let allWords = content.querySelector(".All-words").innerHTML;
WordList = allWords.split(",");
ord = WordList[random];
wordSelectorLabel.innerText += " " + random;
console.log(ord);
console.log(wordSelectorLabel.innerText);
var numberOfGuesses;
var numberOfGuessesArray = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, Oavklarad: 0 };
var rounds = 0;
var roundsPlus = false;
var segersvit = 0;
var vinster = 0;
var longestStreak = 0;
parameterWordNumber = getParameterByName("wordNumber");
if (parameterWordNumber != null) {
  ord = WordList[parameterWordNumber];
  console.log("New word: " + ord);
  wordSelectorLabel.innerText = "Nuvarande ordnummer: " + parameterWordNumber;
}
//localStorage.removeItem("numberOfGuessesArray");
if (localStorage.getItem("numberOfGuessesArray") !== null) {
  numberOfGuessesArray = JSON.parse(
    localStorage.getItem("numberOfGuessesArray")
  );
}
if (localStorage.getItem("rounds") !== null) {
  rounds = Number(localStorage.getItem("rounds"));
}
if (localStorage.getItem("segersvit") !== null) {
  segersvit = Number(localStorage.getItem("segersvit"));
}
if (localStorage.getItem("longestStreak") !== null) {
  longestStreak = Number(localStorage.getItem("longestStreak"));
}
if (localStorage.getItem("vinster") !== null) {
  vinster = Number(localStorage.getItem("vinster"));
}

var readVar = 6;
var btnNumber = 1;
var focusedNumber = 1;
var overlayOn = false;
var easyModeOn = false;
const checkbox = document.querySelector("#check");
checkbox.addEventListener("change", function () {
  let label = document.querySelector(".span-label");
  if (this.checked) {
    label.innerHTML = "Lätt svårighetsgrad på";
    easyModeOn = true;
  } else {
    label.innerHTML = "Lätt svårighetsgrad av";
    easyModeOn = false;
  }
});
function backspace(event, backspace) {
  let key;
  if (backspace) {
    key = event.key; // const {key} = event; ES6+
  } else {
    key = "Backspace";
  }

  if (key === "Backspace") {
    if (focusedNumber > readVar - 6) {
      let inputBox1 = document.querySelector(`#input${focusedNumber}`);
      if (inputBox1.readOnly === false) {
        if (inputBox1.value === "") {
          if (focusedNumber > readVar - 5) {
            focusedNumber--;
            let inputBox1 = document.querySelector(`#input${focusedNumber}`);
            inputBox1.focus();
            inputBox1.value = "";
            checkSubmitButton();
          }
        }
        if (inputBox1.value !== "") {
          inputBox1.value = "";
          checkSubmitButton();
        }
      }
    }
  }
}

const body = document.querySelector("body");
body.addEventListener("keydown", function (event) {
  backspace(event, true);
});

let keyboardElements = document.getElementsByClassName("keyboard-key");
keyboardElements[keyboardElements.length - 1].addEventListener(
  "click",
  (event) => {
    backspace(event, false);
  }
);
for (var i = 0; i < keyboardElements.length - 1; i++) {
  keyboardElements[i].addEventListener("click", (event) => {
    let inputBox = document.querySelector(`#input${focusedNumber}`);

    if (inputBox.readOnly === false) {
      let letter = event.composedPath()[0].innerHTML;
      inputBox.value = letter;
      checkSubmitButton();
      if (focusedNumber < readVar - 1) {
        focusedNumber++;
      }
      document.querySelector(`#input${focusedNumber}`).focus();
    }
  });
}

window.onload = function () {
  readAble();
};

function overlay() {
  let overlay = document.querySelector(".overlay");
  let topContainer = document.querySelector(".checkbox-container");
  if (overlayOn === false) {
    topContainer.style.zIndex = "20";
    topContainer.style.opacity = "100%";
    overlay.style.zIndex = "9";
    overlay.style.opacity = "50%";
    overlayOn = true;
  } else {
    topContainer.style.zIndex = "-1";
    topContainer.style.opacity = "0%";
    overlay.style.zIndex = "-2";
    overlay.style.opacity = "0%";
    overlayOn = false;
  }
}
function changeBox(input) {
  if (input.value !== "") {
    input.value = input.value.toUpperCase();
    str = String(input.id);
    str = str.substring(5);
    if (focusedNumber < readVar - 1) {
      focusedNumber = Number(str) + 1;

      document.querySelector(`#input${focusedNumber}`).focus();
    }

    if (focusedNumber !== readVar) {
    }
  }
  checkSubmitButton();
}
var GlobalFiveLetters;
function checkSubmitButton() {
  let fiveLetters = 0;
  for (let k = readVar - 5; k <= readVar - 1; k++) {
    value = document.querySelector(`#input${k}`).value;
    if (value !== "") {
      fiveLetters++;
    }
  }
  GlobalFiveLetters = fiveLetters;
  if (fiveLetters === 5) {
    let btn = document.querySelector(`#btn${btnNumber}`);
    btn.classList.remove("btn-no-hover");
    btn.classList.remove("btn-hover");
    btn.classList.add("btn-hover");
    return true;
  } else {
    let btn = document.querySelector(`#btn${btnNumber}`);
    btn.classList.remove("btn-no-hover");
    btn.classList.remove("btn-hover");
    btn.classList.add("btn-no-hover");
    return false;
  }
}

function inputbox(html) {
  for (let i = 1; i < 31; i++) {
    let box = document.querySelector(`#box${i}`);
    //box.style.border = "0.2rem solid rgba(88, 88, 88, 0.582)";
  }
  focusedNumber = Number(html.id.substring(3));
  //html.style.border = "0.2rem solid rgb(0, 0, 0)";
}

function readAble() {
  for (let i = 1; i < 31; i++) {
    let box = document.querySelector(`#input${i}`);
    if (i < readVar && i > readVar - 6) {
      box.readOnly = false;
    } else {
      box.readOnly = true;
    }
  }
}

function btnFunction(btn) {
  if (roundsPlus === false) {
    rounds++;
    roundsPlus = true;
    localStorage.setItem("rounds", "" + rounds);
  }
  let index = 0;
  let tmpBtnNumber = Number(String(btn.id).substring(3));
  tmpBtnNumber += 1;
  btnNumber = tmpBtnNumber;
  btn.classList.remove("btn-no-hover");
  btn.classList.remove("btn-hover");
  btn.classList.add("btn-no-hover");
  inputNumber = (tmpBtnNumber - 1) * 5 + 1;
  let remove = "";
  let inputBoxArray = ["text", "text", "text", "text", "text"];
  includingWord = "";
  let flipFunctionArray = [];
  for (let i = inputNumber - 5; i < inputNumber; i++) {
    let box = document.querySelector(`#input${i}`);
    includingWord += box.value.toLowerCase();
  }
  if (easyModeOn === false) {
    if (WordList.includes(includingWord) === false) {
      addShake();
      let noWOrd = document.querySelector(".no-word");
      noWOrd.style.height = "5rem";
      noWOrd.style.top = "2.5rem";
      noWOrd.style.border = "0.1rem solid white";
      noWOrd.style.outline = "0.1rem solid rgb(201, 201, 201)";
      noWOrd.style.boxShadow = "0 0 0.4rem 0.2rem rgba(90, 90, 90, 0.2)";
      noWOrd.innerHTML = `${
        includingWord[0].toUpperCase() + includingWord.substring(1)
      } är inget riktigt ord`;
      let zero = 0;
      focusedNumber = 1;
      for (let i = inputNumber - 5; i < inputNumber; i++) {
        let box = document.querySelector(`#input${i}`);
        includingWord += box.value.toLowerCase();
        box.value = "";
        box.readOnly = false;
        if (zero === 0) {
          box.focus();
          zero++;
          let box1 = document.querySelector(`#box${i}`);
        }
      }
      btnNumber--;
      let box1 = document.querySelector(`#box${inputNumber}`);

      setTimeout(function () {
        noWOrd.style.height = "0rem";
        noWOrd.innerHTML = "";
        noWOrd.style.top = "0rem";
        noWOrd.style.border = "0.0rem solid white";
        noWOrd.style.outline = "0.0rem solid black";
        noWOrd.style.boxShadow = "0 0 0 0";
      }, 2200);
    } else if (WordList.includes(includingWord) === true) {
      for (let i = inputNumber - 5; i < inputNumber; i++) {
        let inputBox = document.querySelector(`#input${i}`);
        index = i - 5 * (btnNumber - 2) - 1;
        if (ord[index] == String(inputBox.value.toLowerCase())) {
          flipFunctionArray[index] = [inputBox, "green"];
          //inputBox.style.background = "green";
          document.querySelector(
            `#${String(inputBox.value).toUpperCase()}`
          ).style.backgroundColor = "green";

          remove += "" + index;
        } else {
          inputBoxArray[index] = inputBox;
        }
      }
      let tmpOrd = "";
      for (let k = 0; k < 5; k++) {
        if (remove.includes("" + k) === false) {
          tmpOrd += ord[k];
        } else {
          tmpOrd += "£";
        }
      }
      console.log(tmpOrd + " detta är tmpord");
      for (let i = 0; i < 5; i++) {
        if (typeof inputBoxArray[i] !== "string") {
          let keyboardKey = document.querySelector(
            `#${String(inputBoxArray[i].value).toUpperCase()}`
          );
          if (tmpOrd.includes(inputBoxArray[i].value.toLowerCase()) === true) {
            if (keyboardKey.style.backgroundColor !== "green") {
              keyboardKey.style.backgroundColor = "yellow";
            }
            flipFunctionArray[i] = [inputBoxArray[i], "yellow"];
            console.log("ord är " + ord);
            removeIndex = tmpOrd.indexOf(
              "" + inputBoxArray[i].value.toLowerCase()
            );
            remove += "" + removeIndex;
            tmpOrd = "";
            for (let k = 0; k < 5; k++) {
              if (remove.includes("" + k) === false) {
                tmpOrd += ord[k];
              } else {
                tmpOrd += "£";
              }
            }
            tmpOrd = JSON.parse(JSON.stringify(tmpOrd));
          } else if (
            tmpOrd.includes(inputBoxArray[i].value.toLowerCase()) === false
          ) {
            flipFunctionArray[i] = [
              inputBoxArray[i],
              "rgba(88, 88, 88, 0.582)",
            ];
            if (
              keyboardKey.style.backgroundColor != "green" &&
              keyboardKey.style.backgroundColor != "yellow"
            ) {
              keyboardKey.style.backgroundColor = "rgba(88, 88, 88, 0.582)";
            }
          }
        }
      }
      readVar += 5;
      readAble();
      let winCount = 0;
      flipFunctionArray.forEach((element) => {
        if (element[1] === "green") {
          winCount++;
        }
      });
      if (winCount === 5) {
        flipFunction(flipFunctionArray);
        setTimeout(() => {
          winFunction(flipFunctionArray);
        }, 2000);
      } else {
        flipFunction(flipFunctionArray);
        focusedNumber = inputNumber;
        if (focusedNumber < 31) {
          document.querySelector(`#input${focusedNumber}`).focus();
        }
        numberOfGuesses = (readVar - 6) / 5;
        if (numberOfGuesses === 6) {
          numberOfGuessesArray["Oavklarad"]++;
          localStorage.setItem(
            "numberOfGuessesArray",
            JSON.stringify(numberOfGuessesArray)
          );
          segersvit = 0;
          localStorage.setItem("segersvit", "" + segersvit);
          summaryFunction(false);

          console.log(numberOfGuesses);
        }
      }
    }
  } else if (easyModeOn === true) {
    for (let i = inputNumber - 5; i < inputNumber; i++) {
      let inputBox = document.querySelector(`#input${i}`);
      index = i - 5 * (btnNumber - 2) - 1;
      if (ord[index] == String(inputBox.value.toLowerCase())) {
        flipFunctionArray[index] = [inputBox, "green"];
        remove += "" + index;
      } else {
        inputBoxArray[index] = inputBox;
      }
    }
    let tmpOrd = "";
    for (let k = 0; k < 5; k++) {
      if (remove.includes("" + k) === false) {
        tmpOrd += ord[k];
      } else {
        tmpOrd += "£";
      }
    }
    console.log(tmpOrd + " detta är tmpord");
    for (let i = 0; i < 5; i++) {
      if (typeof inputBoxArray[i] !== "string") {
        let keyboardKey = document.querySelector(
          `#${String(inputBoxArray[i].value).toUpperCase()}`
        );

        if (tmpOrd.includes(inputBoxArray[i].value.toLowerCase()) === true) {
          flipFunctionArray[i] = [inputBoxArray[i], "yellow"];

          if (keyboardKey.style.backgroundColor !== "green") {
            keyboardKey.style.backgroundColor = "yellow";
          }

          removeIndex = tmpOrd.indexOf(inputBoxArray[i].value.toLowerCase());
          remove += "" + removeIndex;
          console.log("remove = " + remove);
          tmpOrd = "";
          for (let k = 0; k < 5; k++) {
            if (remove.includes("" + k) === false) {
              tmpOrd += ord[k];
            } else {
              tmpOrd += "£";
            }
          }
          tmpOrd = JSON.parse(JSON.stringify(tmpOrd));
          console.log(tmpOrd);
        } else if (
          tmpOrd.includes(inputBoxArray[i].value.toLowerCase()) === false
        ) {
          flipFunctionArray[i] = [inputBoxArray[i], "rgba(88, 88, 88, 0.582)"];

          if (
            keyboardKey.style.backgroundColor != "green" &&
            keyboardKey.style.backgroundColor != "yellow"
          ) {
            keyboardKey.style.backgroundColor = "rgba(88, 88, 88, 0.582)";
          }
        }
      }
    }
    flipFunction(flipFunctionArray);
    readVar += 5;
    readAble();
    let winCount = 0;
    flipFunctionArray.forEach((element) => {
      if (element[1] === "green") {
        winCount++;
      }
    });
    if (winCount === 5) {
      flipFunction(flipFunctionArray);
      setTimeout(() => {
        winFunction(flipFunctionArray);
      }, 2000);
    } else {
      flipFunction(flipFunctionArray);
      focusedNumber = inputNumber;
      if (focusedNumber < 31) {
        document.querySelector(`#input${focusedNumber}`).focus();
      }
      numberOfGuesses = (readVar - 6) / 5;
      if (numberOfGuesses === 6) {
        numberOfGuessesArray["Oavklarad"]++;
        localStorage.setItem(
          "numberOfGuessesArray",
          JSON.stringify(numberOfGuessesArray)
        );
        segersvit = 0;
        localStorage.setItem("segersvit", "" + segersvit);
        console.log(numberOfGuesses);
        summaryFunction(false);
      }
    }
  }
}

function addShake() {
  for (let inputNumber = readVar - 5; inputNumber < readVar; inputNumber++) {
    let tile = document.querySelector(`#input${inputNumber}`);
    tile.classList.add("animation-shake");
    tile.addEventListener(
      "animationend",
      () => {
        tile.classList.remove("animation-shake");
      },
      { once: true }
    );
  }
}

function flipFunction(flipFunctionArray) {
  const ANIMATION_DURATION = 500;
  index = 0;
  flipFunctionArray.forEach((inputBox) => {
    setTimeout(() => {
      inputBox[0].classList.add("animation-flip");
    }, (index * ANIMATION_DURATION) / 2);
    inputBox[0].addEventListener("transitionend", () => {
      inputBox[0].style.backgroundColor = inputBox[1];
      inputBox[0].classList.remove("animation-flip");
    });
    index++;
  });
}

function winFunction(flipFunctionArray) {
  vinster++;
  localStorage.setItem("vinster", "" + vinster);
  segersvit++;
  localStorage.setItem("segersvit", "" + segersvit);
  if (segersvit > longestStreak) {
    longestStreak = segersvit;
    localStorage.setItem("longestStreak", "" + longestStreak);
  }
  const ANIMATION_DURATION = 500;
  index = 0;
  flipFunctionArray.forEach((inputBox) => {
    setTimeout(() => {
      inputBox[0].classList.add("animation-dance");
    }, (index * ANIMATION_DURATION) / 2);
    inputBox[0].addEventListener("transitionend", () => {
      inputBox[0].classList.remove("animation-dance");
    });
    index++;
  });

  for (let i = 1; i < 31; i++) {
    let box = document.querySelector(`#input${i}`);
    box.readOnly = true;
  }

  numberOfGuesses = (readVar - 6) / 5;
  numberOfGuessesArray[`${numberOfGuesses}`]++;
  localStorage.setItem(
    "numberOfGuessesArray",
    JSON.stringify(numberOfGuessesArray)
  );
  console.log(numberOfGuesses);

  summaryFunction(true);
}

body.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    buttonID = (readVar - 1) / 5;
    console.log(buttonID);
    if (GlobalFiveLetters === 5) {
      document.querySelector(`#btn${buttonID}`).click();
    } else {
      console.log("skriv 5 bokstäver");
    }
  }
});

let dataArray = [];
for (const key in numberOfGuessesArray) {
  dataArray.push(numberOfGuessesArray[key]);
}
console.log(dataArray);

var canvasElement = document.getElementById("myChart");
var config = {
  type: "bar",
  data: {
    color: "rgba(0, 0, 0, 0)",
    labels: ["1", "2", "3", "4", "5", "6", "Oavklarad"],
    datasets: [
      {
        label: "Antal Gissningar",
        data: dataArray,
        backgroundColor: [
          "rgb(52, 235, 164)",
          "rgb(52, 235, 164)",
          "rgb(52, 235, 164)",
          "rgb(52, 235, 164)",
          "rgb(52, 235, 164)",
          "rgb(52, 235, 164)",
        ],
        borderColor: ["black"],
        borderWidth: [1],
      },
    ],
  },
  options: {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
          },
        },
        grid: {
          display: false,
        },
      },
    },
  },
};
var myChart = new Chart(canvasElement, config);

function summaryFunction(vinst) {
  setTimeout(() => {
    document.querySelector("#p-omgång").innerHTML = rounds;
    document.querySelector("#p-vinster").innerHTML = vinster;
    document.querySelector("#p-segersvit").innerHTML = segersvit;
    document.querySelector("#p-ls").innerHTML = longestStreak;
    let endContainer = document.querySelector(".end-container");
    endContainer.style.overflow = "visible";
    let subEndContainer = document.querySelector(".sub-end-container");
    subEndContainer.style.height = "42rem";
    let overlay = document.querySelector(".overlay");
    overlay.style.zIndex = "20";
    overlay.style.opacity = "50%";
    if (vinst === true) {
      document.querySelector(
        ".ordetVar"
      ).innerHTML = `Bra jobbat! Ordet var mycket riktigt <em >${ord}</em> (<a href="https://svenska.se/tre/?sok=${ord}">SAOL</a>)`;
    } else {
      document.querySelector(
        ".ordetVar"
      ).innerHTML = `Ordet var <em >${ord}</em>. Bättre lycka nästa gång! (<a href="https://svenska.se/tre/?sok=${ord}">SAOL</a>)`;
    }
  }, 1950);
}

function removeEndContainer() {
  let overlay = document.querySelector(".overlay");
  overlay.style.zIndex = "-2";
  overlay.style.opacity = "0%";

  console.log("functioooon");
  let endContainer = document.querySelector(".end-container");
  console.log(endContainer);
  endContainer.style.height = "0";
  endContainer.style.overflow = "hidden";
  endContainer.style.zIndex = "-30";
  let subEndContainer = document.querySelector(".sub-end-container");
  subEndContainer.style.height = "0";
  subEndContainer.style.zIndex = "-29";
}

function selectWord() {
  let newWordNumber = wordSelectorInput.value;
  window.location.href = window.location.href + "?wordNumber=" + newWordNumber;
}
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
