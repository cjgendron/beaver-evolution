function Taskbar(main, group) {
	this.main = main;
	this.game = main.game;
	this.group = group;
	this.damCount = this.getDamCount();
	this.damsToBuild;
	this.state = "view";
	this.createTaskbar();
	this.instructions;
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
		this.damCountToBuildText = this.game.add.text(240, 550, null, { fill: "#00ff44"});
		this.infoButton = this.game.add.button(300, 550, 'infoButton', this.actionOnInfo, this);
		this.buildButton = this.game.add.button(400, 550, 'buildButton', this.actionOnBuild, this);
		this.populateButton = this.game.add.button(500, 550, 'populateButton', this.actionOnPopulate, this);
		this.evolveButton = this.game.add.button(650, 550, 'evolveButton', this.actionOnEvolve, this);
		this.group.add(this.beaverImage);
		this.group.add(this.beaverCountText);
		this.group.add(this.damImage);
		this.group.add(this.damCountText);
		this.group.add(this.damCountToBuildText);
		this.group.add(this.buildButton);
		this.group.add(this.populateButton);
		this.group.add(this.evolveButton);
		this.group.add(this.taskbarBack);
		this.instructions = new Phaser.Text(this.game, 0, 490, "Let's get started! Choose to build, populate, or evolve.",
			{ font: "20px Arial", fill: "#763303", align: "center", wordWrap: true, wordWrapWidth:800});
		this.group.add(this.instructions);
		this.group.sendToBack(this.taskbarBack);
	},
	show: function() {
		this.group.visible = true;
	},
	hide: function() {
		this.group.visible = false;
	},
	actionOnInfo : function(clickedButton){
		if (this.state == "building"){
			this.clearBuildingState();
		}
		if (this.state != "info") {
			this.state = "info";
			this.main.getBoard().hide();
			this.main.getEvolutionCard().hide();
			this.main.getDisasterInfo().show();
		} 
		else {
			this.state = "view";
			this.main.getBoard().show();
			this.main.getEvolutionCard().hide();
			this.main.getDisasterInfo().hide();
		}
	},
	actionOnBuild : function(clickedButton){
		// TODO: need to add a screen to tell them how many they can build, different art for dams that havent been locked in yet
		this.main.getBoard().show();
		this.main.getEvolutionCard().hide();
		this.main.getDisasterInfo().hide();
		if (this.state != "building"){
			this.state = "building";
			this.main.getBoard().unlockForBuilding();
			this.damsToBuild = Math.ceil(0.5 * this.getBeaverCount());
			this.setBuildText(this.damsToBuild);
			this.instructions.setText("Time to build! Place your dams in any cells adjacent to current dams. Click \"Build\" again when you are done.");
		}
		else if (this.main.getBoard().getDamCount() <= this.damCount + Math.ceil(0.5 * this.getBeaverCount()) 
			&& this.main.getBoard().getDamCount() - this.damCount !=0){
			this.updateDamCount();
			this.main.getBoard().lockAllPieces();
			this.damsToBuild = 0;
			this.setBuildText("");
			this.state = "view";
			this.getDisaster();
		}
	},
	actionOnPopulate : function(clickedButton){
		if (this.state == "building"){
			this.clearBuildingState();
		}
		this.state = "view";
		var pct = 0.25;
		if (this.main.getEvolutionCard().getTrait(2, 1)) {
			pct = 0.5;
		}
		this.main.setBeavers(this.getBeaverCount() + Math.ceil(pct * this.getBeaverCount()));
		this.updateBeaverCount();
		this.getDisaster();
	},

	actionOnEvolve : function(){
		if (this.state == "building"){
			this.clearBuildingState();
		}
		if (this.state != "evolving") {
			this.state = "evolving";
			this.main.board.hide();
			this.main.getDisasterInfo().hide();
			this.main.evolutionCard.show();
			this.instructions.setText("Choose a trait you'd like to evolve.");
		} 
		else {
			this.state = "view";
			this.main.board.show();
			this.main.getDisasterInfo().hide();
			this.main.evolutionCard.hide();
		}
	},

	getDamCount: function(){
		return this.main.getBoard().getDamCount();
	},

	updateDamCount: function(){
		this.damCount = this.getDamCount();
		this.damCountText.setText(this.damCount);
		this.checkEndConditions();
	},

	getBeaverCount: function(){
		return this.main.getBeavers();
	},

	updateBeaverCount: function(){
		this.beaverCountText.setText(this.getBeaverCount());
		this.checkEndConditions();
	},

	checkEndConditions: function() {
		if (this.damCount >= 40 || this.getBeaverCount() >= 30) {
			this.game.state.start('win');
		} else if (this.damCount <= 0 || this.getBeaverCount() <= 2) {
			this.game.state.start('end');
		}
	},

	setBuildText: function(number) {
		this.damCountToBuildText.setText(number);
	},

	damPlaced: function() {
		this.damsToBuild--;
		this.setBuildText(this.damsToBuild);
		if (this.damsToBuild === 0) {
			this.checkEndConditions();
		}
	},

	damRemoved: function() {
		this.damsToBuild++;
		this.setBuildText(this.damsToBuild);
	},

	clearBuildingState: function(){
		this.main.getBoard().clearAndLock();
		this.damsToBuild = 0;
		this.setBuildText("");
	},
	getDisaster: function() {
		var disaster = this.main.getDisasterInfo().occurrence();
		this.instructions.setText("The disaster was: " + disaster + ". Choose build, populate, or evolve.");	
	}



}