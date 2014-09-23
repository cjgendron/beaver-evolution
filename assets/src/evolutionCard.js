var EvolutionCard = function(main, group) {
    this.main = main;
    this.game = main.game;
    this.group = group;
    this.card = [
        Category("Craftsmanship", 0, [
                new Trait(0, "+2 dam blocks while building", false),
                new Trait(1, "Only 50% population lost on poachers", false),
                new Trait(2, "Only 50% loss on flood", false)
            ]),
        Category("Resolve", 0, [
                new Trait(0, "Lumberjack only affects for one turn", false),
                new Trait(1, "Only 25% loss on tornado", false),
                new Trait(2, "Can increase population by 50% when populating", false)
            ]),
        Category("Intelligence", 0, [
                new Trait(0, "No population loss for famine", false),
                new Trait(1, "Only 25% loss on drought", false),
                new Trait(2, "Only 50% dam loss on fire", false)
            ]),
    ];
    this.createEvolutionCard();
    this.hide();
}

EvolutionCard.prototype = {
    getEvolutionCard: function() {
        return this.card;
    },
    createEvolutionCard: function() {
        var titleStyle = { font: "65px Arial", fill: "#01579b", align: "center" };
        var traitStyle = { font: "25px Arial", fill: "#000000", align: "left", wordWrap: true, wordWrapWidth: this.game.width/3 - 50};

        var text = "EVOLUTION CARD";
        this.group.add(new Phaser.Text(this.game, this.game.world.centerX-300, 0, text, titleStyle));

        for (i = 0; i < this.card.length; i++) {
            for (j = 0; j < this.card[i].traits.length; j++) {
                trait = this.card[i].traits[j];
                trait.setX(this.game.width/3*i);
                trait.setY(100+(this.game.height/4*j));
                trait.setGame(this.game);
                trait.setGroup(this.group);
                trait.setMain(this.main);
                trait.setText(new Phaser.Text(this.game, 50+trait.getX(), trait.getY(), trait.description, traitStyle));
                this.group.add(trait.getText());
                button = new Phaser.Button(this.game, trait.getX(), trait.getY(), trait.getTraitImage());
                button.inputEnabled = true;
                button.events.onInputDown.add(this.evolve, this);
                trait.setButton(button);
                this.group.add(trait.getButton());
            }
        }
    },
    evolve: function(button) {
        cardStats = [];
        for (i = 0; i < this.card.length; i++) {
            for (j = 0; j < this.card[i].traits.length; j++) {
                cardStats.push(this.card[i].traits[j].hasTrait);
            }
        }
        console.log(cardStats.toString());
        trait.hasTrait = !trait.hasTrait;
        trait.updateTraitImage(button);
        this.next();
    },
    show: function() {
        this.game.stage.backgroundColor = "#ffffff";
        this.group.visible = true;
    },
    hide: function() {
        this.group.visible = false;
    },
    next: function() {
        this.hide();
        this.main.board.show();
    }
}

var Category = function(name, highestStage, traits) {
    return {
        name: name,
        highestStage: highestStage,
        traits: traits,
    }
}

var Trait = function(stage, description, hasTrait) {
    this.xCoordinate;
    this.yCoordinate;
    this.button;
    this.text;
    this.game;
    this.group;
    this.main;
    return {
        stage: stage,
        description: description,
        hasTrait: hasTrait,
        setX: function(x) {
            this.xCoordinate = x;
        },
        setY: function(y) {
            this.yCoordinate = y;
        },
        getX: function() {
            return this.xCoordinate;
        },
        getY: function() {
            return this.yCoordinate;
        },
        getTraitImage: function() {
            return this.hasTrait ? 'checkbox_yes' :'checkbox_no';
        },
        setButton: function(button) {
            this.button = button;
        },
        getButton: function() {
            return this.button;
        },
        setText: function(text) {
            this.text = text
        },
        getText: function() {
            return this.text;
        },
        setGame: function(game) {
            this.game = game;
        },
        setGroup: function(group) {
            this.group = group;
        },
        setMain: function(main) {
            this.main = main;
        },
        updateTraitImage: function(button) {
            if (this.button != null) {
                this.button.destroy();
            }
            
            this.button = this.group.add(new Phaser.Button(this.game, this.getX(), 
                this.getY(), 
                this.getTraitImage()));
            this.button.inputEnabled = true;
            this.button.events.onInputDown.add(function(){console.log("hi")}, this);
            // fix this!!!
            // button = new Phaser.Button(game, this.getX(), this.getY(), this.getTraitImage());
            // button.inputEnabled = true;
            // button.events.onInputDown.add(function() {console.log('kind of working')}, this);
            // if (this.button != null) {
            //     this.button.kill();
            // }
            // this.button.setFrames(this.getTraitImage());
            // this.button.key = this.getTraitImage();
            // this.setButton(button);
        }
    }
}