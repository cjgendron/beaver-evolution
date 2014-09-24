function Taskbar(main, group) {
	this.main = main;
	this.game = main.game;
	this.group = group;
	this.damCount = this.getDamCount();
	//this.damCount = 1;
	//this.beaverCount = main.getBeavers();
	this.state;
	this.createTaskbar();
	// this.hide();
}

Taskbar.prototype = {
	getGroup: function() {
		return this.group;
	},
	createTaskbar: function() {
		this.taskbarBack = this.game.add.image(0,540,'taskbarBack');
		this.beaverImage = new Phaser.Image(this.game, 0, 550, 'beaverImage');
		this.beaverImage.scale.setTo(0.1,0.1);
		this.beaverCountText = this.game.add.text(50, 550, this.getBeaverCount(), {fill: "#ff0044"});
		this.damImage = this.game.add.image(150, 550, 'dam');
		this.damImage.scale.setTo(0.2,0.2);
		this.damCountText = this.game.add.text(200, 550, this.damCount, { fill: "#ff0044"});
		this.infoButton = this.game.add.button(300, 550, 'infoButton', this.actionOnInfo, this);
		this.buildButton = this.game.add.button(400, 550, 'buildButton', this.actionOnBuild, this);
		this.populateButton = this.game.add.button(500, 550, 'populateButton', this.actionOnPopulate, this);
		this.evolveButton = this.game.add.button(650, 550, 'evolveButton', this.actionOnEvolve, this);
		this.group.add(this.beaverImage);
		this.group.add(this.beaverCountText);
		this.group.add(this.damImage);
		this.group.add(this.damCountText);
		this.group.add(this.buildButton);
		this.group.add(this.populateButton);
		this.group.add(this.evolveButton);
		this.group.add(this.taskbarBack);
		this.group.sendToBack(this.taskbarBack);
	},
	show: function() {
		this.group.visible = true;
	},
	hide: function() {
		this.group.visible = false;
	},
	actionOnInfo : function(clickedButton){
		if(this.main.getDisasterInfo().group.visible){
			this.main.getBoard().show();
			this.main.getDisasterInfo().hide();
		}
		else{
			this.main.getBoard().hide();
			this.main.getDisasterInfo().show();
		}
	},
	actionOnBuild : function(clickedButton){
		// TODO: need to add a screen to tell them how many they can build, different art for dams that havent been locked in yet
		if (this.state != "building"){
			this.state = "building";
			this.main.getBoard().unlockForBuilding();
		}
		else if (this.main.getBoard().getDamCount() <= this.damCount + Math.ceil(0.5 * this.getBeaverCount()) 
			&& this.main.getBoard().getDamCount() - this.damCount !=0){
			this.updateDamCount();
			this.main.getBoard().lockAllPieces();
		}
		
		
	},
	actionOnPopulate : function(clickedButton){
		this.main.setBeavers(this.getBeaverCount() + Math.ceil(0.25 * this.getBeaverCount()));
		this.updateBeaverCount();
	},

	actionOnEvolve : function(){
		this.main.board.hide();
		this.main.evolutionCard.show();
	},

	getDamCount: function(){
		return this.main.getBoard().getDamCount();
	},

	updateDamCount: function(){
		this.damCount = this.getDamCount();
		this.damCountText.setText(this.damCount);

	},

	getBeaverCount: function(){
		return this.main.getBeavers();
	},

	updateBeaverCount: function(){
		this.beaverCountText.setText(this.getBeaverCount());
	},



}