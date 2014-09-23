function Taskbar(main, group) {
	this.main = main;
	this.game = main.game;
	this.group = group;
	// this.damCount = main.board.getDamCount();
	this.damCount = 1;
	this.createTaskbar();
	// this.hide();
}

Taskbar.prototype = {
	getGroup: function() {
		return this.group;
	},
	createTaskbar: function() {
		beaverImage = new Phaser.Image(this.game, 100, 550, 'beaverImage');
		beaverImage.scale.setTo(0.1,0.1);
		beaverCountText = this.game.add.text(150, 550, 'num', {fill: "#ff0044"});
		damImage = this.game.add.image(250, 550, 'damImage');
		damCountText = this.game.add.text(300, 550, this.damCount, { fill: "#ff0044"});
		buildButton = this.game.add.button(400, 550, 'buildButton', this.actionOnBuild, this);
		populateButton = this.game.add.button(500, 550, 'populateButton', this.actionOnPopulate, this);
		evolveButton = this.game.add.button(650, 550, 'evolveButton', this.actionOnEvolve, this);
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
	actionOnBuild : function(clickedButton){
		this.damCount += 1;
		console.log(this.damCount);
		this.damCountText.setText("this.damCount");
	},
	actionOnPopulate : function(){
		// numBeavers = Math.ceil(0.25 * board.numBeavers);
		// beaverCountText.setText(numBeavers);
	},

	actionOnEvolve : function(){
		// this.game.switchState(gameObject.evolutionCard)
	}
}