function Taskbar(main, group) {
	this.main = main;
	this.game = main.game;
	this.group = group;
	this.damCount = main.board.getDamCount();
	this.createTaskbar();
	this.hide();
}

Taskbar.prototype = {
	getGroup: function() {
		return this.group;
	},
	createTaskbar: function() {
		beaverImage = new Phaser.Image(this.game, 100, 500, 'beaverImage');
		beaverCountText = this.game.add.text(150, 500, 'numBeavers', {fill: "#ff0044"});
		damImage = this.game.add.image(200, 500, 'damImage');
		damCountText = this.game.add.text(250, 500, this.damCount, { fill: "#ff0044"});
		buildButton = this.game.add.button(500, 500, 'build', this.actionOnBuild, this);
		populateButton = this.game.add.button(600, 500, 'populate', this.actionOnPopulate, this);
		evolveButton = this.game.add.button(700, 500, 'evolve', this.actionOnEvolve, this);
		this.group.add(beaverImage);
		this.group.add(beaverCountText);
		this.group.add(damImage);
		this.group.add(damCountText);
		this.group.add(buildButton);
		this.group.add(populateButton);
		this.group.add(evolveButton);
	},
	show: function() {
		this.group.visible = true;
	},
	hide: function() {
		this.group.visible = false;
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