
var starAmmount = 25; // Quantidade máxima de estrelas na tela
const mainbody = document.getElementById("starfall_panel"); // Inicializando a tag body no js
let created = 0; // Conta a quantidade de estrelas criadas

/** Retorna um valor inteiro de valor entre 5 - 9, feito para decidir o tamanho das estrelas*/

function randomSize() {
	return 5 + Math.floor(Math.random()*4);
}

/** Retorna um valor inteiro entre 5 - 17, feito para decidir a duração de cada estrela*/

function randomDuration() {
	return 5 + Math.floor(Math.random()*12);
}

/** Retorna um valor inteiro entre 0 e o tamanho atual da tela, feito para decidir uma posição aleatória para a estrela*/

function randomX() {
	return Math.floor(Math.random()*window.innerWidth);
}

/** Retorna um valor em decimal entre 0 - 1, que decide a opacidade de uma estrela*/

function randomOpacity() {
	return Math.random();
}

/** Cria uma estrela de tamanho, duração de animação e posição de forma aleatória*/

function createStar() {
	let size = randomSize(); // Define o tamanho da estrela
	const star = document.createElement("div"); // Cria o elemento estrela
	star.classList.add("star"); // Adiciona a classe star para a estrela
	star.style.width = size+"px"; // Indica o width
	star.style.height = size+"px"; // Indica o height
	star.style.opacity = randomOpacity()+"";
	star.style.right = randomX()+"px"; // Indica o quão longe da direita está
	mainbody.appendChild(star); // Adiciona a estrela à tela
	star.style.animation = "falling "+randomDuration()+"s ease-in-out"; // Adiciona uma animação para a estrela
	star.addEventListener("animationend",e => {removeStar(star); createStar();}, false); // Verifica se a estrela terminou a sua animação
}

/** Remove a estrela que terminar a animação*/

function removeStar(star) {
	star.remove();
}

/** Cria um set de estrelas iniciais*/

function massiveCreation() {
	if(created < starAmmount) {
		setTimeout(function() {createStar(); massiveCreation(); created++;}, Math.floor((1+Math.random())*1000));
	}
}

// Chamando a função para aparecer estrelas desde o início

massiveCreation();