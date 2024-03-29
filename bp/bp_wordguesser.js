document.addEventListener("DOMContentLoaded", function() {
	var dropdown = document.getElementById("id_wordsize");
	
	for (var i = 4; i <= 25; i++) {
		var option = document.createElement("option");
		option.text = i;
		option.value = i;
		dropdown.add(option);
	}

	resetWord();
	setDigits();
	setWordCount(1);
	dropdown.addEventListener("change", function() {
		resetWord();
		setDigits();
	});

	["id_length_1", "id_length_2"].forEach(function(id) {
		let wordlength = document.getElementById(id);
		wordlength.addEventListener("change", function() {
			updateBreaks();
		});
	});

});

function resetWord(){
	var digitdiv = document.getElementById("id_digits");
	digitdiv.innerHTML = "";
	var dropdown = document.getElementById("id_wordsize");
	console.log("Resetted");
	writeToAnswers();
	
}

function setDigits(){
	var dropdown = document.getElementById("id_wordsize");
	var selectedOption = dropdown.options[dropdown.selectedIndex].value;
	console.log("Add digits: " + selectedOption);
	addDigits(selectedOption);
}

function addDigits(n){
	var digitdiv = document.getElementById("id_digits");

	for (var i = 1; i <= n; i++) {
		let inputElement = document.createElement("input");
		inputElement.setAttribute("type", "text");
		inputElement.setAttribute("class", "cl_digit");
		inputElement.setAttribute("id", `id_digit_${i}`);
		inputElement.setAttribute("maxlength",1);
		inputElement.setAttribute("size",1);
		digitdiv.appendChild(inputElement);
	}

	// event listener for: skip to next digit auto
	var inputElements = document.querySelectorAll(".cl_digit");
	inputElements.forEach(function(inputElement, index) {
		inputElement.addEventListener("input", function(event) {
			if (inputElement.value && index < inputElements.length - 1) {
				inputElements[index + 1].focus();
			}
			writeToAnswers();
		});
	});
}

var globalWordCount = 1;
function setWordCount(n){
	globalWordCount = n;
	let div1 = document.getElementById("id_div_length_1");
	let div2 = document.getElementById("id_div_length_2");


	if (n === 1) {
		div1.style.display = "none"
		div2.style.display = "none"
		document.getElementById("id_length_1").value = "";
		document.getElementById("id_length_2").value = "";
	}
	if (n === 2) {
		div1.style.display = "inline-block"
		div2.style.display = "none"
		document.getElementById("id_length_2").value = "";
	}
	if (n === 3) {
		div1.style.display = "inline-block"
		div2.style.display = "inline-block"

	}
	updateBreaks();
}

function addBreak(n) {
	if (n >0) {
		var digitsContainer = document.getElementById("id_digits");
		var inputs = digitsContainer.querySelectorAll("input.cl_digit");
		
		if (n <= 0 || n > 25) {
			console.error("Invalid input index");
			return;
		}

		var br = document.createElement("br");
		br.setAttribute("id","id_linebreak")
		digitsContainer.insertBefore(br, inputs[n]);
	}
	else{
		console.error("Add break ignored, most likely an extra length for shorter word")
	}
	
}

function updateBreaks(){
	console.log("Updated breaks")
	
	let digitsDiv = document.getElementById("id_digits");
	let linebreaks = digitsDiv.querySelectorAll("[id='id_linebreak']");
	linebreaks.forEach(function(element) {
		element.remove();
	});
	

	let length1 = document.getElementById("id_length_1").valueAsNumber;
	if (!isNaN(length1)) {
		resetWord();
		setDigits();
		removeDigitFromLast();
		addBreak(length1);
		writeToAnswers();}

	let length2 = document.getElementById("id_length_2").valueAsNumber;
	if (!isNaN(length2)) {
		resetWord();
		setDigits();
		removeDigitFromLast();
		removeDigitFromLast();
		addBreak(length1);
		addBreak(length1+length2);
		writeToAnswers();}


}

function filterWordsByPattern(pattern) {
	const patternLowerCase = pattern.toLowerCase(); // Convert pattern to lowercase
	return arrayData.filter(word => {
		const wordLowerCase = word.toLowerCase(); // Convert word to lowercase
		if (wordLowerCase.length !== patternLowerCase.length) {
			return false;
		}
		for (let i = 0; i < wordLowerCase.length; i++) {
			if (patternLowerCase[i] !== '_' && patternLowerCase[i] !== wordLowerCase[i]) {
				return false;
			}
		}
		if (wordLowerCase.split(" ").length != globalWordCount){
			return false;
		}
		return true;
	});
}

function writeToAnswers(){
	let answers = document.getElementById("id_div_answers");
	answers.innerText = ""
	
	results = filterWordsByPattern(getPattern());

	results.forEach((element) => (answers.innerText += (element+"\n")));
}

function getPattern(){
	let resPattern = "";
	let digitsDiv = document.getElementById("id_digits");
	let linebreaks = digitsDiv.querySelectorAll("[class='cl_digit']");
	linebreaks.forEach(function(element) {
		if (element.value === "" || element.value === " ") {resPattern+="_"}
			else {resPattern+=element.value}
	});


	let length1 = document.getElementById("id_length_1").valueAsNumber;
	let length2 = document.getElementById("id_length_2").valueAsNumber;
	resPattern = splitText(resPattern,length2);
	resPattern = splitText(resPattern,length1);

	console.log(resPattern);
	return resPattern;
}

function removeDigitFromLast(){
	const divElement = document.getElementById('id_digits'); 
	const inputElements = divElement.querySelectorAll('.cl_digit');
	const lastInputElement = inputElements[inputElements.length - 1];
	lastInputElement.remove();

}

function splitText(text, n) {
	if (!isNaN(n)) {
		const firstPart = text.substring(0, n);
		const secondPart = text.substring(n);
		let res = firstPart+"_"+secondPart;
		console.log(firstPart.length,secondPart.length)
		return res;
	}
	return text
}