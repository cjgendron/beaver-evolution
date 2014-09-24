var EvolutionCard = function(main, group) {
    this.main = main;
    this.game = main.game;
    this.group = group;
    var trait00 = new Trait(0, "+2 dam blocks while building");
    var trait01 = new Trait(1, "Lumberjack only affects for one turn");
    var trait02 = new Trait(2, "No population loss for famine");
    var trait10 = new Trait(0, "Only 50% population lost on poachers");
    var trait11 = new Trait(1, "Only 25% loss on tornado");
    var trait12 = new Trait(2, "Only 25% loss on drought");
    var trait20 = new Trait(0, "Only 50% loss on flood");
    var trait21 = new Trait(1, "Can increase population by 50% when populating");
    var trait22 = new Trait(2, "Only 50% dam loss on fire");
    this.card = [
        Category("Craftsmanship", 0, [trait00, trait01, trait02]),
        Category("Resolve", 0, [trait10, trait11, trait12]),
        Category("Intelligence", 0, [trait20, trait21, trait22]),
    ];
    this.createEvolutionCard();
    this.hide();
}

EvolutionCard.prototype = {
    getEvolutionCard: function() {
        return this.card;
    },
    createEvolutionCard: function() {
        var titleStyle = { font: "20px Arial", fill: "#01579b", align: "center" };
        var categoryStyle = { font: "30px Arial", fill: "#01579b", align: "center" };
        var traitStyle = { font: "25px Arial", fill: "#000000", align: "left", wordWrap: true, wordWrapWidth: this.game.width/3 - 50};

        var text = "You can evolve in any of the three categories, but you must evolve traits in order.";
        this.group.add(new Phaser.Text(this.game, 0, 0, text, titleStyle));

        for (i = 0; i < this.card.length; i++) {
            this.group.add(new Phaser.Text(this.game, this.game.width/3*i, 50, this.card[i].name, categoryStyle));
            for (j = 0; j < this.card[i].traits.length; j++) {
                var trait = this.card[i].traits[j];
                trait.init(this.game.width/3*i,
                    100+(this.game.height/4*j),
                    traitStyle,
                    this.game,
                    this.main,
                    this.group,
                    this,
                    this.card[i]);
            }
        }
    },
    getTrait: function(category, trait) {
        return this.card[category].traits[trait].hasTrait();
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
    this.highestStage;
    return {
        name: name,
        traits: traits,
        getHighestStage: function() {
            return this.highestStage;
        },
        evolve: function() {
            if (!this.highestStage) {
                this.highestStage = 1;
            } else if (this.highestStage === 1) {
                this.highestStage = 2;
            }
        }
    }
}

var Trait = function(stage, description) {
    this.xCoordinate;
    this.yCoordinate;
    this.button;
    this.game;
    this.main;
    this.group;
    this.evolved;
    this.evolutionCard;
    this.category;
    this.locked;
    return {
        stage: stage,
        description: description,
        init: function(x, y, traitStyle, game, main, group, evolutionCard, category) {
            this.locked = stage === 0 ? false : true;
            this.evolved = false;
            this.xCoordinate = x;
            this.yCoordinate = y;
            this.game = game;
            this.main = main;
            this.group = group;
            this.category = category;
            this.evolutionCard = evolutionCard
            text = new Phaser.Text(this.game, 50+x, y, description, traitStyle);
            this.group.add(text);
            var button = new Phaser.Button(this.game, x, y, this.getTraitImage());
            button.inputEnabled = true;
            button.events.onInputDown.add(evolve, this);
            this.button = button;
            this.group.add(this.button);
            function evolve() {
                if (!this.locked) {
                    this.evolveTrait();
                    if (this.button != null) {
                        this.button.destroy();
                    }
                    this.button = this.group.add(new Phaser.Button(this.game, this.xCoordinate, this.yCoordinate, this.getTraitImage()));
                    this.button.inputEnabled = true;
                    this.button.events.onInputDown.add(evolve, this);
                    this.category.evolve();
                    this.category.traits[this.category.getHighestStage()].unlock();
                    this.main.getDisasterInfo().occurrence();
                    this.main.getTaskbar().getDisaster();
                    this.evolutionCard.next();
                }
            }
        },
        lock: function() {
            this.locked = true;
        },
        unlock: function() {
            this.locked = false;
        },
        hasTrait: function() {
            return this.evolved;
        },
        evolveTrait: function() {
            this.evolved = !this.evolved;
        },
        getTraitImage: function() {
            return this.evolved ? 'checkbox_yes' : 'checkbox_no';
        },
    }
}