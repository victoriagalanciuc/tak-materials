let answer = document.getElementById("answer");
let attempt = document.getElementById("attempt");

function guess() {
  let input = document.getElementById("user-guess");
  //add functionality to guess function here
  if (answer.value === "" || attempt.value === "") {
    setHiddenFields();
  }
  if (!validateInput(input.value)) {
    return;
  }
  attempt.value++;

  if (getResults(input.value)) {
    setMessage("You Win! :)");
    showAnswer(true);
    showReplay();
  } else if (attempt.value >= 10) {
    setMessage("You Lose! :(");
    showAnswer(false);
    showReplay();
  } else {
    setMessage("Incorrect, try again.");
  }
}

//implement new functions here
function setHiddenFields() {
  attempt.value = "0";
  answer.value = String(Math.floor(Math.random() * 10000));
  while (answer.value.length < 4) {
    answer.value = "0" + answer.value;
  }
}

function setMessage(text) {
  document.getElementById("message").innerHTML = text;
}

function validateInput(guess) {
  if (String(guess).length === 4) {
    return true;
  }
  setMessage("Guesses must be exactly 4 characters long.");
  return false;
}

function getResults(input) {
  let result = `<div class="row"><span class="col-md-6">${input}</span><div class="col-md-6">`;

  for (let i = 0; i < 4; i++) {
    if (input[i] === answer.value[i]) {
      result += '<span class="glyphicon glyphicon-ok"></span>';
    } else if (answer.value.indexOf(input[i]) !== -1) {
      result += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      result += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  result += "</div></div>";

  document.getElementById("results").innerHTML += result;

  return answer.value == input;
}

function showAnswer(win) {
  document.getElementById("code").innerHTML = answer.value;
  if (win) {
    document.getElementById("code").className += " success";
  } else {
    document.getElementById("code").className += " failure";
  }
}

function showReplay() {
  document.getElementById("guessing-div").style.display = "none";
  document.getElementById("replay-div").style.display = "block";
}
