<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Math Defender</title>
	<link rel="stylesheet" type="text/css" href="styles/style.css">
</head>
<body>

	<div id="starfall_panel"></div>

	<div id="main_menu">

		<div id="scores">
		<h2 id="highscore">Highscore: 0</h2>
		<h2 id="lastscore">Last Score: 0</h2>
		</div>

		<div id="buttons">

			<button id="startGameButton" onclick="startGame()">
				Começar o Jogo
			</button>

			<div id="difficulties">
				<form id="selected">
					
					<input id="easyDiff" type="radio" name="difficulty" value="0" checked="true">
					<label for="easyDiff">Fácil</label>
					<input id="mediumDiff" type="radio" name="difficulty" value="1">
					<label for="mediumDiff">Médio</label>
					<input id="hardDiff" type="radio" name="difficulty" value="2">
					<label for="hardDiff">Difícil</label>
				</form>
			</div>

		</div>

		<button id="info" onclick="openInfoPanel()">?</button>

	</div>

	<div id="info_panel">
		<button id="exit_info_panel" onclick="exitInfoPanel()">X</button>
		<h2>Como Jogar</h2>
		<p>O jogo flui de forma bem simples, diversas equações matemáticas estão caindo do céu, ameaçando a vida dos estudantes de humanas, sendo assim, você deve eliminá-los antes que eles toquem a linha vermelha, como? Resolvendo as equações você mesmo.</p>
		<h2>O que as dificuldades mudam?</h2>
		<p>Mudar a dificuldade influencia apenas duas coisas:
			<br><br>1) Os tipos de equação: Diferentes equações são adicionadas por nível, o nivel fácil possui apenas adição e subtração, o nível médio possui multiplicação, já o difícil tanto adiciona a divisão, quanto equações com casas decimais (Deve-se responder com apenas 1 casa decimal);
			<br><br>2) A pontuação: Cada nível oferece uma quantidade de pontos fixa por questão, com a fácil dando apenas 5 pontos, a média 10 e a dificuldade difícil dando 15!</p>
			
	</div>

	<div id="game_panel">
		<div id="game_board"></div>
		<div id="input_container">
		<input id="answer_input" type="number" placeholder="">
		<button id="send_input">=></button>
		</div>
	</div>

	<script type="text/javascript">
				function exitInfoPanel() {
					let panel = document.getElementById("info_panel");

					panel.style.display = "none";
				}

				function openInfoPanel() {
					let panel = document.getElementById("info_panel");

					panel.style.display = "block";
				}
			</script>

	<script type="text/javascript" src="scripts/starfall.js"></script>

	<script type="text/javascript" src="scripts/game.js"></script>

</body>
</html>