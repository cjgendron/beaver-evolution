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
    var trait22 = new Trait(2, "Only 50% loss on fire");
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
        var categoryStyle = { font: "36px Bubblegum Sans", fill: "#763303", align: "center" };
        var traitStyle = { font: "22px Open Sans", fill: "#000000", align: "left", wordWrap: true, wordWrapWidth: this.game.width/3 - 70};

        for (i = 0; i < this.card.length; i++) {
            this.group.add(new Phaser.Text(this.game, this.game.width/3*i + 20, 40, this.card[i].name, categoryStyle));
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
    getTraitDescription: function(category, trait) {
        return this.card[category].traits[trait].description;
    },
    devolveTrait: function(category, trait) {
        return this.card[category].traits[trait].devolveTrait();
    },
    getEvolvedTraits: function(){
        var numTraits = 0;
        for (var trait = 0; trait <= 2; trait++){
            for (var category = 0; category <= 2; category++){
                if (this.main.getEvolutionCard().getTrait(category,trait)) {
                    numTraits++;
                }
            }
        }
        return numTraits;
    },
    show: function() {
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
        },
        devolve: function() {
            if (this.highestStage === 2) {
                this.highestStage = 1;
            } else if (this.highestStage === 1) {
                this.highestStage = 0;
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
            text = new Phaser.Text(this.game, 70+x, y, description, traitStyle);
            this.group.add(text);
            var button = new Phaser.Button(this.game, x+20, y, this.getTraitImage());
            button.inputEnabled = true;
            button.events.onInputDown.add(this.evolveHelper, this);
            this.button = button;
            this.group.add(this.button);
        },
        lock: function() {
            this.locked = true;
            if (this.button != null) {
                this.button.destroy();
            }
            this.button = this.group.add(new Phaser.Button(this.game, this.xCoordinate + 20, this.yCoordinate, this.getTraitImage()));
            this.button.inputEnabled = true;
            this.button.events.onInputDown.add(this.evolveHelper, this);
        },
        unlock: function() {
            this.locked = false;
            if (this.button != null) {
                this.button.destroy();
            }
            this.button = this.group.add(new Phaser.Button(this.game, this.xCoordinate + 20, this.yCoordinate, this.getTraitImage()));
            this.button.inputEnabled = true;
            this.button.events.onInputDown.add(this.evolveHelper, this);
        },
        hasTrait: function() {
            return this.evolved;
        },
        evolveTrait: function() {
            this.evolved = !this.evolved;
        },
        devolveTrait: function() {
            this.evolved = false;
            this.category.traits[this.category.getHighestStage()].lock();
            if (this.button != null) {
                this.button.destroy();
            }
            this.button = this.group.add(new Phaser.Button(this.game, this.xCoordinate + 20, this.yCoordinate, this.getTraitImage()));
            this.button.inputEnabled = true;
            this.button.events.onInputDown.add(this.evolveHelper, this);
            this.category.devolve();
            this.category.traits[this.category.getHighestStage()].unlock();
            this.evolutionCard.next();

        },
        getTraitImage: function() {
            return this.evolved ? 'checkbox_yes' : (this.locked ? 'checkbox_no_click' : 'checkbox_no');
        },

        evolveHelper : function(){
            if (!this.locked) {
                this.lock();
                this.evolveTrait();
                if (this.button != null) {
                    this.button.destroy();
                }
                this.button = this.group.add(new Phaser.Button(this.game, this.xCoordinate + 20, this.yCoordinate, this.getTraitImage()));
                this.button.inputEnabled = true;
                this.button.events.onInputDown.add(this.evolveHelper, this);
                this.category.evolve();
                this.category.traits[this.category.getHighestStage()].unlock();
                this.main.getTaskbar().showTurnResult("Evolve", "Yay! You've evolved!");
                this.evolutionCard.next();
            }
        }
    }
}