function Taskbar(main, group) {
	this.main = main;
	this.game = main.game;
	this.group = group;
	// this.damCount = main.board.getDamCount();
	this.damCount = 1;
	this.beaverCount = main.getBeavers();
	this.createTaskbar();
	// this.hide();
}

Taskbar.prototype = {
	getGroup: function() {
		return this.group;
	},
	createTaskbar: function() {
		taskbarBack = this.game.add.image(0,540,'taskbarBack');
		beaverImage = new Phaser.Image(this.game, 100, 550, 'beaverImage');
		beaverImage.scale.setTo(0.1,0.1);
		beaverCountText = this.game.add.text(150, 550, this.beaverCount, {fill: "#ff0044"});
		damImage = this.game.add.image(250, 550, 'dam');
		damImage.scale.setTo(0.2,0.2);
		damCountText = this.game.add.text(300, 550, this.damCount, { fill: "#ff0044"});
		buildButton = this.game.add.button(400, 550, 'buildButton', this.actionOnBuild, this);
		populateButton = this.game.add.button(500, 550, 'populateButton', this.actionOnPopulate, this);
		evolveButton = this.game.add.button(650, 550, 'evolveButton', this.actionOnEvolve, this);
		this.group.add(taskbarBack);
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
		this.damCount += Math.ceil(0.5 * this.beaverCount);
		damCountText.setText(this.damCount);
	},
	actionOnPopulate : function(clickedButton){
		this.beaverCount += Math.ceil(0.25 * this.beaverCount);
		beaverCountText.setText(this.beaverCount);
	},

	actionOnEvolve : function(){
		// this.game.switchState(gameObject.evolutionCard)
	}
}