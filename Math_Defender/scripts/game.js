
const gameBoard = document.getElementById("game_board"); //  Tabuleiro das questões
const gamePanel = document.getElementById("game_panel"); // Painel de jogo
const mainMenu = document.getElementById("main_menu"); // Tela principal
var input = document.getElementById("answer_input"); // Input de resposta
var inputButton = document.getElementById("send_input"); // Botão de envio de resposta
var highscore = 0; // Pontuação máxima atingida
var score = 0; // Pontuação atual da partida
var difficulty = 0; // Dificuldade selecionada
var questions = []; // Lista de questões na tela

/** Carrega as pontuações salvas */

function loadScores() {
	highscore = localStorage.getItem("highscore");
	score = parseInt(localStorage.getItem("lastscore"));
	document.getElementById("highscore").innerHTML = "Highscore: "+highscore;
	document.getElementById("lastscore").innerHTML = "Last Score: "+score;
}

/** Salva as pontuações atuais */

function saveScores() {
	localStorage.setItem("lastscore", score);
	if(score > highscore) {
		highscore = score;
		localStorage.setItem("highscore", highscore);
	}
}

// Carregando as pontuações assim que entrar

window.onload = () => {
	loadScores();
}

input.addEventListener("keypress", e => sendAnswer(e)); // Adicionando evento da tecla enter
inputButton.addEventListener("click", e => check()); // Enviando resposta pra confirmação

/** Permite enviar a resposta usando a tecla Enter */

function sendAnswer(e) {
	if(e.code == "Enter") check(); 
}

/** Verifica se a resposta enviada corresponde a uma das perguntas */

function check() {
	let answer = input.value;

	questions.forEach((item) => {
		if(item.getAnswer() == answer) {

			for(i = 0; i < 2; i++) {
				setTimeout(() => {new CreateEquation()}, 500 + Math.floor(Math.random()*2500));
			}

			score += 5 + (difficulty*5);
			item.explode();
		}
	});

	input.value = ""; // Resetando a resposta
}

/** Verifica a dificuldade que foi selecionada */

function getDifficulty() {
	let diff = [document.getElementById("easyDiff"), document.getElementById("mediumDiff"), document.getElementById("hardDiff")];

	for(let i = 0; i < 3; i++) {
		if(diff[i].checked) return parseInt(diff[i].value);
	}
	
}

/** Coleta as informações necessárias e desativa as telas que não são do jogo */

function startGame() {

	score = 0; // Reseta a pontuação

	document.getElementById("starfall_panel").style.display = "none"; // Desabilitando as estrelas

	difficulty = getDifficulty();

	mainMenu.style.display = "none"; // Desabilitando o menu principal
	gamePanel.style.display = "block"; // Habilitando o painel de jogo

	input.focus(); // Setando o foco no input de resposta

	new CreateEquation();
}

function sum(newQuestion) {

	return newQuestion.number1 + newQuestion.number2;

}

function subtraction(newQuestion) {

	return newQuestion.number1 - newQuestion.number2;

}

function multiplication(newQuestion) {

	return newQuestion.number1 * newQuestion.number2;

}

function division(newQuestion) {

	return parseInt((newQuestion.number1 / newQuestion.number2).toFixed(1));

}

/** Decide e cria as questões */

function selectQuestion() {

	let questionType;

	let newQuestion;

	// Decidindo se a questão vai ter decimal

	if(difficulty == 2) {
		newQuestion = {
			number1 : parseInt((Math.random()*100).toFixed(1)),
			number2 : parseInt((Math.random()*100).toFixed(1)),
			operator : "",
			answer : 0
		};
	}

	else {
		newQuestion = {
			number1 : Math.floor(Math.random()*100),
			number2 : Math.floor(Math.random()*100),
			operator : "",
			answer : 0
		}
	}

	// Decidindo quais tipos de questão vão cair

	switch(difficulty) {
	case 0: questionType = Math.floor(Math.random()*2);
		break;
	case 1: questionType = Math.floor(Math.random()*3);
		break;
	case 2: questionType = Math.floor(Math.random()*4);
		break;
	}

	// Calculando a resposta e decidindo o operador

	switch(questionType) {
	case 0:
	 newQuestion.answer = sum(newQuestion);
	 newQuestion.operator = " + ";
		break;
	case 1:
	 newQuestion.answer = subtraction(newQuestion);
	 newQuestion.operator = " - ";
		break;
	case 2:
	 newQuestion.answer = multiplication(newQuestion);
	 newQuestion.operator = " * ";
		break;
	case 3:
	 newQuestion.answer = division(newQuestion);
	 newQuestion.operator = " / ";
		break;
	default: newQuestion.answer = sum(newQuestion);
	 newQuestion.operator = " + ";
	}

	return newQuestion;
}

/** Retorna um valor inteiro entre 50 e o tamanho da tela -100*/

function randomPosition() {
	return Math.floor(50 + Math.random()*(window.innerWidth - 100));
}

/** Função de fim de jogo*/

function gameOver() {

	// Removendo todos os itens da tela

	questions.forEach((item) => {
		item.questionText.remove();
	});

	saveScores(); // Salva a pontuação feita na partida
	loadScores(); // Carrega a última pontuação na tela principal
	questions = []; // Reseta a lista de questões
	mainMenu.style.display = "block"; // Reabilitando o menu principal
	gamePanel.style.display = "none"; // Desabilitando o painel de jogo
	document.getElementById("starfall_panel").style.display = "block"; // Reabilitando as estrelas
}

/** Classe que contem todos os objetos de criação da questão */

class CreateEquation {

	newQuestion = selectQuestion();
	questionText = document.createElement("h2");

	/** Remove A questão da tela e da lista de questões */

	explode() {
		let index = questions.indexOf(this);
		this.questionText.remove();
		questions.splice(index, 1);
	}

	/** Retorna a resposta da questão para ser verificada */

	getAnswer() {
		return this.newQuestion.answer;
	}

	constructor() {

		this.questionText.innerHTML = (this.newQuestion.number1 + "").concat(this.newQuestion.operator).concat(this.newQuestion.number2);

		this.questionText.classList.add("equacao");
		this.questionText.style.left = randomPosition() + "px";
		this.questionText.addEventListener("animationend",e => gameOver());
		console.log(this.newQuestion.answer);
		questions.push(this);

		gameBoard.appendChild(this.questionText);
	}
}