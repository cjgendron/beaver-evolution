function Taskbar(main, group) {
	this.main = main;
	this.game = main.game;
	this.group = group;
	this.damCount = this.getDamCount();
	this.damsToBuild;
	this.state = "view";
	this.createTaskbar();
	this.instructions;
	this.locked = false;
}

Taskbar.prototype = {
	getGroup: function() {
		return this.group;
	},
	createTaskbar: function() {
		this.taskbarBack = this.game.add.image(0,540,'taskbarBack');
		this.beaverImage = new Phaser.Image(this.game, 160, 545, 'beaverImage');
		this.beaverImage.scale.setTo(0.1,0.1);
		var numStyle = {font: "30px Bubblegum Sans", fill: "#763303"};
		this.beaverCountText = this.game.add.text(200, 550, this.getBeaverCount(), numStyle);
		this.damImage = this.game.add.image(260, 545, 'dam');
		this.damImage.scale.setTo(0.2,0.2);
		this.damCountText = this.game.add.text(300, 550, this.damCount, numStyle);
		this.damCountToBuildText = this.game.add.text(345, 550, null, {font: "30px Bubblegum Sans", fill: "#00ff44"});
		this.infoButton = this.game.add.button(50, 550, 'infoButton', this.actionOnInfo, this);
		this.buildButton = this.game.add.button(400, 550, 'buildButton', this.actionOnBuild, this);
		this.populateButton = this.game.add.button(505, 550, 'populateButton', this.actionOnPopulate, this);
		this.evolveButton = this.game.add.button(650, 550, 'evolveButton', this.actionOnEvolve, this);
		this.click = this.game.add.audio("click");
		this.group.add(this.beaverImage);
		this.group.add(this.beaverCountText);
		this.group.add(this.damImage);
		this.group.add(this.damCountText);
		this.group.add(this.damCountToBuildText);
		this.group.add(this.buildButton);
		this.group.add(this.populateButton);
		this.group.add(this.evolveButton);
		this.group.add(this.taskbarBack);

		this.instructions = new Phaser.Text(this.game, 50, 490, "Let's get started! Choose to build, populate, or evolve.",
			{ font: "20px Open Sans", fill: "#763303", align: "center", wordWrap: true, wordWrapWidth:700});

		this.graphics = this.game.add.graphics(0, 0);


	    // set a fill and line style
	    this.graphics.beginFill(0xFFFFFF);
	    this.graphics.lineStyle(2, 0x000000, 1);
	    this.graphics.moveTo(0,487);
	    this.graphics.lineTo(800, 487);
		this.group.add(this.instructions);
		//this.group.add(this.graphics);
		//this.group.bringToTop(this.graphics);
		this.group.sendToBack(this.taskbarBack);
	},
	show: function() {
		this.group.visible = true;
	},
	hide: function() {
		this.group.visible = false;
	},
	actionOnInfo : function(clickedButton){
		this.click.play();
		if (!this.locked) {
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
		}
	},
	actionOnBuild : function(clickedButton){
		// TODO: need to add a screen to tell them how many they can build, different art for dams that havent been locked in yet
		this.click.play();
		if (!this.locked) {
			this.main.getBoard().show();
			this.main.getEvolutionCard().hide();
			this.main.getDisasterInfo().hide();
			var extraDams = Math.ceil(0.5 * this.getBeaverCount());
			if (this.main.getEvolutionCard().getTrait(0,0)){
				extraDams +=2;
			}
			this.damsToBuild = extraDams;
			if (this.state != "building"){
				if (this.main.getBoard().unlockForBuilding()){
					this.state = "building";
					this.setBuildText(this.damsToBuild);
					this.instructions.setText("Time to build! Place your dams in any cells adjacent to current dams. Click \"Build\" again when you are done.");
				}
				else {
					this.instructions.setText("You cannot build this turn due to Lumberjack.");
				}
			}
			else if (this.main.getBoard().getDamCount() <= this.damCount + extraDams 
				&& this.main.getBoard().getDamCount() - this.damCount !=0){
				this.updateDamCount();
				this.main.getBoard().lockAllPieces();
				this.damsToBuild = 0;
				this.setBuildText("");
				this.state = "view";
				this.showTurnResult("Build", "All that hard work building dams paid off! You now have " + this.getDamCount() + " dams.");
			}			
		}
	},
	actionOnPopulate : function(clickedButton){
		this.click.play();
		if (!this.locked) {
			if (this.state == "building"){
				this.clearBuildingState();
			}
			this.state = "view";
			if (this.main.getBoard().canPopulate()){
				var pct = 0.25;
				if (this.main.getEvolutionCard().getTrait(2, 1)) {
					pct = 0.5;
				}
				var newBeaverCount = Math.min(this.getBeaverCount() + Math.ceil(pct * this.getBeaverCount()), this.damCount);
				if (newBeaverCount > this.getBeaverCount()){
					this.main.setBeavers(newBeaverCount);
					this.updateBeaverCount();
					this.showTurnResult("Populate", "Yay! Now you have " + newBeaverCount + " beavers!");
					
				}
				else {
					this.instructions.setText("You cannot populate this turn because you need more dams.");
				}
			}
			else {
				this.instructions.setText("You cannot populate this turn due to Famine.");
			}			
		}
	},

	actionOnEvolve : function(){
		this.click.play();
		if (!this.locked) {
			if (this.state == "building"){
				this.clearBuildingState();
			}
			if (this.state != "evolving") {
				this.state = "evolving";
				this.main.board.hide();
				this.main.getDisasterInfo().hide();
				this.main.evolutionCard.show();
				this.instructions.setText("Choose a trait you'd like to evolve. You may evolve in any category, but you must evolve in order.");
			} 
			else {
				this.state = "view";
				this.main.board.show();
				this.main.getDisasterInfo().hide();
				this.main.evolutionCard.hide();
			}
		}
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

	checkEndConditions: function() {
		if (this.damCount >= 40 || this.getBeaverCount() >= 30 || this.main.getEvolutionCard().getEvolvedTraits() >= 9) {
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
		this.main.getBoard().incrementCounters();
		var disaster = this.main.getDisasterInfo().occurrence();
		this.instructions.setText("Choose build, populate, or evolve.");	
	},
	lockTaskbar: function() {
		this.locked = true;
	},
	unlockTaskbar: function() {
		this.locked = false;
	},
	showTurnResult: function(name, text, callback) {
		var turnGroup = this.game.add.group();
		turnGroup.add(new Phaser.Image(this.game, 100, 100, 'disaster_bg'));
		nameText = new Phaser.Text(this.game, 150, 150, name,
			{ font: "50px Bubblegum Sans", fill: "#763303", align: "left", wordWrap: true, wordWrapWidth:500});
		resultText = new Phaser.Text(this.game, 150, 250, text,
			{ font: "20px Open Sans", fill: "#763303", align: "left", wordWrap: true, wordWrapWidth:500});
		
		turnGroup.add(nameText);
		turnGroup.add(resultText);
		this.main.taskbar.lockTaskbar();
		turnGroup.add(new Phaser.Button(this.game, 500, 420, 'next', getDisaster, this));
		turnGroup.visible = true;
		return turnGroup;

		function getDisaster(button) {
			turnGroup.visible = false;
			this.checkEndConditions();
			this.main.taskbar.unlockTaskbar();
			this.getDisaster();
		}
	}



}