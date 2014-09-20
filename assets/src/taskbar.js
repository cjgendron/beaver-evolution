function Taskbar(game) {
	this.game = game;
	board = game.getBoard()
	this.damCount = board.getDamCount();
	createTaskbar(this);


	function actionOnBuild(taskbar){
		this.damCount += 1;
		console.log(this.damCount);
		this.damCountText.setText(this.damCount);
	}

	function actionOnPopulate(){
		// numBeavers = Math.ceil(0.25 * board.numBeavers);
		// beaverCountText.setText(numBeavers);
	}

	function actionOnEvolve(){
		// this.game.switchState(gameObject.evolutionCard)
	}
}

Taskbar.prototype = {
	preload: function() {

	},
	create: function() {
		taskbar.beaverImage = game.add.image(100, 500, 'beaverImage');
		taskbar.beaverCountText = game.add.text(150, 500, 'numBeavers', {fill: "#ff0044"});
		taskbar.damImage = game.add.image(200, 500, 'damImage');
		taskbar.damCountText = game.add.text(250, 500, taskbar.damCount, { fill: "#ff0044"});
		taskbar.buildButton = game.add.button(500, 500, 'build', actionOnBuild, taskbar);
		taskbar.populateButton = game.add.button(600, 500, 'populate', actionOnPopulate, taskbar);
		taskbar.evolveButton = game.add.button(700, 500, 'evolve', actionOnEvolve, taskbar);
	}
}