function Taskbar(game) {
	this.game = game;
	board = game.getBoard()
	this.damCount = board.getDamCount();


}

Taskbar.prototype = {
	preload: function() {

	},
	create: function() {
		beaverImage = this.game.add.image(100, 500, 'beaverImage');
		beaverCountText = this.game.add.text(150, 500, 'numBeavers', {fill: "#ff0044"});
		damImage = this.game.add.image(200, 500, 'damImage');
		damCountText = this.game.add.text(250, 500, this.damCount, { fill: "#ff0044"});
		buildButton = this.game.add.button(500, 500, 'build', this.actionOnBuild, this);
		populateButton = this.game.add.button(600, 500, 'populate', this.actionOnPopulate, this);
		evolveButton = this.game.add.button(700, 500, 'evolve', this.actionOnEvolve, this);
	},

	actionOnBuild : function(){
		this.damCount += 1;
		console.log(this.damCount);
		this.damCountText.setText(this.damCount);
	},

	actionOnPopulate : function(){
		// numBeavers = Math.ceil(0.25 * board.numBeavers);
		// beaverCountText.setText(numBeavers);
	},

	actionOnEvolve : function(){
		// this.game.switchState(gameObject.evolutionCard)
	}
}