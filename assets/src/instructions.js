var InstructionsStage = function (game) {
    this.instructionText = null;
    this.playButton = null;
    this.game = game;

    this.instructionText =
        "Your goal is to create a colony of at least 30 beavers, build at least 40 dams," + 
        " or fully evolve. If you are ever under 2 beavers, you will be unable to reproduce," +
        " and if you run out of dams, your beavers won't be able to survive. " +
        "Each turn, you can choose to build dams, populate your beavers, or evolve a trait." +
        "You cannot populate beyond the number of dams you have.";
}

InstructionsStage.prototype = {

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
        this.title = this.add.text(200, 40, "How to Play", titleStyle);

        var textStyle = { font: "22px Open Sans", fill: "#FFFFFF", align: "center" , wordWrap: true, wordWrapWidth: 750};

        newText = this.add.text(25, 160, this.instructionText, textStyle);
        this.playButton = this.add.button(440, 380, 'playButton', this.startGame);
        this.beaver2 = this.add.sprite(50, 330, 'homeBeaver2');
    },

    startGame: function() {
        // User clicks 'start game' - let's get going
        this.game.state.start('main');
    }
}