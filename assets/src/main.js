function BeaverEvolution(game) {
    this.game = game;
    this.board;
    this.evolutionCard;
    this.taskbar;
    this.beavers;
    this.disasters;
}

BeaverEvolution.prototype = {
    getBeavers: function() {
        return this.beavers;
    },
    setBeavers: function(beavers) {
        this.beavers = beavers;
        this.updateBeaverCount();
    },
    updateDamCount: function() {
        this.getTaskbar().updateDamCount();
    },
    updateBeaverCount: function() {
        this.getTaskbar().updateBeaverCount();
    },
    getBoard: function() {
        return this.board;
    },
    getTaskbar: function() {
        return this.taskbar;
    },
    getEvolutionCard: function() {
        return this.evolutionCard;
    },
    getDisasterInfo: function() {
        return this.disasters;
    },
    preload: function() {
        this.game.load.image('taskbarBack',"/assets/images/taskbarBack.png");
        this.game.load.image('infoButton', "/assets/images/info.png");
        this.game.load.image('beaverImage',"/assets/images/beaver.png");
        this.game.load.image('buildButton', "/assets/images/build.png");
        this.game.load.image('populateButton', "/assets/images/populate.png");
        this.game.load.image('evolveButton', "/assets/images/evolve.png");
        this.game.load.image('helpButton', "/assets/images/help.png");
        this.game.load.image("test_image", "../assets/images/phaser.png");
        this.game.load.image("green", "../assets/images/green.png");
        this.game.load.image("green_brown", "../assets/images/green_brown.png");
        this.game.load.image("land", "/assets/images/land.png", 42, 48);
        this.game.load.image("water", "/assets/images/water.png", 42, 48);
        this.game.load.image("dam", "/assets/images/dam.png", 42, 48);
        this.game.load.image('checkbox_no', '../assets/images/checkbox_no.png', 40, 40);
        this.game.load.image('checkbox_yes', '../assets/images/checkbox_yes.png', 40, 40);
    },
    create: function() {
        this.game.stage.backgroundColor = "#ffffff";
        this.beavers = 8;
        boardGroup = this.game.add.group();
        evolutionCardGroup = this.game.add.group();
        taskbarGroup = this.game.add.group();
        disasterGroup = this.game.add.group();
        this.board = new Board(this, boardGroup);
        this.evolutionCard = new EvolutionCard(this, evolutionCardGroup);
        this.taskbar = new Taskbar(this, taskbarGroup);
        this.disasters = new Disasters(this, disasterGroup);
        this.board.init();
        console.log("Welcome to Beaver Evolution!");
        this.board.show();
    },
    update: function() {
        
    },
    render: function() {

    }
}