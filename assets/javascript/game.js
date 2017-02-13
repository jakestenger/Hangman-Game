var guesses = 0;
var bad_guesses = [];
var good_guesses = [];
var keep_listening = true;
var total_score = 0;
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var letters = {
	letter0: "s",
	letter1: "t",
	letter2: "a",
	letter3: "r",
	letter4: " ",
	letter5: "t",
	letter6: "r",
	letter7: "e",
	letter8: "k"
};

function reset() {
	for (var i = 0; i < bad_guesses.length; i++) {
		document.getElementById("wrong-letter" + (i + 1)).innerHTML = "";
	}
	for (var key in letters) {
		document.getElementById(key).innerHTML = "&nbsp";
	}
	keep_listening = true;
	guesses = 0;
	bad_guesses = [];
	good_guesses = [];
	keep_listening = true;
	document.getElementById("guesses-remaining-box").innerHTML = "<hr><h3>You have <span id=\"guesses-remaining\">6</span> incorrect guesses left before you lose.</h3>";
	document.getElementById("guesses-remaining-box").style.height = "";
	document.getElementById("bad-guess-counter").innerHTML = "";
	document.getElementById("guesses-remaining").innerHTML = " " + 6 + " ";
	document.getElementById("playboard").innerHTML = '<img src="assets/images/hm0.png">'
	document.getElementById("playboard").style.marginTop = "180px";
	document.getElementById("playboard").style.height = "";
}


document.onkeyup = function(event) {

	function alreadyGuessed(userGuess) {
		for (var i = 0; i < bad_guesses.length; i++) {
			if (userGuess === bad_guesses[i]) {
				return true;
			}
		}

		for (var i = 0; i < good_guesses.length; i++) {
			if (userGuess === good_guesses[i]) {
				return true;
			}
		}
		return false;
	}

	function inAlphabet(userGuess) {
		for (var i = 0; i < alphabet.length; i++) {
			if (userGuess === alphabet[i]) {
				return true;
			}
		}
		return false;
	}

	function checkLetter(userGuess) {
		if (!inAlphabet(userGuess)) {
			alert("\"" + userGuess.toUpperCase() + "\" is not in the alphabet. Try again.")
			return;
		} else if (alreadyGuessed(userGuess)) {
			alert("You've already guessed \"" + userGuess.toUpperCase() + 
				"\". Please try to pay more attention to what you're doing.");
			return;
		} else {
			guesses++
			var match = false;
			for (var key in letters) {
				if (userGuess === letters[key]) {
					document.getElementById(key).innerHTML = userGuess;
					good_guesses.push(userGuess);
					match = true;
				}
				if (good_guesses.length === 8) {
					keep_listening = false;
					total_score++;
					document.getElementById("guesses-remaining-box").innerHTML = "";
					document.getElementById("guesses-remaining-box").style.height = "0px";
					document.getElementById("playboard").style.height = "320px";
					document.getElementById("playboard").style.marginTop = "120px";
					document.getElementById("playboard").innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/RfnaxhJY4Yc?autoplay=1;rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>'
					document.getElementById("total-score").innerHTML = total_score;
				}
			}
			if (!match) {
				bad_guesses.push(userGuess);
				document.getElementById("wrong-letter" + bad_guesses.length).innerHTML = userGuess;
				if (bad_guesses.length > 1) {
					document.getElementById("bad-guess-counter").innerHTML = "Your " + bad_guesses.length + " bad guesses so far are: ";
				} else {
					document.getElementById("bad-guess-counter").innerHTML = "Your first bad guess was:";
				}
			
				document.getElementById("guesses-remaining").innerHTML = " " + 6 - bad_guesses.length + " ";
				document.getElementById("playboard").innerHTML = '<img src="assets/images/hm' + bad_guesses.length + '.png">'
				if (bad_guesses.length === 6) {
					keep_listening = false;
				}
			}
		}
	};

	if (keep_listening) {
		checkLetter(event.key.toLowerCase());
	};
}
