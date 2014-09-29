var HomeStage = function (game) {
	this.instructionText = null;
	this.playButton = null;
	this.game = game;

	this.instructionText =
		"Choose to evolve your colony to better withstand disasters over time.\n" + 
		"Every turn, you will have the option to add more beavers or more dams.\n"+
		"Be careful of random natural disasters -- they could devastate your colony.\n"+
		"Evolve your colony of beavers over time to withstand natural disasters!";
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
		this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
	},

	create: function() {
		this.add.sprite(0, 0, 'homeBackground');
		// Title
		var titleStyle = { font: "80px Bubblegum Sans", fill: "#FFFFFF", align: "center"};
		this.title = this.add.text(125, 40, "Beaver Evolution", titleStyle);

		var textStyle = { font: "22px Open Sans", fill: "#FFFFFF", align: "center" , wordWrap: true, wordWrapWidth: 750};

		newText = this.add.text(25, 160, this.instructionText, textStyle);
		this.playButton = this.add.button(440, 380, 'playButton', this.startGame);
		this.beaver2 = this.add.sprite(50, 330, 'homeBeaver2');
	},

	startGame: function() {
		// User clicks 'start game' - let's get going
		this.game.state.start('instructions');
	}
}