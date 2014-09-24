var HomeStage = function (game) {
	this.instructionText = null;
	this.playButton = null;
	this.game = game;

	this.instructionText = [
		"Choose to evolve your colony to better withstand disasters over time",
		"Every turn, you will have the option to add more beavers or more dams",
		"Each turn also brings the chance of a random natural disaster, which can devastate your colony",
		"Evolve your colony of beavers over time to withstand natural disasters!",
	];
}

HomeStage.prototype = {

	init: function () {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
	},

	preload: function() {
		this.load.image('homeBackground', 'assets/images/background.png');
		this.load.image('playButton', 'assets/images/play_button.png');
		this.load.image('homeBeaver1', 'assets/images/beaver.png');
		this.load.image('homeBeaver2', 'assets/images/beaver2.png');

	},

	create: function() {
		this.add.sprite(0, 0, 'homeBackground');
		// Title
		var titleStyle = { font: "80px Arial", fill: "#FFFFFF", align: "center" };
		this.title = this.add.text(120, 40, "Beaver Evolution", titleStyle);

		var textStyle = { font: "20px Arial", fill: "#FFFFFF", align: "left" , wordWrap: true, wordWrapWidth: 750};

		// Add some instructions
		var currentY = 150;
		var spacing = 35;
		for (var i = 0; i < this.instructionText.length; i++) {
			newText = this.add.text(20, currentY, this.instructionText[i], textStyle);
			currentY += 1.25*spacing;
		};
		this.playButton = this.add.button(520, 430, 'playButton', this.startGame);
		this.beaver2 = this.add.sprite(30, 310, 'homeBeaver2');
	},

	startGame: function() {
		// User clicks 'start game' - let's get going
		this.game.state.start('main');
	}
}