var GameOverWin = function (game) {
    this.instructionText = null;
    this.replayButton = null;
}

GameOverWin.prototype = {

    init: function () {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
    },

    preload: function() {
        this.load.image('homeBackground', 'assets/images/background.png');
        this.load.image('replayButton', 'assets/images/replay_button.png');

    },

    create: function() {
        this.add.sprite(0, 0, 'homeBackground');

        // Add some instructions
        this.instructionText = this.add.text(170, 130, "You won!", {font: "110px Bubblegum Sans"});
        this.instructionText.fill = "#FFFFFF";
        this.instructionText.wordWrapWidth = 600;

        this.replayButton = this.add.button(200, 350, 'replayButton', this.replayGame);
    },

    replayGame: function() {
        // Is this enough to restart the game - we'll see!
        this.game.state.start('main');

    }
}